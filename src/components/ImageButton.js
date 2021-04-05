import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, Image  } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import * as global from '../functions/global'
import * as constants from '../constants';

function ImageButton(props) {
    return(
        <TouchableOpacity
            style={props.style}
            onPress={() => global.take_image(props.setUri, props.is_profile_picture)}
        >
            <Text>open camera</Text>
        </TouchableOpacity>
    )
}

function pick_image(setUri, is_profile_picture) {
    //update dimantsion for real size 
    let height = 1350
    let width = 1080
    if(is_profile_picture) {
        height = 320
        width = 320
    }
    ImagePicker.openPicker({
        width,
        height,
        cropping: true,
    }).then(image => {
        setUri(image.path)
    });
}

const style = StyleSheet.create({
    
});

export default ImageButton