import 'react-native-gesture-handler';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState, } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import * as feed from '../functions/feed'

import Amplify, { Storage, Auth, API } from 'aws-amplify'
import 'react-native-get-random-values';
import * as storage from '../functions/storage'
import ImagePicker from 'react-native-image-crop-picker';
import * as global from '../functions/global'
import * as constants from '../constants';


import awsconfig from '../aws-exports';
import { add } from 'react-native-reanimated';
import { useReducer } from 'react';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});










const Test = (props) => {

    const [chefs, set_chefs] = useState([])
    const [next_post, set_next_post] = useState(0)
    const [next_chef, set_next_chef] = useState(0)
    const [post_feed, set_post_feed] = useState([])
    const [username, set_username] = useState('')


    const update = async () => {
        const db_data = await API.graphql({
            query:`
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
                  lastUploadDate
                  name
                  image
                  biography
                  n_followers
                  n_following
                  n_remakes
                  updatedAt
                }
              }
            }
          `,
        })
        set_chefs(db_data.data.listChefs.items)
    }

    const add_chef = async () => {
        await API.graphql({
            query:`
                mutation CreateChef(
                    $input: CreateChefInput!
                    $condition: ModelChefConditionInput
                ) {
                    createChef(input: $input, condition: $condition) {
                        id
                    }
                }
            `,
            variables: {
                input: {
                    username,
                    name: 'name',
                    biography: 'bio',
                    image: 'c39e6d7e-81e2-4cbe-83b5-37a167f86aa2',
                    n_followers: 0,
                    n_following: 0,
                    n_remakes: 0,
                },
            },
        })
        set_next_chef(next_chef + 1)
    }

    const add_post = async () => {
        const db_data = await API.graphql({
            query:`
                mutation CreatePost(
                    $input: CreatePostInput!
                    $condition: ModelPostConditionInput
                ) {
                    createPost(input: $input, condition: $condition) {
                        createdAt
                    }
                }
            `,
            variables: {
                input: {
                    title: 'post' + next_post,
                    chefID: props.user.id,
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
                    }
                }
            `,
            variables: {
                input: {
                    id: props.user.id,
                    lastUploadDate: db_data.data.createPost.createdAt
                },
            },
        })
        set_next_post(next_post + 1)
    }

    const follow = async (idol) => {
        const db_data = await API.graphql({
            query:`
                mutation CreateFollow(
                    $input: CreateFollowInput!
                    $condition: ModelFollowConditionInput
                ) {
                    createFollow(input: $input, condition: $condition) {
                        type
                    }
                }
            `,
            variables: {
                input: {
                    followerID: props.user.id,
                    idolID: idol.id,
                    idolUsername: idol.username,
                    type: 'FOLLOW',
                },
            },
        })
    }

    const unfollow = async (idol) => {
        const db_data = await API.graphql({
            query:`
                mutation DeleteFollow(
                    $input: DeleteFollowInput!
                    $condition: ModelFollowConditionInput
                ) {
                    deleteFollow(input: $input, condition: $condition) {
                        type
                    }
                }
            `,
            variables: {
                input: {
                    followerID: props.user.id,
                    idolID: idol.id,
                },
            },
        })
    }

    return (
        <View style={{backgroundColor: '#eee', flex: 1, justifyContent: 'center', alignItems: 'center', paddingTop: 100,}}>
            <ScrollView>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => set_username(text)}
                    value={username}
                />  
                <TouchableOpacity
                    onPress={() => {
                        test()
                    }}
                >
                    <Text>test</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    onPress={ async () => {
                        const new_feed = await feed.on_refresh(props.user)
                        set_post_feed(new_feed)
                    }}
                >
                    <Text>on refresh</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    onPress={() => {
                        add_chef()
                    }}
                >
                    <Text>add chef</Text>
                </TouchableOpacity> 
                <TouchableOpacity
                    onPress={() => {
                        update()
                    }}
                >
                    <Text>update</Text>
                </TouchableOpacity> 
                {chefs.map((chef) => {
                    return (
                        <View style={{height: 100, width: 400, backgroundColor: props.user && chef.id == props.user.id ? '#f75' : '#fde', flexDirection: 'row',}}>
                            <Text>{chef.username}</Text>
                            <TouchableOpacity
                                onPress={async () => {
                                    let formatted_user = await storage.format_chef(chef)
                                    formatted_user.is_logged_in = true
                                    console.log('formatted_user...',formatted_user);
                                    props.set_user(formatted_user)
                                }}
                            >
                                <Text>log in</Text>
                            </TouchableOpacity>    
                            <TouchableOpacity
                                onPress={() => {
                                    follow(chef)
                                }}
                            >
                                <Text>follow</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity
                                onPress={() => {
                                    unfollow(chef)
                                }}
                            >
                                <Text>unfollow</Text>
                            </TouchableOpacity>  
                            <TouchableOpacity
                                onPress={() => {
                                    add_post()
                                }}
                            >
                                <Text>create post</Text>
                            </TouchableOpacity>  
                        </View>
                    )
                })}
                {post_feed.map((post) => {
                    return (
                        <View style={{height: 30, width: 400, backgroundColor: '#fde',}}>
                            <Text>{post.title}</Text>
                        </View>
                    )
                })}
            </ScrollView>           
        </View>
    )
}

const test = async () => {
    const start = Date.now()
    await Storage.get('c39e6d7e-81e2-4cbe-83b5-37a167f86aa2')
    console.log(Date.now()-start);
}

const style = StyleSheet.create({
    
});

export default Test