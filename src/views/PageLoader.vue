<template>
  <div class="progress" v-if="!isloaded">
    <div class="container">
      <div class="iconLoader"></div>
      <div class="loading-bar-container">
        <div class="loading-bar" :style="{ width: `${progress}%` }"></div>
      </div>
      <div style="font-size:1vw;"  class="messageLoader">{{ randomSentence }}</div>
    </div>
  </div>
</template>

<script>
import { gsap } from "gsap";
export default {
  data: () => {
    return {
      isloaded: false,
      progress: 0,
      sentences: [
        "WORLD BEYOND WAR เป็นองค์กรระดับโลกที่ต่อต้านความรุนแรง และการเกิดสงคราม",
        "ในสงครามโลกครั้งที่ 2 ระเบิดกว่า 10,000 ลูกถูกทิ้งไปทั่วยุโรปโดยฝ่ายพันธมิตร",
        "ในสงครามโลกครั้งที่ 1 ทหารกว่าร้อยละ 80 มีอาการ Shell Shock หรืออาการเจ็บปวดทางจิตใจ",
        "การรุกรานยูเครนของรัสเซียทำให้ราคาก๊าซทั่วโลกสูงขึ้น",
        "ชัยชนะของฝรั่งเศสในสงคราม 100 ปี ทำให้อำนาจมากขึ้นจนก่อตั้งระบอบสมบูรณาญาสิทธิราชย์ได้",
        "ดินแดนศักดิ์สิทธิ์ในสงครามครูเสด สถานที่แห่งนี้คือ ประเทศอิสราเอล หรือ ปาเลสไตน์ ในปัจจุบัน",
        "หมู่บ้านพันมุนจอมถูกใช้เป็นที่เจรจาและลงนามยุติสงครามของเกาหลีเหนือ และใต้",
        "สงครามเวียดนามถูกเรียกอีกชื่อหนึ่งว่าสงครามอินโดจีนครั้งที่สองและประเทศไทยมีบทบาทในสงครามครั้งนี้ด้วย",
        "การแข่งขันวิ่งระยะไกล “มาราธอน” มีตำนานมาจากการรบกันของกรีก-เปอร์เซียที่ทุ่งมาราธอน",
        "สงครามครูเสดทำให้พวกตะวันตกได้รับความรู้ใหม่ ๆ หลายอย่างจากพวกมุสลิม เช่น การใช้เข็มทิศในการเดินทางเรือ",
      ],
    };
  },
  computed: {
    randomSentence() {
      return this.sentences[Math.floor(Math.random() * this.sentences.length)];
    },
  },
  mounted() {
    const tl = gsap.timeline();
    tl.to(this.$data, { duration: 1, progress: 90, ease: "power2.inOut" });

    window.addEventListener("load", (event) => {
      if (event.target.readyState === "complete") {
        tl.to(this.$data, { duration: 0.5, progress: 100, ease: "power2.inOut" });

        setTimeout(() => {
          gsap.to(".loading-bar-container", {
            width: 0,
            duration: 0.5,
            ease: "power1.out",
            onComplete: () => {
              gsap.to(".progress", {
            opacity: 0,
            duration: 0.5,
            onComplete: () => {
              this.isloaded = true;
            },
            ease: "power1.out",
          });
            },
            stagger: {
              from: "center",
            },
          });

          
        }, 1000);
      }
    });
  },
};
</script>

<style scoped>
.progress {
  position: absolute;
  background-image: url("@/assets/BG.jpg");
  background-repeat: repeat;
  height: 100%;
  width: 100%;
  z-index: 201;
}
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.iconLoader {
  background-image: url("@/assets/load.gif");
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
  height: 20%;
  width: 20%;
}
.iconLoader img {
  height: 100%;
  width: 100%;
}
.loading-bar-container {
  margin-top: 1%;
  margin-bottom: 1%;
  top: 0;
  left: 0;
  width: 60%;
  height: 3px;
  background-color: #ddd;
}

.loading-bar {
  height: 100%;
  background-color: #727167;
  transition: width 0.5s ease;
}

.messageLoader {
  margin-top: 2%;
  text-align: center;
  font-family: "Prompt", sans-serif;
  height: 10%;
  width: 60%;
  color: #504f49;
}
</style>
