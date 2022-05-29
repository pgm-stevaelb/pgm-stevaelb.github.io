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
			this.$atelierCards = document.getElementById('studio-overview');
		},
		buildUI() {
			this.createAtelierCards();
		},
		createAtelierCards() {
			this.$atelierCards.innerHTML += ATELIER.map(elem => {
				return `
				<article class="card single-card">
					<a href="atelier-studio/detail">
						<img src="static/img/atelier/${elem.images[0]}" alt="${elem.title}" class="card__img" loading="lazy">
					</a>
					${elem.subtitle === null ? '' : `<h4 class="card__subtitle">${elem.subtitle}</h4>`}
					<h3 class="card__title">${elem.title}</h3>
					<p class="card__short-description">${elem.description}</p>
					<a href="atelier-studio/detail" class="card__link">Learn more</a>
				</article>`;
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