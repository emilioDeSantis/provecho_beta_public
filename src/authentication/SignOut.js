import React, {useState} from 'react';
import { StyleSheet, Dimensions, Text, Button, View, TouchableOpacity, TextInput } from 'react-native';

import * as global from '../functions/global'
import * as constants from '../constants';

const SignOut = (props) => {
console.log('propsddd..', props);
    const onSubmit = async () => {
        try {
            await global.sign_out()
            await props.set_screen('signIn')
            await props.set_auth_user(null)
            await props.set_user({is_logged_in: false})
        } catch (error) {
            alert(error.message)
        }
    }
    if(props.screen == 'signedIn' || props.screen == 'createProfile' || props.is_small)
        return (
            <View>
                <TouchableOpacity
                    style={{
                        height: 100,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => onSubmit()}
                >
                    <Text>sign out</Text>
                </TouchableOpacity>
            </View>
        )
    else return <></>
}

const style = StyleSheet.create({
    
});

export default SignOut