(() => {
	const app = {
		init() {
			this.cacheElem();

			this.baseURL = 'https://www.pgm.gent/data/gentsefeesten/';
			this.events = null;

			this.currentUrl = window.location.search;
			this.searchParam = null;

			this.getCurrentUrl();
		},
		cacheElem() {
			this.$listEvents = document.getElementById('search-overview');
      this.$searchNumber = document.getElementById('search-results-number');

      this.$gridBtn = document.getElementById('change-view__grid');
			this.$listBtn = document.getElementById('change-view__list');
		},
		getCurrentUrl() {
			const params = new URLSearchParams(this.currentUrl);
			const searchParam = params.get('search');
			this.searchParam = searchParam;

			this.fetchEvents(searchParam);
		},
		async fetchEvents(searchParam) {
			this.evemts = new PartyAPI().getEventsFromUrl()
				.then(data => {
          let i = 0;
					const output = data.filter(e => e.title.includes(searchParam)).map(event => {
            i++;
						return this.generateEvent(event);
					}).join('');

          this.$searchNumber.innerHTML = `<p><strong>${i} resultaten</strong> voor "${searchParam}"</p>`;
					this.$listEvents.innerHTML = `<ul id="search-events" class="search-events">${output}</ul>`;

          this.$activeIcon = [...document.querySelectorAll('.view-icon')];
          this.$activeIcon[0].classList.add('view-icon__active');

          this.changeView();
				})
				.catch(e => console.error('An error ocurred!', e.message));
		},
		generateEvent(event) {
			const currentDay = event.day;
      const slug = event.slug;
			return `
        <li class="event__single" data-id="${event.id}">
          <a href="events/detail.html?day=${currentDay}&slug=${slug}" class="card-link">
            <div class="card-img event__single__img" style="background-image: url('${event.image === null ? 'static/media/images/default/default-image.jpg' : event.image.thumb}');"></div>
            <div class="event__single__details">
              <div class="event__single__date">${this.shortenDay(event.day_of_week) + ' ' + event.day + ' juli ' + event.start.replace(':', '.') + ' u.'}</div>
              <h3 class="margin-b-0 event__single__title">${event.title}</h3>
              <p class="padding-b-0">${event.location}</p>
            </div>
          </a>
        </li>`
		},
		shortenDay(day) {
			return day.substring(0, 2);
		},
    changeView() {
			const element = document.getElementById('search-events');
      console.log(element)

			this.$gridBtn.addEventListener('click', () => {
				if (this.$listBtn.classList.contains('view-icon__active')) {
					this.$listBtn.classList.remove('view-icon__active');
				}
				this.$gridBtn.classList.add('view-icon__active');
        element.classList.replace('events--list', 'search-events');
			}, false);

			this.$listBtn.addEventListener('click', () => {
				if (this.$gridBtn.classList.contains('view-icon__active')) {
					this.$gridBtn.classList.remove('view-icon__active');
				}
				this.$listBtn.classList.add('view-icon__active');
				element.classList.replace('search-events', 'events--list');
			}, false);
		}
	};

	app.init();
})();