/*
		Topic: Main JS File for Github Dashboard - PGM-2_Project-1
		Author: Steven Aelbrecht
		Modified: 2021-12-14
*/

// Link to my repo online https://api.github.com/users/pgm-stevaelb/repos?page=1&per_page=50

(() => {
	const app = {
		init() {
			console.log('1. App Init.')
			this.cacheElem();
			this.buildUI();
		},
		cacheElem() {
			console.log('2. Cache the elements.');
			this.$weatherDiv = document.getElementById('weather');
			this.$covidDiv = document.getElementById('covid');
		},
		buildUI() {
			console.log('3. Build the UI');
			this.getWeather();
			this.getCovid();
			this.getUsers()
		},
		async getWeather() {
			const APIURL = 'http://api.weatherapi.com/v1/current.json?key=28a557deaa8c407489e153714211412&q=$Ghent';
			try {
				const response = await fetch(APIURL);
				const data = await response.json();
				this.$weatherDiv.innerHTML = `<img src="${data.current.condition.icon}" alt="${data.current.condition.text}" class="weather__icon"><span>${data.current.temp_c}°C</span>`;
			} catch (error) {
				console.error(error.message);
			}
		},
		async getCovid() {
			const APIURL = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality';
			try {
				const response = await fetch(APIURL);
				const data = await response.json();
				this.$covidDiv.innerHTML += `${data.records[0].fields.cases}`;
			} catch (error) {
				console.error(error.message);
			}
		},
		async getUsers() {
			const allUsers = JSON.stringify('pgm.json');
			console.log(allUsers);
		}
	};

	app.init();
})();