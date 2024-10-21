import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Mapview,{Marker,Polyline} from 'react-native-maps';
import * as React from 'react';
import * as Location from 'expo-location';
import MapViewDirections from 'react-native-maps-directions';
import {GoogleMap} from "@env";
const carImage=require('./assets/image/var.png')


export default function App() {

  const [origin,setOrigin]=React.useState({
    latitude: 32.436087, 

    longitude: -114.759567
  });
  const [destination,setDestination]=React.useState({
    latitude: 32.449849, 
    longitude:-114.758752 ,
  });

  React.useEffect(()=>{
    getLocationPermission();
  },[])

  async function getLocationPermission() {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      alert("Permission denied");
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    const current = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    setOrigin(current);
  }

  return (
    <View style={styles.container}>
      <Mapview style={styles.map}
      initialRegion={{
        latitude:origin.latitude,
        longitude: origin.longitude,
        latitudeDelta:0.09,
        longitudeDelta:0.04
      }}
      >
        <Marker
        draggable
        coordinate={origin}
        onDragEnd={(direction)=>setOrigin(direction.nativeEvent.coordinate)}
        />
        <Marker
        draggable
        coordinate={destination}
        image={carImage}

        onDragEnd={(direction)=>setDestination(direction.nativeEvent.coordinate)}
        />
        <MapViewDirections style={styles.carImage}
        origin={origin}
        destination={destination}
        apikey={GoogleMap}
        strokeColor='pink'
        strokeWidth={8}
        />

        {/* <Polyline
        coordinates={[origin, destination]}
        strokeColor='pink'
        strokeWidth={8}
        /> */}

      </Mapview>
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
  map:{
    width:'100%',
    height:'100%'
  },
  carImage:{
    width:"120",
    height:"120"
  }
});
