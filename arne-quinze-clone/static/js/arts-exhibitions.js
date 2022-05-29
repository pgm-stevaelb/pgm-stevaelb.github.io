/*
		Topic: Arne Quinze JS - Art & Exhibitions
		Author: Steven Aelbrecht
		Modified: 2021-12-02
*/

(() => {
	const app = {
		init() {
			this.cacheElements();
			this.buildUI();
		},
		cacheElements() {
			this.$overview = document.getElementById('art-archive');
			this.$filterYears = document.getElementById('filter-years');
			this.$filterTags = document.getElementById('filter-tags');

			// Getting all the unique years in a global variable
			this.$allYears = ARTS.map(year => year.year);
			this.$uniqueYears = [...new Set(this.$allYears)];

			// Getting all the unique tags in a global variable
			this.$allTags = ARTS.map(tag => tag.tags).flat(); // .flat() adds all arrays together
			this.$uniqueTags = [...new Set(this.$allTags)];
		},
		buildUI() {
			this.$filterTags.innerHTML += '<a href="art-and-exhibitions/#" id="filter-all-tags" class="btn--filter filter-link--active">Show All</a>' + this.$uniqueTags.map(tag => {
				if (tag !== '') return `<a href='art-and-exhibitions/#' id="filter-for-${tag}" class="btn--filter btn--tag-filter">${tag}</a>`
			}).join('');

			this.$filterYears.innerHTML += '<a href="art-and-exhibitions/#" id="filter-all-years" class="btn--filter filter-link--active">Show All</a>' + this.$uniqueYears.map(year => `<a href='art-and-exhibitions/#' id="filter-for-${year}" class="btn--filter btn--year-filter">${year}</a>`).join('');

			this.createFullList()
			this.filterItems();
		},
		filterItems() {
			// Getting the filter buttons after they were generated
			// The return will either be the full overview (if the button === Show all) or return a filter tag being either a year or a tag
			this.$filterButtons = document.querySelectorAll('.btn--filter');
			let buttons = this.$filterButtons;
			buttons.forEach(element => {
				element.addEventListener('click', (filter) => {
					filter = element.innerHTML;
					this.removeActiveClasses(buttons);
					element.classList.add('filter-link--active');
					if (filter === 'Show All') {
						this.createFullList();
					} else {
						this.filterList(filter);
					}
				}, false)
			});
		},
		filterList(filter) {
			// Check if the filter is a string or a number and show a list depending on the answer.
			if (isNaN(filter)) {
				this.$overview.innerHTML = this.$uniqueYears.map(year => {
					return `<div id="arts-of-${year}" class="art-archive-year filter--active"><h2 class="art-year">${year}</h2><div class="grouped-art">
					${
						ARTS.filter(artwork => artwork.tags.includes(filter)).map(elem => {
							const onlyThisYear = elem.year;
							if (onlyThisYear === year) {
								return this.createSingleItem(elem);
							} else {
								return '';
							}
						}).join('')
					}
					</div></div>`
				}).join('');
			} else {
				this.$overview.innerHTML = this.$uniqueYears.filter(filterYear => filterYear === filter).map(elem => this.createListPerYear(elem)).join('');
			}
		},
		createFullList() {
			// Creates the full overview list
			this.$overview.innerHTML = this.$uniqueYears.map(elem => this.createListPerYear(elem)).join("");
		},
		createListPerYear(elem) {
			// Creates the list with the respective dates as titles
			return `<div id="arts-of-${elem}" class="art-archive-year filter--active"><h2 class="art-year">${elem}</h2><div class="grouped-art">` +
				ARTS.filter(arg => arg.year === elem).sort((a, b) => {
					return b.year - a.year;
				}).map(elem => this.createSingleItem(elem)).join('') + '</div></div>';
		},
		createListPerTag(elem) {
			// Creates the list with the respective dates as titles
			return `<div id="arts-of-${elem}" class="art-archive-year filter--active"><h2 class="art-year">${elem}</h2><div class="grouped-art">` +
				ARTS.filter(arg => arg.tags.includes(elem)).sort((a, b) => {
					return b.year - a.year;
				}).map(elem => this.createSingleItem(elem)).join('') + '</div></div>';
		},
		createSingleItem(item) {
			// Creates a single card
			return `
				<article class="art-single">
					<div class="art-single__header">
						<h3 class="art-single__title"><a href="art-and-exhibitions/detail">${item.title}</a></h3>
						${item.subtitle !== null ? '<p class="art-single__subtitle">' + item.subtitle + '</p>' : ''}
						<h4 class="art-single__location">${this.getTags(item.tags) + (item.location !== null ? ' — ' + item.location : '')}</h4>
					</div>
					<div class="art-single__images">
							${this.getImages(item.images)}
					</div>
				</article>`;
		},
		removeActiveClasses(button) {
			[].forEach.call(button, (elem) => {
				elem.classList.remove('filter-link--active');
			});
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
			return outputTags;
		},
		getImages(elem) {
			let outputImages = '';
			if (elem.length !== 0) {
				elem.forEach((img) => {
					outputImages += `<img src="static/img/art/${img}" alt="Arne Quinze" loading="lazy"></img>`
				});
			}
			// `<img src="static/img/art/${img.images[i]}"></img>`
			return outputImages;
		}
	};

	app.init();

})();