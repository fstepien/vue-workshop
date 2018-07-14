const ConcertCreate = Vue.component("concert-create", {
  components: {
    BaseButton
  },
  props: {
    venues: {
      type: Array,
      required: true,
      default: []
    },
    enabled: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  data() {
    return {
      name: "",
      place: "",
      start_date: new Date().toISOString().split("T")[0],
      start_time: "19:30"
    };
  },
  computed: {
    valid() {
      //0 will come out as false, 1 or more will be true
      return !!this.name.length;
    }
  },
  methods: {
    submit() {
      if (!this.valid) return;
      const payload = {
        name: this.name,
        place: {
          name: this.place
        },
        start_time: `${this.start_date}T${this.start_time}`
      };
      this.$root.$emit("new-concert", payload);
      this.name = "";
    }
  },
  //watcher is similar to computed but can be customized to deeply watch an object
  //does not fire on initial render but does so on updates
  watch: {
    venues() {
      this.place = this.venues[0];
    }
  },
  template: `
    <div class="card">
    <div class="row">
        <div class="column">
            Who is Playing?
            <input 
            type="text" 
            placeholder="Band name"
            v-model="name">

            Where is it?
            <select v-model="place">
                <option v-for="v in venues" :value="v">{{ v }}</option>
            </select>

            When does it start?
            <input v-model="start_date" type="date" style="width: 40%"   >
            at
            <input v-model="start_time" type="time" style="width: 40%">

            <base-button
            :enabled="valid"
            :content="'Submit'"
            @clicked="submit" >
            </base-button>
          </div>
      </div>          
  </div>
    `
});
