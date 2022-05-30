import portfolio from '../data/portfolio.json' assert { type: "json" };

(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.currentUrl = window.location.search;
      this.$detailPage = document.querySelector('.portfolio-details');
      this.portfolio = portfolio;
    },
    buildUI() {
      this.getCurrentURL();
    },
    getCurrentURL() {
      const params = new URLSearchParams(this.currentUrl);
      const currentProject = params.get('project')
      const project = this.portfolio.filter(e => currentProject === e.slug);
      this.$detailPage.innerHTML = this.generateHTML(project);
    },
    generateHTML(project) {
      const detail = project[0];
      return `
        <img src="assets/media/images/portfolio/${detail.img.full}" alt="${detail.title}" class="box-shadow-m rounded m-bot-l">
        <h1 class="m-bot-m">${detail.title}</h1>
        <h2 class="m-bot-xs">Description</h2>
        <p class="m-bot-m">${detail.description.long}</p>
        <h2 class="m-bot-s">Technologies used</h2>
        <ul class="portfolio__categories">
          ${this.splitTechnologies(detail.technology)}
        </ul>
      `
    },
    splitTechnologies(list) {
      let output = '';
			list.sort((a, b) => a.localeCompare(b)).map(e => {
				output += `<li class="technology ${e}">${e}</li>`
			}).join('');
			return output;
    }
  };

  app.init();
})();