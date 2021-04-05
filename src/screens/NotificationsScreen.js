//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChefComp from '../components/Chef'

import PostComp from '../components/Post'


import AuthenticationScreen from './AuthenticationScreen'

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import Stream from '../components/Stream'
import ChefThumbnail from '../components/ChefThumbnail';
import FollowButton from '../components/FollowButton';
import Notification from '../components/Notification';


import Header from '../components/Header';
import * as constants from '../constants';



const NotificationsScreen = (props) => {

    const fetchNotifications = async ({next_token, limit}) => {
        const [notifications, new_next_token] = await global.fetch_notifications({user: props.user, next_token, limit})
        return [notifications, new_next_token]
    }

    if (props.user.is_logged_in) {

        return (
            <View style={style.container}>
                <Text style={style.header}>notifications</Text>
                <View style={style.feed_container}>
                    <Stream fetch={fetchNotifications} format={storage.format_notification} cache_id={'user_notifications' + props.user.id} user={props.user} n_columns={1}>
                        {item => (
                            <Notification notification={item} user={props.user}/>
                        )}
                    </Stream>
                </View>
                <BackButton/>
            </View>
        );
    } else {
        return (
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        )
    }
}

const style = StyleSheet.create({
    container: {
        backgroundColor: constants.dark_modal_color,
        height: '100%',
        width: '100%',
    },
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: constants.sub_section_margin, 
    },    
    header: {
        textAlign: 'center',
        textAlignVertical: 'center',
        marginTop: constants.header_margin_top - constants.font_size_2 * constants.text_center,
        fontSize: constants.font_size_2,
        color: constants.white,
    },
});

export default NotificationsScreen;