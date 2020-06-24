import React from 'react';
import './App.css';
import Titles from './components/Titles';
import Form from './components/Form';
import Weather from './components/Weather';

const API_KEY = "3440d9a44d5fb161ef0d740885503cde"

class App extends React.Component {	
	
	state = {
		temperature: undefined,
		city: undefined,
		country: undefined,
		humidity: undefined,
		description: undefined,
		error: undefined
	}

	getWeather = async (event) => {
		event.preventDefault();
		const city = event.target.elements.city.value;
		const country = event.target.elements.country.value;
		const api_call = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
		const info = await api_call.json();
		if (city && country) {
			console.log(info);

			this.setState({
				temperature: info.main.temp,
				city: info.name,
				country: info.sys.country,
				humidity: info.main.humidity,
				description: info.weather[0].description,
				error: undefined
			});
		} else {
			this.setState({
				temperature: undefined,
				city: undefined,
				country: undefined,
				humidity: undefined,
				description: undefined,
				error: "Please fill out all of the fields"
			});
		}
	}
	
	render (){
		return (
			<div>
				<Titles />
				<Form getWeather={this.getWeather}/>
				<Weather 
					temperature={this.state.temperature}
					city={this.state.city}
					country={this.state.country}
					humidity={this.state.humidity}
					description={this.state.description}
					error={this.state.error}
				/>
			</div>	
		);
	}
}

export default App;