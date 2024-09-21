import { Button, StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import Batallero from '../../components/Batallero';

export default function TabOneScreen() {
  const empezarBatalla = () =>{
    console.log("todo en orden");
    
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Batalla rápida</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Batallero name={"Batallero1"} />
      <Text style={styles.title}>VS</Text>
      <Batallero name={"Batallero2"} />

      <Button
        onPress={empezarBatalla}
        title="Empezar"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
});
