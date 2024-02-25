import React, { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
  } from "@react-google-maps/api";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , ref, onValue, set } from "firebase/database";
import bus from './bus.png';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDNACfdjolnfFoOTTQ8q4ohgwdzurEv_uE",
  authDomain: "easygo-91a8b.firebaseapp.com",
  projectId: "easygo-91a8b",
  storageBucket: "easygo-91a8b.appspot.com",
  messagingSenderId: "981852041919",
  appId: "1:981852041919:web:e194732e3ec405a8524c0a",
  measurementId: "G-JL7FW8ZM21"
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
    googleMapsApiKey: `AIzaSyDvang4CPpYVCBUoNOrMaHZw5KFyB-0VJk`
  })

  const [currentLocation, setCurrentLocation] = useState([]);
  const fetchdata = async () => {
  const starCountRef = ref(db, "Trips");
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
        zoom={18}
        mapContainerStyle={{ width: "100%", height: "100vh" }}
        options={{
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        <Marker position={currentLocation} icon={bus}>
        </Marker>
      </GoogleMap>
    </>
  ) : (
    <></>
  );
}

export default Home