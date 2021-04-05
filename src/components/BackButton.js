  //Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Button , TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BackIcon from '../assets/icons/back_icon.js'
import * as constants from '../constants';

function BackButton(props) {

    const navigation = useNavigation();

    return (
        <View style={[style.back_button_container, props.is_right ? {right: constants.back_button_margin} : {left: constants.back_button_margin}]}>
            <View style={style.back_button}>
                <BackIcon/>
            </View>
            <TouchableOpacity 
                style={constants.style.press_padding}
                onPress={() => navigation.goBack()}
                activeOpacity={1}
            >
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    back_button: {
        width: constants.round_button_height,
        aspectRatio: 1,
        backgroundColor: constants.round_button_color,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    back_button_container: {
        position: 'absolute',
        top: constants.header_margin_top - constants.round_button_height / 2,
    },
});

export default BackButton;