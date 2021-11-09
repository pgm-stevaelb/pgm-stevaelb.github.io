/*
		Topic: Assignment 2 - Digital Agency - Future Island - Main JS
		Author: Steven Aelbrecht
		Modified: 2021-11-09
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
			this.filterView();

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

				lineUpOutput = `<div class="lineup__info filter--show filter-day__${this.getDayStr(dayOfPlay)}" id="${cssBtnOpen}">
					<img src="${artist.artist.picture.small}" alt="${artist.artist.name}" class="lineup__img">
					<div class="lineup__text">
					<p>
					<span class="lineup__text--day">${this.getDayStr(dayOfPlay)}</span>
					<span class="lineup__text--place">${artist.place.name}</span>
					</p>
					<p class="lineup__text--artist">${artist.artist.name}</p>
					</div>
					</div>
					<div class="concert__details details--hide" id="${cssId}" ">
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
				let detailsVisible = false;
				btnOpen.addEventListener('click',
					() => {
						detailsVisible = !detailsVisible;
						// console.log(detailsVisible);
						if (detailsVisible) {
							return changeCSS.classList.replace('details--hide', 'details--show'), document.body.style.overflow = 'hidden';
						} else {
							return changeCSS.classList.replace('details--show', 'details--hide'), document.body.style.overflow = 'auto';
						}
					},
					false);
				btnClose.addEventListener('click',
					() => {
						detailsVisible = false;
						// console.log(detailsVisible);
						if (!detailsVisible) {
							return changeCSS.classList.replace('details--show', 'details--hide'), document.body.style.overflow = 'auto';
						} else {
							return changeCSS.classList.replace('details--hide', 'details--show'), document.body.style.overflow = 'hidden';
						}
					},
					false);

				// This code was what I had before I knew classList existed... > with this I had to inline css display:none in my generated code from createLineUp()
				// btnOpen.addEventListener('click',
				// 	() => {
				// 		if (changeCSS.style.display === 'none') {
				// 			return changeCSS.style.display = 'block', document.body.style.overflow = 'hidden';
				// 		} else {
				// 			return changeCSS.style.display = 'none', document.body.style.overflow = 'auto';
				// 		}
				// 	},
				// 	false);
				// btnClose.addEventListener('click',
				// 	() => {
				// 		if (changeCSS.style.display !== 'none') {
				// 			return changeCSS.style.display = 'none', document.body.style.overflow = 'auto';
				// 		} else {
				// 			return changeCSS.style.display = 'block', document.body.style.overflow = 'hidden';
				// 		}
				// 	},
				// 	false);
			}).join('');

		},
		filterView() {
			let filterThursday = document.getElementById(`thursday`);
			let filterFriday = document.getElementById(`friday`);
			let filterSaturday = document.getElementById(`saturday`);
			let filterSunday = document.getElementById(`sunday`);

			filterThursday.addEventListener('click',
				() => {
					// if (thursday.classList.contains('filter--show')) {
					// 	return thursday.classList.replace('filter--show', 'filter--hide');
					// } else {
					// 	return thursday.classList.replace('filter--hide', 'filter--show');
					// }
					this.filterDay('Friday') + this.filterDay('Saturday') + this.filterDay('Sunday');
				},
				false);

			filterFriday.addEventListener('click', () => this.filterDay('Thursday') + this.filterDay('Saturday') + this.filterDay('Sunday'), false);
			filterSaturday.addEventListener('click', () => this.filterDay('Thursday') + this.filterDay('Friday') + this.filterDay('Sunday'), false);
			filterSunday.addEventListener('click', () => this.filterDay('Thursday') + this.filterDay('Saturday') + this.filterDay('Friday'), false);
		},
		filterDay(day) {
			let elem = document.querySelectorAll(`.filter-day__${day}`);

			for (let i = 0; i < elem.length; i++) {
				if (elem[i].classList.contains('filter--show')) {
					elem[i].classList.replace('filter--show', 'filter--hide');
				} else {
					elem[i].classList.replace('filter--hide', 'filter--show');
				}
			}

			// console.log(day);
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

			let outputStr = `<p>${this.toAmountOfDigits(days)} Dagen ${this.toAmountOfDigits(hours)}H ${this.toAmountOfDigits(mins)}M ${this.toAmountOfDigits(secs)}S</p>`;
			return outputStr;
		},
		toAmountOfDigits(number) {
			let newNumber = '';
			newNumber = (number < 10) ? newNumber = '0' + number : number;
			return newNumber;
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