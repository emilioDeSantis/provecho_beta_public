//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import ChefComp from '../components/Chef'

import { StackActions, useNavigationState } from '@react-navigation/native';

import * as storage from '../functions/storage'
import Stream from '../components/Stream'


import * as global from '../functions/global'
import * as constants from '../constants';


const ChefSearchScreen = (props) => {
    const [search, set_search] = useState([])
    const index = useNavigationState(state => state.index)    
    useEffect(() => {
        if (index == 1) {
            set_search(props.search)
        }
    },[props.search, index])

    const fetchChefs = async ({next_token, limit}) => {
        const [chefs, new_next_token] = await global.fetch_chefs_by_search({search, next_token, limit})
        return [chefs, new_next_token]
    }

    const format_chef = async (chef) => {
        const new_chef = await global.format_chef({user: props.user, chef})
        return new_chef
    }

    return (
        <View style={style.feed_container}>
            <Stream user={props.user} n_columns={3} fetch={fetchChefs} format={format_chef} cache_id={'search_chefs' + search} search={search} block_refresh={true}>
                {item => (
                    <ChefComp chef={item} user={props.user} />
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

export default ChefSearchScreen;