(() => {
	const app = {
		init() {
			this.cacheElem();

			this.partyAPI = new PartyAPI();

			this.allEvents = null;

			this.currentUrl = window.location.search;
			this.currentDay = null;
			this.currentSlug = null;

			this.getCurrentUrl();
		},
		cacheElem() {
			this.$eventDetails = document.getElementById('event-details');
			this.$allEvents = document.getElementById('search-events');
		},
		getCurrentUrl() {
			const params = new URLSearchParams(this.currentUrl);
			const currentDay = params.get('day');
			this.currentDay = currentDay;
			const currentSlug = params.get('slug');
			this.currentSlug = currentSlug;

			this.fetchEvent();
		},
		async fetchEvent() {
			this.allEvents = await this.partyAPI.getEventsFromUrl();
			const filteredEvent = this.allEvents.filter(e => e.day === this.currentDay && e.slug === this.currentSlug);
			this.$eventDetails.innerHTML = this.generateHTML(filteredEvent);
		},
		generateHTML(details) {
			const event = details[0];
			return `
        <div class="single-event__header">
          <h1>${event.title}</h1>
          <div class="single-event__date-location">
            <a href="#location" class="single-event__location-link flex-center">${icon.marker + ' ' + event.location}</a>
            <p class="single-event__date flex-center">
              ${icon.clock + ' ' + event.day_of_week + ' ' + event.day} juli | ${event.start.replace(':', '.')} u. > ${event.end.replace(':', '.')} u.
            </p>
          </div>
        </div>
        <div class="single-event__media">
          <img src="${event.image === null ? 'static/media/images/default/default-image.jpg' : event.image.full}" alt="${event.title}" class="single-event__image">
        </div>
        <div class="single-event__description">
          <p>${isNaN(event.description) ? '' : event.description}</p>
        </div>
        <ul class="single-event__details">
          ${event.url === null ? '' : `
            <li>
              <p><strong>Website:</strong></p>
              <div>
                <a href="${event.url}">${event.url + '' + icon.link}</a>
              </div>
            </li>`}
          <li>
            <p><strong>Organisator:</strong></p>
            <div>
              <p>${event.organizer}</p>
            </div>
          </li>
          <li>
            <p><strong>Categorieën:</strong></p>
            <ul>
              ${this.listCategories(event)}
            </ul>
          </li>
          <li>
            ${this.wheelchair_accessible ? icon.wheelchair : ''}
          </li>
          <li>
            <ul class="single-event__details__icons">
              <li>${icon.twitter}</li>
              <li>${icon.facebook}</li>
              <li>${icon.pinterest}</li>
            </ul>
          </li>
        </ul>
        <div class="single-event__location">
          <h2>Informatiepunt</h2>
          <address>
            S.M.A.K.<br>
            Jan Hoetplein 1<br>
            9000 Gent
          </address>
          <a href="tel:093236001" class="flex-center">
            09 323 60 01 ${icon.phone}
          </a><br>
          <a href="mailto:info@smak.be" class="flex-center">
            info@smak.be ${icon.mail}
          </a><br>
          <a href="http://www.smak.be" class="flex-center">
            http://www.smak.be ${icon.link}
          </a>
        </div>`
		},
		listCategories(list) {
			let output = '';
			list.category.sort((a, b) => a.localeCompare(b)).map(e => {
				output += `<a href="events/day.html?day=${list.day}#${e.replace(/[ ,.']/g, "-")}">${e}</a><br>`
			}).join('');
			return output;
		}
	};

	app.init();
})();