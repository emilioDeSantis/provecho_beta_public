//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button } from 'react-native';
import PostPreview from '../components/PostPreview'

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import 'react-native-get-random-values';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import LikeModal from '../components/LikeModal'
import ChefThumbnail from '../components//ChefThumbnail'
import RemakeButton from '../components/RemakeButton'

import Header from '../components/Header';



import Stream from '../components/Stream'


import * as constants from '../constants';

const RemakesScreen = (props) => {
    const route = useRoute()

    const fetchRemakes = async ({next_token, limit}) => {
        const [posts, new_next_token] = await global.fetch_remakes_by_original({post: route.params.post, next_token, limit})
        return [posts, new_next_token]
    }

    return (
        <>
            <Header header={route.params.post.title} is_right={true}/>
            <View style={style.remakes_top}>
                <ChefThumbnail chef={route.params.post.chef} user={props.user} is_large={false}/>
                <Text>{route.params.post.chef.username}</Text>
                <Text>{route.params.post.n_tips} remakes</Text>
                <RemakeButton recipe={route.params.post} user={props.user}/>
                <View style={style.feed_container2}>
                    <Stream user={props.user} n_columns={2} fetch={fetchRemakes} format={storage.format_preview} cache_id={'post_remakes' + route.params.post.id}>
                        {item => (
                            <PostPreview post={item} user={props.user} n_columns={2} is_remake={true}/>
                        )}
                    </Stream>
                </View>
            </View>
        </>
    )
}

const style = StyleSheet.create({
    remakes_top: {
        height: 100,
        width: constants.width,
        backgroundColor: '#fde'
    },
    feed_container2: { 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 200, 
        height: 300,
        backgroundColor: '#f23'
    },
});

export default RemakesScreen;