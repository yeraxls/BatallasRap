import { Button, FlatList, Pressable, StyleSheet, TextInput } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
interface batalla {
  batallero1: string
  batallero2: string
  ganador: string
}
const initialBattle: batalla[] = []
const initialValue: any[] = []
export default function TabTwoScreen() {
  const [text, setText] = useState("");
  const [creados, setCreados] = useState(false);
  const [batalleros, setBatalleros] = useState(initialValue);
  const [batallas, setBatallas] = useState(initialBattle);
  const [ganadores, setGanadores] = useState(initialValue);

  const addToBattle = () => {
    setBatalleros([...batalleros, text])
    setText("")
  }

  const borrarTodo = () => {
    setBatalleros(initialValue)
  }

  const iniciarEmparejamientos = () => {
    let emparejamientos = [...batalleros]
    if (batalleros.length % 2 != 0)
      emparejamientos.push("NoName")

    crearEmparejamientos(emparejamientos)
  }

  const crearEmparejamientos = (emparejamientos: any[], newBattles: batalla[] = []) => {
    let indice = Math.floor(Math.random() * emparejamientos.length)
    let batallero1 = emparejamientos[indice]
    emparejamientos = emparejamientos.filter(s => s != batallero1)
    indice = Math.floor(Math.random() * emparejamientos.length)
    let batallero2 = emparejamientos[indice]
    emparejamientos = emparejamientos.filter(s => s != batallero2)
    let batalla: batalla = { batallero1: batallero1, batallero2: batallero2, ganador: "" }
    newBattles.push(batalla)
    if (emparejamientos.length > 0)
      crearEmparejamientos(emparejamientos, newBattles)
    else {
      setCreados(true)
      setBatallas(newBattles)
    }
  }

  const realizarEmparejamientos = () => {
    if (ganadores.length % 2 != 0)
      ganadores.push("NoName")
    let emparejamientos = [...ganadores]
    setBatallas([])
    setGanadores([])
    crearEmparejamientos(emparejamientos)

  }

  const addWinner = (item: batalla, ganador: string) => {
    item.ganador = ganador
    setGanadores((a) => [...a, ganador])

  }

  const empezarCopa = () => {
    setBatallas([])
    setCreados(false)
  }

  const borrarBatallero = (batallero: string) => {
    setBatalleros([...batalleros.filter(c => c != batallero)])
  }

  const hayGanadores = () => {
    let result = false
    batallas.forEach(b =>{
      if(b.ganador=="" && !result)
        result = true
    })
    return result
  }

  const renderItem = ({ item }: any) => (
    <View style={styles.container}>
    <Text key={`${item.batallero1}-${item.batallero2}`}>
      <Pressable style={item.batallero1 === item.ganador ? styles.batallerobuttonGanador : styles.batallerobutton} onPress={() => addWinner(item, item.batallero1)}>
          <Text style={styles.text}>{item.batallero1}</Text>
        </Pressable>
        VS
        <Pressable style={item.batallero2 === item.ganador ? styles.batallerobuttonGanador : styles.batallerobutton} onPress={() => addWinner(item, item.batallero2)}>
          <Text style={styles.text}>{item.batallero2}</Text>
        </Pressable>
    </Text>
    </View>
  );

  if (!creados)
    return (
      <View style={styles.container}>
        <Pressable style={styles.button} disabled={batalleros.length <= 2} onPress={iniciarEmparejamientos}>
          <Text style={styles.text}>Crear emparejamientos</Text>
        </Pressable>
        <Pressable style={styles.button} onPress={borrarTodo}>
          <Text style={styles.text}>Borrar todo</Text>
        </Pressable>
        <Text style={styles.title}>Crear Copa</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <TextInput
          style={styles.input}
          onChangeText={setText}
          value={text}
        />
        <Pressable style={styles.button} onPress={addToBattle}>
          <Text style={styles.text}>Agregar</Text>
        </Pressable>
        <FlatList
          data={batalleros}
          renderItem={({ item }) =>
            <Text key={item}>
              <Pressable style={styles.buttonBorrar} onPress={() => borrarBatallero(item)}>
                <Text style={styles.text}>{item}</Text>
              </Pressable>
            </Text>}
          keyExtractor={item => item}
        />
      </View>
    );
  if (creados && batallas.length == 1)
    return (
      <View style={styles.container}>
        <Pressable style={styles.button} onPress={empezarCopa}>
          <Text style={styles.text}>Empezar copa</Text>
        </Pressable>
        <Text style={styles.input}>Gran final</Text>
        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <FlatList
          data={batallas}
          renderItem={renderItem}
          keyExtractor={item => `${item.batallero1}-${item.batallero2}`}
        />
      </View>
    );
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={empezarCopa}>
        <Text style={styles.text}>Cancelar</Text>
      </Pressable>
      <Pressable style={styles.button} disabled={hayGanadores()} onPress={realizarEmparejamientos}>
        <Text style={styles.text}>Seguir emparejando</Text>
      </Pressable>
      <FlatList
        data={batallas}
        renderItem={renderItem}
        keyExtractor={item => `${item.batallero1}-${item.batallero2}`}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: "50%",
    textAlign: "center",
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    marginBottom: "4%",
  },
  batallerobutton: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'grey',
    marginBottom: "4%",
  },
  batallerobuttonGanador: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'blue',
    marginBottom: "4%",
  },
  buttonBorrar: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
    color:"white",
    marginBottom: "4%",
    borderBottomWidth: 5
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});
