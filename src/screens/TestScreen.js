//Copyright 2020, Provecho, All rights reserved.

import 'react-native-gesture-handler';
import React, {useState, useEffect, Component} from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity, TextInput, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import { NavigationContainer, useNavigation, useNavigationState, } from '@react-navigation/native';
import EStyleSheet from 'react-native-extended-stylesheet'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView } from 'react-native-gesture-handler';
import * as feed from '../functions/feed'
var width = Dimensions.get('window').width;
var height = Dimensions.get('window').height;

const Screen1 = (props) => {
    const [state, set_state] = useState('init')

    return (
        <View style={{backgroundColor: '#fec', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center',}}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => set_state(text)}
                value={state}
            />    
            <TouchableOpacity
                onPress={() => {
                    props.navigation.push('screen 1')
                }}
            >
                <Text>push screen 1</Text>
            </TouchableOpacity>    
            <TouchableOpacity
                onPress={() => {
                    props.navigation.push('screen 2')
                }}
            >
                <Text>push screen 2</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('screen 2')
                }}
            >
                <Text>navoagte to screen 2</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
            >
                <Text>back</Text>
            </TouchableOpacity>  
        </View>
    )
}

const Screen2 = (props) => {
    const [state, set_state] = useState('init')

    return (
        <View style={{backgroundColor: '#fcb', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center',}}>        
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                onChangeText={text => set_state(text)}
                value={state}
            />  
            <TouchableOpacity
                onPress={() => {
                    props.navigation.push('screen 1')
                }}
            >
                <Text>push screen 1</Text>
            </TouchableOpacity>    
            <TouchableOpacity
                onPress={() => {
                    props.navigation.push('screen 2')
                }}
            >
                <Text>push screen 2</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                onPress={() => {
                    props.navigation.navigate('screen 1')
                }}
            >
                <Text>navoagte to screen 1</Text>
            </TouchableOpacity>  
            <TouchableOpacity
                onPress={() => {
                    props.navigation.goBack()
                }}
            >
                <Text>back</Text>
            </TouchableOpacity>    
        </View>
    )
}

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// const Test = () => {

//     return (
//         <NavigationContainer>
//             {/* <Stack.Navigator>
//                 <Stack.Screen name="screen 1">
//                     {(props) => <Screen1 {...props}/>}
//                 </Stack.Screen>
//                 <Stack.Screen name="screen 2">
//                     {(props) => <Screen2 {...props}/>}
//                 </Stack.Screen>
//             </Stack.Navigator> */}
//              <Tab.Navigator>
//                 <Tab.Screen name="screen 1">
//                     {(props) => <Screen1 {...props}/>}
//                 </Tab.Screen>                
//                 <Tab.Screen name="screen 2">
//                     {(props) => <Screen2 {...props}/>}
//                 </Tab.Screen>
//             </Tab.Navigator>
//         </NavigationContainer>
//     )
// }

// const Test = () => {

//     const [state, set_state] = useState('init')

//     return (
//         // <View style={{backgroundColor: '#fcb', height: '100%', width: '100%',}}>
//             <KeyboardAvoidingView style={{backgroundColor: '#fbc', flex: 1,}} behavior='padding'>
//                 <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
//                     <View style={{backgroundColor: '#a98', padding: 24, flex: 1, justifyContent: "space-around",}}>
//                         <TextInput
//                             style={{ height: 40, borderColor: "#000000", borderBottomWidth: 1, marginBottom: 36}}
//                             onChangeText={text => set_state(text)}
//                             value={state}
//                         /> 
//                     </View>
//                 </TouchableWithoutFeedback>
//             </KeyboardAvoidingView>
//         // </View>
//     )
// }

// const Test = () => {

//     return (
//         <View style={{backgroundColor: '#333', flex: 1,}}>
//             <View style={{position: 'absolute', backgroundColor: '#f2f2f2', height: 810, width: '100%', borderRadius: 40,  shadowColor: '#000', shadowRadius: 15, shadowOffset: {height: 25, width: 0}, shadowOpacity: .3, justifyContent: 'center', alignItems: 'center',}}>
//                 <ScrollView style={{position: 'absolute', backgroundColor: '#f2f2f2', height: 810, width: '100%', borderRadius: 40,  shadowColor: '#000', shadowRadius: 15, shadowOffset: {height: 25, width: 0}, shadowOpacity: .3,}}>
//                     <View style={{top: 400, alignSelf: 'center', position: 'absolute', backgroundColor: '#f2f2f2', height: 200, width: 160, borderRadius: 20, shadowColor: '#ddd', shadowRadius: 6, shadowOffset: {height: 8, width: 8}, shadowOpacity: 1,}}/>
//                     <View style={{top: 400, alignSelf: 'center',position: 'absolute', backgroundColor: '#f2f2f2', height: 200, width: 160, borderRadius: 20, shadowColor: '#fff', shadowRadius: 5, shadowOffset: {height: -5, width: -5}, shadowOpacity: 1, justifyContent: 'center', alignItems: 'center',}}>
//                         <View style={{alignSelf: 'center',borderWidth:3, borderColor: '#fd9', height: 40, width: 130, borderRadius: 10,}} />
//                     </View>
//                 </ScrollView>
//             </View>
//         </View>
//     )
// }

// const Test = () => {

//     return (
//         <View style={{backgroundColor: '#333', flex: 1,}}>
//             <View style={{position: 'absolute', backgroundColor: '#f2f2f2', height: 810, width: '100%', borderRadius: 40,  shadowColor: '#000', shadowRadius: 15, shadowOffset: {height: 25, width: 0}, shadowOpacity: .3, justifyContent: 'center', alignItems: 'center',}}>
//                 <TouchableOpacity
//                     onPress={() => {
//                         feed.test('n')
//                     }}
//                 >
//                     <Text>test</Text>
//                 </TouchableOpacity>  
//             </View>
//         </View>
//     )
// }

const Test = () => {
    console.log('styel',style);

    return (
        <View style={style.container}>
            <View style={style.item}/>
            <View style={style.item2}/>
            <View style={style.item3}/>
        </View>
    )
}

const center = {
    justifyContent: 'center',
    alignItems: 'center',
}

const style = StyleSheet.create({
    container: {
        ...center,
        backgroundColor: '#f0f0f0', 
        flex: 1,
    },
    item: {
        marginTop: 20,
        backgroundColor: '#e8376d', 
        width: '60%',
        aspectRatio: 2,
    },
    item2: {
        marginTop: 20,
        backgroundColor: '#c3e0d4', 
        width: '60%',
        aspectRatio: 2,
    },
    item3: {
        marginTop: 20,
        // backgroundColor: '#333999', 
        width: '60%',
        aspectRatio: 2,
    },
});

export default Test