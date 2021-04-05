//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';

import ChefComp from '../components/Chef'

import { StackActions, useNavigationState, useNavigation, useRoute, useFocusEffect, } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import PostPreview from '../components/PostPreview'



import * as global from '../functions/global'
import * as constants from '../constants';

const HashtagComp = (props) => {

    const navigation = useNavigation()

    const go_to_final = () => {
        navigation.navigate('final', {name: props.hashtag.name})
    }

    const add_filter = async () => {
        if(!props.filters.includes(props.hashtag.name)) {
            let new_array = [...props.filters, props.hashtag.name]
            await props.set_filters(new_array)
        }
    }

    return (
        <View >
            <TouchableOpacity
                key = {props.hashtag.name}
                accessibilityRole="button"
                onPress={() => go_to_final()}
                // style={style.wide_button_filled}
            >
                <Text>{props.hashtag.name} {props.hashtag.n_posts} posts</Text>   
            </TouchableOpacity>
                <TouchableOpacity
                key = {props.hashtag.name}
                accessibilityRole="button"
                onPress={() => add_filter()}
                style={style.wide_button_filled}
            >
                <Text>add</Text>   
            </TouchableOpacity>
        </View>
    )
}

const Initial = (props) => {
    const [search, set_search] = useState([])

    useEffect(() => {
        if ((props.index == 1 && props.is_ingredients) || (props.index == 2 && !props.is_ingredients)) {
            set_search(props.search)
        }
    },[props.search, props.index])

    const fetchHashtags = async ({page, limit}) => {
        const hashtags = await global.fetch_search_hashtags({page, limit, search: search[0], is_ingredients: props.is_ingredients})
        return hashtags
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchHashtags} search={search} user={props.user}>
                {item => (
                    <HashtagComp hashtag={item} filters={props.filters} set_filters={props.set_filters}/>
                )}
            </Stream>
        </View>
    )
}

const Final = (props) => { 
    const navigation = useNavigation()

    const route = useRoute();

    const [should_go_back, set_should_go_back] = useState(false)

    useEffect(() => {
        if (should_go_back) {
            navigation.navigate('initial')
        }
        set_should_go_back(true)
    },[props.search])

    const fetchHashtagPosts = async ({page, limit}) => {
        const posts = await global.fetch_hashtag_posts({page, limit, name: route.params.name})
        return posts
    }

    return (
        <View style={style.feed_container}>
            <Stream fetchArticles={fetchHashtagPosts} horizontal={false} user={props.user} n_columns={3}>
                {item => (
                    <PostPreview post={item} user={props.user} n_columns={3}/>
                )}
            </Stream>
        </View>
    )
}


const Stack = createStackNavigator();

const HashtagSearchScreen = (props) => {
    const user = props.user
    const is_ingredients = props.is_ingredients
    const filters = props.filters
    const set_filters = props.set_filters


    const index = useNavigationState(state => state.index)


    return (  
        <Stack.Navigator headerMode={'none'} initialRouteName={'initial'}>
            <Stack.Screen name="initial">
                {() => <Initial user={user} index={index} search={props.search} is_ingredients={is_ingredients} filters={filters} set_filters={set_filters}/>}
            </Stack.Screen>
            <Stack.Screen name="final">
                {() => <Final filters={filters} set_filters={set_filters} user={user} search={props.search}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    wide_button_filled: {
        height: 10,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 1000,
        backgroundColor: constants.yellow,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 60, 
    },
});

export default HashtagSearchScreen;