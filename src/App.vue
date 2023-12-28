
<template>
  <div id="fullscreen-body">
    <div v-if="!shouldDisplayContent" class="rotate-message">
      <div class="gifRotate">
        <img
          src="@/assets/rotat_phone_real.gif"
          alt="Rotate-GIF"
          draggable="false"
        />
      </div>
      <div class="messageRotate">
        โปรดหมุนอุปกรณ์ของคุณเพื่อการแสดงผลที่ดีขึ้น
      </div>
    </div>
    <div
      id="flexible-fullscreen-body"
      :style="{ height: windowHeight + 'px', width: windowWidth + 'px' }"
    >
      <div id="layout" ref="scaled">
        <div class="canvas-bg">
          <PageLoader />
          <div class="effect-wrap">
            <router-view />
          </div>
        </div>

        <div id="frame">
          <div class="container-nav">
            <div class="sub-container-nav">
              <div class="sub-sub-container-nav">
                <div class="navleft">
                  <a
                    href="https://forms.gle/uriQDdGjLxBygpgn9"
                    target="_blank"
                    draggable="false"
                    ondragstart="return false;"
                    class="Nav"
                  >
                    <img
                      src="@/assets/btnForm.png"
                      alt="LOGO"
                      draggable="false"
                      ondragstart="return false;"
                    />
                  </a>
                  <div class="popupnavL"></div>
                </div>
                <div class="navright">
                  <a @click="playMusic" class="Nav margin-nav"
                    ><img
                      draggable="false"
                      ondragstart="return false;"
                      :src="
                        isPlaying
                          ? getSrc(btnAudio.playNav)
                          : getSrc(btnAudio.muteNav)
                      "
                      alt="Play/Pause"
                  /></a>

                  <router-link
                    v-if="shownavHome"
                    to="/Home"
                    class="Nav margin-nav"
                    draggable="false"
                    ondragstart="return false;"
                    ><img
                      src="@/assets/homeNav.png"
                      alt="Home"
                      draggable="false"
                  /></router-link>
                  <router-link
                    v-if="shownavAbs"
                    to="/AboutUs"
                    class="Nav margin-nav"
                    draggable="false"
                    ><img
                      src="@/assets/AboutUsNav.png"
                      alt="About US"
                      draggable="false"
                      ondragstart="return false;"
                  /></router-link>
                  <router-link
                    to="/Credits"
                    v-if="shownavthx"
                    class="Nav margin-nav"
                    draggable="false"
                    ><img
                      src="@/assets/thxNav.png"
                      alt="Credits"
                      draggable="false"
                      ondragstart="return false;"
                  /></router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Howl } from "howler";
import PageLoader from "@/views/PageLoader.vue";
import { gsap } from "gsap";
export default {
  components: {
    PageLoader,
  },
  data() {
    return {
      isPlaying: true,
      shownav: true,
      music: null,
      btnAudio: {
        playNav: "playNav",
        muteNav: "muteNav",
      },
      defaultMusicLoaded: false,
      shouldDisplayContent: false,
      shownavHome: true,
      shownavthx: true,
      shownavAbs: true,
      windowHeight: 0,
      windowWidth: 0,
      audefault: "https://d2ve0urukvvel8.cloudfront.net/Gymnopedie.mp3",
      auCr: "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/CrusadeWar/LamentoV2.mp3",
      auGP: "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/GrecoPersianWar/AdagioInGMinorV2.mp3",
      auHun:
        "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/HundredYearsWar/PavaneV2.mp3",
      auww1:
        "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/WorldWarI/NimrodV2.mp3",
      auww2:
        "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/WorldWarII/AshokanFarewellV2.mp3",
      aukr: "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/KoreanWar/ArirangV2.mp3",
      auvn: "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/VietnamWar/LessLikelyV2.mp3",
      auru: "https://d2ve0urukvvel8.cloudfront.net/Contents/wars/RussiaUkraineWar/exileV2.mp3",
    };
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    this.handleResize();
  },

  mounted() {
    this.AnimationStart();
    // Check the initial screen orientation
    this.checkOrientation();

    this.requestPermission();
    this.preserveAspect();
    window.addEventListener("resize", this.preserveAspect);

    // Listen for changes to the screen orientation
    window.addEventListener("orientationchange", this.checkOrientation);
    window.addEventListener("resize", this.checkOrientation);

    // Load the default music
    const musicPlaying = localStorage.getItem("musicPlaying");
    if (musicPlaying === "true") {
      this.loadMusic(this.audefault);
      this.isPlaying = true;
    } else {
      localStorage.setItem("musicPlaying", "false"); // Set default value if not present in local storage
      this.isPlaying = false;
    }
  },
  beforeUnmount() {
    // Remove the event listeners when the component is unmounted
    window.removeEventListener("orientationchange", this.checkOrientation);
    window.removeEventListener("resize", this.checkOrientation);
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("resize", this.preserveAspect);
  },
  watch: {
    // Watch for changes to the route and load the appropriate music
    $route(to) {
      switch (to.path) {
        // case "/":
        //   this.loadMusic(au1);
        //   break;
        case "/Home":
          this.loadMusic(this.audefault);
          this.shownav = true;
          this.shownavHome = false;
          this.shownavthx = true;
          this.shownavAbs = true;

          break;
        case "/AboutUs":
          this.loadMusic(this.audefault);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = false;
          break;
        case "/Credits":
          this.loadMusic(this.audefault);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = false;
          this.shownavAbs = true;
          break;
        case "/GrecoPersian":
          this.loadMusic(this.auGP);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/Crusade":
          this.loadMusic(this.auCr);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/HundredYears":
          this.loadMusic(this.auHun);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/WorldWarI":
          this.loadMusic(this.auww1);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/WorldWarII":
          this.loadMusic(this.auww2);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/Korean":
          this.loadMusic(this.aukr);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/Vietnam":
          this.loadMusic(this.auvn);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        case "/RussiaUkraine":
          this.loadMusic(this.auru);
          this.shownav = true;
          this.shownavHome = true;
          this.shownavthx = true;
          this.shownavAbs = true;
          break;
        default:
          this.loadMusic(this.audefault);
          this.shownav = false;
          this.shownavHome = false;
          this.shownavthx = false;
          this.shownavAbs = false;
          break;
      }
    },
  },
  methods: {
    AnimationStart() {
      const tl = gsap.timeline({ repeat: -1 });

        tl.to('.popupnavL', { duration: 2, opacity: 1 })
          .to('.popupnavL', { duration: 5, opacity: 1 })
          .to('.popupnavL', { duration: 1, opacity: 0 })
          .to('.popupnavL', { duration: 5, opacity: 0 });
    },
    checkOrientation() {
      // Check if the screen is wider than it is tall
      this.shouldDisplayContent = window.innerWidth > window.innerHeight;
    },
    handleResize() {
      this.windowHeight = window.innerHeight;
      this.windowWidth = window.innerWidth;
    },
    preserveAspect() {
      const scaled = this.$refs.scaled;
      scaled.style.height = "100%";
      scaled.style.width = "100%";
      scaled.style.boxSizing = "border-box";
      const ratio = 16 / 8;
      const w = scaled.offsetWidth;
      const h = scaled.offsetHeight;


      if (w > ratio * h) {
        scaled.style.width = ratio * h * 1.1 + "px";
        // horizontal centering is done using margin:auto in CSS
      } else if (h > w / ratio) {
        const newHeight = w / ratio;
        scaled.style.height = newHeight + "px";
        // for vertical centering:
        // scaled.style.marginTop = (window.innerHeight - newHeight) / 2 + "px";
      }
    },

    getSrc(name) {
      var images = require.context("@/assets/", false, /\.png$/);
      return images("./" + name + ".png");
    },

    playMusic() {
      // Change Icons
      // this.isPlaying = !this.isPlaying;
      // If music is playing, pause it
      if (this.music && this.music.playing()) {
        this.isPlaying = false;
        this.music.fade(this.music.volume(), 0, 1000);
        this.music.once("fade", () => {
          this.music.pause();

          localStorage.setItem("musicPlaying", "false"); // Store the state in local storage
        });
      } else {
        // If music is paused or not loaded, play it
        if (this.music) {
          this.isPlaying = true;
          this.music.fade(0, 1, 2000);
          this.music.play();

          localStorage.setItem("musicPlaying", "true"); // Store the state in local storage
        } else {
          this.loadMusic(this.audefault);
          localStorage.setItem("musicPlaying", "true"); // Store the state in local storage
        }
      }
    },

    loadMusic(src) {
      // If default music is already loaded, do not load it again
      if (src === this.audefault && this.defaultMusicLoaded) {
        return;
      }

      if (this.music) {
        this.music.stop();
      }

      const musicPlaying = localStorage.getItem("musicPlaying");
      const shouldPlayMusic = musicPlaying === "true";

      this.music = new Howl({
        src: [src],
        loop: true,
        autoplay: shouldPlayMusic,
        // volume: 0.5,
      });

      if (shouldPlayMusic) {
        this.music.play();
      }

      // Set defaultMusicLoaded to true if loading the default music
      if (src === this.audefault) {
        this.defaultMusicLoaded = true;
      }
    },
    requestPermission() {
      if (typeof window.DeviceMotionEvent.requestPermission === "function") {
        window.DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              console.log("Motion permission granted");
            }
          })
          .catch(console.error);
      }
      if (
        typeof window.DeviceOrientationEvent.requestPermission === "function"
      ) {
        window.DeviceOrientationEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === "granted") {
              console.log("Orientation permission granted");
            }
          })
          .catch(console.error);
      }
    },
  },
};
</script>
<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
*:focus {
  outline: none;
}

#fullscreen-body {
  margin: 0px;
  position: fixed;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#flexible-fullscreen-body {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
}

#layout {
  position: relative;
}

.canvas-bg {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: url("@/assets/BG.jpg");
  background-repeat: repeat;
  background-color: rgba(213, 208, 188, 1);
  background-position: center;
}
.effect-wrap {
  width: 100%;
  height: 100%;

  position: relative;
}

#frame {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  pointer-events: none;
}
.container-nav {
  position: relative;
  width: 100%;
  height: 100%;
}
.sub-container-nav {
  position: absolute;
  height: 100%;
  width: 100%;
  z-index: 102;
}
.sub-sub-container-nav {
  top: 0;
  position: sticky;
  position: -webkit-sticky;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 12%;
  width: 100%;
}

.navright {
  height: 60%;
  width: auto;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 5%;
}

.navright a:focus {
  outline: none !important;
  box-shadow: none;
}

.navleft {
  position: relative;
  height: 60%;
  width: auto;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;

  margin-left: 5%;
}
.popupnavL {
  position: absolute;
  margin: 70% 0 0 200%;
  height: 100%;
  width: 250%;
  background-image: url("@/assets/popupToForm.png");
  background-repeat: no-repeat;
  background-size:contain;
  opacity: 0;
}
.Nav {
  width: auto;
  height: 100%;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
  -webkit-touch-callout: none;
  -ms-touch-action: none;
  touch-action: none;
}
.margin-nav {
  margin-left: 10%;
}
.Nav img {
  width: auto;
  height: 100%;
  object-fit: scale-down;
}
.rotate-message {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #32373a;
  padding: 20px;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.gifRotate {
  width: 30%;
  height: auto;
}
.gifRotate img {
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}
.messageRotate {
  margin-top: 2%;
  color: white;
  font-family: "Prompt", sans-serif;
  font-size: 3vw;
}
</style>
