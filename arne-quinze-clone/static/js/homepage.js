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
			this.$artCards = document.getElementById('highlight-overview');
			this.$atelierCards = document.getElementById('atelier-overview');
		},
		buildUI() {
			this.createHighlightCard();
			this.createAtelierHighlights();
		},
		createHighlightCard() {
			this.$artCards.innerHTML += ARTS.filter((arg) => arg.highlight).map(elem => this.createHighlight(elem, 'arts')).join('');
			// Making use of the filter function to filter out only the highlight items.
		},
		createAtelierHighlights() {
			this.$atelierCards.innerHTML += ATELIER.filter((arg) => arg.highlight).map(elem => this.createHighlight(elem, 'ateliers')).join('');
		},
		createHighlight(item, type) {
			return `
				<article class="card">
					<a href="${type === 'arts' ? 'art-and-exhibitions' : 'atelier-studio'}/detail">
						<img src="static/img/${type === 'arts' ? `${'art/' + item.cover}` : (item.cover.image == null ? 'atelier/' + item.images[0] : 'atelier/' + item.cover.image)}" alt="${item.title}" class="card__img" loading="lazy">
					</a>
					${type === 'arts' ? `<h4 class="card__subtitle">${this.getTags(item.tags)} — ${item.location}</h4>` :
					(item.subtitle ? `<h4 class="card__subtitle">${item.subtitle}</h4>` : '')}
					<h3 class="card__title">${item.title}</h3>
					<p class="card__short-description">${item.description}</p>
					<a href="${type === 'arts' ? 'art-and-exhibitions' : 'atelier-studio'}/detail" class="card__link">Learn more</a>
				</article>`;
		},
		getTags(elem) {
			/* Get all tags if more than 1 */
			let outputTags = '';
			elem.map((tag, i) => {
				if (elem.length > 1) {
					outputTags += (i ? ' / ' : '') + tag; // array.map((item, index) => ({ (index ? ', ': '') + item }))
				} else {
					outputTags = tag;
				}
			}).join('');
			return outputTags
		}
	};

	app.init();

})();