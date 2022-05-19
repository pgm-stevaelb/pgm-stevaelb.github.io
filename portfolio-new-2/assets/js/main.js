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
			this.mouseMovement();
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
				document.getElementById('dark-mode').src = 'assets/media/images/sun.svg';
			} else {
				document.getElementById('dark-mode').src = 'assets/media/images/moon.svg';
			}
		},
		mouseMovement() {
			const cursor = document.querySelector('.cursor');
			const cursorinner = document.querySelector('.cursor2');
			const a = document.querySelectorAll('a, img');

			document.addEventListener('mousemove', function(e) {
				const x = e.clientX;
				const y = e.clientY;
				cursor.style.transform = `translate3d(calc(${e.clientX}px - 50%), calc(${e.clientY}px - 50%), 0)`
			});

			document.addEventListener('mousemove', function(e) {
				const x = e.clientX;
				const y = e.clientY;
				cursorinner.style.left = x + 'px';
				cursorinner.style.top = y + 'px';
			});

			document.addEventListener('mousedown', function() {
				cursor.classList.add('click');
				cursorinner.classList.add('cursorinnerhover')
			});

			document.addEventListener('mouseup', function() {
				cursor.classList.remove('click')
				cursorinner.classList.remove('cursorinnerhover')
			});

			a.forEach(item => {
				item.addEventListener('mouseover', () => {
					cursor.classList.add('hover');
				});
				item.addEventListener('mouseleave', () => {
					cursor.classList.remove('hover');
				});
			})
		}
	}

	app.init()
})();