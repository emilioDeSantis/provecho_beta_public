//Copyright 2020, Provecho, All rights reserved.

import 'react-native-gesture-handler';
import React, {useState, useEffect,} from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Dimensions } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

import CreateScreen from './screens/CreateScreen'
import HomeScreen from './screens/HomeScreen'
import ProfileScreen from './screens/ProfileScreen'
import LoadingScreen from './screens/LoadingScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import CreateIcon from './assets/icons/create_icon.js'
import HomeIcon from './assets/icons/home_icon.js'
import ProfileIcon from './assets/icons/profile_icon.js'

import * as constants from './constants';
import * as global from './functions/global'
import Test from './components/Test'

import TestScreen from './screens/TestScreen'

const TabBar = ({ state, descriptors, navigation }) => {
    return (
        <>
            <View style={style.bottom_bar}>
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
                        <TouchableOpacity
                            key = {label}
                            accessibilityRole="button"
                            accessibilityState={isFocused ? { selected: true } : {}}
                            accessibilityLabel={options.tabBarAccessibilityLabel}
                            testID={options.tabBarTestID}
                            onPress={onPress}
                            onLongPress={onLongPress}
                            style={style.bottom_bar_button}
                            activeOpacity={1}
                        >
                        {label == 'home' && 
                            <View style={style.tab_button_container}>
                                <HomeIcon is_focused={isFocused}/>
                                {/* <Text style={[style.tab_button_text, {color: isFocused ? constants.icon_filled_color : constants.bottom_icon_color}]}>home</Text> */}
                            </View>}
                        {label == 'create' &&                        
                            <View style={style.tab_button_container}>
                                <CreateIcon is_focused={isFocused}/>
                                {/* <Text style={[style.tab_button_text, {color: isFocused ? constants.icon_filled_color : constants.bottom_icon_color}]}>create</Text> */}
                            </View>}
                        {label == 'profile' && 
                            <View style={style.tab_button_container}>
                                <ProfileIcon is_focused={isFocused}/>
                                {/* <Text style={[style.tab_button_text, {color: isFocused ? constants.icon_filled_color : constants.bottom_icon_color}]}>profile</Text> */}
                            </View>}
                        </TouchableOpacity>
                    );
                })}
            </View>
        </>
    );
}

const App = () => {

    const [user, set_user] = useState('loading')
    const [recent_recipes, set_recent_recipes] = useState([])  

    const inititalize = async () => {
        const auth_user = await global.get_auth_user()
        if(auth_user && auth_user != 'no_profile'){
            set_user({
                ...auth_user,
                is_logged_in: true,
            })
        } else{
            set_user({is_logged_in: false})
        }
    }

    useEffect(() => {
        inititalize()
    },[])  

    const Tab = createBottomTabNavigator();
    // return(
    //     <TestScreen/>
    // )

    if (user == 'loading') {
        return (
            <LoadingScreen/>
        )
    } else {
        return (
            <NavigationContainer>
                <StatusBar barStyle="dark-content"/>
                <Tab.Navigator tabBar={props => <TabBar {...props} />}>
                    <Tab.Screen name="home">
                        {(props) => <HomeScreen {...props} user={user} set_user={set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}/>}
                    </Tab.Screen>
                    <Tab.Screen name="create">
                        {(props) => <CreateScreen {...props} user={user} set_user={set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}/>}
                    </Tab.Screen>
                    <Tab.Screen name="profile">
                        {(props) => <ProfileScreen {...props} user={user} set_user={set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}/>}
                    </Tab.Screen>
                    {/* <Tab.Screen name="test">
                        {(props) => <Test {...props} user={user} set_user={set_user}/>}
                    </Tab.Screen> */}
                </Tab.Navigator>
            </NavigationContainer>
        )
    }
}


const style = StyleSheet.create({
    bottom_bar: {
        height: constants.bar_height,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: constants.bottom_bar_color,
        width: '100%',
        // borderTopColor: constants.border_color,
        // borderTopWidth: constants.pixel,
    },
    bottom_bar_button: {
        // flex: 1,
        height: constants.bar_height,
        width: constants.bottom_bar_button_width,
        // alignItems: 'center',
        // paddingTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    tab_button_container:{
        alignItems: 'center',
        paddingTop: constants.bottom_icon_margin_top,
    },
    tab_button_text:{
        textAlign: 'center',
        marginTop: 8,
        fontSize: constants.small_font_size,
    },
});




export default App
