//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, TextInput } from 'react-native';
import { useNavigation, useRoute, useNavigationState, useNavigationBuilder } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import RemakeIcon from "../assets/icons/remake_icon";

import ChefThumbnail from './ChefThumbnail'
import ChefComp from './Chef'

import * as constants from '../constants';

function RemakeButton(props) {

    const navigation = useNavigation();

    if (props.is_small) {
        return (
            <View style={style.copy_container}>
                <View style={style.copy_icon_containser}>
                    <RemakeIcon/>
                </View> 
                <Text style={style.copy_text}>remake recipe</Text>
                <TouchableOpacity
                    style={constants.style.press_padding_none}
                    onPress={() => {
                        if (!props.user.is_logged_in) {
                            alert('cannot remix without an account')
                            return
                        }
                        navigation.navigate('create',{
                            original: props.recipe,
                            isOriginal: false,
                        })
                        if (props.setModalVisible) {
                            props.setModalVisible(false)
                        }
                    }}
                >
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={style.remake_button}>
                <Text style={style.text}>post remake</Text>
                <TouchableOpacity
                    style={constants.style.press_padding}
                    onPress={() => {
                        if (!props.user.is_logged_in) {
                            alert('cannot remix without an account')
                            return
                        }
                        navigation.navigate('create',{
                            original: props.recipe,
                            isOriginal: false,
                        })
                        if (props.setModalVisible) {
                            props.setModalVisible(false)
                        }
                    }}
                >
                </TouchableOpacity>
            </View>
        )
    }
}

const style = StyleSheet.create({
    remake_button: {
        height: 30,
        width: 100,
        borderRadius:1000,
        backgroundColor: '#ffcc4d',
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon_container: {
        width: constants.round_button_height, 
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000,
    },
    text: {
        fontSize: constants.font_size,
        color: constants.white,
    },
    copy_container: {
        width: '100%', 
        // backgroundColor: '#68a',
        alignItems: 'center',
        height: constants.text_input_height,
        flexDirection: 'row',
    },
    copy_icon_containser: {
        marginLeft: constants.adjacent_margin_large,
    },
    copy_text: {
        fontSize: constants.font_size,
        color: constants.dark_text,
        marginLeft: constants.adjacent_margin_large,
    },
});

export default RemakeButton;