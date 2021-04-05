//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'
import PostPreview from '../components/PostPreview'


import * as global from '../functions/global'
import * as constants from '../constants';


const RecipeSearchScreen = (props) => {
    const [search, set_search] = useState([])
    const index = useNavigationState(state => state.index)    
    useEffect(() => {
        if (index == 0) {
            set_search(props.search)
        }
    },[props.search, index])

    const fetchPosts = async ({next_token, limit}) => {
        const [posts, new_next_token] = await global.fetch_posts_by_title({search, next_token, limit})
        return [posts, new_next_token]
    }

    return (
        <View style={style.feed_container}>
            <Stream user={props.user} n_columns={3} fetch={fetchPosts} format={storage.format_preview} cache_id={'search_posts' + search} search={search} block_refresh={true}>
                {item => (
                    <PostPreview post={item} user={props.user} n_columns={3}/>
                )}
            </Stream>
        </View>
    )
}

const style = StyleSheet.create({
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 60, 
    },
});

export default RecipeSearchScreen;