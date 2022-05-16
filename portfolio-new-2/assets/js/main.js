(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      this.$darkMode = document.getElementById('dark-mode');
      this.$burgerButton = document.getElementById('burger');
      this.$eatenBurger = document.getElementById('eaten');
    },
    buildUI() {
      this.registerListeners();
    },
    registerListeners() {
      this.$darkMode.addEventListener('click', this.toggleDarkMode, false);
      this.$burgerButton.addEventListener('click', this.openBurgerNav, false);
      this.$eatenBurger.addEventListener('click', this.closeBurgerNav, false);
    },
    openBurgerNav() {
      document.getElementById('nav-menu').style.width = '100vw';
    },
    closeBurgerNav() {
      document.getElementById('nav-menu').style.width = '0';
    },
    toggleDarkMode() {
      document.body.classList.toggle('body-dark');
      let path = document.getElementById('dark-mode').src;
      let getLastItem = path.substring(path.lastIndexOf('/') + 1);
      if (getLastItem === 'moon.svg') {
        document.getElementById('dark-mode').src='assets/media/images/sun.svg';
      } else {
        document.getElementById('dark-mode').src='assets/media/images/moon.svg';
      }
    }
  }
  
  app.init()
})();