//Copyright 2020, Provecho, All rights reserved.

import  React, { useState, forwardRef } from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TextInput, TouchableOpacity, FlatList, ScrollView } from 'react-native';
import { StackActions } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import BackButton from './BackButton'
import { set } from 'react-native-reanimated';
import * as constants from '../constants';
///DOESNT WORK INSide A SCROLLVIEW!!!


const AutofillTextInput = React.forwardRef((props, ref) => {

    const [sugestions, set_sugestions] = useState([])
    const [focused, set_focused] = useState(false)
    console.log('focused...',focused);

    const autofill = async (sugestion) => {
        let new_value = props.value.substring(0, props.value.lastIndexOf(" "))
        const space = new_value == '' ? '' : ' ';
        const addon = props.is_hashtag ? '#' : '@';
        new_value += space + addon + sugestion + ' '
        await props.set_value(new_value)
        set_sugestions([])
        ref.current.focus()
    }

    const is_active = (text) => {
        if (props.is_hashtag) {
            return true
        } else{
            return text.lastIndexOf(" ") < text.lastIndexOf("@")
        }
    }
     
    const sugest = async (text) => {
        await props.set_value(text)
        if (is_active(text)) {
            let word = text.substring(text.lastIndexOf(" "))
            word = word.replace(/\s+/g, '')
            word = word.replace('@', '')
            word = word.replace('#', '')
            const new_sugestions = word == ' ' ? [] : await props.query(word)
            set_sugestions(new_sugestions)
        } else {
            set_sugestions([])
        }
    }

    return (
        <View>                            
            <TextInput
                ref={ref}
                style={props.style}
                onChangeText={(text) => sugest(text)}
                onSubmitEditing={() => props.onSubmitEditing()}
                placeholder={props.placeholder}
                value={props.value}
                onBlur={() => set_focused(false)}
                onFocus={() => set_focused(true)}
            />
            {focused && sugestions.length > 0 && <View style={style.container}>
                {sugestions.map((item) => {
                    return (
                        <View style={style.button} key={item}>
                            <TouchableOpacity 
                                onPress={() => autofill(item)}
                            >
                                <Text style={style.text}>{item}</Text>
                            </TouchableOpacity>
                        </View>
                    )
                })}
            </View>}
        </View>
    )
})

const style = StyleSheet.create({
    container: {
        height: constants.autofill_height
    },
    button: {
        height: constants.thick_button_height,
        justifyContent: 'center',
        marginLeft: constants.edge_margin,
    },
    text: {
        fontSize: constants.font_size,
        color: constants.dark_text,
    },
});

export default AutofillTextInput
