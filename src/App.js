import React, { Component } from 'react';
import Weather from './components/Weather/Weather';
import Form from './components/Form/Form';
import SearchHistory from './components/SearchHistory/SearchHistory';
import axios from 'axios';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import bgImageThunder from "./Images/thunder.jpg"
import bgImageSnow from "./Images/snow.jpg"
import bgImageRain from "./Images/rain.jpg"
import bgImageDrizzle from "./Images/drizzle.jpg"
import bgImageClouds_1 from "./Images/clouds_1.jpg"
import bgImageClouds_2 from "./Images/clouds_2.jpg"
import bgImageClear from "./Images/clear.jpg"
import bgImageAtmosphere from "./Images/atmosphere.jpg"
// git project https://github.com/erikflowers/weather-icons
import 'weather-icons/css/weather-icons.css';
const REACT_APP_API_KEY = process.env.REACT_APP_API_KEY;
export class App extends Component {
  state = {
    search_history: [],
    city: '',
    country: '',
    icon: '',
    main: '',
    temperature: '',
    temp_min: '',
    temp_max: '',
    description: '',
    formValue:'',
    error: false,
    error2:false
  };

  weatherIcon = {
    Thunderstorm: 'wi-thunderstorm',
    Drizzle: 'wi-sleet',
    Rain: 'wi-storm-showers',
    Snow: 'wi-snow',
    Atmosphere: 'wi-fog',
    Clear: 'wi-day-sunny',
    Clouds: 'wi-day-fog',
  };

  get_WeatherIcon(icons, rangeId) {
    switch (true) {
      case rangeId >= 200 && rangeId < 232:
        this.setState({ icon: icons.Thunderstorm });
        document.body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageThunder}), `
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId >= 300 && rangeId <= 321:
        this.setState({ icon: icons.Drizzle });
        document.body.style.backgroundImage =`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageDrizzle})`
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId >= 500 && rangeId <= 521:
        this.setState({ icon: icons.Rain });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageRain})`
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId >= 600 && rangeId <= 622:
        this.setState({ icon: icons.Snow });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageSnow})`
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId >= 701 && rangeId <= 781:
        this.setState({ icon: icons.Atmosphere });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageAtmosphere})`
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId === 800:
        this.setState({ icon: icons.Clear });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageClear})`
        document.body.style.backgroundSize = 'cover';
        break;
      case rangeId >= 801 && rangeId <= 804:
        this.setState({ icon: icons.Clouds });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url(${bgImageClouds_1})`
        document.body.style.backgroundSize = 'cover';
        break;
      default:
        this.setState({ icon: icons.Clouds });
        document.body.style.backgroundImage=`linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)),url(${bgImageClouds_2})`
        document.body.style.backgroundSize = 'cover';
    }
  }

  calTemperature(temp) {
    let newTemp = Math.floor(temp);
    return newTemp;
  }

  getWeather = async (event) => {
    
    try {
      event.preventDefault();

      const country = event.target.elements.country.value;
      const city = event.target.elements.city.value;

      if (country && city) {
        const api_call = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${REACT_APP_API_KEY}`
        );

        await axios.post('http://localhost:3001/api/weather/add-location', {
          locationCity: city,
          locationCountry: country,
        });

        const searchHistory = await axios.get(
          'http://localhost:3001/api/weather/get-all-locations'
        );

        console.log(api_call);
        console.log(searchHistory);

        this.setState({
          city: `${api_call.data.name},${api_call.data.sys.country}`,
          temperature: this.calTemperature(api_call.data.main.temp),
          temp_min: this.calTemperature(api_call.data.main.temp_min),
          temp_max: this.calTemperature(api_call.data.main.temp_max),
          description: api_call.data.weather[0].description,
          search_history: searchHistory.data.payload,
          formValue:"",
          error: false,
          error2:false
        });
        console.log(this.state.search_history);
        // setting icons
        this.get_WeatherIcon(this.weatherIcon, api_call.data.weather[0].id);
      } else {
        this.setState({
          error: true,
        });
      }
      event.target.elements.city.value = "";
      event.target.elements.country.value = "";
    } catch (e) {
      console.log(e)
 
      console.log('error works')
      this.setState({
        error2:true
      })
      console.log(this.state.error2);
    }
  };

  handleDeleteByID = async (_id) => {
    console.log('clicked');
    console.log(_id);
    try {
      let deletedSearchItem = await axios.delete(
        `http://localhost:3001/api/weather/delete-location-by-id/${_id}`
      );
      let filteredArray = this.state.search_history.filter(
        (item) => item._id !== deletedSearchItem.data.payload._id
      );
      console.log(filteredArray);
      console.log(deletedSearchItem);
      this.setState({
        search_history: filteredArray,
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleUpdateWeatherSearch = async (city, country)=>{
    try {
      if (city && country) {
        const api_call = await axios.get(
          `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=imperial&appid=${REACT_APP_API_KEY}`
        );

        this.setState({
          city: `${api_call.data.name},${api_call.data.sys.country}`,
          temperature: this.calTemperature(api_call.data.main.temp),
          temp_min: this.calTemperature(api_call.data.main.temp_min),
          temp_max: this.calTemperature(api_call.data.main.temp_max),
          description: api_call.data.weather[0].description,
          error: false,
          error2:false
        });
        this.get_WeatherIcon(this.weatherIcon, api_call.data.weather[0].id);
      } else {
        this.setState({
          error: true,
        });
      }
     
    } catch (e) {
      this.setState({
        error2:true
      })
    }
  };
  handleTodoOnChange = (event) => {
    this.setState({
      formValue: event.target.value,
    });
  };

  // async componentDidMount() {
  //   try {
  //     let api_call = await axios.get(
  //       `http://api.openweathermap.org/data/2.5/weather?q=london,UK&units=imperial&appid=${API_KEY}`
  //     );
  //     console.log(api_call);
  //     this.setState({
  //       city: api_call.data.name,
  //       country: api_call.data.sys.country,
  //       temperature: this.calTemperature(api_call.data.main.temp),
  //       temp_min: this.calTemperature(api_call.data.main.temp_min),
  //       temp_max: this.calTemperature(api_call.data.main.temp_max),
  //       description: api_call.data.weather[0].description,
  //     });
  //     // setting icons
  //     this.get_WeatherIcon(this.weatherIcon, api_call.data.weather[0].id);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  render() {
    return (
      <div className="App">
        <div>{this.state.error2 ? <div className="alert alert-danger mx-5" role="alert">
        City not found, please try a different search...!
      </div> : ""}</div>
        <h1>Slick Rick's Weather App</h1>
        <Form 
        getWeather={this.getWeather} 
        error={this.state.error} 
        formValue={this.state.formValue}
        />
        <Weather
          city={this.state.city}
          temperature={this.state.temperature}
          temp_min={this.state.temp_min}
          temp_max={this.state.temp_max}
          description={this.state.description}
          weatherIcon={this.state.icon}
        />
        <div className="card bg-transparent">
          <ul className="list-group ">
            {this.state.search_history.map((item, index) => {
              return (
                <SearchHistory
                  city={item.locationCity} 
                  country={item.locationCountry}
                  key={item._id}
                  _id={item._id}
                  handleDeleteById={this.handleDeleteByID}
                  handleUpdateWeatherSearch={this.handleUpdateWeatherSearch}
                />
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}




export default App;
// {this.props.searchHistory.map((item, index) => {})}
