import React, {useState} from 'react';
import { StyleSheet, Dimensions, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';
import { validateUsername, validateEmail, validatePassword} from '../functions/validation'

import { Auth } from 'aws-amplify';
import * as constants from '../constants';
import * as global from '../functions/global'

const SignUp = (props) => {
    const [error, setError] = useState({
        password: '',
        email: '',
    })
    console.log('error',error);
    const onSubmit = async () => {
        const passwordError = validatePassword(props.password)
        const emailError = validateEmail(props.email)
        if(emailError || passwordError)
            setError({password: passwordError, email: emailError})
        else {
            try {
                const auth_user = await Auth.signUp({
                    username: props.email,
                    password: props.password,
                })
                props.set_auth_user(auth_user)
                props.set_screen('confirmSignUp')
            } catch (error) {
                alert(error.message)
            }
        }
    }
    if(props.screen === 'signUp')
        return (
            <View>               
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => props.set_screen('signIn')}
                >
                    <Text>sign in</Text>
                </TouchableOpacity>
                <Text                    
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#2f8'
                    }}>sign up</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.set_password(text)}
                    placeholder={'password'}
                    secureTextEntry={true}
                    value={props.password}
                />
                <Text>{error.password}</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => props.set_email(text)}
                    placeholder={'email'}
                    value={props.email}
                />
                <Text>{error.email}</Text>
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

export default SignUp