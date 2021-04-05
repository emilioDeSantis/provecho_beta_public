//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import PostComp from '../components/Post'

import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import 'react-native-get-random-values';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import * as feed from '../functions/feed'
import LikeModal from '../components/LikeModal'
import ChefThumbnail from '../components/ChefThumbnail'
import * as constants from '../constants';

import Header from '../components/Header';

import Stream from '../components/Stream'



const FeedScreenComp = (props) => {
    const navigation = useNavigation()

    const format_post = async (item) => {
        const new_post = await global.format_post({user: props.user, item,})
        return new_post
    }

    const fetch_posts = async ({next_token, limit}) => {
        let [posts, new_next_token] = await feed.fetch({user: props.user, next_token, limit})
        if(posts.length < limit){
            const [top_posts, top_next_token] = await global.fetch_top_posts({next_token, limit})
            posts = [...posts, ...top_posts]
            new_next_token = top_next_token
        }
        return [posts, new_next_token]
    }

    return (
        <View style={style.post_stream}>
            <Stream user={props.user} n_columns={1} fetch={fetch_posts} format={format_post} cache_id={'feed_posts' + props.user.id}>
                {item => (
                    <PostComp post={item} user={props.user} navigation={props.navigation} n_columns={1}/>
                )}
            </Stream>
        </View>
    )
}

const Stack = createStackNavigator();

const FeedScreen = (props) => {
    const user = props.user
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <Stack.Screen name="stream">
                {(props) => <FeedScreenComp {...props} user={user} />}
            </Stack.Screen>
            <Stack.Screen name="like modal">
                {(props) => <LikeModal {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}
const style = StyleSheet.create({
    post_stream: {
        backgroundColor: constants.white,
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        // marginTop: 90,
        // backgroundColor: '#eee',
    },
});

export default FeedScreen;