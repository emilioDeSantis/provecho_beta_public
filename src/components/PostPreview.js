import { StyleSheet, Dimensions, View, Text, Button } from 'react-native';
import * as React from 'react';
import { StackActions, useNavigation  } from '@react-navigation/native';


import ChefThumbnail from './ChefThumbnail'

import RecipeButton from './RecipeButton'
import * as constants from '../constants';

function PostPreview(props) {

    return (
        <View style={props.n_columns == 2 ? style.di_post : style.tri_post}>
            <RecipeButton 
                is_tri={props.n_columns == 3 ? true : false}
                is_di={props.n_columns == 2 ? true : false}
                post={props.post} 
                user={props.user} 
                style={props.n_columns == 2 ? style.di_recipe_button : style.tri_recipe_button} is_remake={props.is_remake} need_to_format={true} go_to_recipe={false} is_notification={true}/>
            {props.n_columns == 2 && <Text style={{alignSelf:'center',}}>{props.post.chef.username}</Text>}
        </View>
    );
}

const style = StyleSheet.create({
    tri_post: {
        width: (constants.width + constants.post_preview_margin - constants.post_preview_edge_margin) / 3 ,
        aspectRatio: 1,
    },
    di_post: {
        marginLeft: constants.di_post_margin/2,
        marginRight: constants.di_post_margin/2,
        marginBottom: 20,
        aspectRatio: 1/1,
        width: 100,
        backgroundColor: constants.white,
    },
    tri_recipe_button: {
        borderRadius: constants.tri_post_radius,
        marginLeft: constants.post_preview_margin/2,  
        marginRight: constants.post_preview_margin/2,   
        marginBottom: constants.post_preview_margin,
        // backgroundColor: '#f75',
    },
    di_recipe_button: {
        borderRadius: 6,
    },
});

export default PostPreview;