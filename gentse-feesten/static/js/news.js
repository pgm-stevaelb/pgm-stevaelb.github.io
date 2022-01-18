(() => {
  const app = {
    init() {
      this.cacheElem();
      this.buildUI();

      this.baseURL = 'https://www.pgm.gent/data/gentsefeesten/';
      this.news = null;

      this.url = window.location.href;
      console.log(this.url.indexOf('index'))
    },
    cacheElem() {
      this.$newsItems = document.getElementById('latest-news');
    },
    buildUI() {
      this.fetchNews();
    },
    async fetchNews() {
      this.news = new PartyAPI().getNewsFromUrl()
        .then(data => {
          if (this.url.indexOf('index') === -1) {
            this.$newsItems.innerHTML = data.map(news => this.generateNewsItem(news)).join('');
          } else {
            this.$newsItems.innerHTML = data.slice(0,3).map(news => this.generateNewsItem(news)).join('');
          }
        })
        .catch(e => console.error('An error ocurred!', e.message));
    },
    generateNewsItem(news) {
      return `
        <article class="latest-news__single" data-id="${news.id}">
          <a href="#" class="card-link latest-news__single__card">
            <div class="card-img latest-news__single__img margin-b-1" style="background-image: url('${this.baseURL + news.picture.medium}');">
              <div class="latest-news__single__date">${this.convertDate(news.publishedAt)}</div>
            </div>
            <div class="latest-news__single__details">
              <h3 class="margin-b-0 latest-news__single__title">${news.title}</h3>
              <p class="padding-b-0">${news.synopsis}</p>
              <svg class="margin-b-0" width="16" height="15" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.683 0L6.785 1.885l4.118 4.118H0v2.661h10.903l-4.118 4.117 1.898 1.886L16 7.333z" fill="#000" fill-rule="nonzero" /></svg>
            </div>
          </a>
        </article>`
    },
    convertDate(date) {
      const publishDate = new Date(date);
      const output = publishDate.toLocaleDateString('nl-BE', {
        month: "2-digit",
        day: "2-digit"
      });
      return output;
    }
  };

  app.init();
})();