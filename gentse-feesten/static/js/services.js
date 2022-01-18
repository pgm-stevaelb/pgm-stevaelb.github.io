class PartyAPI {
  constructor() {
    this.apiUrl = 'https://www.pgm.gent/data/gentsefeesten';
    this.events = `${this.apiUrl}/events.json`;
    this.categories = `${this.apiUrl}/categories.json`;
    this.news = `${this.apiUrl}/news.json`;
  };

  async getEventsFromUrl() {
    try {
      const response = await fetch(this.events);
      const data = await response.json();
      return data;
    } catch (e) {
      return console.error('An error ocurred', e.message);
    }
  };

  async getNewsFromUrl() {
    try {
      const response = await fetch(this.news);
      const data = await response.json();
      return data;
    } catch (e) {
      return console.error('An error ocurred', e.message);
    }
  };
  
  async getCategoriesFromUrl() {
    try {
      const response = await fetch(this.categories);
      const data = await response.json();
      return data;
    } catch (e) {
      return console.error('An error ocurred', e.message);
    }
  }
}