//Copyright 2020, Provecho, All rights reserved.

import React, {useState} from 'react';
import { StyleSheet, Dimensions, Text, Button, View, TouchableOpacity, TextInput, Image } from 'react-native';
import ImageButton from '../components/ImageButton'
import * as storage from '../functions/storage'
import * as global from '../functions/global'
import * as constants from '../constants';

const ConfirmSignUp = (props) => {
    const [code, setCode] = useState('')
    const onSubmit = async () => {
        try {
            await global.confirm_signup({email: props.email, password: props.password, code,})
            await props.set_screen('createProfile')
            props.set_password('')
        } catch (error) {
            alert(error.message)
        }
    }
    if(props.screen === 'confirmSignUp')
        return (
            <View>
                <Text>confirm sign up</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => setCode(text)}
                    placeholder={'code'}
                    keyboardType={'numbers-and-punctuation'}
                    value={code}
                />
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

export default ConfirmSignUp