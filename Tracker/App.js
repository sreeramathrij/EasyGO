import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set , push ,update   } from 'firebase/database';
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";

export default function App() {
  const firebaseConfig = {
    apiKey: "AIzaSyBvT9e8I7ceq1KHeAuKnWoCwJgI-mUA9yg",
    authDomain: "mapslocate-415315.firebaseapp.com",
    databaseURL: "https://mapslocate-415315-default-rtdb.firebaseio.com",
    projectId: "mapslocate-415315",
    storageBucket: "mapslocate-415315.appspot.com",
    messagingSenderId: "443005667076",
    appId: "1:443005667076:web:cdda123fe9f28492edb251",
    measurementId: "G-WE5JF32RB9"
  };

  initializeApp(firebaseConfig);

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const saveLocation = async () => {
  
    const intervalId = setInterval(async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
      }
    
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    
      const db = getDatabase();
      const referenceFuel = ref(db, 'location/');
      update(referenceFuel, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      
    }, 2000);
    
    return () => clearInterval(intervalId);
  };



  return (
    <View>
      <Text>Latitude: {location?.coords.latitude}</Text>
      <Text>Longitude: {location?.coords.longitude}</Text>
      {errorMsg ? <Text>{errorMsg}</Text> : null}
      <Button title="Share Location" onPress={saveLocation} />
    </View>
  );
}