//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useRef} from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, Dimensions, Modal } from 'react-native';
import { StackActions, useNavigation, useNavigationBuilder, NavigationActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures'

import 'react-native-get-random-values';
import DoubleClick from 'react-native-double-tap'
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import LikeIcon from '../assets/icons/like_icon.js'
import CommentIcon from '../assets/icons/comment_icon.js'
import SaveButton from './SaveButton'
import RemakeButton from './RemakeButton'
import CopyIcon from "../assets/icons/copy_icon";

import ChefThumbnail from './ChefThumbnail'
import { ScrollView } from 'react-native-gesture-handler';
import * as constants from '../constants';

function RecipeButton(props) {
    const [modalVisible, setModalVisible] = useState(false)

    const navigation = useNavigation();
    console.log('post',props.post.type);

    return (
        <>
            <TouchableOpacity 
                style= {props.style}
                onPress={() => global.go_to_post({
                    post: props.post, 
                    user: props.user, 
                    navigation, 
                })}
                    onLongPress={() => {
                        setModalVisible(!modalVisible)
                    }}
                activeOpacity={1}
            >
                <Image
                    style={props.is_tri ? style.tri_image : props.is_di ? style.di_image : style.image}
                        source={{
                        uri: props.post.image[0],
                    }}
                />
            </TouchableOpacity>  
            <Modal
                animationType='fade'
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={style.modal_container}>
                    <TouchableOpacity 
                        style={style.back_button_large}
                        onPress={() => setModalVisible(false)}
                        activeOpacity={1}
                    >
                    </TouchableOpacity>  
                    <View style={style.window}>
                        <SaveButton is_small={true} user={props.user} recipe={props.post} setModalVisible={setModalVisible}/>
                        {props.post.type == 'ORIGINAL' && <RemakeButton is_small={true} user={props.user} recipe={props.post} setModalVisible={setModalVisible}/>}
                        <View style={style.copy_container}>
                            <View style={style.copy_icon_containser}>
                                <CopyIcon/>
                            </View>
                            <Text style={style.copy_text}>copy recipe link</Text>
                            <TouchableOpacity 
                                style={constants.style.press_padding_none}
                                onPress={() => {
                                    alert('copy link')
                                    setModalVisible(false)
                                }}
                                activeOpacity={1}
                            >
                            </TouchableOpacity> 
                        </View>
                    </View>
                </View>
            </Modal>                   
        </>
    )
}

const style = StyleSheet.create({
    modal_container: {
        width: '100%',
        height: '100%',
        // justifyContent: 'center',
        alignItems: 'center',
    },
    window: {
        position: 'absolute',
        bottom: constants.modal_margin_bottom,
        backgroundColor: constants.white,
        width: constants.width - constants.edge_margin_large * 2,
        borderRadius: constants.sub_tab_radius,
    },
    back_button_large: {
        height: '100%',
        width: '100%',
        position: 'absolute',
        backgroundColor: constants.grey_out,
    },
    copy_container: {
        width: '100%', 
        // backgroundColor: '#68a',
        alignItems: 'center',
        height: constants.text_input_height,
        flexDirection: 'row',
        borderTopColor: constants.line_color,
        borderTopWidth: constants.pixel,
    },
    copy_icon_containser: {
        marginLeft: constants.adjacent_margin_large,
    },
    copy_text: {
        fontSize: constants.font_size,
        color: constants.dark_text,
        marginLeft: constants.adjacent_margin_large,
    },
    tri_image: {
        height: '100%',
        borderRadius: constants.tri_post_radius,
    },
    di_image: {
        height: '100%',
        borderRadius: constants.di_post_radius,
    },
    image: {
        height: '100%',
    },
});

export default RecipeButton;