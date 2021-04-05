//Copyright 2020, Provecho, All rights reserved.

import React, {useEffect, useState} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity, Image, TextInput, } from 'react-native';
import { useNavigation, useRoute, useNavigationState } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import ChefComp from '../components/Chef'
import Animated from 'react-native-reanimated';

import PostComp from '../components/Post'
import PostPreview from '../components/PostPreview'


import AuthenticationScreen from './AuthenticationScreen'

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import BackButton from '../components/BackButton'
import NotificationsScreen from './NotificationsScreen'
import { AuthenticationDetails } from 'amazon-cognito-identity-js';
import Stream from '../components/Stream'
import ChefThumbnail from '../components/ChefThumbnail';
import FollowButton from '../components/FollowButton';


import Header from '../components/Header';
import * as constants from '../constants';
import AsyncButton from '../components/AsyncButton';

const ChefTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.chef_tab_bar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View style={isFocused ? [style.chef_tab_bar_button, style.chef_tab_bar_button_focused, constants.style.button_shadow] : style.chef_tab_bar_button}>
                        <Text style={isFocused ? style.chef_tab_focused_text : style.chef_tab_text}>
                            {label}
                        </Text>
                        <TouchableOpacity
                            key = {label}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={constants.style.press_padding}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

const Settings = (props) => {
    const [uri, set_uri] = useState(props.user.image)
    const [biography, set_biography] = useState(props.user.biography)
    const [name, set_name] = useState(props.user.name)
    const [username, set_username] = useState(props.user.username)

    const navigation = useNavigation()

    const update_user = async () => {
        const user = await global.update_user({user: props.user, uri, biography, name, username,})
        const new_user = {
            ...user,
            is_logged_in: true,
        }
        await props.set_user(new_user)
        navigation.goBack()
    }

    return (
        <>
            <Text style={constants.style.header}>edit profile</Text>
            <View style={style.settings_container}>
                <View style={style.update_container}>
                    <View style={style.no_image_button}>
                        <Text style={style.select_image_text}>update photo</Text>
                        <TouchableOpacity
                            style={constants.style.press_padding}
                            onPress={() => {
                                global.take_image(set_uri, true)
                            }}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={style.chef_thumbnail_large}>
                        <Image
                            style = {{
                                height: '100%',
                                borderRadius: 1000,
                            }}
                            source={{
                                uri,
                            }}
                        />
                    </View>
                </View>
                <View style={style.update_container_text}>
                    <Text style={style.title}>username: </Text>
                    <TextInput
                        style={style.update_input}
                        onChangeText={text => set_username(text)}
                        value={username}
                    />
                </View>    
                <View style={style.update_container_text}>
                    <Text style={[style.medium_text_size, style.dark_text]}>bio: </Text>
                    <TextInput
                        style={style.update_input}
                        onChangeText={text => set_biography(text)}
                        value={biography}
                    />
                </View>                
                <View style={style.update_container_text}>
                    <Text style={[style.medium_text_size, style.dark_text]}>name: </Text>
                    <TextInput
                        style={style.update_input}
                        onChangeText={text => set_name(text)}
                        value={name}
                    />
                </View>
                <AsyncButton 
                    style={style.submit_button}
                    text_style={style.edit_text}
                    text={'submit'}                    
                    onPress={() => {
                        update_user()
                    }}
                />
                <View style={style.auth_container}>
                    <AuthenticationScreen user={props.user} set_user={props.set_user} is_small={true}/>
                </View>
            </View>
            <BackButton/>
        </>
    )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const PostPreviews = ({user, chef, type}) => {

    const fetchPosts = async ({next_token, limit}) => {
        let fetch_posts = () => {}
        if (type == 'all') {
            fetch_posts = global.fetch_all_chef_posts
        }
        if (type == 'originals') {
            fetch_posts = global.fetch_original_chef_posts
        }
        if (type == 'saved') {
            fetch_posts = global.fetch_saved_chef_posts
        }
        const [posts, new_next_token] = await fetch_posts({chef, next_token, limit})
        return [posts, new_next_token]
    }

    return (
        <View style={style.feed_container}>
            <Stream user={user} n_columns={3} fetch={fetchPosts} format={storage.format_preview} cache_id={'chef_posts' + type + chef.id}>
                {item => (
                    <PostPreview post={item} user={user} n_columns={3}/>
                )}
            </Stream>
        </View>
    );
}

const ChefTabs = (props) => {
    chef = props.chef
    const user = props.user
    return(
        <View style={style.bottom_half}>
            <Tab.Navigator tabBar={props => <ChefTabBar {...props} />} initialRouteName={'all'}>
                <Tab.Screen name="all">
                    {(props) => <PostPreviews {...props} chef={chef} user={user} type={'all'}/>}
                </Tab.Screen>
                <Tab.Screen name="originals">
                    {(props) => <PostPreviews {...props} chef={chef} user={user} type={'originals'}/>}
                </Tab.Screen>
                <Tab.Screen name="save" options={{title:'saved'}}>
                    {(props) => <PostPreviews {...props} chef={chef} user={user} type={'saved'}/>}
                </Tab.Screen>
            </Tab.Navigator>
        </View>
    )
}

const ChefPannel = (props) => {

    const navigation = useNavigation()

    return (
        <View style={style.container}>
            {!props.is_profile && <Text style={constants.style.header}>{props.chef.username}</Text>}
            {props.is_profile && <Text style={constants.style.header}>profile</Text>}
                <View style={style.thumbnail_container}>
                    <ChefThumbnail chef={props.chef} is_large={true} user={props.user}/>
                </View>
                {props.is_profile && <View style={style.edit_button}>
                    <Text style={style.edit_text}>edit profile</Text>
                    <TouchableOpacity
                        style={constants.style.press_padding}
                        onPress={() => navigation.navigate('settings')}
                        activeOpacity={1}
                    >
                    </TouchableOpacity> 
                </View>}
                {!props.is_profile && <FollowButton chef={props.chef} user={props.user} is_chef_screen={true}/>}
                <View style={style.stats_container}>
                    <View style={style.stat_container}>
                        <Text style={style.stat_number}>{props.chef.n_followers}</Text>
                        <Text style={style.stat_word}>followers</Text>
                        <TouchableOpacity
                            style={constants.style.press_padding}
                            onPress={async() => {
                                navigation.navigate('follow modal', 'followers')
                            }}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={style.stat_container}>
                        <Text style={style.stat_number}>{props.chef.n_following}</Text>
                        <Text style={style.stat_word}>following</Text>
                        <TouchableOpacity
                            style={constants.style.press_padding}
                            onPress={async() => {
                                navigation.navigate('follow modal', 'followers')
                            }}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                    <View style={style.stat_container}>
                        <View style={constants.style.button_container}>
                            <Text style={style.stat_number}>{props.chef.n_remakes}</Text>
                            <Text style={style.stat_word}>remakes</Text>
                        </View>
                    </View>
                </View>
                <Text style={style.bio}>{props.chef.biography}</Text>
            <ChefTabs chef={props.chef} user={props.user}/>
            {!props.is_profile && <BackButton is_right={false}/>}
        </View>
    );
}

function ChefScreenComp(props) {
    const is_profile = props.is_profile
    const chef = props.chef
    const user = props.user
    const set_user = props.set_user

    const navigation = useNavigation();

    if (is_profile) {
        return (
            <Stack.Navigator headerMode ={'none'}>
                <Stack.Screen name="chef pannel">
                    {(props) => <ChefPannel {...props} is_profile={is_profile} chef={chef} user={user}/>}
                </Stack.Screen>
                <Stack.Screen name="settings">
                    {(props) => <Settings {...props} user={user} set_user={set_user}/>}
                </Stack.Screen>
            </Stack.Navigator>
        );
    } else {
        return (
            <ChefPannel chef={chef} is_profile={is_profile} user={user}/>
        )
    }
}







const FollowStream = (props) => {

    const fetch_idols = async ({next_token, limit}) => {
        const [chefs, new_next_token] = await global.fetch_idols({chef: props.chef, next_token, limit})
        return [chefs, new_next_token]
    }
    const fetch_followers = async ({next_token, limit}) => {
        const [chefs, new_next_token] = await global.fetch_followers({chef: props.chef, next_token, limit})
        return [chefs, new_next_token]
    }
    const format_chef = async (chef) => {
        const new_chef = await global.format_chef({user: props.user, chef})
        return new_chef
    }

    return (
        <View style={style.follow_container}>
            <Stream fetch={props.is_followers ? fetch_followers : fetch_idols} user={props.user} format={format_chef} cache_id={'chef_follows' + props.is_followers + props.chef.id}>
                {item => (
                    <ChefComp chef={item} user={props.user} n_columns={1}/>
                )}
            </Stream>
        </View>
    );
}




const FollowTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.follow_modal_tab_bar}>
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                        ? options.tabBarLabel
                        : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <View style={isFocused ? [style.follow_modal_tab_bar_button, style.follow_modal_tab_bar_button_focused, constants.style.button_shadow] : style.follow_modal_tab_bar_button}>
                        <Text style={isFocused ? style.follow_tab_focused_text : style.follow_tab_text}>{label}</Text>
                        <TouchableOpacity
                            key = {label}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={constants.style.press_padding}
                            activeOpacity={1}
                        >
                        </TouchableOpacity>
                    </View>
                );
            })}
        </View>
    );
}

const FollowTab = createBottomTabNavigator();

const FollowModal = (props) => {
    const user = props.user

    const chef = props.chef

    const navigation = useNavigation()

    const route = useRoute();

    const route_name = route.params
    return (
        <View style={style.like_modal_container}>
            <TouchableOpacity
                key = 'back to post'
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={style.like_back_button}
                activeOpacity={1}
            >
            </TouchableOpacity>
            <View style={style.like_modal}>
                <FollowTab.Navigator tabBar={props => <FollowTabBar {...props} />} initialRouteName={route_name}>
                    <FollowTab.Screen name="followers">
                        {(props) => <FollowStream {...props} chef={chef} user={user} is_followers={true}/>}
                    </FollowTab.Screen>
                    <FollowTab.Screen name="following">
                        {(props) => <FollowStream {...props} chef={chef} user={user} is_followers={false}/>}
                    </FollowTab.Screen>
                </FollowTab.Navigator>
            </View>
        </View>
    )
}





const ModalStack = createStackNavigator();

const ChefScreen = (props) => {
    
    const is_profile = props.is_profile
    const user = props.user
    const set_user = props.set_user

    const route = useRoute();

    const chef = is_profile ? props.user : route.params.chef;

    return (
        <ModalStack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <ModalStack.Screen name="chef screen">
                {(props) => <ChefScreenComp {...props} chef={chef} is_profile={is_profile} user={user} set_user={set_user}/>}
            </ModalStack.Screen>
            <ModalStack.Screen name="follow modal">
                {(props) => <FollowModal {...props} chef={chef} is_profile={is_profile} user={user}/>}
            </ModalStack.Screen>
        </ModalStack.Navigator>
    )
}

const style = StyleSheet.create({
    chef_tab_bar: {
        flexDirection: 'row',
        height: constants.chef_tab_bar_height,
        backgroundColor: constants.white,
        position: 'absolute',
        width: '100%',
        top: -constants.sub_tab_radius,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: constants.sub_tab_radius,
        borderTopStartRadius: constants.sub_tab_radius,
    },
    chef_tab_bar_button_focused: {
        backgroundColor: constants.yellow,
    },
    chef_tab_bar_button: {
        marginLeft: constants.chef_tab_button_margin / 2,
        marginRight: constants.chef_tab_button_margin / 2,
        backgroundColor: constants.light_grey,
        height: constants.thick_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.chef_tab_button_width,
    },
    chef_tab_text: {
        color: constants.dark_grey,
        fontSize: constants.small_font_size,
    },
    chef_tab_focused_text: {
        color: constants.white,
        fontSize: constants.small_font_size,
    },
    edit_button: {
        marginTop: constants.sub_section_margin,
        backgroundColor: constants.yellow,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin_large * 2,
    },
    submit_button: {
        marginTop: constants.section_margin,
        backgroundColor: constants.yellow,
        height: constants.thin_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.width - constants.edge_margin_large * 2,
    },
    edit_text: {
        textAlign: 'center',
        fontSize: constants.font_size,
        color: constants.white,
    },
    feed_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: constants.chef_tab_bar_height - constants.sub_tab_radius, 
        backgroundColor: constants.white,
    },
    follow_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: constants.chef_tab_bar_height - constants.sub_tab_radius, 
        backgroundColor: constants.dark_modal_color,
    },
    follow_modal_tab_bar: {
        flexDirection: 'row',
        height: constants.chef_tab_bar_height,
        position: 'absolute',
        width: '100%',
        top: -constants.sub_tab_radius,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopEndRadius: constants.sub_tab_radius,
        borderTopStartRadius: constants.sub_tab_radius,
        backgroundColor: constants.dark_modal_color,
    },
    follow_modal_tab_bar_button: {       
        marginLeft: constants.chef_tab_button_margin / 2,
        marginRight: constants.chef_tab_button_margin / 2,
        backgroundColor: constants.light_grey,
        height: constants.thick_button_height,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 1000,
        width: constants.chef_tab_button_width,
    },    
    follow_modal_tab_bar_button_focused: {
        backgroundColor: constants.yellow,
    },    
    follow_tab_text: {
        color: constants.dark_grey,
        fontSize: constants.small_font_size,
    },
    follow_tab_focused_text: {
        color: constants.white,
        fontSize: constants.small_font_size,
    },
    like_modal_container: {
        flex: 1,
        backgroundColor: '#fff0',
    },
    like_modal: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        top: constants.high_modal_top,
        backgroundColor: constants.dark_modal_color,
    },
    like_back_button: {
        width: constants.width,
        height: constants.height,
        backgroundColor: '#fff0',
        position: 'absolute',
    },
    container: {
        height: '100%',
        width: '100%',
        backgroundColor: constants.light_grey,
        alignItems: 'center',
    },
    thumbnail_container: {
        marginTop: constants.section_margin,
    },
    stats_container: {
        flexDirection: 'row',
        // justifyContent: 'center',
        // backgroundColor: '#f62',
    },
    stat_container: {
        // alignItems: 'center',
        marginTop: constants.sub_section_margin,
        marginLeft: constants.stat_box_margin,
        marginRight: constants.stat_box_margin,
        // backgroundColor: '#5fd3',
        width: constants.stat_box_width,
    },
    stat_number: {
        lineHeight: constants.large_font_size,
        textAlign: 'left',
        fontSize: constants.large_font_size,
        color: constants.dark_text,
        // backgroundColor: '#4f64',
    },
    stat_word: {
        textAlign: 'left',
        lineHeight: constants.small_font_size,
        fontSize: constants.small_font_size,
        color: constants.dark_text,
        // backgroundColor: '#f663',
    },
    bio: {
        marginTop: constants.sub_section_margin - constants.font_size * constants.text_top,
        marginLeft: constants.edge_margin_large,
        marginRight: constants.edge_margin_large,
        textAlign: 'left',
        fontSize: constants.font_size,
        color: constants.dark_text,
        // backgroundColor: '#f663',
    },
    bottom_half: {
        marginTop: constants.sub_section_margin + constants.sub_tab_radius - constants.font_size * constants.text_bottom,
        width: '100%',
        flex: 1,
        backgroundColor: constants.white,
    },
    settings_container: {
        alignItems: 'center',
        marginTop: constants.header_margin_bottom,
        marginRight: constants.edge_margin,
        marginLeft: constants.edge_margin,
    },
    update_container: { 
        flexDirection: 'row',
        alignItems : 'center',
        width: '100%',
        justifyContent: 'space-between'
    },
    update_container_text: { 
        flexDirection: 'row',
        alignItems : 'center',
        width: '100%',
        justifyContent: 'space-between',
        height: constants.text_input_height,
        borderBottomColor: constants.line_color,
        borderBottomWidth: constants.pixel,
    },
    chef_thumbnail_large: {
        backgroundColor: constants.loading_color,
        width: constants.large_thumbnail_width,
        aspectRatio: 1,
        borderRadius: 3000,
    },
    title: {
        fontSize: constants.font_size,
        color: constants.dark_text,
    },
    update_input: {
        color: constants.dark_text,
        fontSize: constants.font_size,
    },
    auth_container: {
        marginTop: constants.section_margin,
    },
});

export default ChefScreen;



