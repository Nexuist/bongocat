const root = new Vue({
  el: "#root",
  mounted() {
    window.addEventListener("keydown", event => {
      switch (event.key) {
        case " ":
          this.autoplayWarningSeen = true;
          this.slapTheBongo();
          break;

        case "-":
          this.videoSize -= 10;
          break;

        case "=":
          this.videoSize += 10;
          break;

        case "c":
          this.videoControls = !this.videoControls;
          break;

        case "p":
          const vid = this.$refs.bongocat;
          vid.paused ? vid.play() : vid.pause();
          break;

        case "f":
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
    slapTheBongo() {
      console.log("bongocat!");
      fetch(this.endpoint)
        .then(res => res.json())
        .then(json => {
          this.bongocat = json;

          if (json.type.S == "m3u8") {
            Vue.nextTick(() => {
              const hls = new Hls();

              hls.loadSource(json.src.S);
              hls.attachMedia(this.$refs.bongocat);

              hls.on(Hls.Events.MANIFEST_PARSED, function() {
                this.$refs.bongocat.play();
              });
            });
          }
        })
        .catch(err => {
          console.error("wtf?", err);
        });
    }
  }
});
