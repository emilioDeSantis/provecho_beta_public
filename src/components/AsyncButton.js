//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';

import * as constants from '../constants';

const AsyncButton = (props) => {

    const [running, set_running] = useState(false)

    return (
        <View style={props.style}>
            <Text style={props.text_style}>{running ? '...' : props.text}</Text>
            <TouchableOpacity
                onPress={async () => {
                    if (!running) {
                        set_running(true)
                        await props.onPress()
                        set_running(false)
                    }
                }}
                style={constants.style.press_padding}
                activeOpacity={1}
            >
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    
});

export default AsyncButton;