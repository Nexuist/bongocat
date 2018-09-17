let root = new Vue({
  el: "#root",
  mounted: function() {
    this.slapTheBongo();
    window.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 32:
          // [space]
          this.autoplayWarningSeen = true;
          this.slapTheBongo();
          break;
        case 189:
          // [-]
          this.videoSize -= 10;
          break;
        case 187:
          // [+]
          this.videoSize += 10;
          break;
        case 67:
          // [c]
          this.videoControls = !this.videoControls;
          break;
        case 80:
          // [p]
          let vid = this.$refs.bongocat;
          if (vid.paused) return vid.play();
          vid.pause();
          break;
        case 70:
          // [f]
          this.showFooter = !this.showFooter;
          break;
      }
    });
  },
  data: {
    endpoint:
      "https://lkub5gai6i.execute-api.us-east-1.amazonaws.com/prod/slap/the/bongo",
    autoplayWarningSeen: false,
    bongocat: null,
    videoSize: 50,
    videoControls: false,
    showFooter: true,
    keys: [
      ["space", "another video"],
      ["+", "zoom in"],
      ["-", "zoom out"],
      ["p", "play/pause"],
      ["f", "toggle footer"],
      ["c", "toggle controls"]
    ]
  },
  methods: {
    slapTheBongo: function() {
      console.log("bongocat!");
      fetch(this.endpoint)
        .then(res => res.json())
        .then(json => {
          this.bongocat = json;
        })
        .catch(err => {
          console.log("wtf?");
          console.log(err);
        });
    }
  }
});
