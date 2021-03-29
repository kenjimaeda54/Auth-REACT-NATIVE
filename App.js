import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Button,
  Keyboard
}
  from 'react-native';
import firebase from './src/firebase/firebaseconection'


console.disableYellowBox = true;


export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');



  async function cadastrar() {
    await firebase.auth().createUserWithEmailAndPassword(email, senha)
      .then((value) => {
        alert(`Usuario cadastrado com suceso ${value.user.email}`)
      }).catch((error) => {
        if (error.code === 'auth/invalid-email') {
          alert('Insira um email valido')
          return;
        } 
         if (error.code === 'auth/weak-password') {
          alert('Insira uma senha no minimo com 6 digitos')
          return;
        } else {
          alert('Aconteceu algo errado')
          return
        }
      })//ficar atento ao code 
    setEmail('');
    setSenha('');
  }


  return (
    <View style={styles.container}>

      <Text style={styles.text} >Email</Text>

      <TextInput
        placeholder="Seu email"
        value={email}
        onChangeText={(item) => setEmail(item)}
        style={styles.textInput}
      />

      <Text style={styles.text}>Senha</Text>

      <TextInput
        placeholder="Sua senha"
        value={senha}
        //necessario o value.Caso não coloque sera impossivel,manipular
        //valor que usuario colocou ou seja por exemplo apagar este estado
        onChangeText={(item) => setSenha(item)}
        style={styles.textInput}
        keyboardType="numeric"
      />

      <Button
        title="Cadastrar"
        onPress={cadastrar}
        style={styles.button}
      />

    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    borderColor: 'black',
    borderRadius: 5,
    backgroundColor: '#dddd',
    color: 'black',
    fontSize: 16,
    marginBottom: 10,
    marginTop: 30,
    textAlign: 'center',
    width: '90%',
    height: 100,
  },
  text: {
    color: 'black',
    fontSize: 26,
    
  },
  button: {
    color: 'black',
  }

});