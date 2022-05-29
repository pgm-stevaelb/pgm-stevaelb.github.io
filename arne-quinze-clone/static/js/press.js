/*
		Topic: Arne Quinze JS
		Author: Steven Aelbrecht
		Modified: 2021-11-30
*/

(() => {
	const app = {
		init() {
			this.cacheElements();
			this.buildUI();
		},
		cacheElements() {
			this.$pressReleaseCards = document.getElementById('press-release-overview');
			this.$pressCards = document.getElementById('press-overview');
		},
		buildUI() {
			this.createPressReleaseCards();
		},
		createCards(item) {
			return `
			<article class="card single-card">
				<a href="press/detail">
					<img src="static/img/press/${item.cover}" alt="${item.title}" class="card__img" loading="lazy">
				</a>
				<h4 class="card__subtitle">${item.subtitle}</h4>
				<h3 class="card__title">${item.title}</h3>
				<p class="card__short-description">${item.description}</p>
				<a href="press/detail" class="card__link">${item.type === 'press-release' ? 'Open press release' : 'Download article'}</a>
			</article>`;
		},
		createPressReleaseCards() {
			PRESS.map(elem => {
				elem.type === 'press-release' ? this.$pressReleaseCards.innerHTML += this.createCards(elem) : this.$pressCards.innerHTML += this.createCards(elem);
			}).join('');
		},
		getTags(elem) {
			let outputTags = '';
			elem.map((tag, i) => {
				if (elem.length > 1) {
					outputTags += (i ? ' / ' : '') + tag;
				} else {
					outputTags = tag;
				}
			}).join('');
			return outputTags
		}
	};

	app.init();

})();