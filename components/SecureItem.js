import React from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'

export default function SecureItem(props) {
    

    return (
        <View>
            <Text>{props.label}</Text>
            <Text>{props.password}</Text>
        </View>
    )


}