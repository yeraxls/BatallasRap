import { Button, Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';

const votos = [0, 1, 2, 3, 4]
const initialValue: any[] = []
export default function JuezScreen() {
  const [batallero1, setBatallero1] = useState(initialValue);
  const [batallero2, setBatallero2] = useState(initialValue);

  const votar = (value: any) => {
    if (batallero1.length == batallero2.length) {
      console.log("Batallero1");
      setBatallero1([...batallero1, value])
    }
    else {
      console.log("Batallero2");
      setBatallero2([...batallero2, value])
    }
  }

  const sum = (arr : any[]) =>{
    return arr.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Votar batalla</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.batallero}>
        Batallero1:
        {batallero1.length > 0 ? batallero1.map((vote) => <Text style={styles.votos}>{vote}</Text>) :
          <Text style={styles.title}>Esperando votos</Text>}
        <Text style={styles.total}>TOTAL: {sum(batallero1)}</Text>
      </Text>
      <Text style={styles.batallero}>
        Batallero2:
        {batallero2.length > 0 ? batallero2.map((vote) => <Text style={styles.votos}>{vote}</Text>) :
          <Text style={styles.title}>Esperando votos</Text>}
        <Text style={styles.total}>TOTAL: {sum(batallero2)}</Text>
      </Text>
      {votos.map(r =>
        <Pressable style={styles.button} onPress={() => votar(r)}>
          <Text style={styles.text}>{r}</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    marginBottom: "4%",
    width: "50%"
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  votos: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingLeft: "1%",
    marginLeft: "1%",
    paddingRight: "1%",
    color: "white",
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
  },
  batallero: {
    width: "80%",
    backgroundColor: "grey",
    color: "white",
    textAlign: "center",
    marginBottom: "1%"
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  total: {
    fontSize: 20,
    color: "white",
    backgroundColor: "black",
    borderColor: "white",
    borderWidth: 1,
    marginLeft: "2%"
  },
});

