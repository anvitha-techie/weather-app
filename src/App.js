import React from "react";
import './App.css';
import 'weather-icons/css/weather-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Form from './app_component/form.component';
import Weather from './app_component/weather.component';

const API_key="ef478a8a8287cf8142992790cfe109d9";

class App extends React.Component{
  constructor()
  {
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celcius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false,
      response_error:false

    };
    
    this.WeatherIcon={
      Thunderstorm:"wi-thunderstorms",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog"
    };

    }
  get_weathericon(icons,rangeID)
  {
    switch(true)
    {
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.WeatherIcon.Thunderstorm});
        break;
      case rangeID>=300 && rangeID<=321:
          this.setState({icon:this.WeatherIcon.Drizzle});
          break;
      case rangeID>=500 && rangeID<=531:
            this.setState({icon:this.WeatherIcon.Rain});
            break;
      case rangeID>=600&& rangeID<=632:
              this.setState({icon:this.WeatherIcon.Snow});
              break;
              case rangeID>=700 && rangeID<=781:
                this.setState({icon:this.WeatherIcon.Atmosphere});
                break;
                case rangeID===800:
                  this.setState({icon:this.WeatherIcon.Clear});
                  break;
                  case rangeID>=801 && rangeID<=804:
                    this.setState({icon:this.WeatherIcon.Clouds});
                    break;
                  default:
                    this.setState({icon:this.WeatherIcon.Clouds});


    }
  }
  calcCelcius(temp)
  {
     var cell=Math.floor(temp-273.15);
     return cell;
  };
  getWeather=async(e)=>{
    e.preventDefault();
    const city=e.target.elements.city.value;
    const country=e.target.elements.country.value;
    if(city && country){
    const api_call=await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);
    //const response=await api_call.json();
    if(api_call.status===404)
    {
      this.setState({
        city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celcius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
        response_error:true});

    }
  
      else{
        const response=await api_call.json();
      console.log(response.status);
    this.setState({
      city:`${response.name},${response.sys.country}`,
      //country:response.sys.country,
      celcius:this.calcCelcius(response.main.temp),
      temp_max:this.calcCelcius(response.main.temp_max),
      temp_min:this.calcCelcius(response.main.temp_min),
      description:response.weather[0].main,
      error:false,
      response_error:false

    })
    this.get_weathericon(this.WeatherIcon,response.weather[0].id);
  }
  }else{
    this.setState({error:true});
  }
  };
  render()
  {
    return (
      <div className="App">
      <Form loadweather={this.getWeather} error={this.state.error} response_error={this.state.response_error}/>
      <Weather 
      city={this.state.city} 
      country={this.state.country} 
      temp_celcius={this.state.celcius} 
      temp_max={this.state.temp_max} temp_min={this.state.temp_min} 
      description={this.state.description}
      WeatherIcon={this.state.icon}
      />
    </div>
    );
  }

};

export default App;
