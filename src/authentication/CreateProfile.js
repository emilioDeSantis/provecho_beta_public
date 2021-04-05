//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, Text, Button, View, TouchableOpacity, TextInput, Image } from 'react-native';
import ImageButton from '../components/ImageButton'
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import * as constants from '../constants';
import { validateUsername, validatePassword, validateEmail, validateName} from '../functions/validation'

const ProfilePicturePreview = (props) => {
    if (props.uri) {
        return (
            <View style={{ height: 200, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    style={{ height: 100, width: 100, borderRadius: 1000, }}
                    source={{uri: props.uri}}
                />
                <TouchableOpacity
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 50,
                        backgroundColor: '#3b9',
                        position: 'absolute',
                    }}
                    onPress={() => props.setUri(null)}
                >
                    <Text>x</Text>
                </TouchableOpacity>
            </View>
        );
    } else {
        return (
            <View style={{ height: 100, alignItems: 'center', justifyContent: 'center' }}>
                <Text>no image selected</Text>
            </View>
        )
    }
}

const createProfile = (props) => {
    const [error, setError] = useState({
        username: '',
        name: '',
    })
    const [username, setUsername] = useState('')
    const [biography, setBiography] = useState('')
    const [uri, setUri] = useState(null)
    const [name, setName] = useState('')
    const onSubmit = async () => {
        const usernameError = validateUsername(props.username)
        const nameError = validateName(name)
        setError({username: usernameError, name: nameError})
        if(usernameError || nameError) {
            return
        }
        else { 
            try {
                if (!username) {
                    alert('add username')
                    return
                }
                const is_username_taken = await global.is_username_taken(username)
                if(is_username_taken){
                    setError({username: 'username is taken', })
                    return
                }
                const formatted_chef = await global.create_user({username, biography, uri, name,})
                if(formatted_chef){
                    await props.set_screen('signedIn')
                    await props.set_user({
                        ...formatted_chef,
                        is_logged_in: true,
                    })
                }
            } catch (error) {
                console.log(error.message)
                alert('failed to create profile')
            }
        }
    }
    if(props.screen === 'createProfile')
        return (
            <View>
                <Text>create profile</Text>
                <ImageButton isCamera={true} setUri={setUri} is_profile_picture={true}></ImageButton>
                <ImageButton isCamera={false} setUri={setUri} is_profile_picture={true}></ImageButton>
                <ProfilePicturePreview uri={uri} setUri={setUri}/>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setUsername(text)}
                    placeholder={'username'}
                    value={username}
                />
                <Text>{error.username}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setBiography(text)}
                    placeholder={'biography'}
                    value={biography}
                />                
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setName(text)}
                    placeholder={'full name'}
                    value={name}
                />
                <Text>{error.name}</Text>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => onSubmit()}
                >
                    <Text>submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.set_screen('signIn')}
                >
                    <Text>back to sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.set_screen('signUp')}
                >
                    <Text>back to sign up</Text>
                </TouchableOpacity>
            </View>
        )
    else return <></>
}

const style = StyleSheet.create({

});

export default createProfile