import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
    Button,
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    TouchableOpacity,
    Image,
    Pressable,
    ScrollView,
    Alert, TouchableHighlight
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function App(props) {



    const storeData = async (value) => {
        try {
            console.log(value);
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : null;
        } catch(e) {
            // error reading value
        }
    }

    let data = [
        {
            id: 1,
            label: "test",
            password: "123"
        },
        {
            id: 2,
            label: "test2",
            password: "123"
        },
    ]

    return (
        <View>
            <Button
                onPress={() => storeData(data)}
                title="Store Data"
                color="#841584"
            />
            <Button title="Get" onPress={ async () => {
                    let _data = await getData();
                    console.log(_data);
                    _data.forEach(item => {
                        console.log("Test");
                        return (
                                <View>
                                    <Text>{item.label}</Text>
                                </View>
                            )

                    })
                }
            }/>
        </View>
    )
}