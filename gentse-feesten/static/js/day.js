(() => {
	const app = {
		init() {
			this.cacheElem();

			this.partyAPI = new PartyAPI();

			this.allCategories = null;
			this.allEvents = null;

			this.currentUrl = window.location.search;
			this.currentDay = null;
			this.getCurrentUrl();

			this.fetchCategories();
		},
		cacheElem() {
			this.$showCategories = document.getElementById('category-list');
			this.$eventsPerCat = document.getElementById('events-per-category');
			this.$randomEvents = document.getElementById('random-events');

			this.$activeIcon = [...document.querySelectorAll('.view-icon')];
			this.$activeIcon[0].classList.add('view-icon__active');

			this.$gridBtn = document.getElementById('change-view__grid');
			this.$listBtn = document.getElementById('change-view__list');
		},
		getCurrentUrl() {
			const params = new URLSearchParams(this.currentUrl);
			const currentDay = params.get('day');
			this.currentDay = currentDay;
		},
		async fetchCategories() {
			this.allCategories = await this.partyAPI.getCategoriesFromUrl();
			this.$showCategories.innerHTML = this.allCategories.map(category => `<li>
        <a href="events/day.html?day=${this.currentDay}#${category.replace(/[ ,.']/g, "-")}" class="category-item" target="_self">${category}</a>
      </li>`).join('');

			this.fetchEvents(this.allCategories);
		},
		async fetchEvents(cats) {
			this.allEvents = await this.partyAPI.getEventsFromUrl();

			const filteredEvents = this.allEvents.filter(e => e.day === this.currentDay);

			this.$eventsPerCat.innerHTML = cats.map(cat => {
				if (cat !== null) {
					return `
          <div class="event-list-wrapper margin-b-2" id="${cat.replace(/[ ,.']/g, "-")}">
            <div class="events-header">
              <h2>${cat}</h2>
              <a href="events/day.html?day=${this.currentDay}#categories"><img src="static/media/icons/arrow-up.svg" alt="back-to-top" class="back-to-top"></a>
            </div>
            <ul class="events-per-category">
              ${filteredEvents.filter(e => e.category.includes(cat)).sort((a, b) => a.sort_key.localeCompare(b.sort_key)).map(single => this.generateEvent(single)).join('')}
            </ul>
          </div>`;
				}
			}).join('');

			const shuffleEvents = filteredEvents.sort(() => 0.5 - Math.random());
			const randomEvents = shuffleEvents.slice(0, 3);
			this.$randomEvents.innerHTML = randomEvents.map(event => {
				return this.generateEvent(event);
			}).join('');

			this.changeView();
		},
		generateEvent(event) {
			return `
      <li class="event__single" data-id="${event.id}">
        <a href="events/detail.html?day=${this.currentDay}&slug=${event.slug}" class="card-link">
          <div class="card-img event__single__img" style="background-image: url('${event.image === null ? 'static/media/images/default/default-image.jpg' : event.image.thumb}');"></div>
          <div class="event__single__details">
            <div class="event__single__date">${event.start.replace(':','.') + ' u.'}</div>
            <h3 class="event__single__title">${event.title}</h3>
            <p class="padding-b-0">${event.location}</p>
          </div>
        </a>
      </li>`
		},
		changeView() {
			const elements = [...document.querySelectorAll('.events-per-category')];

			this.$gridBtn.addEventListener('click', () => {
				if (this.$listBtn.classList.contains('view-icon__active')) {
					this.$listBtn.classList.remove('view-icon__active');
				}
				this.$gridBtn.classList.add('view-icon__active');
        elements.map(e => e.classList.replace('events--list', 'events-per-category'));
			}, false);

			this.$listBtn.addEventListener('click', () => {
				if (this.$gridBtn.classList.contains('view-icon__active')) {
					this.$gridBtn.classList.remove('view-icon__active');
				}
				this.$listBtn.classList.add('view-icon__active');
				elements.map(e => e.classList.replace('events-per-category', 'events--list'));
			}, false);
		}
	};

	app.init();
})();