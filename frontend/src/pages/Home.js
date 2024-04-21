import React, { useState, useEffect } from 'react'
import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    DirectionsRenderer
  } from "@react-google-maps/api";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase , ref, onValue } from "firebase/database";
import bus from './bus.png';
import Layout from './Layout';
import "./styl.css"
import axios from 'axios'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  id: "google-map-script",
  apiKey: "AIzaSyBvT9e8I7ceq1KHeAuKnWoCwJgI-mUA9yg",
  authDomain: "mapslocate-415315.firebaseapp.com",
  databaseURL: "https://mapslocate-415315-default-rtdb.firebaseio.com",
  projectId: "mapslocate-415315",
  storageBucket: "mapslocate-415315.appspot.com",
  messagingSenderId: "443005667076",
  appId: "1:443005667076:web:cdda123fe9f28492edb251",
  measurementId: "G-WE5JF32RB9"
};

const API_URL = `https://roads-api.your-provider.com/v1/snapToRoads`;
const API_KEY = 'AIzaSyCAvscx9QH7C0QJ8Blu0BruRj1YPLExmOc';





// Initialize Firebase
const app = initializeApp(firebaseConfig);

const center = {
  lat: 10.0561501,
  lng: 76.3551330
};

function Home() {

  const [waypoints, setWaypoints] = useState([
    [10.0561501, 76.3551330],
    [10.074492, 76.336690],
  ]);

  const calculatePath = async () => {
  
    // Construct the API request URL with waypoints
    const origin = waypoints[0].join(",");
    const destinations = waypoints.slice(1).join("|");
    const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destinations=${destinations}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);
      const directions = response.data.routes[0].overview_polyline;
      // Update state with the path data (polyline)
    } catch (error) {
      console.error("Error fetching path:", error);
    }
  };

  const db = getDatabase();
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: `AIzaSyBvT9e8I7ceq1KHeAuKnWoCwJgI-mUA9yg`
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


  return isLoaded ? (
    <>
    <div className="home-container">
      <Layout />
      <div className="dashboard">
        <div className='dashboard-title'>
          <span className='greetings'>
            Hello, Sreeram
          </span>
          <span className=''></span>
        </div>
        <div  className='distance-tracker'>

        </div>
        <div className='map-container'>
          <GoogleMap
            center={currentLocation}
            zoom={18}
            mapContainerStyle={{ width: "100%", height: "100%" }}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
            }}
          >
            {currentLocation && <Marker position={currentLocation} icon={bus} />}
    {waypoints.length > 1 && ( // Check for waypoints before rendering
      <DirectionsRenderer
        directions
        options={{ suppressMarkers: true }} // Optional: Hide markers on path
      />
    )}
          </GoogleMap>
        </div>
      </div>
      <div className='calendar'>
        
      </div>
      <div className='wallet'>

      </div>
      <div className='demand'>

      </div>
    </div>
    </>
  ) : (
    <></>
  );
}

export default Home