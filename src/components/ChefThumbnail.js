//Copyright 2020, Provecho, All rights reserved.

import * as React from 'react';
import { StyleSheet, Dimensions, View, Text, Button, Image, TouchableOpacity, PixelRatio } from 'react-native';
import { StackActions, useNavigation  } from '@react-navigation/native';

import * as global from '../functions/global'
import * as constants from '../constants';

function ChefThumbnail(props) {
    const navigation = useNavigation();


    const go_to_chef = async () => {
        const chef = await global.thumbnail_to_chef({chef: props.chef, user: props.user})
        navigation.navigate('chef',{
            chef,
        })
    }

    return (
        <View style={props.style}>
            <View style={props.is_large ? style.chef_thumbnail_large : props.is_small ? style.chef_thumbnail_small : style.chef_thumbnail}>                    
                <Image
                    style = {{
                        height: '100%',
                        borderRadius: 1000,
                    }}
                    source={{
                        uri: props.chef.image,
                    }}
                />
                <TouchableOpacity 
                    style={constants.style.press_padding}
                    onPress={() => go_to_chef()}
                    activeOpacity={1}
                >
                </TouchableOpacity>
            </View>
        </View>
    );
}

const style = StyleSheet.create({
    chef_thumbnail: {
        backgroundColor: constants.loading_color,
        marginTop: 10,
        marginLeft: 30,
        width: 60,
        height: 60,
        borderRadius: 3000,
        borderColor: constants.yellow,
        borderWidth: 3,
    },
    chef_thumbnail_large: {
        backgroundColor: constants.loading_color,
        width: constants.large_thumbnail_width,
        aspectRatio: 1,
        borderRadius: 3000,
    },
    chef_thumbnail_small: {
        backgroundColor: constants.loading_color,
        width: constants.small_thumbnail_width,
        aspectRatio: 1,
        borderRadius: 3000,
    },
});

export default ChefThumbnail