//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import AutofillTextInput from './AutofillTextInput'

import Stream from './Stream'
import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'
import * as constants from '../constants';
import * as mention from '../functions/mention'

const LikeTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.like_modal_tab_bar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TouchableOpacity
                        key = {label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={style.like_modal_tab_bar_button}
                        activeOpacity={1}
                    >
                        <Text style={{ color: isFocused ? '#f98' : '#333536' }}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

const Tab = createBottomTabNavigator();

const LikeTab = (props) => {

    const fetchLikes = async ({next_token, limit}) => {
        const likes = props.is_likes ? await global.fetch_likes({post: props.post, next_token, limit}) : global.fetch_comments({post: props.post, next_token, limit})
        console.log('likes...',likes);
        return likes
    }

    return (
        <View style={style.feed_container}>
            <Stream fetch={fetchLikes} user={props.user} n_columns={1} format={storage.format_like} cache_id={'post_' + props.is_likes ? 'likes' : 'comments' + props.post.id}>
                {item => {
                    if(props.is_likes) {
                        return (<ChefComp chef={item} user={props.user} />)
                    } else{
                        return (
                            <View style={style.comment_container}>
                                <ChefThumbnail chef={item.chef} user={props.user} />
                                <Text>{item.chef.username}</Text>
                                <Text>{item.text}</Text>
                            </View>
                        )
                    }
                }}
            </Stream>
        </View>
    );
}

const CommentTab = (props) => {

    const [comment, set_comment] = useState('')

    const add_comment = async() => {
        if (!props.user.is_logged_in) {
            alert('cannot comment without an account')
            return
        }
        await global.comment({chef: props.user, post: props.post, text: comment,})
    }

    return (
        <>
            <View style={{height: '100%'}}>
                <LikeTab post={props.post} user={props.user} is_likes={false}/>
            </View>
            <KeyboardAvoidingView style={{ width: constants.width, position: 'absolute', bottom: 0, height: 40, flex: 1, flexDirection: 'column',justifyContent: 'flex-end',}} behavior="padding" enabled   keyboardVerticalOffset={200}>
                <AutofillTextInput
                    style={{ height: 40, width: 300, borderColor: 'gray', borderWidth: 1, backgroundColor: constants.white,}}
                    onSubmitEditing={() => add_comment()}
                    placeholder={'comment'}
                    value={comment}
                    set_value={set_comment}
                    query={(prefix) => { 
                        return mention.get_usernames(prefix)
                    }}
                    is_hashtag={false}
                />
            </KeyboardAvoidingView>
        </>
    )
}

const LikeModal = (props) => {
    const user = props.user
    const navigation = useNavigation()

    const route = useRoute();

    const route_name = route.params.tab
    const post = route.params.post

    return (
        <View style={style.like_modal_container}>
            <TouchableOpacity
                key = 'back to post'
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={style.like_back_button}
            >
            </TouchableOpacity>
            <View style={style.like_modal}>
                <Tab.Navigator tabBar={props => <LikeTabBar {...props} />} initialRouteName={route_name}>
                    <Tab.Screen name="likes">
                        {(props) => <LikeTab {...props} post={post} user={user} is_likes={true}/>}
                    </Tab.Screen>
                    <Tab.Screen name="comments">
                        {(props) => <CommentTab {...props} post={post} user={user}/>}
                    </Tab.Screen>
                </Tab.Navigator>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    like_modal_tab_bar: {
        height:60,
        flexDirection: 'row',
        backgroundColor: '#f98',
        position: 'absolute',
        width: '100%',
        borderBottomColor: '#dddfe0',
        borderBottomWidth: .3,
    },
    like_modal_tab_bar_button: {
        flex: 1,
        backgroundColor: constants.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 60, 
    },
    comment_container: {
        height: 200,
        width: constants.width,
        backgroundColor: 'purple',
    },
    like_back_button: {
        height: constants.height,
        width: constants.width,
        backgroundColor: '#fff0',
        position: 'absolute',
    },
    like_modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: '20%',
        backgroundColor: constants.white,
    },
    like_modal_container: {
        flex: 1,
        backgroundColor: '#fff0',
    },
});

export default LikeModal;

