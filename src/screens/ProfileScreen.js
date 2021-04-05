import React, {useEffect} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, Alert } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import * as global from '../functions/global'

import ChefScreen from './ChefScreen'
import Stack from '../components/Stack'

import AuthenticationScreen from './AuthenticationScreen'
import * as constants from '../constants';

function ProfileScreen(props) {

    const user = props.user
    const set_user = props.set_user
    const recent_recipes = props.recent_recipes
    const set_recent_recipes = props.set_recent_recipes
    if (props.user.is_logged_in) {
        return (
            <Stack user={user} set_user={set_user} recent_recipes={recent_recipes} set_recent_recipes={set_recent_recipes}>
                {() => <ChefScreen is_profile={true} user={user} set_user={set_user}/>}
            </Stack>

        );
    } else {
        return (
            <AuthenticationScreen user={props.user} set_user={props.set_user}/>
        );
    }
}

const style = StyleSheet.create({
    
});

export default ProfileScreen;