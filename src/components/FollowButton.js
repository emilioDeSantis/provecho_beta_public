//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import AsyncButton from './AsyncButton'
import ProfileIcon from "../assets/icons/profile_icon";

import * as constants from '../constants';





const FollowButton = (props) => {

    const [is_following, set_is_following] = useState(props.chef.is_following)
    const [is_request, set_is_request] = useState(props.chef.is_request)
    const [updating, set_updating] = useState(false)

    //out of comission because notifications do not format the chef

    // if (props.is_notification) {
    //     return (
            // <View style={props.style}>
            //     {!is_following && <View style={style.notification_button}>
            //     {updating && <Text style={style.updating_text}>...</Text>}
            //     {!updating && <ProfileIcon is_yellow={true}/>}              
            //     {!updating && <Text style={style.notification_text}>follow</Text>}
            //         <TouchableOpacity
            //             style={constants.style.press_padding}
            //             onPress={async() => {
            //                 if(!updating){
            //                     set_updating(true)
            //                     await global.create_request(props.user, props.chef)
            //                     set_is_following(true)
            //                     set_is_request(true)
            //                     set_updating(false)
            //                 }
            //             }}
            //             activeOpacity={1}
            //         />
            //     </View>}
            //     {is_following && <View style={style.notification_button_filled}>
            //     {updating && <Text style={style.updating_text_filled}>...</Text>}
            //     {!updating && <ProfileIcon is_white={true}/>}              
            //     {!updating && <Text style={style.notification_text_filled}>{is_request ? 'requested' : 'following'}</Text>}
            //         <TouchableOpacity
            //             style={constants.style.press_padding}
            //             onPress={async() => {
            //                 if(!updating){
            //                     set_updating(true)
            //                     await global.delete_follow({follower: props.user, idol: props.chef, is_following: !is_request,})
            //                     set_is_following(false)
            //                     set_updating(false)
            //                 }
            //             }}
            //             activeOpacity={1}
            //         />
            //     </View>}
            // </View>
    //     )    
    // }

    return (
        <View style={props.style}>
            {!is_following && <AsyncButton
                key={'follow'}
                onPress={async () => {
                    await global.create_request(props.user, props.chef)
                    set_is_following(true)
                    set_is_request(true)
                }}
                style={props.is_chef_screen ? style.edit_button : style.wide_button}
                text_style={style.edit_text}
                text={'follow'}
            />}
            {is_following && <AsyncButton
                key={'unfollow'}
                onPress={async () => {
                    await global.delete_follow({follower: props.user, idol: props.chef, is_following: !is_request,})
                    set_is_following(false)
                }}
                style={props.is_chef_screen ? style.edit_button_filled : style.wide_button_filled}
                text_style={style.edit_text_filled}
                text={is_request? 'requested' : 'following'}
            />}
        </View>
    )
}

const style = StyleSheet.create({
    wide_button: {
        width: constants.follow_button_width,
        height: constants.thin_button_height,
        borderRadius: 1000,
        backgroundColor: constants.white,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    wide_button_filled: {
        width: constants.follow_button_width,
        height: constants.thin_button_height,
        borderRadius: 1000,
        backgroundColor: constants.yellow,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    edit_button: {
        marginTop: constants.sub_section_margin,
        backgroundColor: constants.white,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin_large * 2,
    },
    edit_text: {
        textAlign: 'center',
        fontSize: constants.small_font_size_2,
        color: constants.grey,
    },
    edit_button_filled: {
        marginTop: constants.sub_section_margin,
        backgroundColor: constants.yellow,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin_large * 2,
    },
    edit_text_filled: {
        textAlign: 'center',
        fontSize: constants.font_size,
        color: constants.white,
    },
    notification_button: {
        aspectRatio: 1,
        height: constants.small_preview_height,
        marginRight: constants.edge_margin,
        backgroundColor: constants.white,
        borderRadius: constants.tri_post_radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification_button_filled: {
        aspectRatio: 1,
        height: constants.small_preview_height,
        marginRight: constants.edge_margin,
        backgroundColor: constants.yellow,
        borderRadius: constants.tri_post_radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
    notification_text: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: constants.small_font_size,
        color: constants.yellow,
        bottom: constants.small_margin,
    },
    notification_text_filled: {
        position: 'absolute',
        textAlign: 'center',
        fontSize: constants.small_font_size,
        color: constants.white,
        bottom: constants.small_margin,
    },
    updating_text: {
        textAlign: 'center',
        fontSize: constants.font_size,
        color: constants.yellow,
    },
    updating_text_filled: {
        textAlign: 'center',
        fontSize: constants.font_size,
        color: constants.white,
    },
});

export default FollowButton;