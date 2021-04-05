//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator, } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute, } from '@react-navigation/native';

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import SaveIcon from '../assets/icons/save_icon.js'
import * as constants from '../constants';

const SaveButton = (props) => {

    const [is_saved, set_is_saved] = useState(props.recipe.is_saved)

    const save = async () => {
        if (!props.user.is_logged_in) {
            alert('cannot save posts without an account')
            return
        }
        if (is_saved) {
            await global.unsave( props.user, props.recipe,)
        } else {
            await global.save( props.user, props.recipe,)
        }
        set_is_saved(prev_is_saved => !prev_is_saved)
    }
    if (props.is_small) {
        return (
            <View style={style.copy_container}>
                <View style={style.copy_icon_containser}>
                    <SaveIcon is_saved={is_saved} is_outlined={true}/>
                </View>
                <Text style={style.copy_text}>{is_saved ? 'unsave recipe' : 'save recipe'}</Text>
                <TouchableOpacity
                    style={constants.style.press_padding_small}
                    key='save'
                    onPress={() => {
                        save()
                        if (props.setModalVisible) {
                            props.setModalVisible(false)
                        }
                    }}
                    activeOpacity={1}
                >
                </TouchableOpacity>
            </View>
        )
    } else {
        return (
            <View style={style.save_button}>
                <Text style={style.text}>post remake</Text>
                <TouchableOpacity
                    style={constants.style.press_padding}
                    key='save'
                    onPress={() => {
                        save()
                        if (props.setModalVisible) {
                            props.setModalVisible(false)
                        }
                    }}
                    activeOpacity={1}
                >
                </TouchableOpacity>
            </View>
        )
    }
}


const style = StyleSheet.create({
    save_button: {
        position: 'absolute',
        backgroundColor: constants.white,
        width: 100,
        height: '100%',
        paddingTop: 25,
        paddingRight: 30,
        right: 0,
        top: 40,
    },
    text: {
        fontSize: constants.font_size,
        color: constants.white,
    },
    icon_container: {
        width: constants.round_button_height, 
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 1000,
    },
    copy_container: {
        width: '100%', 
        // backgroundColor: '#68a',
        alignItems: 'center',
        height: constants.text_input_height,
        flexDirection: 'row',
        borderBottomColor: constants.line_color,
        borderBottomWidth: constants.pixel,
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

export default SaveButton;