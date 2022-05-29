/*
		Topic: Arne Quinze JS
		Author: Steven Aelbrecht
		Modified: 2021-11-30
*/

(() => {
	const app = {
		init() {
			this.cacheElements();
			this.buildUI();
		},
		cacheElements() {
			this.$belgianTime = document.querySelectorAll('.current-time');
		},
		buildUI() {
			this.$belgianTime.forEach(element => element.innerHTML = this.createCurrentTime());
		},
		createCurrentTime() {
			const today = new Date();
			let hours = today.getHours() < 10 ? '0' + today.getHours() : today.getHours();
			let minutes = today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes();
			return `${hours}:${minutes}`;
		}
	};
	app.init();
})();