(() => {
	const app = {
		init() {
			this.cacheElems();
			this.buildUI();
		},
		cacheElems() {
      // Burger Trigger
			this.$burgerButton = document.getElementById('burger');
			this.$eatenBurger = document.getElementById('eaten');

      // Dark Light mode switch on first load of the page
      this.currentMode = localStorage.getItem('mode');
      if (!this.currentMode) {
        localStorage.setItem('mode', 'light');
      }
      if (this.currentMode == 'dark') {
				document.body.classList.add("dark-mode");
        document.querySelector('.mode-switch').src = 'assets/media/images/sun.svg';
			} else {
				document.body.classList.add("light-mode");
        document.querySelector('.mode-switch').src = 'assets/media/images/moon.svg';
			}
			this.$modeSwitch = document.querySelector('.mode-switch');
		},
		buildUI() {
			this.registerListeners();
		},
		registerListeners() {
			this.$modeSwitch.addEventListener('click', this.toggleDarkOrLightMode, false);
			this.$burgerButton.addEventListener('click', this.openBurgerNav, false);
			this.$eatenBurger.addEventListener('click', this.closeBurgerNav, false);
		},
		openBurgerNav() {
			document.getElementById('nav-menu').style.width = '100vw';
		},
		closeBurgerNav() {
			document.getElementById('nav-menu').style.width = '0';
		},
		toggleDarkOrLightMode() {
      // Get the current mode in a separate variable
      const currentMode = localStorage.getItem('mode');
      
      // Check if the current mode is light or dark and turn them around
      if (currentMode == 'light') {
        document.body.classList.replace('light-mode', 'dark-mode');
        document.querySelector('.mode-switch').src = 'assets/media/images/sun.svg';
        localStorage.setItem('mode', 'dark');
      } else {
        document.body.classList.replace('dark-mode', 'light-mode');
        document.querySelector('.mode-switch').src = 'assets/media/images/moon.svg';
        localStorage.setItem('mode', 'light');
      }
		}
	};

	app.init();
})();