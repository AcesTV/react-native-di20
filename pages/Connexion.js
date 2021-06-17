import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import * as LocalAuthentication from 'expo-local-authentication'
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



export default function Connexion(props) {
    const navigate = props.navigate;

    const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await LocalAuthentication.hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });

    const fallBackToDefaultAuth = () => {
        console.log('fall back to password authentication');
    };

    const alertComponent = (title, mess, btnTxt, btnFunc) => {
        return Alert.alert(title, mess, [
            {
                text: btnTxt,
                onPress: btnFunc,
            },
        ]);
    };

    const handleBiometricAuth = async () => {
        // Check if hardware supports biometrics
        const isBiometricAvailable = await LocalAuthentication.hasHardwareAsync();

        // Fallback to default authentication method (password) if Fingerprint is not available
        if (!isBiometricAvailable)
            return alertComponent(
                'Please enter your password',
                'Biometric Authentication not supported',
                'OK',
                () => fallBackToDefaultAuth()
            );

        // Check Biometrics types available (Fingerprint, Facial recognition, Iris recognition)
        let supportedBiometrics;
        if (isBiometricAvailable)
            supportedBiometrics = await LocalAuthentication.supportedAuthenticationTypesAsync();

        // Check Biometrics are saved locally in user's device
        const savedBiometrics = await LocalAuthentication.isEnrolledAsync();
        if (!savedBiometrics)
            return alertComponent(
                'Biometric record not found',
                'Please login with your password',
                'OK',
                () => fallBackToDefaultAuth()
            );

        // Authenticate use with Biometrics (Fingerprint, Facial recognition, Iris recognition)

        const biometricAuth = await LocalAuthentication.authenticateAsync({
            promptMessage: 'Login with Biometrics',
            cancelLabel: 'Cancel',
            disableDeviceFallback: true,
        });

        if (biometricAuth.success) {
            navigate('Secure');
        }

    };

    return (
        <View style={styles.container}>

            <TouchableHighlight
                style={{
                    height: "100%",
                    paddingTop: "100%"
                }}
            >
                <Button
                    title="Login with Biometrics"
                    color="#fe7005"
                    onPress={handleBiometricAuth}
                />
            </TouchableHighlight>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#AAA",
        flex: 1,
        paddingHorizontal: 20
    }
});