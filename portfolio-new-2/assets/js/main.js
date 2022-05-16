(() => {
  const app = {
    init() {
      this.cacheElems();
      this.buildUI();
    },
    cacheElems() {
      // this.$modeButton = document.getElementById('mode');
      this.$burgerButton = document.getElementById('burger');
      this.$eatenBurger = document.getElementById('eaten');
    },
    buildUI() {
      this.registerListeners();
    },
    registerListeners() {
      // this.$modeButton.addEventListener('click', this.toggleDarkMode, false);
      this.$burgerButton.addEventListener('click', this.openBurgerNav, false);
      this.$eatenBurger.addEventListener('click', this.closeBurgerNav, false);
    },
    openBurgerNav() {
      document.getElementById('nav-menu').style.width = '100vw';
    },
    closeBurgerNav() {
      document.getElementById('nav-menu').style.width = '0';
    }
    // toggleDarkMode() {
    //   document.body.classList.toggle('body-dark');
    //   let path = document.getElementById('mode').src;
    //   let getLastItem = path.substring(path.lastIndexOf('/') + 1);
    //   if (getLastItem === 'sun.svg') {
    //     document.getElementById('mode').src='static/media/images/moon.svg';
    //   } else {
    //     document.getElementById('mode').src='static/media/images/sun.svg';
    //   }
    // }
  }
  
  app.init()
})();