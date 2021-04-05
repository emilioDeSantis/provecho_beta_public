//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation  } from '@react-navigation/native';
import * as global from '../functions/global'
import PlusIcon from '../assets/icons/plus_icon.js'
import ProfileIcon from '../assets/icons/profile_icon.js'
import RemakeIcon from '../assets/icons/remake_icon.js'
import LikeIcon from '../assets/icons/like_icon.js'
import CommentIcon from '../assets/icons/comment_icon.js'
import MentionIcon from '../assets/icons/mention_icon.js'
import PostPreview from './PostPreview'



import AsyncButton from './AsyncButton'
import ChefThumbnail from './ChefThumbnail'
import FollowButton from './FollowButton';
import RecipeButton from './RecipeButton';
import * as constants from '../constants';
import { set } from 'react-native-reanimated';

const milliseconds_to_time = (millis) => {
    const seconds = Math.floor(millis/1000)
    let n = 0
    let unit = ''
    if (seconds < 60*60) {
        unit = seconds < 60 ? 'min' : 'mins'
        n = Math.floor(seconds/60)
    } else if (seconds < 24*60*60) {
        unit = seconds < 60*60 ? 'hr' : 'hrs'
        n = Math.floor(seconds/(60*60))
    } else {
        unit = seconds < 24*60*60 ? 'day' : 'days'
        n = Math.floor(seconds/(24*60*60))
    }
    const time = n + ' ' + unit
    return time
}

const get_ago = (date) => {
    const time = new Date(date) 
    const millis = (Date.now() - time.getTime())
    const ago = milliseconds_to_time(millis) + ' ago'
    return ago
}

const Notification = (props) => {

    const [declined, set_declined] = useState(false)
    const [accepted, set_accepted] = useState(false)

    return (
        <View style={style.container}>
            <ChefThumbnail style={style.thumb} chef={props.notification.sender} user={props.user} is_small={true}/>
            <View style={style.text_container}>
                <Text style={style.username_text}>{props.notification.sender.username}</Text>
                {!((props.notification.type == "ACCEPT") || (props.notification.type == "REQUEST") || (props.notification.type == "COMMENT") || (props.notification.type == "CAPTION")) && <Text style={style.bottom_text}>{get_ago(props.notification.createdAt)}</Text>}
                {props.notification.type == "REQUEST" && <Text style={style.bottom_text}>requested to follow you</Text>}
                {props.notification.type == "ACCEPT" && <Text style={style.bottom_text}>accepted your follow request</Text>}
                {props.notification.type == "COMMENT" && <Text style={style.bottom_text}>mentioned you in their comment {props.notification.text}</Text>}
                {props.notification.type == "CAPTION" && <Text style={style.bottom_text}>mentioned you in their caption {props.notification.text}</Text>}
            </View>
            <View style={style.end_container}>
                <View style={style.icon_container}>
                    {props.notification.type == 'ACCEPT' && <PlusIcon is_notification={true}/>}
                    {props.notification.type == 'REMADE' && <RemakeIcon is_notification={true}/>}
                    {props.notification.type == 'LIKED' && <LikeIcon is_notification={true}/>}
                    {((props.notification.type == 'COMMENT') || (props.notification.type == 'COMMENTED')) && <CommentIcon is_notification={true}/>}
                    {props.notification.type == 'CAPTION' && <RemakeIcon is_notification={true}/>}
                </View>
                {!((props.notification.type == 'ACCEPT') || (props.notification.type == 'REQUEST')) && 
                    <RecipeButton is_tri={true} post={props.notification.post} user={props.user} style={style.post_button} need_to_format={false} is_notification={true}/>
                }
                {(props.notification.type == 'ACCEPT') && 
                    <View style={style.accepted_view}>
                        <View style={style.follow_button}>
                            <ProfileIcon is_white={true}/>
                        </View>
                    </View>
                }
                {props.notification.type == 'REQUEST' && <>
                    {!(accepted || declined) && <AsyncButton
                        key={'accept_button'}
                        onPress={async () => {
                            await global.update_to_follow({follower: props.notification.sender, idol: props.user, notification_id: props.notification.id})
                            set_accepted(true)
                        }}
                        style={style.wide_button}
                        text_style={style.accept_text}
                        text={'accept'}
                    />}
                    {!(accepted || declined) && <AsyncButton
                        key={'decline_button'}
                        onPress={async () => {
                            await global.delete_notification(props.notification.id)
                            set_declined(true)
                        }}
                        style={style.wide_button}
                        text_style={style.accept_text}
                        text={'decline'}
                    />}
                    {(accepted || declined) && <Text style={style.accepted_text}>{accepted ? 'accepted' : 'declined'}</Text>}
                </>}
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width:constants.width,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: constants.sub_section_margin,
    },
    wide_button: {
        width: constants.chef_tab_button_width,
        height: constants.thick_button_height,
        borderRadius: 1000,
        backgroundColor: constants.white,
        alignItems: 'center', 
        justifyContent: 'center', 
        marginRight: constants.edge_margin,
    },
    thumb: {
        marginLeft: constants.edge_margin,
    },
    text_container: {
        marginLeft: constants.edge_margin,
    },
    username_text: {
        fontSize: constants.font_size,
        color: constants.white,
    },
    bottom_text: {
        marginTop: constants.spaced_text_height,
        fontSize: constants.small_font_size,
        color: constants.white,
    },
    icon_container: {
        marginRight: constants.adjacent_margin_large,
    },
    post_button: {
        marginRight: constants.edge_margin,
        height: constants.small_preview_height,
        aspectRatio: 1,
        borderRadius: constants.tri_post_radius,
    },
    end_container: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    accepted_view: {
        aspectRatio: 1,
        height: constants.small_preview_height,
        marginRight: constants.edge_margin,
    },
    accept_text: {
        fontSize: constants.font_size,
        color: constants.dark_text,
    },
    accepted_text: {
        fontSize: constants.font_size,
        color: constants.white,
        marginRight: constants.edge_margin,
    },
    follow_button: {
        aspectRatio: 1,
        height: constants.small_preview_height,
        marginRight: constants.edge_margin,
        backgroundColor: constants.yellow,
        borderRadius: constants.tri_post_radius,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Notification;