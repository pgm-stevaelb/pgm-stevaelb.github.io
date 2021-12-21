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
			// this.$weatherDiv = document.getElementById('weather');
			// this.$clockContainer = document.getElementById('clock');
			this.$covidDiv = document.getElementById('covid');
			this.$weatherAndClockDiv = document.getElementById('clock-and-weather');
			this.$searchRegion = document.getElementById('location-box__input');

			this.$listUsers = document.getElementById('pgm-team__list');

			this.$searchBox = document.getElementById('search-box__input');
			this.$searchButton = document.getElementById('search-box__btn');
			this.$githubUsers = document.getElementById('github-users__list');

			this.$userDetails = document.getElementById('github-details__details');
			this.$repoList = document.getElementById('github-details__repos__list');
			this.$followList = document.getElementById('github-details__followers__list');

			this.$scrollPage = document.getElementById('github-details__user');
		},
		buildUI() {
			console.log('3. Build the UI');

			this.getWeatherAndTime('Ghent');
			this.updateWeatherAndTime();
			this.switchDarkLightMode();

			this.getCovid();
			this.getPGMUsers();
			this.getSearchResults();

			this.showSearchResultDetails('pgmgent');
			this.showUserRepositories('pgmgent');
			this.showUserFollowers('pgmgent');
		},
		switchDarkLightMode() {
			const switchBtn = document.getElementById('mode-switch');
			switchBtn.innerHTML = repoIcons.sun;
			switchBtn.addEventListener('click', () => {
				document.body.classList.toggle('dark-mode');
				if (switchBtn.classList.contains('sun')) {
					switchBtn.innerHTML = repoIcons.moon;
					switchBtn.classList.replace('sun', 'moon');
				} else {
					switchBtn.innerHTML = repoIcons.sun;
					switchBtn.classList.replace('moon', 'sun');
				}
			});
		},
		async getWeatherAndTime(city) {
			const APIURL = `https://api.weatherapi.com/v1/current.json?key=28a557deaa8c407489e153714211412&q=$${city}`;
			try {
				const response = await fetch(APIURL);
				const data = await response.json();
				this.$weatherAndClockDiv.innerHTML = `
				<span>${repoIcons.clock + data.location.name + ', ' + data.location.localtime}</span>
				<img src="${data.current.condition.icon}" alt="${data.current.condition.text}" class="weather__icon">
				<span class="margin-r-2r">${data.current.temp_c}°C</span>`;
			} catch (e) {
				console.error(e.message);
				this.$weatherAndClockDiv.innerHTML = 'City not found...';
			}
		},
		updateWeatherAndTime() {
			this.$searchRegion.addEventListener('keyup', (event) => {
				event.preventDefault();
				if (event.keyCode === 13) {
					if (this.$searchRegion.value === '') {
						this.getWeatherAndTime('Ghent');
						console.log(this.$searchRegion.value);
					} else {
						this.getWeatherAndTime(this.$searchRegion.value);
						console.log(this.$searchRegion.value);
					}
				}
			}, false);
		},
		async getCovid() {
			const APIURL = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality';
			try {
				const response = await fetch(APIURL);
				const data = await response.json();
				this.$covidDiv.innerHTML += `${data.records[0].fields.cases}`;
			} catch (e) {
				console.error(e.message);
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
						<div class="pgm-team__user ${user.portfolio.github}">
							<img src="${user.thumbnail}" alt="${name}" class="pgm-team__user__img no-pointer-event">
							<div class="pgm-team__user__details no-pointer-event">
								<p class="text-m text--bold">${name}</p>
								<p>${user.portfolio.github}</p>
							</div>
						</div>`
					}).join('');
					this.$listUsers.innerHTML = listUsers;
				});

			this.getUser();
		},
		getSearchResults() {
			this.$searchBox.addEventListener('keyup', (event) => {
				event.preventDefault();
				if (event.keyCode === 13) {
					this.showGithubUsers(this.$searchBox.value);
				}
			}, false);
			this.$searchButton.addEventListener('click', () => {
				this.showGithubUsers(this.$searchBox.value);
			}, false);
		},
		async showGithubUsers(input) {
			const APIURL = 'https://api.github.com/search/users?sort=desc&page=1&per_page=50&q=' + input;

			try {
				const response = await fetch(APIURL, {
					headers: {
						'Authorization': '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'
					}
				});
				const data = await response.json();
				this.$githubUsers.innerHTML = data.items.map(user => {
					return `
						<div class="search-result ${user.login}">
							<img src="${user.avatar_url}" alt="${user.login}" class="search-result__img no-pointer-event">
							<p class="no-pointer-event">${user.login}</p>
						</div>`
				}).join('');
			} catch (e) {
				console.error(e);
			}

			this.getUser();
		},
		getUser() {
			const allUsers = document.querySelectorAll('.pgm-team__user, .search-result, .github-details__followers__list__wrapper');

			allUsers.forEach(single => {
				single.addEventListener('click', user => {
					this.$scrollPage.scrollIntoView();
					const theUser = user.target.classList[1];
					if (user.target.classList[0] === 'pgm-team__user') {
						this.showUserDetails(theUser);
					} else {
						this.showSearchResultDetails(theUser);
					}
					this.showUserRepositories(theUser);
					this.showUserFollowers(theUser);
				}, false)
			});
		},
		async showUserDetails(name) {
			await fetch('static/data/pgm.json')
				.then(response => {
					if (!response.ok) {
						throw Error('Error, JSON not found.');
					}
					return response.json();
				})
				.then(data => {
					const userDetails = data.users.filter(elem => elem.portfolio.github === name).map(user => {
						const name = user.name.first + ' ' + user.name.last;
						return `
						<div class="user-details">
							<img src="${user.thumbnail}" alt="${name}" class="user-details__img">
							<div class="user-details__details">
								<h3 class="text--bold margin-b-1r">${name}</h3>
								<p class="flex-center">${repoIcons.user + (user.teacher ? 'Teacher' : 'Student')}</p>
								<p class="flex-center margin-b-1r">${repoIcons.birthday + this.getDateOfBirth(user.dateOfBirth)}</p>
								<a href="https://github.com/${user.portfolio.github}" class="flex-center">${repoIcons.github + user.portfolio.github}</a>
								<a href="mailto:${user.email}" class="flex-center margin-b-1r">${repoIcons.mail + user.email}</a>
								<ul class="user-nav">
									<li><a href="#github-details__repos">Their repos</a></li>
									<li><a href="#github-details__followers">Their followers</a></li>
								</ul>
							</div>
							<blockquote class="user-details__quote">
								<p>${user.motto}</p>
							</blockquote>
						</div>`
					}).join('');
					this.$userDetails.innerHTML = userDetails;
				});
		},
		async showSearchResultDetails(name) {
			const apiURL = `https://api.github.com/users/${name}`;

			await fetch(apiURL, {
					headers: {
						'Authorization': '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'
					}
				})
				.then(response => {
					if (!response.ok) {
						throw Error('Error, JSON not found.');
					}
					return response.json();
				})
				.then(data => {
					this.$userDetails.innerHTML = `
					<div class="user-details">
						<img src="${data.avatar_url}" alt="${data.login}" class="user-details__img">
						<div class="user-details__details">
							<h3 class="text--bold margin-b-1r">${data.login} (${data.type})</h3>
							<p class="flex-center">${repoIcons.user + (data.name !== null ? data.name : data.login)}</p>
							<a href="https://github.com/${data.html_url}" class="flex-center margin-b-1r">${repoIcons.github} Go to their Github page.</a>
							<ul class="user-nav">
								<li><a href="#github-details__repos">Their repos</a></li>
								<li><a href="#github-details__followers">Their followers</a></li>
							</ul>
						</div>
					</div>`
				});
		},
		async showUserRepositories(name) {
			const repoURL = `https://api.github.com/users/${name}/repos?page=1&per_page=20`;

			await fetch(repoURL, {
					headers: {
						'Authorization': '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'
					}
				})
				.then(response => {
					if (!response.ok) {
						throw Error('Error, JSON not found.');
					}
					return response.json();
				})
				.then(data => {
					this.$repoList.innerHTML = data.map(repo => {
						return `
						<div class="repo__single">
							<a href="${repo.html_url}" class="repo__single__title" target="_blank">${repo.owner.login}/${repo.name}</a>
							<p class="repo__single__description">${(repo.description !== null) ? repo.description : ''}</p>
							<div class="repo__single__details">
								<span class="flex-center">${this.calculateSize(repo.size)}</span>
								<span class="flex-center">${repoIcons.branch}${repo.default_branch}</span>
								<span class="flex-center">${repoIcons.scale}${(repo.license !== null) ? repo.license.key : 'No license!'}</span>
								<span class="flex-center">${repoIcons.security}${repo.visibility}</span>
								<span class="flex-center">${repoIcons.fork}${repo.forks_count}</span>
								<span class="flex-center">${repoIcons.issues}${repo.open_issues}</span>
								<span class="flex-center">${repoIcons.views}${repo.watchers_count}</span>
								<a href="${repo.html_url}" target="_blank" class="last-item">${repoIcons.link}</a>
							</div>
						</div>
						`
					}).join('');
				});
		},
		calculateSize(size) {
			if (size >= 1000) {
				return (size / 1000).toFixed(0) + ' MB';
			} else {
				return size + ' KB';
			}
		},
		async showUserFollowers(name) {
			const followURL = `https://api.github.com/users/${name}/followers?page=1&per_page=100`;

			await fetch(followURL, {
					headers: {
						'Authorization': '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'
					}
				})
				.then(response => {
					if (!response.ok) {
						throw Error('Error, JSON not found.');
					}
					return response.json();
				})
				.then(data => {
					this.$followList.innerHTML = data.map(follow => {
						return `
						<div class="github-details__followers__list__wrapper ${follow.login}">
							<img src="${follow.avatar_url} alt="${follow.login}" class="github-details__followers__list__img no-pointer-event">
							<p class="github-details__followers__list__login no-pointer-event">${follow.login}</p>
						</div>`
					}).join('');
				});

			this.getUser();
		},
		getDateOfBirth(epoch) {
			let birthDate = new Date(epoch);
			let dayOfBirth = this.doubleDigits(birthDate.getDay());
			let monthOfBirth = this.doubleDigits(birthDate.getMonth() + 1);

			let output = `${dayOfBirth}/${monthOfBirth}/${birthDate.getFullYear()}`;
			return output;
		},
		doubleDigits(number) {
			let newNumber = '';
			newNumber = (number < 10) ? newNumber = '0' + number : number;
			return String(newNumber);
		}
	};

	app.init();
})();