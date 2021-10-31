(() => {
	const app = {
		init() {
			console.log('1. Initialize app.');
			this.buildUI();
		},
		buildUI() {
			console.log('2. Build Application.');
		}
	};
	app.init();
})();
