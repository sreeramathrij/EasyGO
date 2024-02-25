import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, set , push ,update   } from 'firebase/database';
import * as Location from "expo-location";
import React, { useState } from "react";
import { Button, Text, View } from "react-native";
import firebase from 'firebase/app';
import 'firebase/firestore';

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
  // Import the Firebase SDK

  firebase.initializeApp(firebaseConfig);

  // Get a reference to the Firestore database
  const db = firebase.firestore();

  // Reference to the document or collection you want to update
  const docRef = db.collection('Trips').doc('dnuwkQ2BtOJRHrnLhvBh');

  // Update the document
  docRef.update({
    checkpoints: [],
    origin: {lat: 10.0558121, lng: 76.3543095}
  })
  .then(() => {
    console.log('Document updated successfully');
  })
  .catch((error) => {
    console.error('Error updating document:', error);
  });

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
      const referenceFuel = ref(db, 'Trips/');
      update(referenceFuel, {
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
      
    }, 5000);
    
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