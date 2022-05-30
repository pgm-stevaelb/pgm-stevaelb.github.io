import portfolioJSON from '../data/portfolio.json' assert { type: "json" }; //https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules/

(() => {
  const app = {
    init() {
      this.cacheElems();
			this.buildUI();

      // this.allCategories = null;
      // this.getAllCategories();
    },
    cacheElems() {
      this.portfolio = portfolioJSON;
      this.$projects = document.querySelector('.portfolio-overview');
      // this.$categories = document.querySelector('.category-list');
    },
    buildUI() {
      this.splitPortfolioForHTML();
    },
    splitPortfolioForHTML() {
      this.$projects.innerHTML = this.portfolio.map((e) => this.generateHTMLForProjects(e)).join('');
    },
    generateHTMLForProjects(project) {
      return `<article class="portfolio__block rounded ${project.category}" data-id="${project.id}">
                <div class="portfolio__img rounded m-bot-m box-shadow-s" style="background-image: url(assets/media/images/portfolio/${project.slug}/${project.img.full});"></div>
                <div class="portfolio__details">
                  <h2 class="m-bot-s">${project.title}</h2>
                  <p class="m-bot-s">${project.description.short}</p>
                  <ul class="portfolio__categories m-bot-m">
                    ${this.splitTechnologies(project)}
                  </ul>
                  <ul class="portfolio__links">
                    <li><a href="portfolio/detail.html?project=${project.slug}" class="btn btn-pri">More info</a></li>
                    <li><a href="${project.url}" target="_blank" class="btn btn-sec">Live link</a></li>
                  </ul>
                </div>
              </article>`
    },
    splitTechnologies(list) {
      let output = '';
			list.technology.sort((a, b) => a.localeCompare(b)).map(e => {
				output += `<li class="technology ${e}">${e}</li>`
			}).join('');
			return output;
    }
  };

  app.init();
})();