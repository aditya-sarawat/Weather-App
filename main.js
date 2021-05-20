let place = {
	fetchLocation: function() {
		fetch (
			"https://api.ipdata.co/?api-key=28cb4d966c1a1660cdd7224260d42d1f7a8de85d430056038d1eb6c7"
		)
		.then((res) => {
			if (!res) {
				alert(`Location permission denied`);
				throw new Error ("Location Not avilable");
			}

			return res.json();
		})
		.then((place) => this.setLocation(place));
	},

	setLocation: function(place) {
		const { city, country_name, ip, latitude, longitude } = place;
		document.querySelector(".country").innerText = "Your Country: " + country_name;
		document.querySelector(".ip").innerText = "Your IP: " + ip;
		document.querySelector(".latitude").innerText = "latitude: " + latitude;
		document.querySelector(".longitude").innerText = "longitude: " + longitude;
		weather.fetchWeather(city);
	},
};


let weather = {
	fetchWeather: function(city) {
		fetch (
			"https://api.openweathermap.org/data/2.5/weather?q=" +
		    city +
		    "&units=metric&appid=a0ac1fdf4ad7ebce6aae7f181d1f4060"
		)
		.then((response) => {
			if (!response) {
				alert(`No weather data avilable`);
				throw new Error ("No weather found!");
			}

			return response.json();
		})
		.then((data) => this.displayWeather(data));
	},

	displayWeather: function(data) {
		const { name } = data;
		const { icon, description } = data.weather[0];
		const { temp, feels_like, humidity } = data.main;
		const { speed } = data.wind;

		document.querySelector(".city").innerText = name;
		document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png";
		document.querySelector(".discription").innerText = description;
		document.querySelector(".temp").innerText = temp + "°c";
		document.querySelector(".realFeel").innerText = "Real Feel: " + feels_like + "°c";
		document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
		document.querySelector(".windSpeed").innerText = "Wind Speed: " + speed;
		document.querySelector(".text").value = "";
		document.querySelector(".loading").style.display = "block";
		document.querySelector(".headWeather").style.display = "none";
		document.querySelector(".dataWeather").style.display = "none";

		var display = setInterval(animate, 500);
		function animate() {
			document.querySelector(".loading").style.display = "none";
			document.querySelector(".headWeather").style.display = "block";
			document.querySelector(".dataWeather").style.display = "block";
			clearInterval(display);
		}
},

	search: function() {
		this.fetchWeather(document.querySelector(".text").value);
	},
};

document.querySelector(".text").addEventListener('keyup', function(event) {
	if (event.key == "Enter") {
		weather.search();
	}
});


place.fetchLocation();