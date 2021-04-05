//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation  } from '@react-navigation/native';
import * as global from '../functions/global'



import ChefThumbnail from './ChefThumbnail'
import FollowButton from './FollowButton';
import * as constants from '../constants';


const Chef = (props) => {

    return (
        <View style={style.container}>
            <ChefThumbnail style={style.thumb} chef={props.chef} user={props.user} is_small={true}/>
            <Text style={style.text}>{props.chef.username}</Text>
            <View style={style.button_container}>
                <FollowButton style={style.button} chef={props.chef} user={props.user}/>
            </View>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        width: constants.width,
        alignItems: 'center',
        marginBottom: constants.sub_section_margin,
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    thumb: {
        marginLeft: constants.edge_margin,
    },
    text: {
        color: constants.white,
        fontSize: constants.font_size,
        marginLeft: constants.adjacent_margin,
    },
    button: {
        position: 'absolute',
        right: constants.edge_margin,
    },
    button_container: {
        flex: 1,
        height: constants.thin_button_height,
    }
});

export default Chef;