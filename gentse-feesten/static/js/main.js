(() => {
	const app = {
		init() {
			this.cacheElem();

			this.randomBackground();
			this.openCloseMenu();
      this.openCloseSelect();
		},
		cacheElem() {
			this.$headerBG = document.querySelector('.header-container');

			this.$openMenu = document.getElementById('open-menu');
			this.$closeMenu = document.getElementById('close-menu');
			this.$mobileNav = document.getElementById('mobile-nav');

      this.$openCloseSelect = document.getElementById('select-program')
      this.$selectMenu = document.getElementById('select-list');
		},
		randomBackground() {
			const shuffleBG = backgrounds.sort(() => 0.5 - Math.random());
			const randomBG = shuffleBG[0];
			this.$headerBG.style.backgroundImage = `url('${randomBG}')`;
		},
		openCloseMenu() {
			this.$openMenu.addEventListener('click', () => {
				this.$mobileNav.classList.replace('menu-hidden', 'menu-show');
        document.body.style.overflow = 'hidden';
			}, false);

			this.$closeMenu.addEventListener('click', () => {
				this.$mobileNav.classList.replace('menu-show', 'menu-hidden');
        document.body.style.overflow = 'scroll';
			});
		},
    openCloseSelect() {
      this.$openCloseSelect.addEventListener('click', () => {
        this.$selectMenu.classList.toggle('close-select');
      }, false);
    }
	};

	app.init();
})();