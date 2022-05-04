(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.$modeButton = document.getElementById('mode');
    },
    buildUI() {
      this.registerListeners();
    },
    registerListeners() {
      this.$modeButton.addEventListener('click', this.toggleDarkMode, false);
    },
    toggleDarkMode() {
      document.body.classList.toggle('body-dark');
      let path = document.getElementById('mode').src;
      let getLastItem = path.substring(path.lastIndexOf('/') + 1);
      if (getLastItem === 'sun.svg') {
        document.getElementById('mode').src='static/media/images/moon.svg';
      } else {
        document.getElementById('mode').src='static/media/images/sun.svg';
      }
    }
  }
  
  app.init()
})();