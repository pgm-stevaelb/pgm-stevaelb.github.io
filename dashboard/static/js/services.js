class WeatherAPI {
	constructor(city) {
		this.city = city;
		this.url = `https://api.weatherapi.com/v1/current.json?key=28a557deaa8c407489e153714211412&q=${city}`;
	}

	async fetchWeather() {
		try {
			const response = await fetch(this.url);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}
};

class CovidAPI {
	constructor() {
		this.url = 'https://data.stad.gent/api/records/1.0/search/?dataset=dataset-of-cumulative-number-of-confirmed-cases-by-municipality';
	}

	async fetchCovidNumbers() {
		try {
			const response = await fetch(this.url);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}
}

class LocalJSON {
	constructor() {
		this.path = 'static/data/pgm.json';
	}

	async fetchPGMUsers() {
		try {
			const response = await fetch(this.path);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}
}

class GithubAPI {
	constructor(login) {
		this.login = login;
		this.apiUrl = 'https://api.github.com';
		this.apiUrlSingleUser = `${this.apiUrl}/users/${login}`;
		this.apiUrlUserList = `${this.apiUrl}/search/users?sort=desc&page=1&per_page=50&q=${login}`;
		this.apiUrlRepoList = `${this.apiUrl}/users/${login}/repos?page=1&per_page=20`;
		this.apiUrlFollowList = `${this.apiUrl}/users/${login}/followers?page=1&per_page=100`;
		this.auth = {headers: {'Authorization': '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'}};
	}

	async fetchSearchResults() {
		try {
			const response = await fetch(this.apiUrlUserList, this.auth);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}

	async showResultDetails() {
		try {
			const response = await fetch(this.apiUrlSingleUser, this.auth);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}

	async showRepos() {
		try {
			const response = await fetch(this.apiUrlRepoList, this.auth);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}

	async showFollows() {
		try {
			const response = await fetch(this.apiUrlFollowList, this.auth);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}
}

class YouTubeAPI {
	constructor(param) {
		this.param = param;
		this.url = `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAT6t630I5lO4BQcusK2Tpg4D_WzoADB1o&part=snippet&maxResults=20&q=${param}`
	}

	async fetchYouTubeResults() {
		try {
			const response = await fetch(this.url);
			const data = await response.json();
			return data;
		} catch (e) {
			console.error(e.message);
			return e.message;
		}
	}
}