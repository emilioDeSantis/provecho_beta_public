//Copyright 2020, Provecho, All rights reserved.

import  React, { useState } from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TextInput, TouchableOpacity } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

import BackButton from './BackButton'
import * as constants from '../constants';

function SearchBar(props) {

    const [search, set_search] = useState('')

    return (
        <View style={style.search_bar_header}>
            <TextInput
                style={style.search_bar}
                onChangeText={text => set_search(text)}
                onSubmitEditing={() => props.on_return(search)}
                placeholder={'search'}
                value={search}
            />
            <BackButton is_right={true}/>
        </View>
    )
}

const style = StyleSheet.create({
    search_bar_header: { 
        height: constants.bar_height, 
        width: constants.width,
    },
    search_bar: { 
        position: 'absolute',
        left: constants.medium_margin,
        top: 40,
        height: 70, 
        width: 320,
        borderRadius: 500,
        backgroundColor: constants.light_grey,
    },
});

export default SearchBar

//make search in vcomponts so i can reuse for create etc.