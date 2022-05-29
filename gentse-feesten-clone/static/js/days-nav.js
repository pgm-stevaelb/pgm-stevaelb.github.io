(() => {
	const app = {
		init() {
			this.cacheElem();

      this.partyAPI = new PartyAPI();

      this.arrayOfDates = null;
      this.currentUrl = window.location.search;
			this.currentDay = null;
      
      this.fetchEvents();
		},
		cacheElem() {
      this.$nav = document.querySelector('.all-days__navigation');
		},
    async fetchEvents() {
			await this.partyAPI.getEventsFromUrl()
        .then(data => {
          const days = {};
          for (const single of data) {
            days[single.day] = single.day_of_week;
          };
          for (const day in days) {
            this.$nav.innerHTML += this.generateDays(days[day], day);
          }
        })
      .catch(e => console.error('An error ocurred!', e.message));
      
      this.setActiveDay();
		},
    generateDays(days, num) {
      return `
        <li class="day-link-item">
          <a href="events/day.html?day=${num}" class="day-link transition" data-day="${num}">
            <span class="day-link-item__day">${days.substring(0,2)}</span>
            <span class="day-link-item__date">${num} Jul</span>
          </a>
        </li>`
    },
    setActiveDay() {
      this.$day = [...document.querySelectorAll('.day-link')];
      const params = new URLSearchParams(this.currentUrl);
			const currentDay = params.get('day');
      this.$day.map(e => {
        if (e.dataset.day === currentDay) {
          e.classList.add('active-day');
        }
      });
    }
	};

	app.init();
})();