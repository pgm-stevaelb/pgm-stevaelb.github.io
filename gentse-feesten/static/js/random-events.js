(() => {
  const app = {
    init() {
      this.cacheElem();

      this.baseURL = 'https://www.pgm.gent/data/gentsefeesten/';
      this.events = null;

      this.fetchEvents();
    },
    cacheElem() {
      this.$randomEvents = document.getElementById('random-events');
    },
    async fetchEvents() {
      this.evemts = new PartyAPI().getEventsFromUrl()
        .then(data => {
          const shuffleEvents = data.sort(() => 0.5 - Math.random());
          const randomEvents = shuffleEvents.slice(0, 3);
          this.$randomEvents.innerHTML = randomEvents.map(event => {
            return this.generateEvent(event);
          }).join('');
        })
        .catch(e => console.error('An error ocurred!', e.message));
    },
    generateEvent(event) {
      const currentDay = event.day;
      return `
      <article class="event__single" data-id="${event.id}">
        <a href="events/detail.html?day=${currentDay}&slug=${event.slug}" class="card-link">
          <div class="card-img event__single__img" style="background-image: url('${event.image === null ? 'static/media/images/default/default-image.jpg' : event.image.thumb}');"></div>
          <div class="event__single__details">
            <div class="event__single__date">${this.shortenDay(event.day_of_week) + ' ' + event.day + ' juli ' + event.start.replace(':', '.') + ' u.'}</div>
            <h3 class="margin-b-0 event__single__title">${event.title}</h3>
            <p class="padding-b-0">${event.location}</p>
          </div>
        </a>
      </article>`
    },
    shortenDay(day) {
      return day.substring(0, 2);
    }
  };

  app.init();
})();