import React, {useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, Alert } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as global from '../functions/global'

import NotificationsScreen from '../screens/NotificationsScreen'
import ChefScreen from '../screens/ChefScreen'
import RecipeScreen from '../screens/RecipeScreen'
import PostScreen from '../screens/PostScreen'
import RemakesScreen from '../screens/RemakesScreen'


import AuthenticationScreen from '../screens/AuthenticationScreen'
import * as constants from '../constants';


const Stack = createStackNavigator();

function StackComp(props) {

    const user = props.user
    const set_user = props.set_user
    const children = () => props.children()
    recent_recipes = props.recent_recipes
    set_recent_recipes = props.set_recent_recipes
    return (
        <Stack.Navigator headerMode={'none'} initialRouteName={'home screen'}>
            <Stack.Screen name="home screen">
                {() => children()}
            </Stack.Screen>
            <Stack.Screen name="chef">
                {() => <ChefScreen is_profile={false} user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="recipe">
                {(props) => <RecipeScreen {...props} user={user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}/>}
            </Stack.Screen>
            <Stack.Screen name="post">
                {() => <PostScreen user={user}/>}
            </Stack.Screen>
            <Stack.Screen name="remakes" options={{gestureDirection: 'horizontal-inverted'}}>
                {() => <RemakesScreen user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    
});

export default StackComp;