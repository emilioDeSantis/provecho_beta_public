//Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, { Storage, Auth, API } from 'aws-amplify'
// // import { Chef, FollowType, Follow, PostType, Post, RemarkType, Remark, NotificationType, Notification, Hashtag } from '../models'
// import { Chef, FollowType, Follow, NotificationType, Notification, PostType, Post, RemarkType, Remark, Hashtag, Ingredient, PostIngredient} from '../models'
import 'react-native-get-random-values';
import * as storage from './storage'
import ImagePicker from 'react-native-image-crop-picker';
import * as global from './global'


import awsconfig from '../aws-exports';
import { add, call } from 'react-native-reanimated';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});

const capacity = 20
const limit = 20
let idols = []
let feed = []
let last_cashed = 0

const update_idols_posts = async (idol, callback) => {
    //check if last query date is older tan last posted date
    if(idol.last_queried < idol.lastUploadDate) {
        //if so fetch posts by idol
        //also do a raneg of no later tna last queried
        const aws_date = new Date(idol.last_queried)
        const posts = await global.fetch_feed_posts_by_chef({limit, chef: idol, aws_date})
        const formatted_posts = posts.map((post) => {
            const createdAt = Date.parse(post.createdAt)
            new_post = {
                ...post
            }
            new_post.createdAt = createdAt
            return new_post
        })

    
    //set idols last query date to last posted date
        idol.last_queried = idol.lastUploadDate
    //set last chased to last qurioed is its >
        if(idol.last_queried > last_cashed) {
            last_cashed = idol.last_queried
        }
    // add new posts to feed
    // console.log('formsatted posts: ', idol.id, formatted_posts);
        feed.push(...formatted_posts)
    //sort feed
        const compare = (a, b) => {
            if(a.createdAt < b.createdAt){
                return 1
            }             
            if(a.createdAt > b.createdAt){
                return -1
            } 
            return 0
        }

        feed.sort(compare)
        // console.log('feed,./.', feed);
        if(feed.length > capacity) {
            feed.length = capacity
        }
    }
    callback()
}

const update_posts = async () => {
    return new Promise((resolve, reject) => {
        let n = 0
        idols.forEach((idol) => {
            update_idols_posts(idol, () => {
                n ++
                if (n >= idols.length) {
                    resolve()
                }
            })
        })
    })
}

export const on_refresh = async (user) => {
    alert('refresh form feed')
    //updwt eidols
    let idol_ids_to_delete = {}
    idols.forEach((idol) => {
        idol_ids_to_delete[idol.id] = true
    })
    //fetch idols
    const chefs = await global.fetch_feed_idols(user)
    //make all last queies dates the oldest post date
    const formatted_chefs = chefs.map((chef) => {
        let last_queried = 0
        idols.every((idol) => {
            if(idol.id == chef.id) {
                last_queried = idol.last_queried
                delete idol_ids_to_delete[idol.id]
                return false
            } else {
                return true
            }
        })
        let new_date = chef.lastUploadDate ? Date.parse(chef.lastUploadDate) : 0
        delete chef.lastUploadDate
        return {
            ...chef,
            last_queried,
            lastUploadDate: new_date
        }
    })
    //update idols
    idols = formatted_chefs
    //run update_idols_posts for every idol
    await update_posts()

////////
    let deleted_feed = [...feed]
    deleted_feed.forEach((post, index) => {
        if (idol_ids_to_delete[post.chefID]) {
            delete deleted_feed[index]
        }
    })
    feed = deleted_feed
}



////////

export const fetch = async ({next_token, fetch_limit, user}) => {
    let begin_index = 0
    if(next_token) {
        begin_index = feed.findIndex(item => item.id == next_token) + 1
    } else {
        await on_refresh(user)
    }
    let posts = feed.slice(begin_index, fetch_limit)
    let new_next_token = posts[posts.length - 1].id
    if(posts.length < fetch_limit) {
        new_next_token = 'end'
    }
    if(next_token == 'end') {
        return 
    }
    return [posts, new_next_token]
}

export const clear = () => {
    idols = []
    feed = []
    last_cashed = 0
}