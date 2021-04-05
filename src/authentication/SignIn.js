import React, {useState} from 'react';
import { StyleSheet, Dimensions, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';
import { validateUsername, validatePassword, validateEmail} from '../functions/validation'

import * as storage from '../functions/storage'
import * as global from '../functions/global'
import * as constants from '../constants';


const SignIn = (props) => {
    const [error, setError] = useState({
        email: '',
        password: '',
    })
    const onSubmit = async () => {
        const emailError = validateEmail(props.email)
        const passwordError = validatePassword(props.password)
        if(passwordError || emailError)
            setError({email: emailError, password: passwordError})
        else {
            try {
                await global.sign_in(props.email, props.password)
                props.set_password('')
                const auth_user = await global.get_auth_user()
                if(auth_user){
                    if(auth_user == 'no_profile'){
                        props.set_screen('createProfile')
                    } else {
                        await props.set_user({
                            ...auth_user,
                            is_logged_in: true,
                        })
                        props.set_screen('signedIn')
                    }
                } else {
                    alert('account does not exist')
                }
            } catch (error) {
                alert(error.message)
            }
        }
    }
    if(props.screen === 'signIn')
        return (
            <View>
                <Text                    
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#2f6'
                    }}>sign in</Text>                
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.set_screen('signUp')}
                >
                    <Text>sign up</Text>
                </TouchableOpacity>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.set_email(text)}
                    placeholder={'email'}
                    value={props.email}
                />
                <Text>{error.email}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.set_password(text)}
                    placeholder={'password'}
                    secureTextEntry={true}
                    value={props.password}
                />
                <Text>{error.password}</Text>
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
                    onPress={() => props.set_screen('confirmSignUp')}
                >
                    <Text>confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.set_screen('createProfile')}
                >
                    <Text>create profile</Text>
                </TouchableOpacity>
            </View>
        )
    else return <></>
}

const style = StyleSheet.create({
    
});

export default SignIn

