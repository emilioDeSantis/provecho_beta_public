import React, {useState, useEffect} from 'react';
import { StyleSheet, Dimensions, Text, View, TouchableOpacity } from 'react-native';

import Amplify, {Auth,} from 'aws-amplify';

import * as constants from '../constants';
import * as global from '../functions/global'

import awsconfig from '../aws-exports';
Amplify.configure({
    ...awsconfig,
    Analytics: {
        disabled: true,
    },
});
import SignUp from '../authentication/SignUp'
import ConfirmSignUp from '../authentication/ConfirmSignUp'
import CreateProfile from '../authentication/CreateProfile'
import SignOut from '../authentication/SignOut'
import SignIn from '../authentication/SignIn'
import Header from '../components/Header'

const AuthenticationScreen = (props) => {

    const [password, set_password] = useState('')
    const [email, set_email] = useState('emilio5139@gmail.com')
    const [screen, set_screen] = useState('signIn')
    const [auth_user, set_auth_user] = useState(null)

    console.log('auth user',auth_user);
    console.log('screen',screen);


    const inititalize = async () => {
        const user = await global.get_auth_user()
        console.log('user form get ait user', user);
        if(user == 'no_profile'){
            const new_auth_user = await Auth.currentAuthenticatedUser() 
            set_auth_user(new_auth_user)
            set_screen('createProfile')
        }
    }

    useEffect(() => {
        inititalize()
    },[])  

    if (props.is_small) {
        return (
            <SignOut
                screen={screen}
                set_screen={set_screen}
                user={props.user} 
                set_user={props.set_user}
                set_auth_user={set_auth_user}
                is_small={true}/>
        );
    }

    return (
        <>
            <Header header={'authentication'}/>
            <View style={styles.container}>
                <SignUp 
                    password={password}
                    set_password={set_password}
                    email={email}
                    set_email={set_email}
                    screen={screen}
                    set_screen={set_screen}
                    set_auth_user={set_auth_user}
                />
                <SignIn
                    password={password}
                    set_password={set_password}
                    email={email}
                    set_email={set_email}
                    screen={screen}
                    set_screen={set_screen}
                    set_auth_user={set_auth_user}
                    set_user={props.set_user}
                />
                <ConfirmSignUp
                    password={password}
                    set_password={set_password}
                    email={email}
                    set_email={set_email}
                    screen={screen}
                    set_screen={set_screen}
                />
                <CreateProfile
                    password={password}
                    set_password={set_password}
                    email={email}
                    set_email={set_email}
                    screen={screen}
                    set_screen={set_screen}
                    user={props.user} 
                    set_user={props.set_user}
                    auth_user={auth_user} 
                />
                <SignOut
                    screen={screen}
                    set_screen={set_screen}
                    user={props.user} 
                    set_user={props.set_user}
                    set_auth_user={set_auth_user}
                    is_small={false}/>
                <TouchableOpacity
                    style={{
                        height: 40,
                        width: 200,
                        borderRadius: 50,
                        backgroundColor: '#3b9'
                    }}
                    onPress={() => global.test()}
                >
                    <Text>test</Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default AuthenticationScreen


