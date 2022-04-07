import React, {useState,useEffect} from 'react';
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';
import {CssBaseline, Grid} from '@material-ui/core';
import axios from 'axios';
import localStorageService from './service/localStorageService';
import {getPlacesData, getWeatherData} from './api';


function App() {

  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState([]);
  const [filteredPlaces,setFilteredPlaces] = useState([]);
  const [childClicked, setchildClicked] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});

  const [isLoading, setIsLoading] = useState(false);
  const [type, setType] = useState('restaurants');
  const [rating,setRating] = useState('');

  const [username, setUsername] = useState("User");

  const fetchHomepage = async () => {
    const token = localStorageService.getToken();
    const {data} = await axios.get("https://traveladvisor-backend.herokuapp.com/users/home",{ headers: {"Authorization" : `Bearer ${token}`} });
    setUsername(data.username);
  };

  useEffect(() => {
    fetchHomepage();
    }, []);

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition(({coords: {latitude, longitude}})=>{
      setCoordinates({ lat:latitude, lng:longitude})
    })
  },[]);

  useEffect(()=> {
    const filteredPlace = places.filter((place)=> place.rating > rating);

    setFilteredPlaces(filteredPlace);
  },[rating])

  useEffect(()=>{
    if(bounds.sw && bounds.ne) {
    setIsLoading(true);

    getWeatherData(coordinates.lat,coordinates.lng)
      .then((data) => setWeatherData(data));

    getPlacesData(type,bounds.ne, bounds.sw)
      .then((data)=>{
        setPlaces(data?.filter((place)=> place.name && place.num_reviews > 0));
        setFilteredPlaces([]);
        setIsLoading(false);
      })
    }
  },[type, bounds]);


  return (
    <>
      <CssBaseline />
      <Header setCoordinates={setCoordinates} username={username}/>
      <Grid container spacing={3} style={{ width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
          places = {filteredPlaces.length ? filteredPlaces : places} 
          childClicked = {childClicked}
          isLoading={isLoading}
          type={type}
          setType={setType}
          rating={rating}
          setRating={setRating}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map
            setCoordinates = {setCoordinates} 
            setBounds = {setBounds}
            coordinates = {coordinates}
            places = {filteredPlaces.length ? filteredPlaces : places}
            setchildClicked = {setchildClicked}
            weatherData={weatherData}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
