const app = new Vue({
  el: "#app",
  data: {
    search: "",
    message: "Good morning, have a 🥐",
    sort_modifier: 1,
    concerts: []
  },
  components: {
    ConcertView,
    ConcertCreate
  },
  created() {
    this.getConcerts();
    this.$on("new-concert", concert => {
      this.concerts.push(concert);
    });
  },
  computed: {
    filtered_concerts() {
      return this.concerts
        .filter(
          f => f.name.toLowerCase().indexOf(this.search.toLowerCase()) !== -1
        )
        .sort((a, b) => {
          if (a.name > b.name) return this.sort_modifier;
          if (a.name < b.name) return -1 * this.sort_modifier;
          return 0;
        });
    },
    sort_btn_text() {
      return this.sort_modifier > 0 ? "A-Z" : "Z-A";
    },
    venues() {
      const set = {};
      for (var i = 0; i < this.concerts.length; i++) {
        set[this.concerts[i].place.name] = true;
      }
      return Object.keys(set);
    }
  },
  methods: {
    toggleSort() {
      this.sort_modifier = -1 * this.sort_modifier;
    },
    getConcerts() {
      fetch(
        "https://gist.githubusercontent.com/nchudleigh/92637a91938b16e105105de3ee91a569/raw/bbb5b1d549847e74afca77c2cfa3b514585678ad/events.json"
      )
        .then(r => r.json())
        .then(r => {
          this.concerts = r;
        });
    }
  }
});
