/*
		Topic: Main JS File for Github Dashboard - PGM-2_Project-1
		Author: Steven Aelbrecht
		Modified: 2021-12-23
*/

(() => {
	const app = {
		init() {
			this.cacheElem();
			this.buildUI();
		},
		cacheElem() {
			this.$covidDiv = document.getElementById('covid');
			this.$weatherAndClockDiv = document.getElementById('clock-and-weather');
			this.$searchRegion = document.getElementById('location-box__input');

			this.$listPGMUsers = document.getElementById('pgm-team__list');

			this.$searchBox = document.getElementById('search-box__input');
			this.$searchButton = document.getElementById('search-box__btn');
			this.$youtubeButton = document.getElementById('search-box__btn--youtube');
			this.$showSearchResults = document.getElementById('github-users__list');

			this.$innerContentDetails = document.getElementById('github-details__details');
			this.$repoList = document.getElementById('github-details__repos__list');
			this.$followList = document.getElementById('github-details__followers__list');

			this.$scrollPage = document.getElementById('github-details__user');
		},
		buildUI() {
			this.switchDarkLightMode();

			this.getWeatherAndTime('Ghent');
			this.updateWeatherAndTime();
			this.renderCovidNumbers();

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
			const weatherAndClock = new WeatherAPI(city).fetchWeather();
			weatherAndClock
				.then(data => {
					this.renderWeatherAndTime(data);
				})
				.catch(e => this.$weatherAndClockDiv.innerHTML = 'City not found...');
		},
		renderWeatherAndTime(data) {
			this.$weatherAndClockDiv.innerHTML = `
				<span>${repoIcons.clock + data.location.name + ', ' + data.location.localtime}</span>
				<img src="${data.current.condition.icon}" alt="${data.current.condition.text}" class="weather__icon">
				<span class="margin-r-2r">${data.current.temp_c}°C</span>`;
		},
		updateWeatherAndTime() {
			this.$searchRegion.addEventListener('keyup', (event) => {
				event.preventDefault();
				if (event.keyCode === 13) {
					if (this.$searchRegion.value === '') {
						this.getWeatherAndTime('Ghent');
					} else {
						this.getWeatherAndTime(this.$searchRegion.value);
					}
				}
			}, false);
		},
		async renderCovidNumbers() {
			new CovidAPI().fetchCovidNumbers()
				.then(data => {
					this.$covidDiv.innerHTML = `${repoIcons.covid + data.records[0].fields.cases}`;
				})
				.catch(e => this.$covidDiv.innerHTML = 'Numbers not found...');
		},
		async getPGMUsers() {
			new LocalJSON().fetchPGMUsers()
				.then(data => this.renderPGMUsers(data))
				.catch(e => this.$listPGMUsers.innerHTML = 'JSON not found...');
		},
		renderPGMUsers(data) {
			this.$listPGMUsers.innerHTML = data.users.map(user => {
				const name = user.name.first + ' ' + user.name.last;
				return `
					<div class="pgm-team__user ${user.portfolio.github}">
						<img src="static/media/images/pgm/${user.thumbnail}" alt="${name}" class="pgm-team__user__img no-pointer-event">
						<div class="pgm-team__user__details no-pointer-event">
							<p class="text-m text--bold">${name}</p>
							<p>${user.portfolio.github}</p>
						</div>
					</div>`
			}).join('');

			this.showAllDetails('.pgm-team__user');
		},
		async getPGMUserDetails(name) {
			new LocalJSON().fetchPGMUsers()
				.then(data => this.renderPGMUserDetails(data, name))
				.catch(e => this.$innerContentDetails.innerHTML = 'JSON not found...');
		},
		renderPGMUserDetails(data, name) {
			this.$innerContentDetails.innerHTML = data.users.filter(elem => elem.portfolio.github === name).map(user => {
				const name = user.name.first + ' ' + user.name.last;
				return `
					<div class="user-details">
						<img src="static/media/images/pgm/${user.thumbnail}" alt="${name}" class="user-details__img">
						<div class="user-details__details">
							<h3 class="text--bold margin-b-1r">${name}</h3>
							<p class="flex-center">${repoIcons.user + (user.teacher ? 'Teacher' : 'Student')}</p>
							<p class="flex-center margin-b-1r">${repoIcons.birthday + this.getDateOfBirth(user.dateOfBirth)}</p>
							<a href="https://github.com/${user.portfolio.github}" class="flex-center" target="_blank">${repoIcons.github + user.portfolio.github}</a>
							<a href="https://www.linkedin.com/in/${user.portfolio.linkedin}" class="flex-center" target="_blank">${repoIcons.linkedin}Go to their LinkedIn</a>
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
		},
		getSearchResults() {
			this.$searchBox.addEventListener('keyup', (event) => {
				event.preventDefault();
				if (event.keyCode === 13) {
					if (this.$searchBox.value === '') {
						this.$showSearchResults.innerHTML = '<p>No results found.</p>'
					} else {
						this.showGithubSearchResults(this.$searchBox.value);
					}
				}
			}, false);
			this.$searchButton.addEventListener('click', () => {
				if (this.$searchBox.value === '') {
					this.$showSearchResults.innerHTML = '<p>No results found.</p>'
				} else {
					this.showGithubSearchResults(this.$searchBox.value);
				}
			}, false);
			this.$youtubeButton.addEventListener('click', () => {
				if (this.$searchBox.value === '') {
					this.$showSearchResults.innerHTML = '<p>No results found.</p>'
				} else {
					this.showYoutubeSearchResults(this.$searchBox.value);
				}
			}, false);
		},
		async showGithubSearchResults(input) {
			new GithubAPI(input).fetchSearchResults()
				.then(data => this.renderSearchResults(data))
				.catch(e => this.$showSearchResults.innerHTML = 'Something went wrong...');
		},
		async showYoutubeSearchResults(input) {
			new YouTubeAPI(input).fetchYouTubeResults()
				.then(data => this.renderYouTubeResults(data))
				.catch(e => this.$showSearchResults.innerHTML = 'Something went wrong...');
		},
		renderSearchResults(user) {
			this.$showSearchResults.innerHTML = user.items.map(searchParam => {
				return `<div class="search-result ${searchParam.login}">
					<img src="${searchParam.avatar_url}" alt="${searchParam.login}" class="search-result__img no-pointer-event">
					<p class="no-pointer-event">${searchParam.login}</p>
				</div>`;
			}).join('');

			this.showAllDetails('.search-result');
		},
		renderYouTubeResults(video) {
			this.$showSearchResults.innerHTML = video.items.map(searchParam => {
				return `<a href="https://www.youtube.com/watch?v=${searchParam.id.videoId}" class="youtube-video" target="_blank">
					<img src="${searchParam.snippet.thumbnails.default.url}" alt="${searchParam.snippet.thumbnails.title}" class="youtube-result__img no-pointer-event">
					<p class="no-pointer-event">${searchParam.snippet.title}</p>
				</a>`
			}).join('');
		},
		showAllDetails(className) {
			const allUsers = document.querySelectorAll(className);

			allUsers.forEach(single => {
				single.addEventListener('click', user => {
					this.$scrollPage.scrollIntoView();
					const theUser = user.target.classList[1];
					if (user.target.classList[0] === 'pgm-team__user') {
						this.getPGMUserDetails(theUser);
					} else {
						this.showSearchResultDetails(theUser);
					}
					this.showUserRepositories(theUser);
					this.showUserFollowers(theUser);
				}, false)
			});
		},
		async showSearchResultDetails(name) {
			new GithubAPI(name).showResultDetails()
				.then(data => this.renderSearchResultDetails(data))
				.catch(e => this.$innerContentDetails.innerHTML = 'Something went wrong...')
		},
		renderSearchResultDetails(user) {
			this.$innerContentDetails.innerHTML = `
				<div class="user-details">
					<img src="${user.avatar_url}" alt="${user.login}" class="user-details__img">
					<div class="user-details__details">
						<h3 class="text--bold margin-b-1r">${user.login} (${user.type})</h3>
						<p class="flex-center">${repoIcons.user + (user.name !== null ? user.name : user.login)}</p>
						<a href="https://github.com/${user.html_url}" class="flex-center margin-b-1r" target="_blank">${repoIcons.github} Go to their Github page.</a>
						<ul class="user-nav">
							<li><a href="#github-details__repos">Their repos</a></li>
							<li><a href="#github-details__followers">Their followers</a></li>
						</ul>
					</div>
				</div>`
		},
		async showUserRepositories(name) {
			new GithubAPI(name).showRepos()
				.then(data => {
					if (data.length === 0) {
						this.$repoList.innerHTML = '<p>No repos to show...</p>';
					} else {
						this.renderRepos(data);
					};
				})
				.catch(e => this.$repoList.innerHTML = 'Something went wrong...')
		},
		renderRepos(data) {
			this.$repoList.innerHTML = data.map(repo => {
				return `
				<div class="repo__single">
					<div class="repo__single__link-language"/>
						<a href="${repo.html_url}" class="repo__single__title" target="_blank">${repo.owner.login}/${repo.name}</a>
						${repo.language === null ? '' : '<p class="text-light"><span class="language-circle circle--' + repo.language + '"></span>' + repo.language + '</p>'}
					</div>
					<p class="text-light">${(repo.description !== null) ? repo.description : ''}</p>
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
				</div>`;
			}).join('');
		},
		async showUserFollowers(name) {
			new GithubAPI(name).showFollows()
				.then(data => {
					if (data.length === 0) {
						this.$followList.innerHTML = '<p>No repos to show...</p>';
					} else {
						this.renderFollowers(data);
					};
				})
				.catch(e => this.$followList.innerHTML = 'Something went wrong...')
		},
		renderFollowers(data) {
			this.$followList.innerHTML = data.map(follow => {
				return `
				<div class="github-details__followers__list__wrapper ${follow.login}">
					<img src="${follow.avatar_url} alt="${follow.login}" class="github-details__followers__list__img no-pointer-event">
					<p class="github-details__followers__list__login no-pointer-event">${follow.login}</p>
				</div>`;
			}).join('');

			this.showAllDetails('.github-details__followers__list__wrapper');
		},
		calculateSize(size) {
			if (size >= 1000) {
				return (size / 1000).toFixed(0) + ' MB';
			} else {
				return size + ' KB';
			}
		},
		getDateOfBirth(epoch) {
			let birthDate = new Date(epoch);
			let dayOfBirth = this.doubleDigits(birthDate.getDate());
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