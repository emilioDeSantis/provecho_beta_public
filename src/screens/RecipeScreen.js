//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect,} from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Image, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation, useRoute,} from '@react-navigation/native';
import KeepAwake from 'react-native-keep-awake';
import Animated from 'react-native-reanimated';

import BackButton from '../components/BackButton'
import ChefThumbnail from '../components/ChefThumbnail';
import RemakeButton from '../components/RemakeButton'
import SaveButton from '../components/SaveButton'
import { ScrollView } from 'react-native-gesture-handler';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import * as constants from '../constants';

//i just left all this stuff in here in case you want to use it but feel free to redo anything
//the only thing that needs to stay is the logic inside the recipe screen component that says update stack and set recent

const CheckList = () => {
    return <View style={{height: 300, width: constants.width,}}/>
}

const TabBar = ({ state, descriptors, navigation, position, user, recipe}) => {
    return (
        <View style={{ flexDirection: 'row' }}>
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
                        canPreventDefault: true,
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
        
                const inputRange = state.routes.map((_, i) => i);
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0)),
                });
        
                return (
                    <TouchableOpacity
                        key={label}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={{ flex: 1 }}
                    >
                    <Animated.Text style={{ opacity }}>
                        {label}
                    </Animated.Text>
                    </TouchableOpacity>
                );
            })}
            <SaveButton user={user} recipe={recipe} />
            <RemakeButton recipe={recipe} user={user}/>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

function Instructions (props) {

    const recipe = props.recipe
    const user = props.user

    return (
        <Tab.Navigator tabBar={props => <TabBar {...props} recipe={recipe} user={user}/>}>
            <Tab.Screen name="ingredients">
                {(props) => <CheckList {...props} ingredients={recipe.postIngredients}/>}
            </Tab.Screen>
            <Tab.Screen name="instructions">
                {(props) => <CheckList {...props} procedure={recipe.procedure}/>}
            </Tab.Screen>
        </Tab.Navigator>
    );
}

const RecipeImages = (props) => {
    return (
        <View style={{width: constants.width, height: 800,}}>
            <ScrollView 
                    style={style.post_scroll} 
                    decelerationRate={0} 
                    snapToInterval={constants.width} 
                    snapToAlignment={'center'} 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                >
                {props.recipe.image.map((uri) => {
                    return (
                        <View style={{width: constants.width, height: constants.width*1.25, backgroundColor: '#999',}} key={uri}>
                            <Image
                                style = {{
                                    position: 'absolute', 
                                    height: '100%', 
                                    width: '100%', 
                                    backgroundColor: '#f47'
                                }}
                                source={{
                                    uri,
                                }}
                            />
                        </View>
                    )
                })}
            </ScrollView>
        </View>
    )
}

function RecipeComp(props) {

    const navigation = useNavigation();
    const recipe = props.recipe
    console.log("recipe.ingredients")
    console.log(recipe)

    return (
        <View style={{width: '100%', height: '100%'}}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <RecipeImages recipe={recipe}/>
                <ChefThumbnail chef={recipe.chef} user={props.user}/>
                <Text>{recipe.chef.username}</Text>
                <Text>{recipe.n_tips}</Text>                
                <TouchableOpacity 
                    style= {style.number}
                    onPress={() => {
                        navigation.push('tip modal', recipe)
                    }}
                >
                    <Text style={style.number_text}>tips</Text>
                </TouchableOpacity>
                <Text>cooktime: {recipe.cook_time} mins</Text>
                <Text>serves {recipe.serves}</Text>
                <Text>PROCEDURE</Text>
                {recipe.procedure.map(step => (
                    <Text>{step}</Text>
                ))}
                <Instructions recipe={recipe} user={props.user}/>
            </ScrollView>
            <KeepAwake />
        </View>
    )
}

function TipModal (props) {


    const navigation = useNavigation();

    const route = useRoute();

    return (
        <View style={style.like_modal_container}>
            <TouchableOpacity
                key = 'back to post'
                accessibilityRole="button"
                onPress={() => navigation.goBack()}
                style={style.like_back_button}
            >
            </TouchableOpacity>
            <View style={style.like_modal}>
            </View>
        </View>
    );
}

const Stack = createStackNavigator();

const RecipeScreen = (props) => {

    const user = props.user

///////////dont delete this//////////////
    const route = useRoute()

    const recipe = route.params.recipe

    const update_stack = async ({stack, item}) => {
        let new_item = {...item}
        let new_stack = [...stack]
        let n = 0
        let is_unique = true
        new_stack.every((element) => {
            if (element.id == new_item.id) {
                new_stack.unshift(new_stack.splice(n, 1)[0])
                is_unique = false
                return false
            }        
            n ++
            return true
        })
        if (is_unique) {              
            const new_image = [new_item.image[0]]
            delete new_item.image
            new_stack.unshift({
                ...new_item,
                image: new_image
            })
        }
        return new_stack
    }

    const set_recent = async () => {
        const new_recents = await update_stack({stack: props.recent_recipes, item: route.params.recipe,})
        props.set_recent_recipes(new_recents)
    }

    useEffect(() => {
        set_recent()
    }, [route.params])
/////////////////////////////////////


    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
                cardStyle: { backgroundColor: 'transparent' },
                cardOverlayEnabled: true,
            }}
            mode="modal"
        >
            <Stack.Screen name="recipe screen">
                {(props) => <RecipeComp {...props} user={user} recipe={recipe}/>}
            </Stack.Screen>
            <Stack.Screen name="tip modal">
                {(props) => <TipModal {...props} user={user}/>}
            </Stack.Screen>
        </Stack.Navigator>
    )
}

const style = StyleSheet.create({
    post_scroll: {
        position: 'absolute',
        top: 70,
        backgroundColor: constants.white,
        width: constants.width,
        height: constants.width*1.25+80,
        flexDirection: 'row',
    },
    number: {
        top: 5,
        left: 10,
    },
    number_text: {
        color: constants.dark_grey,
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
        top: '20%',
        backgroundColor: constants.white,
    },
    like_back_button: {
        height: constants.height,
        width: constants.width,
        backgroundColor: '#fff0',
        position: 'absolute',
    },
})

export default RecipeScreen;