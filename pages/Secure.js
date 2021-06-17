import React, {useEffect, useState} from 'react';
import {Button, ScrollView, StyleSheet, TextInput, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SecureItem from "../components/SecureItem";


export default function App(props) {



    const [data, setData] = useState([
        {
            key: 1,
            label: "test",
            password: "123"
        },
        {
            key: 2,
            label: "test2",
            password: "123"
        }])

    const [label, setLabel] = useState('');
    const [password, setPassword] = useState('');

    const storeData = async (value) => {
        try {
            const jsonValue = JSON.stringify(value)
            await AsyncStorage.setItem('@storage_Key', jsonValue)
        } catch (e) {
            // saving error
        }
    }

    const getData = async () => {
        try {
            const jsonValue = await AsyncStorage.getItem('@storage_Key')
            return jsonValue != null ? JSON.parse(jsonValue) : [];
        } catch(e) {
            // error reading value
        }
    }


    function storeCurrentData() {
        if(label !== "" && password !== "") {
            let _item = {
                key: data[data.length-1].id + 1,
                label: label,
                password: password
            }

            setData([...data, _item]);
            console.log(data);
        }
    }





    // function store(data) {
    //     storeData(data)
    // }


    useEffect(() => {
        getData().then(r => setData(r))
    }, []);
    useEffect(() => {
        storeData(data).then(r => console.log('useEffetct Ok'))
    }, [data]);


    return (
        <ScrollView>
            <View>



                {
                    data.map(el => {
                        return (
                            <View style={{paddingBottom: 10}}>
                                <SecureItem label={el.label} password={el.password}/>
                            </View>

                        )
                    })
                }
            </View>
            <View>
                <TextInput style={styles.input} onChangeText={setLabel}></TextInput>
                <TextInput style={styles.input} onChangeText={setPassword}></TextInput>
                <Button
                    onPress={storeCurrentData}
                    title="Store Data"
                    color="#841584"
                />
            </View>
        </ScrollView>
    )
}



const styles = StyleSheet.create({
    input: {
        height: 40,
        margin: 12,
        borderWidth: 1,
    }
})