import React from 'react';
import './Weather.css';

class Weather extends React.Component {
	render (){
		return (
			<div className="Weather">
				{this.props.city && this.props.country && <p>Location: {this.props.city}, {this.props.country}</p>}	
				{this.props.temperature && (this.props.country == 'US') && <p>Temperature: {this.props.temperature}° F</p>}
				{this.props.temperature && (this.props.country != 'US') && <p>Temperature: {this.props.temperature}° C</p>}
				{this.props.wind && (this.props.country == 'US') && <p>Wind Speed: {this.props.wind} mph</p>}
				{this.props.wind && (this.props.country != 'US') && <p>Wind Speed: {this.props.wind} kph</p>}
				{this.props.humidity && <p>Humidity: {this.props.humidity}%</p>}
				{this.props.description && <p>Description: {this.props.description}</p>}
				{this.props.error && <p>Error: {this.props.error}</p>}
			</div>	
		);
	}
}

export default Weather;