//Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Amplify, { Storage, Auth, API } from 'aws-amplify'
import { DataStore, Predicates, SortDirection } from '@aws-amplify/datastore'
import 'react-native-get-random-values';
import * as storage from './storage'
import ImagePicker from 'react-native-image-crop-picker';
import * as cache from './cache'
import * as feed from './feed'
import {drake} from '../assets/images'


import awsconfig from '../aws-exports';
import { add } from 'react-native-reanimated';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});



// █▀▀ █▀▀█ █▀▄▀█ █▀▀ █▀▀█ █▀▀█ 
// █   █▄▄█ █ ▀ █ █▀▀ █▄▄▀ █▄▄█ 
// ▀▀▀ ▀  ▀ ▀   ▀ ▀▀▀ ▀ ▀▀ ▀  ▀

export const take_image = (setUri, is_profile_picture) => {
    //update dimantsion for real size 
    let height = 250
    let width = 200
    if(is_profile_picture) {
        height = 100
        width = 100
    }
    ImagePicker.openPicker({
        width,
        height,
        cropping: true
    }).then(image => {
        setUri(image.path)
    });
}  


// █   █▀█ █▀▀ █ █▄ █
// █▄▄ █▄█ █▄█ █ █ ▀█

export const get_auth_user = async () => {
    try {
        let auth_user = null
        try{
            auth_user = await Auth.currentAuthenticatedUser() 
        } catch {
            return null
        }
        const chef = await fetch_user_by_id(auth_user.attributes.sub)
        return chef
    } catch {
        return 'no_profile'
    }
}

export const confirm_signup = async ({email, password, code,}) =>{
    await Auth.confirmSignUp( email, code )
    const user = await Auth.signIn(email, password)
    return user
}

export const sign_in = async (email, password) =>{
    const user = await Auth.signIn(email, password)
    return user
}

export const sign_out = async (username) =>{
    cache.clear()
    feed.clear()
    await Auth.signOut()
}

export const is_username_taken = async (username) => {
    const users = await API.graphql({
        query: `
        query ChefsByUsername(
          $username: String
          $sortDirection: ModelSortDirection
          $filter: ModelChefFilterInput
          $limit: Int
          $nextToken: String
        ) {
          chefsByUsername(
            username: $username
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
              username
              createdAt
              lastUploadDate
              name
              image
              biography
              n_followers
              n_following
              n_remakes
              updatedAt
            }
            nextToken
          }
        }
      `,
        variables: {
            username: username.toLowerCase(),
        },
    })
    if (users.data.chefsByUsername.items.length > 0) {
        return 'username is taken'
    } else {
        return null
    }
}

// █▀▄▀█ █ █▀ █▀▀
// █ ▀ █ █ ▄█ █▄▄

export const toArray = (text) => {
    text = text.replace('  ', ' ')
    const array = text.split(' ')
    let new_array = [] 
    array.map(item => {
        if (item != '') {
            new_array.push(item)
        }
    })
    return new_array
}

export const delete_empty_items = (list) => {
    let new_list = []
                
    list.forEach(item => {
        if (item) {
            new_list.push(item)
        }
    })
    return new_list
}


// █▀▀▄ █▀▀█ ▀█ █▀ 
// █  █ █▄▄█  █▄█  
// ▀  ▀ ▀  ▀   ▀  
export const go_to_recipe = async ({post, user, navigation,}) => {
    let recipe = post
    if (post.type == 'REMAKE') {
        recipe = format_post({item: post.original, user})
    } 
    navigation.navigate('recipe', {recipe})
}

export const go_to_post = async({post, user, navigation}) => {
    const formatted_post = await format_post({item: post, user})
    navigation.navigate('post', {post: formatted_post})
}




//                                                                                                                                                     
//  ██████          ██████ ██████  ██████ ██████████████ ██████████████ ██████████████ ██████████ ██████████████ ██████          ██████ ██████████████ 
//  ██░░██████████████░░██ ██░░██  ██░░██ ██░░░░░░░░░░██ ██░░░░░░░░░░██ ██░░░░░░░░░░██ ██░░░░░░██ ██░░░░░░░░░░██ ██░░██████████  ██░░██ ██░░░░░░░░░░██ 
//  ██░░░░░░░░░░░░░░░░░░██ ██░░██  ██░░██ ██████░░██████ ██░░██████░░██ ██████░░██████ ████░░████ ██░░██████░░██ ██░░░░░░░░░░██  ██░░██ ██░░██████████ 
//  ██░░██████░░██████░░██ ██░░██  ██░░██     ██░░██     ██░░██  ██░░██     ██░░██       ██░░██   ██░░██  ██░░██ ██░░██████░░██  ██░░██ ██░░██         
//  ██░░██  ██░░██  ██░░██ ██░░██  ██░░██     ██░░██     ██░░██████░░██     ██░░██       ██░░██   ██░░██  ██░░██ ██░░██  ██░░██  ██░░██ ██░░██████████ 
//  ██░░██  ██░░██  ██░░██ ██░░██  ██░░██     ██░░██     ██░░░░░░░░░░██     ██░░██       ██░░██   ██░░██  ██░░██ ██░░██  ██░░██  ██░░██ ██░░░░░░░░░░██ 
//  ██░░██  ██████  ██░░██ ██░░██  ██░░██     ██░░██     ██░░██████░░██     ██░░██       ██░░██   ██░░██  ██░░██ ██░░██  ██░░██  ██░░██ ██████████░░██ 
//  ██░░██          ██░░██ ██░░██  ██░░██     ██░░██     ██░░██  ██░░██     ██░░██       ██░░██   ██░░██  ██░░██ ██░░██  ██░░██████░░██         ██░░██ 
//  ██░░██          ██░░██ ██░░██████░░██     ██░░██     ██░░██  ██░░██     ██░░██     ████░░████ ██░░██████░░██ ██░░██  ██░░░░░░░░░░██ ██████████░░██ 
//  ██░░██          ██░░██ ██░░░░░░░░░░██     ██░░██     ██░░██  ██░░██     ██░░██     ██░░░░░░██ ██░░░░░░░░░░██ ██░░██  ██████████░░██ ██░░░░░░░░░░██ 
//  ██████          ██████ ██████████████     ██████     ██████  ██████     ██████     ██████████ ██████████████ ██████          ██████ ██████████████ 
//                                                                                                                                                     
//                                                     


// █▀▀ █  █ █▀▀ █▀▀ 
// █   █▀▀█ █▀▀ █▀▀ 
// ▀▀▀ ▀  ▀ ▀▀▀ ▀  
        export const create_user = async ({username, name, biography, uri,}) => {

            if (!uri) {
                alert('add photo')
                return 
            }
            if (!username) {
                alert('add username')
                return 
            }
            if (!biography) {
                alert('add biography')
                return
            }
            if (!name) {
                alert('add full name')
                return
            }

            const username_taken = await is_username_taken(username)
            if(username_taken){
                alert('username is taken')
                return
            }

            const auth_user = await Auth.currentAuthenticatedUser()
            const id = auth_user.attributes.sub
            const key = await storage.upload(uri)
            const user = await API.graphql({
                query: `
                    mutation CreateChef(
                        $input: CreateChefInput!
                        $condition: ModelChefConditionInput
                    ) {
                        createChef(input: $input, condition: $condition) {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                        }
                    }
                `,
                variables: {
                    input: {
                        id,
                        username: username.toLowerCase(),
                        name: name.toLowerCase(),
                        biography,
                        image: key,
                        n_followers: 0,
                        n_following: 0,
                        n_remakes: 0,
                    },
                },
            })
            const formatted_user = await storage.format_chef(user.data.createChef)
            return formatted_user
        }
        export const update_user = async ({user, uri, biography, name, username,}) => {
            key = uri.length < 500 ? await storage.upload(uri) : null
            let updated_input = {
                id: user.id,
                username,
                biography,
                name,
            }
            if (key) {
                updated_input.image = key
            } 
            const new_user = await API.graphql({
                query: `
                    mutation UpdateChef(
                    $input: UpdateChefInput!
                    $condition: ModelChefConditionInput
                    ) {
                        updateChef(input: $input, condition: $condition) {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: updated_input,
                },
            })
            const formatted_user = await storage.format_chef(new_user.data.updateChef)
            return formatted_user
        }


// █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀ 
// █  █ █  █ ▀▀█   █   
// █▀▀▀ ▀▀▀▀ ▀▀▀   ▀  

        
        export const create_original = async ({user, uri, title, caption, serves, cook_time, procedure, hashtags, ingredients, location}) => {

            if (uri.length < 1) {
                alert('add photo')
                return
            }
            if (!title) {
                alert('add title')
                return
            }
            if (!caption) {
                alert('add caption')
                return
            }
            if (!location) {
                alert('add location')
                return
            }
            if (!serves) {
                alert('add serves')
                return
            }
            if (!cook_time) {
                alert('add cook time')
                return
            }
            if(!procedure.toString().replace(',','')){
                alert('add instructions')
                return
            }            
            let ingredients_input = []
            let ingredients_failed = false
            ingredients.every(item => {
                if (item.type && item.quantity) {
                    ingredients_input.push(item)
                    return true
                } else if(!(item.type && item.quantity)){
                    return true
                } else {
                    ingredients_failed = true
                    return false
                }
            })
            if (ingredients_failed || ingredients_input.length < 1){
                alert('ingredients must contain a quantity and a type')
                return
            }
            let post = null
            try {
                const keys = await storage.upload_multiple(uri)
         
                const postIngredients = ingredients_input.map(ingredient => {
                    return {
                        type: ingredient.type.toLowerCase(),
                        quantity: ingredient.quantity.toLowerCase(),
                    }
                })

                let procedure_input = []
                procedure.forEach(item => {
                    if (item) {
                        procedure_input.push(item)
                    }
                })
            
                post = await API.graphql({
                    query: `
                    mutation CreatePost(
                      $input: CreatePostInput!
                      $condition: ModelPostConditionInput
                    ) {
                      createPost(input: $input, condition: $condition) {
                        id
                        createdAt
                        type
                        title
                        caption
                        image
                        serves
                        cook_time
                        rating
                        n_likes
                        n_comments
                        n_tips
                        location
                        procedure
                        hashtags
                        postIngredients {
                          quantity
                          type
                        }
                        tip
                        originalID
                        chefID
                        original {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        chef {
                          id
                          username
                          createdAt
                          lastUploadDate
                          name
                          image
                          biography
                          n_followers
                          n_following
                          n_remakes
                          updatedAt
                        }
                        updatedAt
                      }
                    }
                  `,
                    variables: {
                        input: {
                            type: 'ORIGINAL',
                            title: title.toLowerCase(),
                            UpperCaseTitle: title,
                            caption,
                            image: keys,
                            serves: parseInt(serves),
                            cook_time: parseInt(cook_time),
                            rating: 0,
                            n_likes: 0,
                            n_comments: 0,
                            n_tips: 0,
                            procedure: procedure_input,
                            location,
                            language: 'en',
                            hashtags,
                            postIngredients,
                            chefID: user.id,
                            originalID: 'zzzzzzzzzzzzzzz',
                        },
                    },
                })
            } catch {
                alert('post failed to upload')
                return
            }

            await mention(user.id, post.data.createPost.id, caption, true)
    
            await API.graphql({
                query: `
                    mutation UpdateChef(
                    $input: UpdateChefInput!
                    $condition: ModelChefConditionInput
                    ) {
                        updateChef(input: $input, condition: $condition) {
                            id
                        }
                    }
                `,
                variables: {
                    input:{
                        id: user.id,
                        lastUploadDate: post.data.createPost.createdAt,
                    }
                },
            })
        
            const formatted_post = await format_post({item: post.data.createPost, user})
        
            return formatted_post
        }
        
        export const create_remake = async ({user, uri, post, caption, tip, location, title, hashtags}) => {

            if (!post) {
                alert('select original recipe')
                return
            }
            if (uri.length < 1) {
                alert('add photo')
                return
            }
            if (!title) {
                alert('add title')
                return
            }
            if (!caption) {
                alert('add caption')
                return
            }
            if (!location) {
                alert('add location')
                return
            }
            if (!tip) {
                alert('add tip')
                return
            }
        
            const keys = await storage.upload_multiple(uri)

            await API.graphql({
                query: `
                    mutation UpdateChef(
                    $input: UpdateChefInput!
                    $condition: ModelChefConditionInput
                    ) {
                        updateChef(input: $input, condition: $condition) {
                            id
                        }
                    }
                `,
                variables: {
                    input:{
                        id: user.id,
                        n_remakes: user.n_remakes + 1,
                    }
                },
            })

            await API.graphql({
                query: `
                    mutation UpdatePost(
                        $input: UpdatePostInput!
                        $condition: ModelPostConditionInput
                    ) {
                        updatePost(input: $input, condition: $condition) {
                        id
                        }
                    }
                    `,
                variables: {
                    input:{
                        id: post.id,
                        n_tips: post.n_tips + 1,
                        rating: post.rating + 50,
                    }
                }
            })

            const remake = await API.graphql({
                query: `
                    mutation CreatePost(
                    $input: CreatePostInput!
                    $condition: ModelPostConditionInput
                    ) {
                    createPost(input: $input, condition: $condition) {
                        id
                        createdAt
                        title
                        caption
                        image
                        serves
                        cook_time
                        rating
                        n_likes
                        n_comments
                        n_tips
                        location
                        procedure
                        hashtags
                        postIngredients {
                        quantity
                        type
                        }
                        originalID
                        chefID
                        original {
                        id
                        createdAt
                        title
                        caption
                        image
                        serves
                        cook_time
                        rating
                        n_likes
                        n_comments
                        n_tips
                        location
                        procedure
                        hashtags
                        postIngredients {
                            quantity
                            type
                        }
                        originalID
                        chefID
                        original {
                            id
                            createdAt
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            originalID
                            chefID
                            updatedAt
                        }
                        chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                        }
                        updatedAt
                        }
                        chef {
                        id
                        username
                        createdAt
                        lastUploadDate
                        name
                        image
                        biography
                        n_followers
                        n_following
                        n_remakes
                        updatedAt
                        }
                        updatedAt
                    }
                    }
                `,
                variables: {
                    input: {
                        type: 'REMAKE',
                        title: title.toLowerCase(),
                        UpperCaseTitle: title,
                        caption,
                        image: keys,
                        rating: 0,
                        n_likes: 0,
                        n_comments: 0,
                        location,
                        language: 'en',
                        hashtags,
                        tip,
                        chefID: user.id,
                        originalID: post.id,
                    },
                },
            })

            await API.graphql({
                query: `
                    mutation CreateNotification(
                        $input: CreateNotificationInput!
                        $condition: ModelNotificationConditionInput
                    ) {
                        createNotification(input: $input, condition: $condition) {
                            id
                            createdAt
                            type
                            text
                            senderID
                            receiverID
                            postID
                            sender {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        type: 'REMADE',
                        senderID: user.id,
                        receiverID: post.chef.id,
                        postID: post.id,
                    },
                },
            })
        
            await mention(user.id, remake.id, caption, true)
        
            const formatted_post = await format_post({item: remake.data.createPost, user})
        
            return formatted_post
        }
            const mention = async (userID, postID, text, is_caption) => {

                let spaced_text = text.replace(',', ' ')
                spaced_text = spaced_text.replace('.', ' ')
                spaced_text = spaced_text.replace('!', ' ')
                spaced_text = spaced_text.replace('?', ' ')
                const words = spaced_text.split(' ')
                let mentions = []
                words.forEach((word) => {
                    if(word.startsWith('@')) {
                        mentions.push(word.replace('@', ''))
                    }
                })

                if (mentions.length > 0) {
                    const add_mention = async (username) => {
                        try {
                            const receivers = await API.graphql({
                                query: `
                                query ChefsByUsername(
                                  $username: String
                                  $sortDirection: ModelSortDirection
                                  $filter: ModelChefFilterInput
                                  $limit: Int
                                  $nextToken: String
                                ) {
                                  chefsByUsername(
                                    username: $username
                                    sortDirection: $sortDirection
                                    filter: $filter
                                    limit: $limit
                                    nextToken: $nextToken
                                  ) {
                                    items {
                                      id
                                    }
                                    nextToken
                                  }
                                }
                              `,
                                variables: {
                                    username,
                                },
                            })
                            const follow = await API.graphql({
                                query: `
                                    query GetFollow($followerID: ID!, $idolID: ID!) {
                                        getFollow(followerID: $followerID, idolID: $idolID) {
                                            type
                                        }
                                    }
                                `,
                                variables: {
                                    followerID: userID,
                                    idolID: receivers.data.chefsByUsername.items[0].id,
                                    filter: {
                                        type: {
                                            eq: 'FOLLOW',
                                        },
                                    },
                                },
                            })
                            if (follow.data.getFollow) {
                                const type = is_caption ? 'CAPTION' : 'COMMENT';
                                await API.graphql({
                                    query: `
                                        mutation CreateNotification(
                                            $input: CreateNotificationInput!
                                            $condition: ModelNotificationConditionInput
                                        ) {
                                            createNotification(input: $input, condition: $condition) {
                                                id
                                            }
                                        }
                                    `,
                                    variables: {
                                        input: {
                                            type,
                                            senderID: userID,
                                            receiverID: receivers.data.chefsByUsername.items[0].id,
                                            postID,
                                            text: text.toLowerCase(),
                                        },
                                    },
                                })
                            }
                        } catch {
                            return
                        }
                    }
                    mentions.forEach(username => add_mention(username))
                }
            }

// █▀▀ █▀▀█ █   █   █▀▀█ █   █ 
// █▀▀ █  █ █   █   █  █ █▄█▄█ 
// ▀   ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀▀  ▀ ▀ 
            export const create_request = async (follower, idol) => {
                await API.graphql({
                    query: `
                        mutation CreateFollow(
                            $input: CreateFollowInput!
                            $condition: ModelFollowConditionInput
                        ) {
                            createFollow(input: $input, condition: $condition) {
                                type
                                followerID
                                idolID
                                follower {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                idol {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                createdAt
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            type: 'REQUEST',
                            followerID: follower.id,
                            idolID: idol.id,
                        },
                    },
                })
                await API.graphql({
                    query: `
                        mutation CreateNotification(
                            $input: CreateNotificationInput!
                            $condition: ModelNotificationConditionInput
                        ) {
                            createNotification(input: $input, condition: $condition) {
                                id
                                createdAt
                                type
                                text
                                senderID
                                receiverID
                                postID
                                sender {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            type: 'REQUEST',
                            senderID: follower.id,
                            receiverID: idol.id,
                            postID: '',
                        },
                    },
                })
            }
        export const update_to_follow = async ({follower, idol, notification_id}) => {
            await API.graphql({
                query: `
                    mutation UpdateFollow(
                        $input: UpdateFollowInput!
                        $condition: ModelFollowConditionInput
                    ) {
                        updateFollow(input: $input, condition: $condition) {
                            type
                            followerID
                            idolID
                            follower {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            idol {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        followerID: follower.id,
                        idolID: idol.id,
                        type: 'FOLLOW'
                    },
                },
            })
            await API.graphql({
                query: `
                    mutation UpdateChef(
                        $input: UpdateChefInput!
                        $condition: ModelChefConditionInput
                        ) {
                        updateChef(input: $input, condition: $condition) {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        id: follower.id,
                        n_following: follower.n_following + 1,
                    },
                },
            })
            await API.graphql({
                query: `
                    mutation UpdateChef(
                        $input: UpdateChefInput!
                        $condition: ModelChefConditionInput
                        ) {
                        updateChef(input: $input, condition: $condition) {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        id: idol.id,
                        n_followers: idol.n_followers + 1,
                    },
                },
            })
            await API.graphql({
                query: `
                    mutation CreateNotification(
                        $input: CreateNotificationInput!
                        $condition: ModelNotificationConditionInput
                    ) {
                        createNotification(input: $input, condition: $condition) {
                            id
                            createdAt
                            type
                            text
                            senderID
                            receiverID
                            postID
                            sender {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        type: 'ACCEPT',
                        senderID: idol.id,
                        receiverID: follower.id,
                        postID: '',
                    },
                },
            })
            await API.graphql({
                query: `
                    mutation DeleteNotification(
                    $input: DeleteNotificationInput!
                    $condition: ModelNotificationConditionInput
                    ) {
                        deleteNotification(input: $input, condition: $condition) {
                            id
                            createdAt
                            type
                            text
                            senderID
                            receiverID
                            postID
                            sender {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                            }
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        id: notification_id,
                    },
                },
            })
        }
        export const delete_follow = async ({follower, idol, is_following}) => {
            await API.graphql({
                query: `
                    mutation DeleteFollow(
                        $input: DeleteFollowInput!
                        $condition: ModelFollowConditionInput
                        ) {
                        deleteFollow(input: $input, condition: $condition) {
                            type
                            followerID
                            idolID
                            follower {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            idol {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                            createdAt
                            updatedAt
                        }
                    }
                `,
                variables: {
                    input: {
                        followerID: follower.id,
                        idolID: idol.id,
                    },
                },
            })
            if(is_following) {
                await API.graphql({
                    query: `
                        mutation UpdateChef(
                            $input: UpdateChefInput!
                            $condition: ModelChefConditionInput
                            ) {
                            updateChef(input: $input, condition: $condition) {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            id: follower.id,
                            n_following: follower.n_following - 1,
                        },
                    },
                })
                await API.graphql({
                    query: `
                        mutation UpdateChef(
                            $input: UpdateChefInput!
                            $condition: ModelChefConditionInput
                            ) {
                            updateChef(input: $input, condition: $condition) {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        input: {
                            id: idol.id,
                            n_followers: idol.n_followers - 1,
                        },
                    },
                })
            }
            const notifications = await API.graphql({
                query: `
                query NotificationsByFollow(
                  $senderID: ID
                  $receiverIDType: ModelNotificationByFollowCompositeKeyConditionInput
                  $sortDirection: ModelSortDirection
                  $filter: ModelNotificationFilterInput
                  $limit: Int
                  $nextToken: String
                ) {
                  notificationsByFollow(
                    senderID: $senderID
                    receiverIDType: $receiverIDType
                    sortDirection: $sortDirection
                    filter: $filter
                    limit: $limit
                    nextToken: $nextToken
                  ) {
                    items {
                      id
                      createdAt
                      type
                      text
                      senderID
                      receiverID
                      postID
                      sender {
                        id
                        username
                        createdAt
                        lastUploadDate
                        name
                        image
                        biography
                        n_followers
                        n_following
                        n_remakes
                        updatedAt
                      }
                      post {
                        id
                        createdAt
                        type
                        title
                        UpperCaseTitle
                        caption
                        image
                        serves
                        cook_time
                        rating
                        n_likes
                        n_comments
                        n_tips
                        location
                        language
                        procedure
                        hashtags
                        tip
                        originalID
                        chefID
                        updatedAt
                      }
                      updatedAt
                    }
                    nextToken
                  }
                }
              `,
                variables: {
                    senderID: follower.id,
                    receiverID: idol.id,
                    type: 'REQUEST'
                },
            })
            await API.graphql({
                query: `
                mutation DeleteNotification(
                  $input: DeleteNotificationInput!
                  $condition: ModelNotificationConditionInput
                ) {
                  deleteNotification(input: $input, condition: $condition) {
                    id
                  }
                }
              `,
                variables: {
                    input: {
                        id: notifications.data.notificationsByFollow.items[0].id
                    },
                },
            })
            //delete accept ntification? nah!
        }


////delet notification 

export const delete_notification = async (id) => {
    await API.graphql({
        query: `
            mutation DeleteNotification(
            $input: DeleteNotificationInput!
            $condition: ModelNotificationConditionInput
            ) {
                deleteNotification(input: $input, condition: $condition) {
                    id
                }
            }
        `,
        variables: {
            input: {
                id,
            },
        },
    })
}


// █▀▀█ █▀▀ █▀▄▀█ █▀▀█ █▀▀█ █ █ 
// █▄▄▀ █▀▀ █ ▀ █ █▄▄█ █▄▄▀ █▀▄ 
// ▀ ▀▀ ▀▀▀ ▀   ▀ ▀  ▀ ▀ ▀▀ ▀ ▀

export const like = async (chef, post) => {
    API.graphql({
        query: `
            mutation UpdatePost(
                $input: UpdatePostInput!
                $condition: ModelPostConditionInput
            ) {
                updatePost(input: $input, condition: $condition) {
                id
                }
            }
            `,
        variables: {
            input:{
                id: post.id,
                n_likes: post.n_likes + 1,
                rating: post.rating + 1,
            }
        },
    })
    API.graphql({
        query: `
        mutation CreateLike(
          $input: CreateLikeInput!
          $condition: ModelLikeConditionInput
        ) {
          createLike(input: $input, condition: $condition) {
            createdAt
          }
        }
      `,
        variables: {
            input:{
                chefID: chef.id,
                postID: post.id,
            }
        },
    })
    API.graphql({
        query: `
            mutation CreateNotification(
                $input: CreateNotificationInput!
                $condition: ModelNotificationConditionInput
            ) {
                createNotification(input: $input, condition: $condition) {
                    id
                }
            }
        `,
        variables: {
            input: {
                type: 'LIKED',
                senderID: chef.id,
                receiverID: post.chef.id,
                postID: post.id,
            },
        },
    })
}

export const unlike = async (chef, post) => {
    API.graphql({
        query: `
            mutation UpdatePost(
                $input: UpdatePostInput!
                $condition: ModelPostConditionInput
            ) {
                updatePost(input: $input, condition: $condition) {
                id
                }
            }
            `,
        variables: {
            input:{
                id: post.id,
                n_likes: post.n_likes - 1,
                rating: post.rating - 1,
            }
        },
    })
    API.graphql({
        query: `
        mutation DeleteLike(
          $input: DeleteLikeInput!
          $condition: ModelLikeConditionInput
        ) {
          deleteLike(input: $input, condition: $condition) {
            createdAt
          }
        }
      `,
        variables: {
            input:{
                chefID: chef.id,
                postID: post.id,
            }
        },
    })

    const db_data = await API.graphql({
        query: `
        query NotificationsBySender(
          $senderID: ID
          $postIDType: ModelNotificationBySenderCompositeKeyConditionInput
          $sortDirection: ModelSortDirection
          $filter: ModelNotificationFilterInput
          $limit: Int
          $nextToken: String
        ) {
          notificationsBySender(
            senderID: $senderID
            postIDType: $postIDType
            sortDirection: $sortDirection
            filter: $filter
            limit: $limit
            nextToken: $nextToken
          ) {
            items {
              id
            }
          }
        }
      `,
        variables: {
            senderID: chef.id,
            postID: post.id,
            type: 'LIKED'
        },
    })

    API.graphql({
        query: `
        mutation DeleteNotification(
          $input: DeleteNotificationInput!
          $condition: ModelNotificationConditionInput
        ) {
          deleteNotification(input: $input, condition: $condition) {
            id
          }
        }
      `,
        variables: {
            input: {
                id: db_data.data.notificationsBySender.items[0].id
            },
        },
    })
}

        export const save = async (chef, post) => {
            API.graphql({
                query: `
                    mutation UpdatePost(
                        $input: UpdatePostInput!
                        $condition: ModelPostConditionInput
                    ) {
                        updatePost(input: $input, condition: $condition) {
                        id
                        }
                    }
                    `,
                variables: {
                    input:{
                        id: post.id,
                        rating: post.rating + 20,
                    }
                },
            })
            API.graphql({
                query: `
                mutation CreateSave(
                  $input: CreateSaveInput!
                  $condition: ModelSaveConditionInput
                ) {
                  createSave(input: $input, condition: $condition) {
                    createdAt
                  }
                }
              `,
                variables: {
                    input:{
                        chefID: chef.id,
                        postID: post.id,
                    }
                },
            })
        }
        
        export const unsave = async (chef, post) => {
            API.graphql({
                query: `
                    mutation UpdatePost(
                        $input: UpdatePostInput!
                        $condition: ModelPostConditionInput
                    ) {
                        updatePost(input: $input, condition: $condition) {
                        id
                        }
                    }
                    `,
                variables: {
                    input:{
                        id: post.id,
                        rating: post.rating - 20,
                    }
                },
            })
            API.graphql({
                query:  `
                mutation DeleteSave(
                  $input: DeleteSaveInput!
                  $condition: ModelSaveConditionInput
                ) {
                  deleteSave(input: $input, condition: $condition) {
                    createdAt
                  }
                }
              `,
                variables: {
                    input:{
                        chefID: chef.id,
                        postID: post.id,
                    }
                },
            })
        }

        export const comment = async ({chef, post, text}) => {

            API.graphql({
                query: `
                    mutation UpdatePost(
                        $input: UpdatePostInput!
                        $condition: ModelPostConditionInput
                    ) {
                        updatePost(input: $input, condition: $condition) {
                        id
                        }
                    }
                    `,
                variables: {
                    input:{
                        id: post.id,
                        n_comments: post.n_comments + 1,
                        rating: post.rating + 5,
                    }
                },
            })
            API.graphql({
                query:  `
                mutation CreateComment(
                  $input: CreateCommentInput!
                  $condition: ModelCommentConditionInput
                ) {
                  createComment(input: $input, condition: $condition) {
                    id
                    createdAt
                    text
                    chefID
                    postID
                    chef {
                      id
                      username
                      createdAt
                      lastUploadDate
                      name
                      image
                      biography
                      n_followers
                      n_following
                      n_remakes
                      updatedAt
                    }
                    updatedAt
                  }
                }
              `,
                variables: {
                    input:{
                        chefID: chef.id,
                        postID: post.id,
                        text: text.toLowerCase(),
                    }
                },
            })
            API.graphql({
                query: `
                    mutation CreateNotification(
                        $input: CreateNotificationInput!
                        $condition: ModelNotificationConditionInput
                    ) {
                        createNotification(input: $input, condition: $condition) {
                            id
                        }
                    }
                `,
                variables: {
                    input: {
                        type: 'COMMENTED',
                        senderID: chef.id,
                        receiverID: post.chef.id,
                        postID: post.id,
                        text: text.toLowerCase(),
                    },
                },
            })
            await mention(chef.id, post.id, text, false)
        }
                                                               
//  ████████████████   ██████████████ ██████████████ ████████████   
//  ██░░░░░░░░░░░░██   ██░░░░░░░░░░██ ██░░░░░░░░░░██ ██░░░░░░░░████ 
//  ██░░████████░░██   ██░░██████████ ██░░██████░░██ ██░░████░░░░██ 
//  ██░░██    ██░░██   ██░░██         ██░░██  ██░░██ ██░░██  ██░░██ 
//  ██░░████████░░██   ██░░██████████ ██░░██████░░██ ██░░██  ██░░██ 
//  ██░░░░░░░░░░░░██   ██░░░░░░░░░░██ ██░░░░░░░░░░██ ██░░██  ██░░██ 
//  ██░░██████░░████   ██░░██████████ ██░░██████░░██ ██░░██  ██░░██ 
//  ██░░██  ██░░██     ██░░██         ██░░██  ██░░██ ██░░██  ██░░██ 
//  ██░░██  ██░░██████ ██░░██████████ ██░░██  ██░░██ ██░░████░░░░██ 
//  ██░░██  ██░░░░░░██ ██░░░░░░░░░░██ ██░░██  ██░░██ ██░░░░░░░░████ 
//  ██████  ██████████ ██████████████ ██████  ██████ ████████████   


// █▀▀█ █▀▀█ █▀▀ ▀▀█▀▀ 
// █  █ █  █ ▀▀█   █   
// █▀▀▀ ▀▀▀▀ ▀▀▀   ▀  
            export const fetch_all_chef_posts = async ({chef, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query PostsByChef(
                      $chefID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelPostFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      postsByChef(
                        chefID: $chefID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        chefID: chef.id,
                        nextToken: next_token,
                        limit,
                        sortDirection: 'DESC',
                    },
                })
                const posts = db_data.data.postsByChef.items
                return [posts, db_data.data.postsByChef.nextToken]
            }
            
            export const fetch_original_chef_posts = async ({chef, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query PostsByChef(
                      $chefID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelPostFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      postsByChef(
                        chefID: $chefID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        chefID: chef.id,
                        filter: {
                            type: {
                                eq: 'ORIGINAL',
                            },
                        },
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                    },
                })
                const posts = db_data.data.postsByChef.items
                return [posts, db_data.data.postsByChef.nextToken]
            }
            
            export const fetch_saved_chef_posts = async ({chef, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query SavesByChef(
                      $chefID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelSaveFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      savesByChef(
                        chefID: $chefID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          createdAt
                          chefID
                          postID
                          post {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            chef {
                                id
                                username
                                createdAt
                                lastUploadDate
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                              }
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        chefID: chef.id,
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                        sortDirection: 'DESC',
                    },
                })
                const posts = db_data.data.savesByChef.items.map((save) => {
                    return save.post
                })
                return [posts, db_data.data.savesByChef.nextToken]
            }
            
            export const fetch_top_posts = async ({next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query PostsByTitle(
                      $title: String
                      $rating: ModelIntKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelPostFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      postsByTitle(
                        title: $title
                        rating: $rating
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        nextToken: next_token,
                        limit,
                        sortDirection: 'DESC',
                    },
                })
                const posts = db_data.data.postsByTitle.items
                return [posts, db_data.data.postsByTitle.nextToken]
            }
            
            export const fetch_remakes_by_original = async ({post, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query PostsByOriginal(
                      $originalID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelPostFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      postsByOriginal(
                        originalID: $originalID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        originalID: post.id,
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                    },
                })
                const posts = db_data.data.postsByOriginal.items
                return [posts, db_data.data.postsByOriginal.nextToken]
            }

            export const fetch_posts_by_title = async ({search, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                    query PostsByTitle(
                      $title: String
                      $sortDirection: ModelSortDirection
                      $filter: ModelPostFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      postsByTitle(
                        title: $title
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        title: search,
                        filter: {
                            type: {
                                eq: 'ORIGINAL',
                            },
                        },
                        nextToken: next_token,
                        limit,
                    },
                })
                return [db_data.data.postsByTitle.items, db_data.data.postsByTitle.nextToken]
            }


            export const format_post = async ({item, user}) => {  
                let unformatted_post = null
                if (!user.is_logged_in) {
                    unformatted_post =  item
                } else {
                    let is_liked = false;
                    let is_saved = false;
                    const like = await API.graphql({
                        query: `
                        query GetLike($chefID: ID!, $postID: ID!) {
                          getLike(chefID: $chefID, postID: $postID) {
                            createdAt
                          }
                        }
                      `,
                        variables: {
                            chefID: user.id,
                            postID: item.id,
                        },
                    })
                    const save = await API.graphql({
                        query: `
                        query GetSave($postID: ID!, $chefID: ID!) {
                          getSave(postID: $postID, chefID: $chefID) {
                            createdAt
                          }
                        }
                      `,
                        variables: {
                            chefID: user.id,
                            postID: item.id,
                        },
                    })
                    if(like.data.getLike){
                        is_liked = true
                    }
                    if(save.data.getSave){
                        is_saved = true
                    }
                    unformatted_post = {
                        ...item,
                        is_liked,
                        is_saved,
                    }
                }
                const  post = await storage.format_post(unformatted_post)
                return post
            }

// █▀▀ █▀▀█ █   █   █▀▀█ █   █ 
// █▀▀ █  █ █   █   █  █ █▄█▄█ 
// ▀   ▀▀▀▀ ▀▀▀ ▀▀▀ ▀▀▀▀  ▀ ▀ 
            export const fetch_followers = async ({chef, next_token, limit}) => {
                const db_data = await API.graphql({
                    query: `
                        query FollowsByIdol(
                            $idolID: ID
                            $followerID: ModelIDKeyConditionInput
                            $sortDirection: ModelSortDirection
                            $filter: ModelFollowFilterInput
                            $limit: Int
                            $nextToken: String
                        ) {
                            followsByIdol(
                                idolID: $idolID
                                followerID: $followerID
                                sortDirection: $sortDirection
                                filter: $filter
                                limit: $limit
                                nextToken: $nextToken
                            ) {
                                items {
                                type
                                follower {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                }
                                nextToken
                            }
                        }
                    `,
                    variables: {
                        idolID: chef.id,
                        sortDirection: 'DESC',
                        filter: {
                            type: {
                                eq: 'FOLLOW'
                            }
                        },
                        nextToken: next_token,
                        limit,
                    },
                })
                const chefs = db_data.data.followsByIdol.items.map(chef => chef.follower)
                return [chefs, db_data.data.followsByIdol.nextToken]
            }
            export const fetch_idols = async ({chef, next_token, limit}) => {
                const db_data = await API.graphql({
                    query:`
                        query ListFollows(
                            $followerID: ID
                            $idolID: ModelIDKeyConditionInput
                            $filter: ModelFollowFilterInput
                            $limit: Int
                            $nextToken: String
                            $sortDirection: ModelSortDirection
                        ) {
                            listFollows(
                                followerID: $followerID
                                idolID: $idolID
                                filter: $filter
                                limit: $limit
                                nextToken: $nextToken
                                sortDirection: $sortDirection
                            ) {
                                items {
                                    type
                                    idol {
                                        id
                                        username
                                        createdAt
                                        name
                                        image
                                        biography
                                        n_followers
                                        n_following
                                        n_remakes
                                        updatedAt
                                    }
                                }
                                nextToken
                            }
                        }
                    `,
                    variables: {
                        followerID: chef.id,
                        sortDirection: 'DESC',
                        filter: {
                            type: {
                                eq: 'FOLLOW'
                            }
                        },
                        nextToken: next_token,
                        limit,
                    },
                })
                const chefs = db_data.data.listFollows.items.map(chef => chef.idol)
                return [chefs, db_data.data.listFollows.nextToken]
            }


 
           

// █▀▀█ █▀▀ █▀▄▀█ █▀▀█ █▀▀█ █ █ 
// █▄▄▀ █▀▀ █ ▀ █ █▄▄█ █▄▄▀ █▀▄ 
// ▀ ▀▀ ▀▀▀ ▀   ▀ ▀  ▀ ▀ ▀▀ ▀ ▀
            export const fetch_likes = async ({post, next_token, limit}) => {
                const db_data = await API.graphql({
                    query:`
                    query LikesByPost(
                      $postID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelLikeFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      likesByPost(
                        postID: $postID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                            id
                          createdAt
                          chefID
                          postID
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        postID: post.id,
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                    },
                })
                return [db_data.data.likesByPost.items, db_data.data.likesByPost.nextToken]
            }
            
            export const fetch_comments = async ({post, next_token, limit}) => {
                const db_data = await API.graphql({
                    query:`
                    query CommentsByPost(
                      $postID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelCommentFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      commentsByPost(
                        postID: $postID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          text
                          chefID
                          postID
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        postID: post.id,
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                    },
                })
                return [db_data.data.commentsByPost.items, db_data.data.commentsByPost.nextToken]
            }



// █▄ █ █▀█ ▀█▀ █ █▀▀ █ █▀▀ ▄▀█ ▀█▀ █ █▀█ █▄ █
// █ ▀█ █▄█  █  █ █▀  █ █▄▄ █▀█  █  █ █▄█ █ ▀█
            export const fetch_notifications = async ({next_token, limit, user,}) => {
                const db_data = await API.graphql({
                    query: `
                    query NotificationsByReceiver(
                      $receiverID: ID
                      $createdAt: ModelStringKeyConditionInput
                      $sortDirection: ModelSortDirection
                      $filter: ModelNotificationFilterInput
                      $limit: Int
                      $nextToken: String
                    ) {
                      notificationsByReceiver(
                        receiverID: $receiverID
                        createdAt: $createdAt
                        sortDirection: $sortDirection
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                      ) {
                        items {
                          id
                          createdAt
                          type
                          text
                          senderID
                          receiverID
                          postID
                          sender {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          post {
                            id
                          createdAt
                          type
                          title
                          caption
                          image
                          serves
                          cook_time
                          rating
                          n_likes
                          n_comments
                          n_tips
                          location
                          procedure
                          hashtags
                          postIngredients {
                            quantity
                            type
                          }
                          tip
                          originalID
                          chefID
                          original {
                            id
                            createdAt
                            type
                            title
                            caption
                            image
                            serves
                            cook_time
                            rating
                            n_likes
                            n_comments
                            n_tips
                            location
                            procedure
                            hashtags
                            tip
                            originalID
                            chefID
                            updatedAt
                          }
                          chef {
                            id
                            username
                            createdAt
                            lastUploadDate
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                          }
                          updatedAt
                          }
                          updatedAt
                        }
                        nextToken
                      }
                    }
                  `,
                    variables: {
                        receiverID: user.id,
                        sortDirection: 'DESC',
                        nextToken: next_token,
                        limit,
                    },
                })
                return [db_data.data.notificationsByReceiver.items, db_data.data.notificationsByReceiver.nextToken]
            }

            
// █▀▀ █  █ █▀▀ █▀▀ 
// █   █▀▀█ █▀▀ █▀▀ 
// ▀▀▀ ▀  ▀ ▀▀▀ ▀  

export const fetch_chefs_by_search = async ({search, next_token, limit}) => {
    if (search.includes(' ')) {
        alert('by name')
        const db_data = await API.graphql({
            query: `
            query ChefsByName(
              $name: String
              $sortDirection: ModelSortDirection
              $filter: ModelChefFilterInput
              $limit: Int
              $nextToken: String
            ) {
              chefsByName(
                name: $name
                sortDirection: $sortDirection
                filter: $filter
                limit: $limit
                nextToken: $nextToken
              ) {
                items {
                  id
                  username
                  createdAt
                  lastUploadDate
                  name
                  image
                  biography
                  n_followers
                  n_following
                  n_remakes
                  updatedAt
                }
                nextToken
              }
            }
          `,
            variables: {
                name: search,
                nextToken: next_token,
                limit,
            },
        })
        return [db_data.data.chefsByName.items, db_data.data.chefsByName.nextToken]
    } else {
        const db_data = await API.graphql({
            query: `
            query ChefsByUsername(
              $username: String
              $sortDirection: ModelSortDirection
              $filter: ModelChefFilterInput
              $limit: Int
              $nextToken: String
            ) {
              chefsByUsername(
                username: $username
                sortDirection: $sortDirection
                filter: $filter
                limit: $limit
                nextToken: $nextToken
              ) {
                items {
                  id
                  username
                  createdAt
                  lastUploadDate
                  name
                  image
                  biography
                  n_followers
                  n_following
                  n_remakes
                  updatedAt
                }
                nextToken
              }
            }
          `,
            variables: {
                username: search,
                nextToken: next_token,
                limit,
            },
        })
        return [db_data.data.chefsByUsername.items, db_data.data.chefsByUsername.nextToken]
    }
}


            export const fetch_user_by_id = async (id) => {
                const user = await API.graphql({
                    query: `
                        query GetChef($id: ID!) {
                            getChef(id: $id) {
                                id
                                username
                                createdAt
                                name
                                image
                                biography
                                n_followers
                                n_following
                                n_remakes
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        id,
                    },
                })
                const formatted_user = await storage.format_chef(user.data.getChef)
                return formatted_user
            }

            export const format_chef = async ({user, chef}) => {
                const item = await storage.format_chef(chef)
                if (!user.is_logged_in) {
                    return item
                }
                const follow = await API.graphql({
                    query: `
                        query GetFollow($followerID: ID!, $idolID: ID!) {
                            getFollow(followerID: $followerID, idolID: $idolID) {
                                type
                                followerID
                                idolID
                                follower {
                                id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                idol {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                createdAt
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        followerID: user.id,
                        idolID: item.id,
                    },
                })
                let is_following;
                let is_request;
                if (follow.data.getFollow){
                    is_request = follow.data.getFollow.type == "REQUEST" ? true : false;
                    is_following = true
                } else {
                    is_following = false
                    is_request = false
                }
                const formatted_chef = {
                    ...item,
                    is_following,
                    is_request,
                }
                return formatted_chef 
            }



            export const thumbnail_to_chef = async ({user, chef}) => {
                if ((typeof chef.is_following != 'undefined' && typeof chef.is_request != 'undefined') || !user.is_logged_in) {
                    return chef
                }
                if (!user.is_logged_in) {
                    return chef
                }
                const follow = await API.graphql({
                    query: `
                        query GetFollow($followerID: ID!, $idolID: ID!) {
                            getFollow(followerID: $followerID, idolID: $idolID) {
                                type
                                followerID
                                idolID
                                follower {
                                id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                idol {
                                    id
                                    username
                                    createdAt
                                    name
                                    image
                                    biography
                                    n_followers
                                    n_following
                                    n_remakes
                                    updatedAt
                                }
                                createdAt
                                updatedAt
                            }
                        }
                    `,
                    variables: {
                        followerID: user.id,
                        idolID: chef.id,
                    },
                })
                let is_following;
                let is_request;
                if (follow.data.getFollow){
                    is_request = follow.data.getFollow.type == "REQUEST" ? true : false;
                    is_following = true
                } else {
                    is_following = false
                    is_request = false
                }
                const formatted_chef = {
                    ...chef,
                    is_following,
                    is_request,
                }
                return formatted_chef 
            }

            

// █  █ █▀▀█ █▀▀ █  █ ▀▀█▀▀ █▀▀█ █▀▀▀ 
// █▀▀█ █▄▄█ ▀▀█ █▀▀█   █   █▄▄█ █ ▀█ 
// ▀  ▀ ▀  ▀ ▀▀▀ ▀  ▀   ▀   ▀  ▀ ▀▀▀▀
            // sugest hashtags by name
            // sugest ingredients by name

            

        

        


// █▀▀ █▀▀ █▀▀█ █▀▀█ █▀▀ █  █ 
// ▀▀█ █▀▀ █▄▄█ █▄▄▀ █   █▀▀█ 
// ▀▀▀ ▀▀▀ ▀  ▀ ▀ ▀▀ ▀▀▀ ▀  ▀

    export const fetch_chefs = async ({user}) => {
        const db_data = await API.graphql({
            query: `
                query ListChefs(
                    $filter: ModelChefFilterInput
                    $limit: Int
                    $nextToken: String
                ) {
                    listChefs(filter: $filter, limit: $limit, nextToken: $nextToken) {
                        items {
                            id
                            username
                            createdAt
                            name
                            image
                            biography
                            n_followers
                            n_following
                            n_remakes
                            updatedAt
                        }
                        nextToken
                    }
                }
            `,
        })
        // const unformatted_chefs = await storage.format_chefs(db_data.data.listChefs.items)
        // const chefs = await format_chefs(unformatted_chefs, user)
        const chefs = db_data.data.listChefs.items
        return chefs
    }



// █▀▀ █▀▀ █▀▀ █▀▀▄ 
// █▀▀ █▀▀ █▀▀ █  █ 
// ▀   ▀▀▀ ▀▀▀ ▀▀▀ 
    export const fetch_feed_posts_by_chef = async ({limit, chef, aws_date}) => { 
        const db_data = await API.graphql({
            query: `
            query PostsByChef(
              $chefID: ID
              $createdAt: ModelStringKeyConditionInput
              $sortDirection: ModelSortDirection
              $filter: ModelPostFilterInput
              $limit: Int
              $nextToken: String
            ) {
              postsByChef(
                chefID: $chefID
                createdAt: $createdAt
                sortDirection: $sortDirection
                filter: $filter
                limit: $limit
                nextToken: $nextToken
              ) {
                items {
                  id
                  createdAt
                  type
                  title
                  caption
                  image
                  serves
                  cook_time
                  rating
                  n_likes
                  n_comments
                  n_tips
                  location
                  procedure
                  hashtags
                  postIngredients {
                    quantity
                    type
                  }
                  tip
                  originalID
                  chefID
                  original {
                    id
                    createdAt
                    type
                    title
                    caption
                    image
                    serves
                    cook_time
                    rating
                    n_likes
                    n_comments
                    n_tips
                    location
                    procedure
                    hashtags
                    tip
                    originalID
                    chefID
                    updatedAt
                  }
                  chef {
                    id
                    username
                    createdAt
                    lastUploadDate
                    name
                    image
                    biography
                    n_followers
                    n_following
                    n_remakes
                    updatedAt
                  }
                  updatedAt
                }
                nextToken
              }
            }
          `,
            variables: {
                chefID: chef.id,
                limit,
                sortDirection: 'DESC',
                createdAt: {
                    gt: aws_date,
                },
            },
        })
        const posts = db_data.data.postsByChef.items
        return posts
    }

    export const fetch_feed_idols = async (user) => {
        const db_data = await API.graphql({
            query:`
                query ListFollows(
                    $followerID: ID
                    $idolID: ModelIDKeyConditionInput
                    $filter: ModelFollowFilterInput
                    $limit: Int
                    $nextToken: String
                    $sortDirection: ModelSortDirection
                ) {
                    listFollows(
                        followerID: $followerID
                        idolID: $idolID
                        filter: $filter
                        limit: $limit
                        nextToken: $nextToken
                        sortDirection: $sortDirection
                    ) {
                        items {
                            type
                            idol {
                                id
                                lastUploadDate
                            }
                        }
                    }
                }
            `,
            variables: {
                followerID: user.id,
                filter: {
                    type: {
                        eq: 'FOLLOW'
                    }
                },
            },
        })
        const chefs = db_data.data.listFollows.items.map(item => item.idol)
        return chefs
    }




// █▀▄▀█ █▀▀ █▄░█ ▀█▀ █ █▀█ █▄░█
// █░▀░█ ██▄ █░▀█ ░█░ █ █▄█ █░▀█
    export const fetch_idol_usernames = async (user) => {
        const db_data = await API.graphql({
            query:`
            query ListFollows(
              $followerID: ID
              $idolID: ModelIDKeyConditionInput
              $filter: ModelFollowFilterInput
              $limit: Int
              $nextToken: String
              $sortDirection: ModelSortDirection
            ) {
              listFollows(
                followerID: $followerID
                idolID: $idolID
                filter: $filter
                limit: $limit
                nextToken: $nextToken
                sortDirection: $sortDirection
              ) {
                items {
                  idol {
                    username
                  }
                }
              }
            }
          `,
            variables: {
                followerID: user.id,
                filter: {
                    type: {
                        eq: 'FOLLOW'
                    }
                },
            },
        })
        return db_data.data.listFollows.items.map(item => item.idol)
    }