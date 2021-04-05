//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from './BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';

import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'
import * as constants from '../constants';


function Header (props) {
    let header_style = style.header
    if (props.is_dark) {
        header_style = style.header_dark
    }
    return (
        <View style={header_style}>
            <BackButton is_right={props.is_right}/>
            <Text style={[style.header_text,style.top_bar_text]}>{props.header}</Text>
        </View>
    )
}

const style = StyleSheet.create({
    header: {
        width: constants.width,
        height: constants.bar_height,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: constants.top_bar_color,
    },
    header_dark: {
        width: constants.width,
        height: constants.bar_height,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: constants.black,
    },
    header_text: {
        marginTop: 30,
        color: constants.header_color,
    },
    top_bar_text: {
        fontSize: 18,
        marginTop: 55,
    },
});

export default Header;