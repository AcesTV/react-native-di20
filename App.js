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

import Home from './pages/Home';
import Header from "./components/Header";
import Connexion from "./pages/Connexion";
import Secure from "./pages/Secure";


export default function App() {

  // wherever the useState is located

  const [page, navigate] = useState('Connexion');




  /* Fonction Appel API */

  return (
      <SafeAreaView style={styles.container}>
        <StatusBar style="auto" />

        <Header title={page}/>

        {page === 'Connexion' && <Connexion navigate={navigate}/>}
        {page === 'Secure' && <Secure navigate={navigate}/>}

      </SafeAreaView>
  );
}



/* Ajout d'une  constante pour le style global */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});