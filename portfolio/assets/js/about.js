import aboutJSON from '../data/history.json' assert { type: "json" };

(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.history = aboutJSON;
      this.$about = document.querySelector('.about-overview');
    },
    buildUI() {
      this.splitHistoryForHTML();
    },
    splitHistoryForHTML() {
      this.$about.innerHTML = this.history.map(e => this.generateHTMLForAboutPage(e)).join('');
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