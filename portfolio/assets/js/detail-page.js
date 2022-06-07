import portfolio from '../data/portfolio.json' assert { type: "json" };

(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();

      this.currentProjectSlug = null;
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
      const currentProject = params.get('project');
      this.currentProjectSlug = currentProject;
      const project = this.portfolio.filter(e => currentProject === e.slug);
      this.$detailPage.innerHTML = this.generateHTML(project);
    },
    generateHTML(project) {
      const detail = project[0];
      return `
        <div id="project-gallery" class="splide box-shadow-m rounded m-bot-xl" role="group" aria-label="Project Gallery">
          <div class="splide__track">
            <ul class="splide__list">
              ${this.imagesList(detail.gallery)}
            </ul>
          </div>
        </div>
        <h1 class="m-bot-m">${detail.title}</h1>
        <h2 class="m-bot-xs">Description</h2>
        <p class="m-bot-m">${detail.description.long}</p>
        <h2 class="m-bot-s">Technologies used</h2>
        <ul class="portfolio__categories m-bot-xl">
          ${this.splitTechnologies(detail.technology)}
        </ul>
        <ul class="portfolio__links m-bot-xl">
          ${detail.live === null ? '' : `<li aria-label="Go to live URL" data-cooltipz-dir="bottom-right"><a href="${detail.live}" target="_blank" class="btn btn-sec portfolio-btn"><img src="assets/media/images/icons/link.svg" alt="Web link"></a></li>`}
          ${detail.github === null ? '' : `<li aria-label="Open Github repo" data-cooltipz-dir="bottom-right"><a href="${detail.github}" target="_blank" class="btn btn-sec portfolio-btn"><img src="assets/media/images/icons/github.svg" alt="Github link"></a></li>`}
        </ul>
      `
    },
    splitTechnologies(list) {
      let output = '';
			list.sort((a, b) => a.localeCompare(b)).map(e => {
				output += `<li class="technology ${e}">${e}</li>`
			}).join('');
			return output;
    },
    imagesList(images) {
      let output = '';
      images.map(e => {
        output += `<li class="splide__slide"><img src="assets/media/images/portfolio/${this.currentProjectSlug}/${e}" alt="${e}" class="rounded m-bot-l"></li>`
      }).join('');
      return output;
    }
  };

  app.init();
})();