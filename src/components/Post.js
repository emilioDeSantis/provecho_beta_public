//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Dimensions } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'
import DoubleClick from 'react-native-double-tap'

import 'react-native-get-random-values';
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import LikeIcon from '../assets/icons/like_icon.js'
import CommentIcon from '../assets/icons/comment_icon.js'
import SaveButton from './SaveButton'
import RecipeButton from './RecipeButton'

import ChefThumbnail from './ChefThumbnail'
import { ScrollView } from 'react-native-gesture-handler';
import * as constants from '../constants';


const format_hashtags = (hashtags) => {
    return '#khgf #jhgfjhgf #jhgfhgj #jhjh'
}

const LikeButton = (props) => {
    const navigation = useNavigation()

    return(
        <TouchableOpacity 
            activeOpacity={1}
            style= {style.number}
            onPress={() => {
                navigation.navigate('like modal', {
                    tab:'likes',
                    post: props,
                })
            }}
            activeOpacity={1}
        >
            <Text style={style.number_text}>{props.n_likes}</Text>
        </TouchableOpacity> 
    )
}

//should comment button be seprrat eform number buttton?
const CommentButton = (props) => {
    const navigation = useNavigation()
    return(
        <View style={style.comment_button_container}>
            <TouchableOpacity 
                style= {style.comment_button}
                onPress={() => {
                    navigation.navigate('like modal',{
                        tab:'comments',
                        post: props,
                    })
                }}
                activeOpacity={1}
            >
                <CommentIcon/>
            </TouchableOpacity> 
            <TouchableOpacity 
                activeOpacity={1}
                style= {style.number}
                onPress={() => {
                    navigation.navigate('like modal',{
                        tab:'comments',
                        post: props,
                    })
                }}
            >
                <Text style={style.number_text}>{props.n_comments}</Text>
            </TouchableOpacity> 
        </View>
    )
}

const Post = (props) => {
    const [position, set_position] = useState(constants.width)
    const [speed, set_speed] = useState(0)
    const [post, set_post] = useState(props.post)

    const listView = useRef(null)

    like = () => {
        if (post.is_liked) {
            global.unlike(props.user, post)
            set_post(prev_post => (
                {
                    ...prev_post,
                    is_liked: false,
                    n_likes: prev_post.n_likes - 1,
                }
            ))
        } else {
            if (!props.user.is_logged_in) {
                alert('cannot like posts without an account')
                return
            }
            global.like(props.user, post,)
            set_post(prev_post => (
                {
                    ...prev_post,
                    is_liked: true,
                    n_likes: prev_post.n_likes + 1,
                }
            ))
        }
    }


    return (
        <View style={style.post}>
            <Text style={{
                position: 'absolute',
                top: 50,
                left: 140,
            }}>
                {post.chef.username}
            </Text>
            <ScrollView 
                ref={ref => {
                    if(post.type == 'REMAKE') {
                        return
                    }
                    listView.current = ref
                }}
                style={style.post_scroll} 
                contentOffset={{x: post.type == 'REMAKE' ? 0 : constants.width, y: 0}}
                decelerationRate={0} 
                snapToInterval={constants.width} 
                snapToAlignment={'center'} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                //how many miliseconds till next run of function
                scrollEventThrottle={16}
                onScroll={(on_scroll) => {
                    if(post.type == 'REMAKE') {
                        return
                    }
                    if (on_scroll.nativeEvent.contentOffset.x > constants.width) {
                        return
                    }
                    set_speed(position - on_scroll.nativeEvent.contentOffset.x)
                    set_position(on_scroll.nativeEvent.contentOffset.x)
                }}
                onMomentumScrollBegin={() => {
                    if(post.type == 'REMAKE') {
                        return
                    }
                    if (position > constants.width || speed < 3) {
                        return
                    }
                    props.navigation.navigate('remakes', {post})
                }}
                onMomentumScrollEnd={() => {
                    if(post.type == 'REMAKE') {
                        return
                    }
                    if (position < constants.width/20) {
                        listView.current.scrollTo({x: constants.width})
                    }
                }}
            >
                <View style={{width: constants.width, height: constants.width*1.25, backgroundColor: '#0000',}}/>
                {post.image.map((uri) => {
                    return (
                        <View style={{width: constants.width, height: constants.width*1.25, backgroundColor: '#999',}} key={uri}>
                            <View
                                style = {{position: 'absolute', height: '100%', width: '100%', backgroundColor: '#f47'}}
                            />
                            <Image
                                style = {{
                                    position: 'absolute', 
                                    height: '100%', 
                                    width: '100%', 
                                    backgroundColor: '#f47'
                                }}
                                source={{
                                    uri,
                                }}
                            />
                            <DoubleClick
                                singleTap={() => global.go_to_recipe({
                                    post, 
                                    user: props.user, 
                                    navigation: props.navigation,
                                })}
                                doubleTap={() => like()}
                                delay={200}
                            >
                                <View
                                    style = {{height: '100%', }}
                                />
                            </DoubleClick>
                        </View>
                    )
                })}
            </ScrollView>
            <Text>{post.caption}</Text>
            <Text>{format_hashtags(post.hashtags)}</Text>
            {props.show_tip &&<Text>{post.tip}</Text>}
            <View style={style.post_button_container}>
                <View style={style.like_button_container}>
                    <TouchableOpacity 
                        style= {style.like_button}
                        onPress={() => like()}
                        activeOpacity={1}
                    >
                        <LikeIcon is_liked={post.is_liked}/>
                    </TouchableOpacity>
                    <LikeButton {...post} />
                </View>
                <CommentButton {...post}/>
                <SaveButton user={props.user} recipe={post} /> 
            </View>
            <ChefThumbnail chef={post.chef} user={props.user}/>
        </View>
    )
}

const style = StyleSheet.create({
    number: {
        top: 5,
        left: 10,
    },
    number_text: {
        color: constants.dark_grey,
    },
    comment_button_container: {
        position: 'absolute',
        height: 30,
        width: 60,
        top: 10,
        right: 70,
        flexDirection: 'row',
    },
    comment_button: {
        height: 20,
        width: 20,
        top: 5,
        left: 5,
    },
    post: {
        marginBottom: 210,
        paddingTop: 10,
        alignSelf: 'stretch',
        width: constants.width,
        height: constants.width*1.25,
        flex:1,
        backgroundColor: constants.white
    },
    post_scroll: {
        position: 'absolute',
        top: 70,
        backgroundColor: constants.white,
        width: constants.width,
        height: constants.width*1.25+80,
        flexDirection: 'row',
    },
    post_button_container: {
        position: 'absolute',
        marginTop: constants.width*1.25+70,
        width: constants.width,
        height: 80,
        flexDirection: 'row',
        backgroundColor: constants.white,
    },
    like_button_container: {
        position: 'absolute',
        height: 30,
        width: 60,
        top: 10,
        right: 10,
        flexDirection: 'row',
    },
    like_button: {
        height: 20,
        width: 20,
        top: 5,
        left: 5,
    },
});

export default Post;