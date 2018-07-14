const ConcertView = Vue.component("concert-view", {
  props: {
    concert: {
      type: Object,
      required: true
    }
  },
  component: {
    BaseButton
  },
  computed: {
    time() {
      const start = new Date(this.concert.start_time);
      let start_hour = start.getHours();
      let start_min = start.getMinutes();
      const start_pm = start_hour > 12 ? "pm" : "am";
      start_hour = start_hour % 12;
      start_min = start_min < 10 ? `0${start_min}` : start_min;
      return `${start.toDateString()} door at ${start_hour}:${start_min} ${start_pm}`;
    }
  },
  created() {
    // console.log("I am home");
  },
  methods: {
    openMap() {
      window.open(
        `https://www.google.ca/maps/place/?q=${this.concert.place.name}`
      ),
        "_blank";
    }
  },
  template: `
  <div class="card">
    <div class="row">
        <div class="column">
            {{concert.name}}
            <div style="font-size:1.25rem">
                {{concert.place.name}} - {{time}}
            </div>
            <base-button 
            :content="'See Location'" 
            @clicked="openMap"></base-button>
          </div>
      </div>          
  </div>
  `
});
