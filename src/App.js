import React from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "3440d9a44d5fb161ef0d740885503cde"

class App extends React.Component {	
// 	States
	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		wind: undefined,
		error: undefined
	}
// API Call and set state
	getWeather = async (event) => {
		event.preventDefault();
		const city = event.target.elements.city.value;
		const country = event.target.elements.country.value;
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		let info = await api_call.json();
		if (city && country) {
			console.log(info);
			if (info.sys.country == "US"){
				info.main.temp = info.main.temp * 1.8 + 32.0;
			}
			if (info.sys.country == "US"){
				info.wind.speed = info.wind.speed * 0.62137119223733;
			}
			this.setState({
				temperature: Math.round(info.main.temp * 10) / 10,
				city: info.name,
				country: info.sys.country,
				humidity: info.main.humidity,
				description: capitalize_Words(info.weather[0].description),
				wind: Math.round(info.wind.speed * 10) / 10,
				error: undefined
			});
		} else {
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				wind: undefined,
				error: "Please fill out all of the fields"
			});
		}
	}
// Render the application	
	render (){
		return (
			<div className="App">
				<div className="Content">
					<Titles />
					<Form getWeather={this.getWeather}/>
					<Weather 
						temperature={this.state.temperature}
						city={this.state.city}
						country={this.state.country}
						humidity={this.state.humidity}
						description={this.state.description}
						wind={this.state.wind}
						error={this.state.error}
					/>
				</div>				
			</div>	
		);
	}
}

// Source: https://www.w3resource.com/javascript-exercises/javascript-string-exercise-9.php

function capitalize_Words(str)
{
 return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

export default App;