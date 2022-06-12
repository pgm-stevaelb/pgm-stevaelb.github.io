import aboutJSON from '../data/history.json' assert { type: "json" };
import techJSON from '../data/technologies.json' assert { type: 'json' };

(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.history = aboutJSON;
      this.tech = techJSON;
      this.$about = document.querySelector('.about__tech--overview');
    },
    buildUI() {
      this.splitHistoryForHTML();
    },
    splitHistoryForHTML() {
      // This is for the extended content
      // this.$about.innerHTML = this.history.map(e => this.generateHTMLForAboutPage(e)).join('');

      // This is for only the techs
      this.$about.innerHTML = this.tech.map(e => `<li aria-label="${e.tech}" data-cooltipz-dir="bottom-right"><img src="assets/media/images/about/${e.icon}" alt="${e.tech}" class="icon icon--service"></li>`).join('');
    },
    generateHTMLForAboutPage(about) {
      return `
        <article class="about__block m-bot-m">
          <h3><span class="text-underline">${about.year}: </span>${about.title}</h3>
          <div>${about.story}</div>
          <ul class="about__icons">
            ${this.splitIcons(about.icons)}
          </ul>
        </article>
      `
    },
    splitIcons(icons) {
      let output = '';
			icons.map(e => {
				output += `<li><img src="assets/media/images/about/${e}" alt="${e}" class="icon"></li>`
			}).join('');
			return output;
    }
  };

  app.init();
})();