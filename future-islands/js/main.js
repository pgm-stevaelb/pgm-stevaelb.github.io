/*
		Topic: Assignment 2 - Digital Agency - Future Island - Main JS
		Author: Steven Aelbrecht
		Modified: 2021-11-05
*/

(() => {
	const app = {
		init() {
			console.log('1. Init app.')
			this.cacheElements();
			this.buildUI();
		},
		cacheElements() {
			console.log('2. Cache all DOM elements.');
			this.$navElements = document.querySelector('.nav__menu');
			this.$lineUpElements = document.querySelector('.festival__lineup');
			this.$concertDetails = document.querySelector('.concert__details');
			this.$countdownTimer = document.querySelector('.festival__countdown');
			this.$socialElements = document.querySelector('.soc__menu');

			this.$thursdayElement = document.getElementById('thursday');
			this.$fridayElement = document.getElementById('friday');
			this.$saturdayElement = document.getElementById('saturday');
			this.$sundayElement = document.getElementById('sunday');
		},
		buildUI() {
			console.log('3. Build the UI for the app.');
			this.$navElements.innerHTML = this.createNavMenu();
			this.$lineUpElements.innerHTML = this.createLineUp();

			this.openCloseDetails();
			// this.filterView(); // is not working like I want it to...

			setInterval(() => {
				this.ticking();
			}, 500);

			this.$socialElements.innerHTML = this.createSocialMenu();
		},
		createNavMenu() {
			let outputNav = '';
			outputNav += navLinks.map((nav) => {
				if (nav.type == 'external') {
					return `<li class="nav__item nav__item--external"><a href="${nav.link}" target="_blank">${nav.name}</a></li>`;
				} else {
					return `<li class="nav__item"><a href="${nav.link}" target="_blank">${nav.name}</a></li>`;
				};
			}).join('');
			return outputNav;
		},
		createLineUp() {
			let outputLineUp = '';

			outputLineUp += dataLineUp.map((artist) => {
				const dayOfPlay = new Date(artist.from).getDay();
				const cssBtnOpen = 'open--' + artist.id;
				const cssBtnClose = 'close--' + artist.id;
				const cssId = 'concert__details--' + artist.id;

				let lineUpOutput = '';

				lineUpOutput = `<div class="lineup__info filter-day__${this.getDayStr(dayOfPlay)}" id="${cssBtnOpen}" style="display: block;">
					<img src="${artist.artist.picture.small}" alt="${artist.artist.name}" class="lineup__img">
					<div class="lineup__text">
					<p>
					<span class="lineup__text--day">${this.getDayStr(dayOfPlay)}</span>
					<span class="lineup__text--place">${artist.place.name}</span>
					</p>
					<p class="lineup__text--artist">${artist.artist.name}</p>
					</div>
					</div>
					<div class="concert__details" id="${cssId}" style="display: none;">
					<img src="images/icons/png/close.png" alt="close" class="btn--close" id="${cssBtnClose}">
					<img src="${artist.artist.picture.large}" alt="${artist.artist.name}" class="details__img">
					<div class="details__text">
					<div class="details__artist">
					<p>
					<span class="details__artist--day">${this.getDayStr(dayOfPlay)}</span>
					<span class="details__artist--place">${artist.place.name}</span>
					</p>
					<p class="details__artist--artist">${artist.artist.name}</p>
					</div>
					<p class="details__artist--synopsis">${artist.artist.synopsis}</p>
					<div class="details__artist--synopsis">
					<iframe src="${artist.artist.media.sourceId}" frameborder="0" controls allowfullscreen></iframe>
					</div>
					<h3 class="">KNOW MORE?</h3>
					<p><a href="${artist.artist.social.website}">${artist.artist.social.website}</a></p>
					<p><a href="${artist.artist.social.facebook}">${artist.artist.social.facebook}</a></p>
					<p><a href="${artist.artist.social.instagram}">${artist.artist.social.instagram}</a></p>
					<p><a href="${artist.artist.social.twitter}">${artist.artist.social.twitter}</a></p>
					</div>
					</div>`

				return lineUpOutput
			}).join('');

			return outputLineUp;
		},
		openCloseDetails() {
			dataLineUp.map((artist) => {
				this.$idElement = document.querySelector(`#concert__details--${artist.id}`);
				this.$btnOpen = document.querySelector(`#open--${artist.id}`);
				this.$btnClose = document.querySelector(`#close--${artist.id}`);
				let changeCSS = this.$idElement;
				let btnOpen = this.$btnOpen;
				let btnClose = this.$btnClose;
				btnOpen.addEventListener('click',
					() => {
						if (changeCSS.style.display === 'none') {
							return changeCSS.style.display = 'block', document.body.style.overflow = 'hidden';
						} else {
							return changeCSS.style.display = 'none', document.body.style.overflow = 'auto';
						}
					},
					false);
				btnClose.addEventListener('click',
					() => {
						if (changeCSS.style.display !== 'none') {
							return changeCSS.style.display = 'none', document.body.style.overflow = 'auto';
						} else {
							return changeCSS.style.display = 'block', document.body.style.overflow = 'hidden';
						}
					},
					false);
			}).join('');

		},
		filterView() {
			let filterThursday = document.getElementById(`thursday`);
			let filterFriday = document.getElementById(`friday`);
			let filterSaturday = document.getElementById(`saturday`);
			let filterSunday = document.getElementById(`sunday`);

			dataLineUp.map((day) => {
				let thursday = document.querySelector(`.filter-day__Thursday`);
				let friday = document.querySelector(`.filter-day__Friday`);
				let saturday = document.querySelector(`.filter-day__Saturday`);
				let sunday = document.querySelector(`.filter-day__Sunday`);

				filterThursday.addEventListener('click',
					() => {
						if (thursday.style.display === 'block') {
							return saturday.style.display = 'none';
						}
					},
					false);
				filterFriday.addEventListener('click',
					() => {
						if (friday.style.display !== 'none') {
							return friday.style.display = 'none';
						} else {
							return friday.style.display = 'block';
						}
					},
					false);
				filterSaturday.addEventListener('click',
					() => {
						if (saturday.style.display !== 'none') {
							return saturday.style.display = 'none';
						} else {
							return saturday.style.display = 'block';
						}
					},
					false);
				filterSunday.addEventListener('click',
					() => {
						if (sunday.style.display !== 'none') {
							return sunday.style.display = 'none';
						} else {
							return sunday.style.display = 'block';
						}
					},
					false);
			});

		},
		getDayStr(day) {
			let output = '';
			switch (day) {
				case 0:
					output = 'Sunday';
					break;
				case 1:
					output = 'Monday';
					break;
				case 2:
					output = 'Tuesday';
					break;
				case 3:
					output = 'Wednesday';
					break;
				case 4:
					output = 'Thursday';
					break;
				case 5:
					output = 'Friday';
					break;
				case 6:
					output = 'Saturday';
					break;
			}
			return output;
		},
		createCountdownTimer() {
			const today = new Date();
			const diffTime = Math.floor((festivalDate - today) / 1000);

			let mins = Math.floor(diffTime / 60);
			let secs = diffTime % 60;
			let hours = Math.floor(mins / 60);
			mins = mins % 60;
			let days = Math.floor(hours / 24);
			hours = hours % 24;
			days = days % 365;

			let outputStr = `<p>${days} Dagen ${hours}H ${mins}M ${secs}S</p>`;
			return outputStr;
		},
		toAmountOfDigits(number) {
			let newNumber = '';
			newNumber = (number < 10) ? newNumber = '0' + number : number;
			return String(newNumber);
		},
		ticking() {
			this.$countdownTimer.innerHTML = this.createCountdownTimer();
		},
		createSocialMenu() {
			let outputSoc = '';
			outputSoc += socialIcons.map((link) => `<li class="soc__item"><a href="${link.link}" target="_blank"><img src="images/icons/png/${link.type}.png" alt="${link.name}" class="social__icon"></a></li>`).join('');
			return outputSoc;
		}
	};

	app.init();
})();