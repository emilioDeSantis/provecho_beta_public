//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';
import BackButton from '../components/BackButton'

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import Post from '../components/Post'


import ChefThumbnail from '../components/ChefThumbnail';
import RemakeButton from '../components/RemakeButton'
import Header from '../components/Header';
import LikeModal from '../components/LikeModal'
import * as constants from '../constants';

//this represewnts both original and remake posts viewqed on thier own




const PostScreenComp = (props) => {

    return (
        <>
            <Header header={props.post.title}/>
            <Post post={props.post} user={props.user} navigation={props.navigation} show_tip={true}/>
        </>
    );
}

const Stack = createStackNavigator();

const PostScreen = (props) => {

    const route = useRoute()

    const user = props.user
    return (
        <Stack.Navigator mode="modal" headerMode={'none'} transparentCard={true}>
            <Stack.Screen name="remake screen">
                {(props) => <PostScreenComp {...props} user={user} post={route.params.post}/>}
            </Stack.Screen>
            <Stack.Screen name="like modal">
                {(props) => <LikeModal {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    
});

export default PostScreen; 