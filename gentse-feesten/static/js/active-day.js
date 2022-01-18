(() => {
	const app = {
		init() {
			this.cacheElem();

      this.currentUrl = window.location.search;
			this.currentDay = null;

      this.getCurrentUrl();
		},
		cacheElem() {
      this.$day = [...document.querySelectorAll('.day-link')];
		},
    getCurrentUrl() {
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