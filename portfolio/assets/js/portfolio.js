import portfolioJSON from '../data/portfolio.json' assert { type: "json" }; //https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules/

(() => {
  const app = {
    init() {
      this.cacheElems();
			this.buildUI();

      this.allCategories = null;
      this.showCategories();

      this.filterItems();
    },
    cacheElems() {
      this.portfolio = portfolioJSON;
      this.$projects = document.querySelector('.portfolio-overview');
      this.$categories = document.querySelector('.portfolio__categories');
    },
    buildUI() {
      this.splitPortfolioForHTML();
    },
    splitPortfolioForHTML() {
      this.$projects.innerHTML = this.portfolio.map((e) => this.generateHTMLForProjects(e)).join('');
    },
    generateHTMLForProjects(project) {
      return `<article class="portfolio__block rounded ${project.category}" data-filter="${project.category}">
                <div class="portfolio__img rounded m-bot-m box-shadow-s" style="background-image: url(assets/media/images/portfolio/${project.slug}/${project.img.full});"></div>
                <div class="portfolio__details">
                  <h2 class="m-bot-s">${project.title}</h2>
                  <p class="m-bot-s">${project.description.short}</p>
                  <ul class="portfolio__categories m-bot-m">
                    ${this.splitTechnologies(project)}
                  </ul>
                  <ul class="portfolio__links">
                    <li><a href="portfolio/detail.html?project=${project.slug}" class="btn btn-pri">More info</a></li>
                    ${project.live === null ? '' : `<li><a href="${project.live}" target="_blank" class="btn btn-sec portfolio-btn"><img src="assets/media/images/icons/link.svg" alt="Web link"></a></li>`}
                    ${project.github === null ? '' : `<li><a href="${project.github}" target="_blank" class="btn btn-sec portfolio-btn"><img src="assets/media/images/icons/github.svg" alt="Github link"></a></li>`}
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
    },
    showCategories() {
      const allCats = this.portfolio.map(e => e.category).join(',');
      const uniqueCats = [...new Set(allCats.split(','))]
      this.$categories.innerHTML += uniqueCats.map(e => `<span class="btn btn-cat" data-filter="${e}">${e}</span>`).join('')
    },
    filterItems() {
      const filters = document.querySelectorAll('.btn-cat');

      filters.forEach(filter => {
        filter.addEventListener('click', () => {
          let selectedFilter = filter.getAttribute('data-filter');
          let itemsToHide = document.querySelectorAll(`.portfolio-overview .portfolio__block:not([data-filter='${selectedFilter}'])`);
          let itemsToShow = document.querySelectorAll(`.portfolio-overview [data-filter='${selectedFilter}']`);

          if (selectedFilter == 'all') {
            itemsToHide = [];
            itemsToShow = document.querySelectorAll('.portfolio-overview [data-filter]');
          }

          itemsToHide.forEach(e => {
            e.classList.add('hide');
            e.classList.remove('show');
          });

          itemsToShow.forEach(e => {
            e.classList.remove('hide');
            e.classList.add('show');
          });
        });
      });
    }
  };

  app.init();
})();