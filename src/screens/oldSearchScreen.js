//Copyright 2020, Provecho, All rights reserved.

import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, View, Text, Button, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StackActions, useNavigationState } from '@react-navigation/native';
import Stream from '../components/Stream'

import RecipeSearchScreen from './RecipeSearchScreen'
import HashtagSearchScreen from './HashtagSearchScreen'
import ChefSearchScreen from './ChefSearchScreen'

import SearchBar from '../components/SearchBar'

import ChefComp from '../components/Chef'

import * as global from '../functions/global'
import * as constants from '../constants';


const SearchTabBar = ({ state, descriptors, navigation }) => {
    return (
        <View style={style.search_tab_bar}>
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
                        style={style.search_tab_bar_button}
                        activeOpacity={1}
                    >
                        <Text style={[isFocused ? style.yellow_text : style.dark_text, style.medium_text_size]}>
                            {label}
                        </Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}


const FilterBar = (props) => {
    const delete_filter = async (name, is_ingredient) => {
        let new_array = is_ingredient ? [...props.ingredient_filters] : [...props.hashtag_filters]
        var index = new_array.indexOf(name);
        if (index !== -1) {
            new_array.splice(index, 1);
        }
        if (is_ingredient) {
            await props.set_ingredient_filters(new_array)
        } else {
            await props.set_hashtag_filters(new_array)
        }
    }
    return(
        <View style={style.filter_bar}>
            {props.hashtag_filters.map(name => {
                return(
                <TouchableOpacity 
                    style={style.wide_button_filled}
                    onPress={() => delete_filter(name)}
                    activeOpacity={1}
                >
                    <Text style={[style.medium_text_size, style.dark_text]}>#{name}</Text>
                </TouchableOpacity>
                )
            })}
            {props.ingredient_filters.map(name => {
                return(
                <TouchableOpacity 
                    style={style.wide_button_filled}
                    onPress={() => delete_filter(name, true)}
                    activeOpacity={1}
                >
                    <Text style={[style.medium_text_size, style.dark_text]}>#{name}</Text>
                </TouchableOpacity>
                )
            })}
        </View>
    )
}

const Tab = createBottomTabNavigator();

function Search (props) {
    const user = props.user

    const [search, setSearch] = useState('')
    const [hashtag_filters, set_hashtag_filters] = useState ([])
    const [ingredient_filters, set_ingredient_filters] = useState ([])
    
    const on_return = async (text) => {
        const array = await global.toArray(text)
        await setSearch(array)
    }

    //save array of serahc itens in each screen and retrun sets the array and runs the firts load fucntion


//testing only
    const fetchChefs = async () => {
        const chefs = await global.fetch_chefs({user: props.user})
        return chefs
    }

    const format_chef = async (chef) => {
        const new_chef = await global.format_chef({user: props.user, chef})
        return new_chef
    }

    return (
        <>
            <View style={{flexDirection:'row', top: 0,  alignItems: 'center', justifyContent: 'center' }}>
                <SearchBar on_return={on_return}></SearchBar>
            </View>
            <Tab.Navigator tabBar={props => <SearchTabBar {...props} />} initialRouteName={'ingredient search'}>
                <Tab.Screen name="recipe search" options={{title:'recipes'}}>
                    {(props) => <RecipeSearchScreen {...props} search={search} hashtag_filters={hashtag_filters} ingredient_filters={ingredient_filters} user={user}/>}
                </Tab.Screen>
                <Tab.Screen name="ingredient search" options={{title:'ingredients'}}>
                    {(props) => <HashtagSearchScreen {...props} search={search} set_filters={set_ingredient_filters} user={user} filters={ingredient_filters} is_ingredients={true}/>}
                </Tab.Screen>
                <Tab.Screen name="hashtag search" options={{title:'hashtags'}}>
                    {(props) => <HashtagSearchScreen {...props} search={search} set_filters={set_hashtag_filters} user={user} filters={hashtag_filters} is_ingredients={false}/>}
                </Tab.Screen>
                <Tab.Screen name="chef search" options={{title:'people'}}>
                    {(props) => <ChefSearchScreen {...props} search={search} user={user}/>}
                </Tab.Screen>
            </Tab.Navigator>
            <FilterBar hashtag_filters={hashtag_filters} set_hashtag_filters={set_hashtag_filters} ingredient_filters={ingredient_filters} set_ingredient_filters={set_ingredient_filters}/>
        </>
    );
}

const style = StyleSheet.create({
    search_tab_bar: {
        top: 100,
        height: constants.sub_bar_height+10,
        flexDirection: 'row',
        backgroundColor: '#f98',
        position: 'absolute',
        width: '100%',
        borderBottomColor: '#dddfe0',
        borderBottomWidth: .3,
    },
    search_tab_bar_button: {
        flex: 1,
        backgroundColor: constants.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    yellow_text: {
        color: constants.yellow
    },
    dark_text: {
        color: constants.dark_grey
    },
    medium_text_size: {
        fontSize: constants.medium_text_size,
    },
    filter_bar: {
        width: constants.width,
        height: 50,
        backgroundColor: constants.dark_grey,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
    },
    wide_button_filled: {
        height: constants.button_height,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 1000,
        backgroundColor: constants.yellow,
        alignItems: 'center', 
        justifyContent: 'center', 
    },
});

export default Search;