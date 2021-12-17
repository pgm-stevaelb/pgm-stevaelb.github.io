/*
		Topic: Main JS File for Github Dashboard - PGM-2_Project-1
		Author: Steven Aelbrecht
		Modified: 2021-12-14
*/

// Link to my repo online https://api.github.com/users/pgm-stevaelb/repos?page=1&per_page=50

// https://api.github.com/search/users?sort=desc&page=1&per_page=100&q=pgm-stevaelb

/* API token for making more than 50 requests tot Github

	const response = await fetch('URL', {
			headers: {
					'Authorization': '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'
			}
	})
	return await response.json();

*/

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

			this.$listUsers = document.getElementById('pgm-team__list');

			this.$activeUser = document.getElementById('active-user__details');

			this.$searchBox = document.getElementById('search-box__input');
			this.$searchButton = document.getElementById('search-box__btn');
			this.$githubUsers = document.getElementById('github-users__list');
		},
		buildUI() {
			console.log('3. Build the UI');
			this.getWeather();
			this.getCovid();
			this.getPGMUsers();
			this.getSearchResults();
		},
		async getWeather() {
			const APIURL = 'https://api.weatherapi.com/v1/current.json?key=28a557deaa8c407489e153714211412&q=$Ghent';
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
		async getPGMUsers() {
			await fetch('static/data/pgm.json')
				.then(response => {
					if (!response.ok) {
						throw Error('Error, JSON not found.');
					}
					return response.json();
				})
				.then(data => {
					const listUsers = data.users.map(user => {
						const name = user.name.first + ' ' + user.name.last;
						return `
						<div class="pgm-team__user user--${user.portfolio.github}">
							<img src="${user.thumbnail}" alt="${name}" class="pgm-team__user__img">
							<div class="pgm-team__user__details">
								<p class="text-m text--bold">${name}</p>
								<p>${user.portfolio.github}</p>
							</div>
						</div>`
					}).join('');
					this.$listUsers.innerHTML = listUsers;
				});
		},
		getSearchResults() {
			this.$searchButton.addEventListener('click', () => {
				const searchInput = this.$searchBox.value;
				this.showGithubUsers(searchInput);
			}, false);
		},
		async showGithubUsers(input) {
			const APIURL = 'https://api.github.com/search/users?sort=desc&page=1&per_page=50&q=' + input;
			console.log(APIURL);
			try {
				const response = await fetch(APIURL, {
					headers: {
						'Authorization': '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'
					}
				});
				const data = response.json();
				this.$githubUsers = data.items.map((user, index) => {
					return `
						<div class="search-result">
							<img src="${user.items[index].avatar_url}" alt="${user.items[index].login}" class="search-result__img">
							<p>${user.items[index].login}</p>
						</div>`
				}).join('');
			} catch (e) {
				console.error('error');
			}
		}
	};

	app.init();
})();