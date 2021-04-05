//Copyright 2020, Provecho, All rights reserved.

import React, {useState, useEffect, useCallback, useRef} from 'react';
import { StyleSheet, Dimensions, View, Text, Button, FlatList, SectionList, TouchableOpacity, RefreshControl, TouchableOpacityBase } from 'react-native';


import * as cache from '../functions/cache'
import * as constants from '../constants';

const wait = (timeout) => {
    return new Promise(resolve => {
        setTimeout(resolve, timeout);
    });
}

const Stream = (props) => {

    const [list, set_list] = useState([])
    const [index, set_index] = useState(0)
    // const [fetch_initial, set_fetch_initial] = useState(true)


    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        refresh()
        wait(2000).then(() => setRefreshing(false));
    }, [])

    const refresh = async () => {
        set_index(0)
        set_list([])
        await cache.refresh(props.cache_id)
        fetch()
    }

    useEffect(() => {
        // if(!fetch_initial) {
        //     return
        // }
        refresh()
        // set_fetch_initial(false)
    }, [props.search])
    
    const query = async ({next_token, limit}) => {
        const [db_data, new_next_token] = await props.fetch({next_token, limit})
        return [db_data, new_next_token]
    }

    const fetch = () => {
        // console.log('fetch...',);
        set_index((prev_index) => {
            const fetch_from_cache = async () => {
                const format_and_set_list = async (new_item) => {
                    // console.log('newitem...',new_item);
                    const formatted_item = await props.format(new_item)
                    set_list((prev_list) => {
                        let new_list = [...prev_list]
                        new_list.push(formatted_item)
                        return new_list
                    })
                }
                cache.fetch({id: props.cache_id, index: prev_index, query, func: format_and_set_list})
            }
            fetch_from_cache()
            return prev_index + 1
        })
    }

    const renderItem = ({ item }) => {
        if (item =='empty') {
            return (
                <View style={{height: 1000, width: constants.width,}}></View>
            )
        }
        return (
            props.children(item)
        );
    };

    return (
        <>
            <View style={{ flex: 1 , }}> 
                <FlatList
                    onRefresh={props.block_refresh ? '': () => {
                        onRefresh()
                    }}
                    refreshing={refreshing}
                    numColumns={props.n_columns}
                    data={list.length > 0 ? list : ['empty']}
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    //adjust depeding on size
                    onEndReachedThreshold={1}
                    onEndReached={() => {
                        console.log('end reached');
                        for (let i = 0; i < props.n_columns; i++) {
                            fetch()
                        }
                    }}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator ={false}
                />
            </View>
        </>
    )
}

const style = StyleSheet.create({
    
});

export default Stream;