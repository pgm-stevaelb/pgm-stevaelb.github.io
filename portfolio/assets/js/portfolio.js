import work from '../data/portfolio.json' assert { type: "json" }; //https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules/

(() => {
  const app = {
    init() {
      this.cacheElems();
			this.buildUI();
    },
    cacheElems() {
      this.work = work;
      this.$projects = document.querySelector('.portfolio-overview');
    },
    buildUI() {
      this.splitWorkForHTML();
    },
    splitWorkForHTML() {
      this.$projects.innerHTML = this.work.map((e) => this.generateHTMLForProjects(e)).join('');
    },
    generateHTMLForProjects(work) {
      return `<article class="portfolio__block rounded" data-id="${work.id}">
                <div class="portfolio__img rounded m-bot-m box-shadow-s" style="background-image: url(assets/media/images/portfolio/${work.img.full});"></div>
                <div class="portfolio__details">
                  <h2 class="m-bot-s">${work.title}</h2>
                  <p class="m-bot-m">${work.description.short}</p>
                  <form action="${work.url}" method="get" target="_blank">
                    <button type="submit" class="btn btn-sec">Live link</button>
                  </form>
                </div>
              </article>`
    }
  };

  app.init();
})();