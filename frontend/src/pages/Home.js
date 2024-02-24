import React, { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    InfoWindow,
  } from "@react-google-maps/api";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , ref, onValue } from "firebase/database";
import bus from './bus.png';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries




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

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const center = {
  lat: 10.0561501,
  lng: 76.3551330
};

function Home() {

  const db = getDatabase();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyDvang4CPpYVCBUoNOrMaHZw5KFyB-0VJk"
  })

  const [currentLocation, setCurrentLocation] = useState([]);
  const fetchdata = async () => {
  const starCountRef = ref(db, "location/");
  onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    setCurrentLocation(data);
    console.log(data);
  });
  };

    useEffect(() => {
        fetchdata();
    }, []);

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])


  return isLoaded ? (
    <>
      <GoogleMap
        center={center}
        zoom={8}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={currentLocation}>
        </Marker>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Home