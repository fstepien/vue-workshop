const BaseButton = Vue.component("base-button", {
  props: {
    content: {
      type: String,
      required: true
    },
    enabled: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      loading: false
    };
  },
  computed: {
    background_class() {
      return {
        "loading-background": this.loading,
        "disabled-background": !this.enabled
      };
    }
  },
  methods: {
    clicked() {
      this.loading = true;
      setTimeout(() => {
        this.$emit("clicked");
        this.loading = false;
      }, 1000);
    }
  },
  template: `
    <div class="button" 
    @click="clicked"
    :class="background_class">
        {{content}}
    </div>
    `
});
