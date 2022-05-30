import servicesJSON from '../data/services.json' assert { type: "json" };

(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.allServices = servicesJSON;
      this.$services = document.querySelector('.services-overview');
    },
    buildUI() {
      this.splitServicesForHTML();
    },
    splitServicesForHTML() {
      this.$services.innerHTML = this.allServices.map(e => this.generateHTMLForServices(e)).join('');
    },
    generateHTMLForServices(service) {
      return `
        <article class="service__block rounded">
          <div class="service__block--title">
            <img src="assets/media/images/services/${service.icon}" alt="${service.service}" class="service__icon">
            <h2 class="text-underline">${service.service}</h2>
          </div>
          <p class="m-bot-m">${service.description}</p>
          <p class="text-bold">${service.listTitle}</p>
          <ul class="services__list">
            ${this.splitList(service.list)}
          </ul>
        </article>
      `
    },
    splitList(list) {
      let output = '';
			list.map(e => {
				output += `<li>${e}</li>`
			}).join('');
			return output;
    }
  };

  app.init();
})();