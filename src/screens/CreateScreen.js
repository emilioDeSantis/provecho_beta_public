//Copyright 2020, Provecho, All rights reserved.

import React, { useEffect, useState, Component, useCallback, useRef } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, Image, TextInput, FlatList, KeyboardAvoidingView, ScrollViewBase, Dimensions,} from 'react-native';
import { useNavigation, useRoute, useNavigationState, useFocusEffect } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImagePicker from 'react-native-image-crop-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'


import * as storage from '../functions/storage'
import * as global from '../functions/global'
import * as mention from '../functions/mention'
import BackButton from '../components/BackButton'
import AuthenticationScreen from './AuthenticationScreen'
import RecipeButton from '../components/RecipeButton'
import ImageButton from '../components/ImageButton'
import StackComp from '../components/Stack'
import CloseIcon from '../assets/icons/close_icon.js'

import Header from '../components/Header'
import { go_to_recipe } from '../functions/global';
import AutofillTextInput from '../components/AutofillTextInput'
import * as constants from '../constants';


const ImagePreview = (props) => {
    if (props.uris.length > 0) {
        return (
            <ScrollView 
                style={style.images_container} 
                decelerationRate={0} 
                snapToInterval={constants.width} 
                snapToAlignment={'center'} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
            >
                {props.uris.map((uri) => {
                    return (
                        <View style={style.image_container} key={uri}>
                            <Image
                                style = {style.image}
                                source={{
                                    uri,
                                }}
                            />
                            <View style={style.delete_button}>
                                <CloseIcon/>
                                <TouchableOpacity
                                    style={constants.style.press_padding}
                                    onPress={() => {
                                        let new_uris = [...props.uris]
                                        new_uris.splice(new_uris.indexOf(uri),1)
                                        props.set_uris(new_uris)
                                    }}
                                >
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                })}
            </ScrollView>
        );
    } else {
        return (
            <View style={style.no_image_container}>
                <View style={style.no_image_button}>
                    <Text style={style.select_image_text}>select images</Text>
                    <TouchableOpacity
                    style={constants.style.press_padding}
                        onPress={() => global.take_image(props.add_image, false)}
                    >
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}

const IngredientInput = (props) => {
    return (
        <View style={style.ingredient_input_container}>
            <TextInput
                key={'quantity'}
                style={style.ingredient_text_input}
                onChangeText={text => {
                    props.set_ingredients((prev_ingredients) => {
                        let new_ingredients = [...prev_ingredients]
                        new_ingredients[props.index].quantity = text
                        return new_ingredients
                    })
                }}
                placeholderTextColor={constants.placeholder_color}
                placeholder={'quantity'}
                value={props.ingredients[props.index].quantity}
            />
            <TextInput
                key={'type'}
                style={style.ingredient_text_input}
                onChangeText={text => {
                    props.set_ingredients((prev_ingredients) => {
                        let new_ingredients = [...prev_ingredients]
                        new_ingredients[props.index].type = text
                        return new_ingredients
                    })
                }}
                placeholderTextColor={constants.placeholder_color}
                placeholder={'type'}
                value={props.ingredients[props.index].type}
                onSubmitEditing={() => props.set_ingredients([...props.ingredients, ...[{type: '', quantity: ''}]])}
            />            
            <View style={style.add_multi_button_ingredient}>
                <Text style={style.step_count}>+</Text>
                <TouchableOpacity
                    style={constants.style.press_padding}
                    onPress={() => props.set_ingredients([...props.ingredients, ...[{type: '', quantity: ''}]])}
                    activeOpacity={1}
                >
                </TouchableOpacity>
            </View>
        </View>
    )
}

const StepInput = (props) => {
    return (
        <View style={style.multi_input_container}>
            <View style={style.step_count_container}>
                <Text style={style.step_count}>{props.index + 1}</Text>
            </View>
            <TextInput
                style={style.step_text_input}
                onChangeText={text => {
                    props.set_procedure((prev_procedure) => {
                        let new_procedure = [...prev_procedure]
                        new_procedure[props.index] = text
                        return new_procedure
                    })
                }}
                placeholderTextColor={constants.placeholder_color}
                placeholder={'step'}
                value={props.procedure[props.index]}
                onSubmitEditing={() => props.set_procedure([...props.procedure, ...['']])}
            />
            <View style={style.add_multi_button}>
                <Text style={style.step_count}>+</Text>
                <TouchableOpacity
                    style={constants.style.press_padding}
                    onPress={() => props.set_procedure([...props.procedure, ...['']])}
                    activeOpacity={1}
                >
                </TouchableOpacity>
            </View>
        </View>
    )
}

CreateComp = (props) => {

    const route = props.route
    const navigation = useNavigation()

    const [title, setTitle] = useState('')
    const [serves, setServes] = useState('')
    const serves_ref = useRef(null)
    const [cook_time, setCook_time] = useState('')
    const cook_time_ref = useRef(null)
    const [caption, setCaption] = useState('')
    const caption_ref = useRef(null)
    const [location, setLocation] = useState('')
    const location_ref = useRef(null)
    const [tip, setTip] = useState('')
    const tip_ref = useRef(null)
    const [hashtags, setHashtags] = useState([])
    const hashtags_ref = useRef(null)
    const remake_hashtags_ref = useRef(null)
    const [procedure, set_procedure] = useState([''])
    const procedure_ref = useRef(null)

    const [ingredients, set_ingredients] = useState([{type: '', quantity: '',}])


    const onSubmit = async () => {
//still ussue with hashtags having an epmty elemt in array

//caption and steps text inouts dont wrap!!!

        //backgroound uplaod
        try {
            const hashtags_input = global.delete_empty_items(hashtags)

            if(props.isOriginal){
                props.set_uploading(true)
                const post = await global.create_original({user: props.user, uri: props.uri, title, caption, serves, cook_time, procedure, hashtags: hashtags_input, ingredients, location})
                props.set_uploading(false)
                if(post){
                    global.go_to_recipe({post, user: props.user, navigation,})
                }

            } else {
                if(!props.original) {
                    alert('select original recipe')
                    props.set_uploading(false)
                    return
                }
                const remake_hashtags_input = global.delete_empty_items(props.remake_hashtags)
                props.set_uploading(true)
                const post = await global.create_remake({user: props.user, uri: props.uri, post: props.original, caption, tip, title: props.original.title, hashtags: remake_hashtags_input, location,})
                props.set_uploading(false)
                if(post){
                    global.go_to_post({post, user: props.user, navigation,}) 
                }

            }
        } catch (error) {
            console.log(error);
        }
    }

    if (props.user.is_logged_in) {

        return (
            <>
                <Text style={constants.style.header}>new post</Text>
                <View style={style.toggle}>
                    <View style={props.isOriginal ? style.create_button_on : style.create_button_off}>
                        <Text style={style.create_button_text}>original</Text>
                        <TouchableOpacity
                            style={constants.style.press_padding}
                            onPress={() => props.setIsOriginal(true)}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={!props.isOriginal ? style.create_button_on : style.create_button_off}>
                        <Text style={style.create_button_text}>remake</Text>
                        <TouchableOpacity
                            style={constants.style.press_padding}
                            onPress={() => props.setIsOriginal(false)}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                </View>
                {!props.isOriginal && 
                <View style={style.title}>
                    <Text style={style.title_text}>{!props.original && "select recipe"}{props.original && props.original.title + ' by @' + props.original.chef.username}</Text>
                    <TouchableOpacity
                        style={constants.style.press_padding}
                        onPress={() => {
                            navigation.navigate('recent modal')
                        }}
                        activeOpacity={1}
                    >
                    </TouchableOpacity>
                </View>}
                {props.isOriginal && <TextInput
                    style={style.title_input}
                    onChangeText={text => setTitle(text)}
                    placeholderTextColor={constants.placeholder_color}
                    placeholder={'title'}
                    value={title}
                    onSubmitEditing={() => {caption_ref.current.focus()}}
                />}
                <AutofillTextInput
                    ref={caption_ref}
                    style={style.caption_text_input}
                    set_value={setCaption}
                    placeholderTextColor={constants.placeholder_color}
                    placeholder={'caption'}
                    value={caption}
                    onSubmitEditing={() => {location_ref.current.focus()}}
                    query={(prefix) => { 
                        // return mention.get_usernames(prefix)
                        return ['jhgfjhg', 'uuosousi', 'werxxss', 'whwhysys', 'nmiussy',]
                    }}
                    is_hashtag={false}
                />
                <KeyboardAvoidingView style={style.keyboard_avoiding_container} behavior="padding" enabled   keyboardVerticalOffset={100}>
                    <ScrollView 
                        style={style.scroll}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImagePreview uris={props.uri} set_uris={props.setUri} add_image={props.add_image}></ImagePreview>
                        <View style={style.text_inputs_container}>
                            <TextInput
                                ref={location_ref}
                                style={style.create_text_input}
                                onChangeText={text => setLocation(text)}
                                placeholderTextColor={constants.placeholder_color}
                                placeholder={'location'}
                                value={location}
                                onSubmitEditing={() => {
                                    if (props.isOriginal) {
                                        hashtags_ref.current.focus()
                                    } else{
                                        remake_hashtags_ref.current.focus()
                                    }
                                }}
                            />
                            {props.isOriginal && <TextInput
                                ref={hashtags_ref}
                                style={style.create_text_input}
                                onChangeText={text => {
                                    if (/^[a-zA-Z\s\#]*$/.test(text.toString())) { 
                                        setHashtags(toArray(text))
                                    }
                                }}
                                placeholderTextColor={constants.placeholder_color}
                                placeholder={'hashtags'}
                                value={to_string(hashtags)}
                                onSubmitEditing={() => {serves_ref.current.focus()}}
                            />}
                            {!props.isOriginal && <TextInput
                                ref={remake_hashtags_ref}
                                style={style.create_text_input}
                                onChangeText={text => {
                                    if (/^[a-zA-Z\s\#]*$/.test(text.toString())) { 
                                        props.setRemakeHashtags(toArray(text))
                                    }
                                }}
                                placeholderTextColor={constants.placeholder_color}
                                placeholder={'hashtags'}
                                value={to_string(props.remake_hashtags)}
                                onSubmitEditing={() => {tip_ref.current.focus()}}
                            />}
                            {props.isOriginal && <TextInput
                                ref={serves_ref}
                                style={style.create_text_input}
                                onChangeText={text => {
                                    if (/^\d+$/.test(text.toString())) { 
                                        setServes(text)
                                    }
                                }}
                                placeholder={'serves'}
                                placeholderTextColor={constants.placeholder_color}
                                keyboardType={'numbers-and-punctuation'}
                                value={serves}
                                onSubmitEditing={() => {cook_time_ref.current.focus()}}
                            />}
                            {props.isOriginal && <TextInput
                                ref={cook_time_ref}
                                style={style.create_text_input}
                                onChangeText={text => {
                                    if (/^\d+$/.test(text.toString())) { 
                                        setCook_time(text)
                                    }
                                }}
                                placeholderTextColor={constants.placeholder_color}
                                placeholder={'cook time'}
                                keyboardType={'numbers-and-punctuation'}
                                value={cook_time}
                                onSubmitEditing={() => {procedure_ref.current.focus()}}
                            />}
                            {!props.isOriginal && <TextInput
                                ref={tip_ref}
                                style={style.create_text_input}
                                onChangeText={text => setTip(text)}
                                placeholderTextColor={constants.placeholder_color}
                                placeholder={'tip'}
                                value={tip}
                            />}
                        </View>
                        {props.isOriginal && <Text style={style.input_title}>instructions</Text>}
                        {props.isOriginal && <View style={{height: constants.text_input_height * procedure.length }}>
                            {procedure.map((item, index) => {
                                return (
                                    <StepInput {...item} index={index} set_procedure={set_procedure} procedure={procedure} />
                                )
                            })}
                        </View>}
                        {props.isOriginal && <Text style={style.input_title}>ingredients</Text>}
                        {props.isOriginal && <View style={{height: constants.text_input_height * ingredients.length}}>
                            {ingredients.map((item, index) => {
                                return (
                                    <IngredientInput {...item} index={index} set_ingredients={set_ingredients} ingredients={ingredients} />
                                )
                            })}
                        </View>}
                        <View style={style.upload_button}>
                            <Text style={style.create_button_text}>{props.uploading ? 'posting...' : 'post'}</Text>
                            <TouchableOpacity
                                style={constants.style.press_padding}
                                onPress={() => {
                                    if(!props.uploading){
                                        onSubmit()
                                    }
                                }}
                                activeOpacity={1}
                            >
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <BackButton is_right={false}/>
                <View style={style.select_button}>
                    <Text style={style.select_text}>photos</Text>
                    <TouchableOpacity 
                        style={constants.style.press_padding}
                        onPress={() => global.take_image(props.add_image, false)}
                        activeOpacity={1}
                    >
                    </TouchableOpacity>
                </View>
            </>

        );
    } else {
        return (
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        )
    }
}

const RecentPreview = (props) => {

    return (
        <View style={style.tri_post}>
            <TouchableOpacity 
                style={style.tri_recipe_button}
                onPress={() => {
                    if (props.selected_post && props.selected_post.id == props.post.id) {
                        props.set_selected_post(null)
                    } else {
                        props.set_selected_post(props.post)
                    }
                }}
                activeOpacity={1}
            >
                <Image
                    style={style.preview_image}
                        source={{
                        uri: props.post.image[0],
                    }}
                />
                {props.selected_post && props.selected_post.id == props.post.id && <View style={style.selected_border}/>}
            </TouchableOpacity> 
        </View>
    )
}

const RecentModal = (props) => {

    const [selected_post, set_selected_post] = useState(null)

    const navigation = useNavigation()

    const renderItem = ({ item }) => {
        return (
            <RecentPreview user={props.user} post={item} selected_post={selected_post} set_selected_post={set_selected_post}/>
        );
    };

    console.log('reipce erent', props.recent_recipes);
    return (
        <View style={style.like_modal_container}>
            <View style={style.like_modal}>
                <Text style={constants.style.header}>recents</Text>
                {selected_post &&  
                <View style={style.select_button}>
                    <Text style={style.select_text}>select</Text>
                    <TouchableOpacity 
                        style={constants.style.press_padding}
                        onPress={() => {
                            if(selected_post){
                                props.set_original(selected_post)
                                navigation.goBack()
                            }
                        }}
                        activeOpacity={1}
                    >
                    </TouchableOpacity>
                </View>}
                <View style={style.feed_container}>
                    <FlatList
                        style={style.flatlist}
                        numColumns={3}
                        data={props.recent_recipes}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                        showsVerticalScrollIndicator ={false}
                    />
                </View>

                <BackButton is_right={false}/>
            </View>
        </View>
    )
}


const Stack = createStackNavigator();

const CreateScreen = (props) => {
    const recent_recipes = props.recent_recipes
    const set_recent_recipes = props.set_recent_recipes
    const route = useRoute();
    const user = props.user
    const [isOriginal, setIsOriginal] = useState(true)
    const [original, setOriginal] = useState(null)
    const [remake_hashtags, setRemakeHashtags] = useState([])
    const [uri, setUri] = useState([])
    const [uploading, set_uploading] = useState(false)

    const add_image = async (path) => {
        const new_uri = [...uri, path]
        setUri(new_uri)
    }

    const set_original = async (obj) => {
        if(obj) {
            setOriginal(() => {
                setRemakeHashtags(global.delete_empty_items([...obj.hashtags]))
                return obj
            })
        }
    }

    useEffect(() => {
        if (route.params) {
            setIsOriginal(route.params.isOriginal)
            set_original(route.params.original)
        }
    },[route.params])

    useFocusEffect(
        useCallback(() => {
            // global.take_image(add_image, false)
            mention.update(props.user)
            set_uploading(false)
        }, [])
    );
    return (
        <StackComp user={props.user} set_user={props.set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}>
            {() => (
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                        cardStyle: { backgroundColor: 'transparent' },
                        cardOverlayEnabled: true,
                    }}
                    mode="modal"
                >
                    <Stack.Screen name="create comp">
                        {(props) => <CreateComp 
                            {...props} 
                            user={user} 
                            route={route} 
                            add_image={add_image}
                            uri={uri}
                            setUri={setUri}
                            isOriginal={isOriginal} 
                            setIsOriginal={setIsOriginal} 
                            original={original} 
                            remake_hashtags={remake_hashtags} 
                            setRemakeHashtags={setRemakeHashtags}
                            uploading={uploading}
                            set_uploading={set_uploading}
                        />}
                    </Stack.Screen>
                    <Stack.Screen name="recent modal">
                        {(props) => <RecentModal {...props} user={user} recent_recipes={recent_recipes} set_original={set_original}/>}
                    </Stack.Screen>
                </Stack.Navigator>
            )}
        </StackComp>
    )   
}



const multiline_to_string = (array) => {
    let string = ''
    let new_array = [...array]
    if (array.length == 0) new_array = ['']
    const last_item = new_array.pop()
    new_array.forEach(element => {
        string += element + '\r\n'
    })
    string += last_item
    return string
}

const toArray = (text) => {
    text = text.replace('  ', ' ')
    text = text.replace(/#/g, '')
    const array = text.split(' ')
    return array
}

const to_string = (array) => {
    if (array.length == 0) array = ['']
    let add_space = false
    let string = ''
    const last_item = array.pop()
    array.forEach(element => {
        if (add_space) {
            string += ' '
        }
        string += '#' + element
        add_space = true
    })
    if (add_space) {
        string += ' '
    }
    string += last_item
    array.push(last_item)
    return string
}

const style = StyleSheet.create({
    upload_button: {
        alignSelf: 'center',
        marginTop: constants.section_margin,
        marginBottom: constants.section_margin,
        backgroundColor: constants.yellow,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin_large * 2,
        // ...constants.style.button_shadow,
    },
    selected_border: {
        borderColor: constants.yellow, 
        borderWidth: constants.border_width, 
        position: 'absolute', 
        width: '100%', 
        height: '100%',
        borderRadius: constants.tri_post_radius,
    },
    flatlist: {
        paddingTop: 14,
    },
    preview_image: {
        height: '100%',
        borderRadius: constants.tri_post_radius,
    },
    tri_post: {
        width: (constants.width + constants.post_preview_margin - constants.post_preview_edge_margin) / 3 ,
        aspectRatio: 1,
    },
    tri_recipe_button: {
        borderRadius: constants.tri_post_radius,
        marginLeft: constants.post_preview_margin/2,  
        marginRight: constants.post_preview_margin/2,   
        marginBottom: constants.post_preview_margin,
        // backgroundColor: '#f75',
    },
    select_button: {
        position: 'absolute',
        top: constants.header_margin_top - constants.thin_button_height / 2,
        right: constants.back_button_margin,
        width: constants.chef_tab_button_width,
        height: constants.thin_button_height,
        backgroundColor: constants.light_grey,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    select_text: {
        color: constants.yellow,
        fontSize: constants.font_size
    },
    scroll: {

    },
    delete_button: {
        height: constants.thin_button_height, 
        aspectRatio: 1,
        backgroundColor: constants.black_2, 
        position: 'absolute',
        right: 0,
        margin: constants.edge_margin,
        borderRadius: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        position: 'absolute', 
        height: '100%', 
        width: '100%', 
        // backgroundColor: '#f47'
    },
    image_container: {
        width: constants.width, 
        height: constants.width*1.25, 
        // backgroundColor: '#999',
    },
    images_container:{
        width: constants.width,
        height:  constants.width*1.25,
        flexDirection: 'row',
    },
    // text_input: {
    //     height: constants.text_input_height,
    //     marginTop: constants.medium_margin,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    // text: {
    // height: constants.text_input_height,
    // marginTop: constants.medium_margin,
    // justifyContent: 'center',
    // alignItems: 'center',
    // },
    select_image_text: {
        fontSize: constants.font_size,
        color: constants.dark_text,
        textAlign: 'center',
        // textAlignVertical: 'center',
    },
    no_image_container: {
        height: constants.no_image_height,
        marginTop: constants.sub_section_margin,
        justifyContent: 'center',
        alignItems: 'center',
    },
    no_image_button: {
        // backgroundColor: '#f65',
        height: constants.thin_button_height,
        width: constants.create_button_width,
        justifyContent: 'center',
        alignItems: 'center',
    },
    keyboard_avoiding_container: {
        flex: 1, 
        flexDirection: 'column',
        justifyContent: 'center',
        marginTop: constants.sub_section_margin,
    },
    toggle: {
        width: constants.create_button_width * 2 + constants.adjacent_margin,
        height: constants.thin_button_height,
        backgroundColor: constants.grey_2,
        alignSelf: 'center',
        marginTop: constants.section_margin,
        borderRadius: 1000,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    create_button_on: {
        width: constants.create_button_width,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: constants.yellow,
        borderRadius: 1000,
        ...constants.style.button_shadow,
    },
    create_button_off: {
        width: constants.create_button_width,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
    },
    create_button_text: {
        color: constants.white,
        fontSize: constants.font_size,
        textAlign: 'center',
    },
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: constants.section_margin, 
    },
    text_inputs_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: constants.sub_section_margin, 
    },
    like_modal_container: {
        flex: 1,
        backgroundColor: '#fff0',
    },
    create_text_input: {
        height: constants.text_input_height,
        width: constants.width-(constants.edge_margin*2),
        // paddingLeft: constants.edge_margin,
        borderBottomColor: constants.line_color,
        color: constants.dark_text,
        borderBottomWidth: constants.pixel,
        fontSize: constants.font_size,
        lineHeight: constants.font_size * constants.line_height_coeff,
        textAlignVertical: 'center',
    },
    caption_text_input: {
        height: constants.text_input_height,
        width: constants.width-(constants.edge_margin*2),
        // paddingLeft: constants.edge_margin,
        borderBottomColor: constants.line_color,
        color: constants.dark_text,
        borderBottomWidth: constants.pixel,
        fontSize: constants.font_size,
        lineHeight: constants.font_size * constants.line_height_coeff,
        textAlignVertical: 'center',
        marginLeft: constants.edge_margin,
    },
    procedure: {
        height: constants.procedure_height,
        width: constants.width-(constants.edge_margin*2),
        // paddingLeft: constants.edge_margin,
        borderBottomColor: constants.line_color,
        color: constants.dark_text,
        borderBottomWidth: constants.pixel,
        fontSize: constants.font_size,
        lineHeight: constants.font_size * constants.line_height_coeff,
        textAlignVertical: 'center',
    },
    title_input: {
        alignSelf: 'center',
        height: constants.text_input_height,
        width: constants.width-(constants.edge_margin*2),
        // paddingLeft: constants.edge_margin,
        borderBottomColor: constants.line_color,
        borderBottomWidth: constants.pixel,
        marginTop: constants.sub_section_margin ,
    },
    like_modal: {
        backgroundColor: constants.white,
        height: '100%',
        width: '100%'
    },
    camera_button_container: {
        position: 'absolute',
        top: constants.header_margin,
        right: constants.back_button_margin,
    },
    title: {
        alignSelf: 'center',
        marginTop: constants.sub_section_margin,
        backgroundColor: constants.light_grey,
        height: constants.text_input_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin * 2,
    },
    title_text: {
        textAlign: 'center',
        fontSize: constants.font_size,
        color: constants.dark_text,
    },
    step_count: {
        fontSize: constants.font_size,
        color: constants.grey_2,
    },
    step_count_container: {
        height: '100%',
        justifyContent: 'center',
    },
    multi_input_container: {
        flexDirection: 'row',
        borderBottomColor: constants.line_color,
        borderBottomWidth: constants.pixel,
        width: constants.width-(constants.edge_margin*2),
        marginLeft: constants.edge_margin,
        height: constants.text_input_height,
    },
    input_title: {
        marginTop: constants.sub_section_margin,
        marginBottom: constants.sub_section_margin,
        marginLeft: constants.edge_margin,
        fontSize: constants.font_size,
        color: constants.dark_text,
    },
    step_text_input: {
        flex: 1,
        height: '100%',
        marginLeft: constants.edge_margin,
    },
    ingredient_text_input: {
        flex: 1,
        height: '100%',
        marginRight: constants.edge_margin,
        borderBottomColor: constants.line_color,
        borderBottomWidth: constants.pixel,
    },
    add_multi_button: {
        height: '100%',
        justifyContent: 'center',
        marginLeft: constants.edge_margin,
    },
    add_multi_button_ingredient: {
        position: 'absolute',
        height: '100%',
        justifyContent: 'center',
        right: constants.edge_margin,
    },
    ingredient_input_container: {
        flexDirection: 'row',
        width: constants.width-(constants.edge_margin),
        marginLeft: constants.edge_margin,
        height: constants.text_input_height,
    },
});

export default CreateScreen;
