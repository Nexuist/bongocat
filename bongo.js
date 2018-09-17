let root = new Vue({
  el: "#root",
  mounted: function() {
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
    if (!Hls.isSupported()) this.endpoint += "?filter=m3u8";
    this.slapTheBongo();
  },
  data: {
    endpoint:
      "https://lkub5gai6i.execute-api.us-east-1.amazonaws.com/prod/slap/the/bongo?filter=mp4",
    autoplayWarningSeen: false,
    bongocat: null,
    videoSize: 50,
    videoControls: true,
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
          if (json.type.S == "m3u8") {
            Vue.nextTick(() => {
              var hls = new Hls();
              hls.loadSource(json.src.S);
              hls.attachMedia(this.$refs.bongocat);
              hls.on(Hls.Events.MANIFEST_PARSED, function() {
                this.$refs.bongocat.play();
              });
            });
          }
        })
        .catch(err => {
          console.log("wtf?");
          console.log(err);
        });
    }
  }
});
