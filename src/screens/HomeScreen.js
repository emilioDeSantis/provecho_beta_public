import React, {useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, Alert, TouchableOpacity } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SearchScreen from './SearchScreen'
import NotificationsScreen from './NotificationsScreen'
import FeedScreen from './FeedScreen'
import Stack from '../components/Stack'
import NotificationsIcon from '../assets/icons/notifications_icon.js'


import SearchIcon from '../assets/icons/search_icon.js'
import * as constants from '../constants';

const TabBar = ({ state, descriptors, navigation }) => {
    if (state.index != 1){
        return(<></>)
    }
    return (
        <View style={style.home_top_bar}>
            <TouchableOpacity
                key = 'search_screen'
                accessibilityRole="button"
                onPress={() => navigation.navigate('search')}
                style={style.search_button}
                activeOpacity={1}
            >
                <View style={style.round_button}>
                    <SearchIcon/>
                </View>
            </TouchableOpacity>
            <TouchableOpacity
                key = 'feed screen'
                style={style.home_bar_button}
                activeOpacity={1}
            >
                <Text style={[style.top_bar_text, style.home_top_bar_text]}>
                    feed
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                key = 'mentions_button'
                accessibilityRole="button"
                onPress={() => navigation.navigate('notifications')}
                style={style.mentions_button}
                activeOpacity={1}
            >
                <View style={style.round_button_right}>
                    <NotificationsIcon/>
                </View>
            </TouchableOpacity>
        </View>
    );
}

const Tab = createBottomTabNavigator();

function HomeScreenComp(props) {

    const user = props.user
    const set_user = props.set_user
    return (
        <Tab.Navigator tabBar={props => <TabBar {...props}/>} initialRouteName={'feed tab'}>
            <Tab.Screen name="search">
                {(props) => <SearchScreen {...props} user={user} set_user={set_user}/>}
            </Tab.Screen>
            <Tab.Screen name="feed tab">
                {() => <FeedScreen user={user}/>}
            </Tab.Screen>
            <Tab.Screen name="notifications">
                {(props) => <NotificationsScreen {...props} user={user} set_user={set_user}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

function HomeScreen(props) {

    const user = props.user
    const set_user = props.set_user
    const recent_recipes = props.recent_recipes
    const set_recent_recipes = props.set_recent_recipes
    return (
        <Stack user={user} set_user={set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}>
            {() => <HomeScreenComp user={user} set_user={set_user}/>}
        </Stack>
    );
}

const style = StyleSheet.create({
    home_top_bar: {
        height: constants.bar_height,
        flexDirection: 'row',
        backgroundColor: constants.top_bar_color,
        position: 'absolute',
        width: '100%',
        // borderBottomColor: '#dddfe0',
        // borderBottomWidth: .3,
        justifyContent: 'center',
    },
    home_top_bar_text: {
        color: '#999',
    },
    search_button: {
        position: 'absolute',
        backgroundColor: '#0000',
        width: 100,
        height: '100%',
        left: 0,
        paddingTop: 45,
        paddingLeft: 30
    },
    home_bar_button: {
        width: 100,
        backgroundColor: '#0000',
        alignItems: 'center',
    },
    top_bar_text: {
        fontSize: 18,
        marginTop: 55,
    },
    home_top_bar_text: {
        color: constants.header_color,
    },
    mentions_button: {
        position: 'absolute',
        backgroundColor: '#0000',
        width: 100,
        height: '100%',
        right: 0,
        paddingTop: 45,
        paddingRight: 30
    },
    round_button: {
        position: 'absolute',
        height: 16,
        width: 16,
        backgroundColor: constants.round_button_color,
        borderRadius: 1000,
        left: 40,
        top: 40,
    },
    round_button_right: {
        position: 'absolute',
        height: 16,
        width: 16,
        backgroundColor: constants.round_button_color,
        borderRadius: 1000,
        right: 30,
        top: 40,
    },
});

export default HomeScreen;