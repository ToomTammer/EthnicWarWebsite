<template>
  <div id="webglCanvas" ref="container"></div>
  <div class="effect-hot-spot">
  </div>
</template>


<script>
// import PageLoader from "@/views/PageLoader.vue";
import * as THREE from "three";
import { gsap } from "gsap";
import ttcate from "@/assets/titlecate.webp";
import subttcate from "@/assets/subHdCate.webp";
import el1 from "@/assets/flagCate/GrecoPersianFlag.webp";
import el2 from "@/assets/flagCate/CrusadeFlag.webp";
import el3 from "@/assets/flagCate/100yrsFlag.webp";
import el4 from "@/assets/flagCate/wwIFlag.webp";
import ttWW1 from "@/assets/flagCate/ww1.webp";
import ttWW2 from "@/assets/flagCate/ww2.webp";
import el5 from "@/assets/flagCate/KoreanFlag.webp";
import el6 from "@/assets/flagCate/VietnameseFlag.webp";
import el7 from "@/assets/flagCate/RussiaUkrainFlag.webp";
import tt1 from "@/assets/titleCate/greece-persia.webp";
import tt2 from "@/assets/titleCate/cru.webp";
import tt3 from "@/assets/titleCate/100years.webp";
import tt4 from "@/assets/titleCate/world.webp";
import tt5 from "@/assets/titleCate/korea.webp";
import tt6 from "@/assets/titleCate/vietname.webp";
import tt7 from "@/assets/titleCate/russia-ukrian.webp";
import cldL1 from "@/assets/cloud/mockupCateL.png";
import cldL2 from "@/assets/cloud/mockupCateL-1.png";
import cldL3 from "@/assets/cloud/mockupCateL-2.png";
import cldR1 from "@/assets/cloud/mockupCateR.png";
import cldR2 from "@/assets/cloud/mockupCateR-1.png";
import cldR3 from "@/assets/cloud/mockupCateR-2.png";
import ForClick from "@/assets/flagCate/CateClick.png";

import flw from "@/assets/flowers/flower1.webp";
import bk from "@/assets/book.webp";
import bkpopup from "@/assets/popupToBook.webp";

export default {
  data() {
    return {
      AniFlagSpd: 40,
      isloaded: false,
      wwFlagClick: false,
      showOptiowar: false,
      checkClickFlag: false,
      objectAlready: false,
      showOptionminiww: false,
      NoOptionminiww: false,
      tthd: 5,
      subtthd: 2.8,
      opty: 0,

      underLiney: 3.5,
      pyImOdd: 13,
      pyImEven: -13,
      pyTImOdd: 13,
      pyTImEven: -13,
      ttww1im4x: 0,
      ttww2im4x: 0,
      ttww1im4y: -1.9,
      ttww2im4y: -1.9,
      pxIm1: -12.3,
      pxIm2: -8.3,
      pxIm3: -4.1,
      pxIm4: 0,
      pxIm5: 4.1,
      pxIm6: 8.3,
      pxIm7: 12.3,
      sizeFlag: 6,
      sizeTTw: 5,
      sizeTTh: 1,
      cloudSize: 14,
      cloudLX: -23,
      cloudLY: 6,
      cloudRX: 23,

      flwLY: -11,
      flwLX: -12.5,
      flwRotatez: 0,
      flwLotatez: 0,

      flwRX: 12.5,

      bookY: -19,
      bookYE: -9,
      bkpopupOpt: 0,

      underLineScale: 0.001,
      clickv1FlagOddY: 1.7,
      clickv2FlagOddY: -1,
      clickv1FlagEvenY: 0.2,
      clickv2FlagEvenY: -2.4,
      clickwwFlagLY: -1.7,
      clickwwFlagLX: 1.2,

    };
  },
  components: {
    // PageLoader,
  },
  created() {
    // Reload the page once
    if (!sessionStorage.getItem("isReloaded")) {
      sessionStorage.setItem("isReloaded", true);
      window.location.reload();
    } else {
      sessionStorage.removeItem("isReloaded");
    }
  },
  mounted() {
    window.addEventListener("load", (event) => {
      if (event.target.readyState === "complete") {
        this.AnimationStart();
        this.AnimationCon();
      }
    });

    let container = document.getElementById("webglCanvas");
    let width = container.clientWidth;
    let height = container.clientHeight;
    // create the scene
    const scene = new THREE.Scene();

    // create the camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 10;
    this.camera.position.y = 0;

    // create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.addEventListener("webglcontextlost", function () {
      location.reload();
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // create the title categories image
    const textureTitleCate = new THREE.TextureLoader().load(ttcate);
    const titleImageCate = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: textureTitleCate,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(titleImageCate);

    // create the subttcate image
    const texturesubttcate = new THREE.TextureLoader().load(subttcate);
    const Imagesubttcate = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: texturesubttcate,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(Imagesubttcate);

    // Store titleWW2Image4 reference for later use
    this.titleImageCate = titleImageCate;

    // create the UnderLine title categories
    const geometry = new THREE.PlaneGeometry(5, 0.1);
    const material = new THREE.MeshBasicMaterial({ color: 0x727167 });
    const underLine = new THREE.Mesh(geometry, material);
    underLine.position.y = this.underLiney;
    underLine.scale.x = this.underLineScale;
    scene.add(underLine);

    // Store titleWW2Image4 reference for later use
    this.underLine = underLine;

    // create the title clodeL1 image
    const texturecldL1 = new THREE.TextureLoader().load(cldL1);
    const ImagecldL1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldL1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldL1.position.y = this.cloudLY;
    ImagecldL1.position.x = this.cloudLX;
    scene.add(ImagecldL1);

    // create the title cldL2 image
    const texturecldL2 = new THREE.TextureLoader().load(cldL2);
    const ImagecldL2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldL2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldL2.position.y = this.cloudLY;
    ImagecldL2.position.x = this.cloudLX;
    scene.add(ImagecldL2);

    // create the title cldL3 image
    const texturecldL3 = new THREE.TextureLoader().load(cldL3);
    const ImagecldL3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldL3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldL3.position.y = this.cloudLY;
    ImagecldL3.position.x = this.cloudLX;
    scene.add(ImagecldL3);

    // create the title cldR1 image
    const texturecldR1 = new THREE.TextureLoader().load(cldR1);
    const ImagecldR1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldR1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldR1.position.y = this.cloudLY;
    ImagecldR1.position.x = this.cloudRX;
    scene.add(ImagecldR1);

    // create the title cldR2 image
    const texturecldR2 = new THREE.TextureLoader().load(cldR2);
    const ImagecldR2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldR2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldR2.position.y = this.cloudLY;
    ImagecldR2.position.x = this.cloudRX;
    scene.add(ImagecldR2);

    // create the title cldR3 image
    const texturecldR3 = new THREE.TextureLoader().load(cldR3);
    const ImagecldR3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.cloudSize, this.cloudSize),
      new THREE.MeshBasicMaterial({
        map: texturecldR3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    ImagecldR3.position.y = this.cloudLY;
    ImagecldR3.position.x = this.cloudRX;
    scene.add(ImagecldR3);

    // create the title 1th image
    const textureTitle1 = new THREE.TextureLoader().load(tt1);
    const titleImage1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle1,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    titleImage1.position.y = this.pyTImOdd;
    scene.add(titleImage1);

    // create the 1th image
    const clock = new THREE.Clock();
    const texture = new THREE.TextureLoader().load(el1);
    const annie = new TextureAnimator(texture, 10, 6, 60, this.AniFlagSpd);
    const image1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image1.position.x = this.pxIm1;
    image1.position.y = this.pyImOdd;
    scene.add(image1);

    // create the CLICK1
    const textureCLICK1 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK1 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK1,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK1.position.y = this.clickv1FlagOddY;
    ImageCLICK1.position.x = this.pxIm1;
    scene.add(ImageCLICK1);

    // create the CLICK1v2
    const textureCLICK1v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK1v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK1v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK1v2.position.y = this.clickv2FlagOddY;
    ImageCLICK1v2.position.x = this.pxIm1;
    scene.add(ImageCLICK1v2);

    // create the title 2th image
    const textureTitle2 = new THREE.TextureLoader().load(tt2);
    const titleImage2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );

    scene.add(titleImage2);

    // create the 2th image
    const clock2 = new THREE.Clock();
    const texture2 = new THREE.TextureLoader().load(el2);
    const annie2 = new TextureAnimator(texture2, 10, 6, 60, this.AniFlagSpd);
    const image2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );

    image2.position.x = this.pxIm2;
    image2.position.y = this.pyImEven;
    scene.add(image2);

    // Store image2 and titleImage2 reference for later use
    this.image2 = image2;
    this.titleImage2 = titleImage2;

    // create the CLICK2
    const textureCLICK2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK2 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK2.position.y = this.clickv1FlagEvenY;
    ImageCLICK2.position.x = this.pxIm2;
    scene.add(ImageCLICK2);

    // create the CLICK2v2
    const textureCLICK2v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK2v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK2v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK2v2.position.y = this.clickv2FlagEvenY;
    ImageCLICK2v2.position.x = this.pxIm2;
    scene.add(ImageCLICK2v2);

    // create the title 3th image
    const textureTitle3 = new THREE.TextureLoader().load(tt3);
    const titleImage3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    titleImage3.position.y = this.pyTImOdd;
    scene.add(titleImage3);

    // create the 3th image
    const clock3 = new THREE.Clock();
    const texture3 = new THREE.TextureLoader().load(el3);
    const annie3 = new TextureAnimator(texture3, 10, 6, 60, this.AniFlagSpd);
    const image3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image3.position.x = this.pxIm3;
    image3.position.y = this.pyImOdd;
    scene.add(image3);

    // create the CLICK3
    const textureCLICK3 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK3 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK3.position.y = this.clickv1FlagOddY;
    ImageCLICK3.position.x = this.pxIm3;
    scene.add(ImageCLICK3);

    // create the CLICK3v2
    const textureCLICK3v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK3v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK3v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK3v2.position.y = this.clickv2FlagOddY;
    ImageCLICK3v2.position.x = this.pxIm3;
    scene.add(ImageCLICK3v2);

    // create the title 4th image
    const textureTitle4 = new THREE.TextureLoader().load(tt4);
    const titleImage4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    scene.add(titleImage4);

    // create the 4th image
    const clock4 = new THREE.Clock();
    const texture4 = new THREE.TextureLoader().load(el4);
    const annie4 = new TextureAnimator(texture4, 10, 6, 60, this.AniFlagSpd);
    const image4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image4.position.x = this.pxIm4;
    image4.position.y = this.pyImEven;
    scene.add(image4);

    // create the CLICK4
    const textureCLICK4 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK4 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK4.position.y = this.clickv1FlagEvenY;
    ImageCLICK4.position.x = this.pxIm4;
    scene.add(ImageCLICK4);

    // create the CLICK4v2
    const textureCLICK4v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK4v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK4v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK4v2.position.y = this.clickv2FlagEvenY;
    ImageCLICK4v2.position.x = this.pxIm4;
    scene.add(ImageCLICK4v2);

    // create the title WW image
    const textureTitleWW1 = new THREE.TextureLoader().load(ttWW1);
    const titleWW1Image4 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({
        map: textureTitleWW1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      })
    );

    const textureTitleWW2 = new THREE.TextureLoader().load(ttWW2);
    const titleWW2Image4 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1),
      new THREE.MeshBasicMaterial({
        map: textureTitleWW2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0,
      })
    );

    // Store titleWW2Image4 reference for later use
    this.titleWW2Image4 = titleWW2Image4;
    this.titleWW1Image4 = titleWW1Image4;

    // const pyTIm4 = -0.2;
    scene.add(titleWW1Image4);
    scene.add(titleWW2Image4);

    // create the CLICK4v3
    const textureCLICK4v3 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK4v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK4v3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // create the CLICK4v4
    const textureCLICK4v4 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK4v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.8, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK4v4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK4v3.position.x = -this.clickwwFlagLX;
    ImageCLICK4v3.position.y = this.clickwwFlagLY;
    scene.add(ImageCLICK4v3);
    ImageCLICK4v4.position.x = this.clickwwFlagLX;
    ImageCLICK4v4.position.y = this.clickwwFlagLY;

ImageCLICK4v3.position.z = 1;
    ImageCLICK4v4.position.z = 1;
    scene.add(ImageCLICK4v4);

    // create the title 5th image
    const textureTitle5 = new THREE.TextureLoader().load(tt5);
    const titleImage5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle5,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    titleImage5.position.y = this.pyTImOdd;
    scene.add(titleImage5);

    // create the 5th image
    const clock5 = new THREE.Clock();
    const texture5 = new THREE.TextureLoader().load(el5);
    const annie5 = new TextureAnimator(texture5, 10, 6, 60, this.AniFlagSpd);
    const image5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture5,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image5.position.x = this.pxIm5;
    image5.position.y = this.pyImOdd;
    scene.add(image5);

    // create the CLICK5
    const textureCLICK5 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK5 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK5,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK5.position.y = this.clickv1FlagOddY;
    ImageCLICK5.position.x = this.pxIm5;
    scene.add(ImageCLICK5);

    // create the CLICK5v2
    const textureCLICK5v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK5v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK5v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK5v2.position.y = this.clickv2FlagOddY;
    ImageCLICK5v2.position.x = this.pxIm5;
    scene.add(ImageCLICK5v2);

    // create the title 6th image
    const textureTitle6 = new THREE.TextureLoader().load(tt6);
    const titleImage6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle6,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    // const pyTIm6 = -0.2;
    titleImage2.position.y = this.pyTImEven;
    scene.add(titleImage6);

    // create the 6th image
    const clock6 = new THREE.Clock();
    const texture6 = new THREE.TextureLoader().load(el6);
    const annie6 = new TextureAnimator(texture6, 10, 6, 60, this.AniFlagSpd);
    const image6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture6,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image6.position.x = this.pxIm6;
    image6.position.y = this.pyImEven;
    scene.add(image6);

    // create the CLICK6
    const textureCLICK6 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK6 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK6,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK6.position.y = this.clickv1FlagEvenY;
    ImageCLICK6.position.x = this.pxIm6;
    scene.add(ImageCLICK6);

    // create the CLICK6v2
    const textureCLICK6v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK6v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK6v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK6v2.position.y = this.clickv2FlagEvenY;
    ImageCLICK6v2.position.x = this.pxIm6;
    scene.add(ImageCLICK6v2);

    // create the title 7th image
    const textureTitle7 = new THREE.TextureLoader().load(tt7);
    const titleImage7 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeTTw, this.sizeTTh),
      new THREE.MeshBasicMaterial({
        map: textureTitle7,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    // create the 7th image
    const clock7 = new THREE.Clock();
    const texture7 = new THREE.TextureLoader().load(el7);
    const annie7 = new TextureAnimator(texture7, 10, 6, 60, this.AniFlagSpd);
    const image7 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: texture7,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    image7.position.x = this.pxIm7;
    image7.position.y = this.pyImOdd;
    scene.add(image7);

    titleImage7.position.y = this.pyTImOdd;
    scene.add(titleImage7);

    // create the CLICK7
    const textureCLICK7 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK7 = new THREE.Mesh(
      new THREE.PlaneGeometry(4.2, 1),
      new THREE.MeshBasicMaterial({
        map: textureCLICK7,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK7.position.y = this.clickv1FlagOddY;
    ImageCLICK7.position.x = this.pxIm7;
    scene.add(ImageCLICK7);

    // create the CLICK7v2
    const textureCLICK7v2 = new THREE.TextureLoader().load(ForClick);
    const ImageCLICK7v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 5),
      new THREE.MeshBasicMaterial({
        map: textureCLICK7v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    ImageCLICK7v2.position.y = this.clickv2FlagOddY;
    ImageCLICK7v2.position.x = this.pxIm7;
    scene.add(ImageCLICK7v2);

    // create the flw image
    const textureflw = new THREE.TextureLoader().load(flw);
    const imageflw = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureflw,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imageflw.position.x = this.flwRX;
    imageflw.position.y = this.flwLY;
    scene.add(imageflw);

    // create the flw2 image
    const textureflw2 = new THREE.TextureLoader().load(flw);
    const imageflw2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureflw2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imageflw2.position.x = this.flwLX;
    imageflw2.position.y = this.flwLY;
    imageflw2.scale.x = -1;
    scene.add(imageflw2);

    // create the bkpopup image
    const texturebkpopup = new THREE.TextureLoader().load(bkpopup);
    const imagebkpopup = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 2),
      new THREE.MeshBasicMaterial({
        map: texturebkpopup,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    
    scene.add(imagebkpopup);

    // create the bk image
    const texturebk = new THREE.TextureLoader().load(bk);
    const imagebk = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 5),
      new THREE.MeshBasicMaterial({
        map: texturebk,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagebk.position.z = 0;
    scene.add(imagebk);

    // initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouse2 = new THREE.Vector2();
    // initialize gyroscope data
    let gyroY = 0;

    if (
      navigator.userAgent.match(/Android/i) ||
      navigator.userAgent.match(/webOS/i) ||
      navigator.userAgent.match(/iPhone/i) ||
      navigator.userAgent.match(/iPad/i) ||
      navigator.userAgent.match(/iPod/i) ||
      navigator.userAgent.match(/BlackBerry/i) ||
      navigator.userAgent.match(/Windows Phone/i)
    ) {
      window.addEventListener("deviceorientation", (event) => {
        // calculate normalized device coordinates (-1 to 1) for gyroscope position

        let beta = event.beta;

        // adjust beta value to prevent jumping from 0 to 180
        if (beta > 90) {
          beta = 180 - beta;
        } else if (beta < -90) {
          beta = -180 - beta;
        }
        // apply low-pass filter to gyroscope data
        gyroY = gyroY * 0.9 + beta * 0.9;

        // calculate normalized device coordinates (-1 to 1) for gyroscope position
        mouse.x = (gyroY / 90) * 2 - 1;
      });
    } else {
      // add event listener to container for mouse movement
      document.addEventListener("mousemove", (event) => {
        // calculate normalized device coordinates (-1 to 1) for mouse position
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        mouse2.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse2.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // set the cursor style to 'pointer' if an object is being hovered over
        raycaster.setFromCamera(mouse2, this.camera);
        // const intersects = raycaster.intersectObjects(scene.children);
        const intersects = raycaster.intersectObjects([
          imagebk,
          ImageCLICK1,
          ImageCLICK1v2,
          ImageCLICK2,
          ImageCLICK2v2,
          ImageCLICK3,
          ImageCLICK3v2,
          ImageCLICK4,
          ImageCLICK4v2,
          ImageCLICK4v3,
          ImageCLICK4v4,
          ImageCLICK5,
          ImageCLICK5v2,
          ImageCLICK6,
          ImageCLICK6v2,
          ImageCLICK7,
          ImageCLICK7v2,
        ]); // check for both cubes
        if (intersects.length > 0) {
          if (intersects[0].object === ImageCLICK1 && ImageCLICK1.visible == true || intersects[0].object === ImageCLICK1v2 && ImageCLICK1v2.visible == true || intersects[0].object === ImageCLICK2 && ImageCLICK2.visible == true || intersects[0].object === ImageCLICK2v2 && ImageCLICK2v2.visible == true || intersects[0].object === ImageCLICK3 && ImageCLICK3.visible == true || intersects[0].object === ImageCLICK3v2 && ImageCLICK3v2.visible == true || intersects[0].object === ImageCLICK4 && ImageCLICK4.visible == true || intersects[0].object === ImageCLICK4v2 && ImageCLICK4v2.visible == true || intersects[0].object === ImageCLICK4v3 && ImageCLICK4v3.visible == true || intersects[0].object === ImageCLICK4v4 && ImageCLICK4v4.visible == true || intersects[0].object === ImageCLICK5 && ImageCLICK5.visible == true|| intersects[0].object === ImageCLICK5v2 && ImageCLICK5v2.visible == true || intersects[0].object === ImageCLICK6 && ImageCLICK6.visible == true || intersects[0].object === ImageCLICK6v2 && ImageCLICK6v2.visible == true || intersects[0].object === ImageCLICK7 && ImageCLICK7.visible == true  || intersects[0].object === ImageCLICK7v2 && ImageCLICK7v2.visible == true) {
            document.body.style.cursor = "pointer";
          }      
          if (intersects[0].object === imagebk) {
            document.body.style.cursor = "pointer";
            this.AnimationBook1();
          }
        } else {
          document.body.style.cursor = "default";
          this.AnimationBook2();
        }
      });
    }

    // add event listener to container for mouse2 click
    document.addEventListener("click", (event) => {
      // calculate normalized device coordinates (-1 to 1) for mouse position
      const rect = container.getBoundingClientRect();
      mouse2.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // set the cursor style to 'default' after the click
      this.$refs.container.style.cursor = "default";

      // update the raycaster with the mouse2 position
      raycaster.setFromCamera(mouse2, this.camera);

      // get the intersecting object(s)
      const intersects = raycaster.intersectObjects([imagebk, ImageCLICK1,
          ImageCLICK1v2,
          ImageCLICK2,
          ImageCLICK2v2,
          ImageCLICK3,
          ImageCLICK3v2,
          ImageCLICK4,
          ImageCLICK4v2,
          ImageCLICK4v3,
          ImageCLICK4v4,
          ImageCLICK5,
          ImageCLICK5v2,
          ImageCLICK6,
          ImageCLICK6v2,
          ImageCLICK7,
          ImageCLICK7v2,]); // check for both cubes

      // log "cube" if the first cube is clicked, or "cube2" if the second cube is clicked
      if (intersects.length > 0) {
        if (intersects[0].object === imagebk) {
          this.AnimationBook1();
          window.open(
            "https://www.2ebook.com/new/library/book_detail/nlt/02003764",
            "_blank"
          );
          setTimeout(() => {
            this.AnimationBook2();
          }, 2000);
        }else if (intersects[0].object === ImageCLICK1 && ImageCLICK1.visible == true || intersects[0].object === ImageCLICK1v2 && ImageCLICK1v2.visible == true ) {
          this.goToGp();    
        }else if (intersects[0].object === ImageCLICK2 && ImageCLICK2.visible == true || intersects[0].object === ImageCLICK2v2 && ImageCLICK2v2.visible == true ) {
          this.goToCs();    
        }
        else if (intersects[0].object === ImageCLICK3 && ImageCLICK3.visible == true || intersects[0].object === ImageCLICK3v2 && ImageCLICK3v2.visible == true ) {
          this.goToHun();    
        }else if (intersects[0].object === ImageCLICK4 && ImageCLICK4.visible == true || intersects[0].object === ImageCLICK4v2 && ImageCLICK4v2.visible == true ) {
          this.showOption();    
        }
        else if (intersects[0].object === ImageCLICK4v3 && ImageCLICK4v3.visible == true) {
          this.goToWwI();    
        }else if (intersects[0].object === ImageCLICK4v4 && ImageCLICK4v4.visible == true) {
          this.goToWwII();    
        }else if (intersects[0].object === ImageCLICK5 && ImageCLICK5.visible == true|| intersects[0].object === ImageCLICK5v2 && ImageCLICK5v2.visible == true) {
          this.goToKr();    
        }else if (intersects[0].object === ImageCLICK6 && ImageCLICK6.visible == true || intersects[0].object === ImageCLICK6v2 && ImageCLICK6v2.visible == true ) {
          this.goToVn();    
        }else if (intersects[0].object === ImageCLICK7 && ImageCLICK7.visible == true  || intersects[0].object === ImageCLICK7v2 && ImageCLICK7v2.visible == true  ) {
          this.goToRU();    
        }
      }
    });

    // render the scene
    const render = () => {
      requestAnimationFrame(render);
      const delta = clock.getDelta();
      annie.update(delta * 1000);
      const delta2 = clock2.getDelta();
      annie2.update(delta2 * 1000);
      const delta3 = clock3.getDelta();
      annie3.update(delta3 * 1000);
      const delta4 = clock4.getDelta();
      annie4.update(delta4 * 1000);
      const delta5 = clock5.getDelta();
      annie5.update(delta5 * 1000);
      const delta6 = clock6.getDelta();
      annie6.update(delta6 * 1000);
      const delta7 = clock7.getDelta();
      annie7.update(delta7 * 1000);

      // update the rotation of the images based on the mouse position

      image1.position.x = this.pxIm1 + mouse.x * -0.05;
      image1.position.y = this.pyImOdd + mouse.y * 0.05;
      titleImage1.position.x = this.pxIm1 + mouse.x * -0.03;
      titleImage1.position.y = this.pyTImOdd + mouse.y * 0.03;

      image2.position.x = this.pxIm2 + mouse.x * -0.05;
      image2.position.y = this.pyImEven + mouse.y * 0.05;
      titleImage2.position.x = this.pxIm2 + mouse.x * -0.03;
      titleImage2.position.y = this.pyTImEven + mouse.y * 0.03;

      image3.position.x = this.pxIm3 + mouse.x * -0.05;
      image3.position.y = this.pyImOdd + mouse.y * 0.05;
      titleImage3.position.x = this.pxIm3 + mouse.x * -0.03;
      titleImage3.position.y = this.pyTImOdd + mouse.y * 0.03;

      image4.position.x = this.pxIm4 + mouse.x * -0.05;
      image4.position.y = this.pyImEven + mouse.y * 0.05;
      titleImage4.position.x = this.pxIm4 + mouse.x * -0.03;
      titleImage4.position.y = this.pyTImEven + mouse.y * 0.03;
      titleWW1Image4.position.x = this.ttww1im4x + mouse.x * -0.03;
      titleWW1Image4.position.y = this.ttww1im4y + mouse.y * 0.03;
      titleWW2Image4.position.x = this.ttww2im4x + mouse.x * -0.03;
      titleWW2Image4.position.y = this.ttww2im4y + mouse.y * 0.03;

      image5.position.x = this.pxIm5 + mouse.x * -0.05;
      image5.position.y = this.pyImOdd + mouse.y * 0.05;
      titleImage5.position.x = this.pxIm5 + mouse.x * -0.03;
      titleImage5.position.y = this.pyTImOdd + mouse.y * 0.03;

      image6.position.x = this.pxIm6 + mouse.x * -0.05;
      image6.position.y = this.pyImEven + mouse.y * 0.05;
      titleImage6.position.x = this.pxIm6 + mouse.x * -0.03;
      titleImage6.position.y = this.pyTImEven + mouse.y * 0.03;

      image7.position.x = this.pxIm7 + mouse.x * -0.05;
      image7.position.y = this.pyImOdd + mouse.y * 0.05;
      titleImage7.position.x = this.pxIm7 + mouse.x * -0.03;
      titleImage7.position.y = this.pyTImOdd + mouse.y * 0.03;

      ImagecldL1.position.x = this.cloudLX + mouse.x * -0.1;
      ImagecldL1.position.y = this.cloudLY + mouse.y * 0.1;
      ImagecldL2.position.x = this.cloudLX + mouse.x * -0.3;
      ImagecldL2.position.y = this.cloudLY + mouse.y * 0.3;
      ImagecldL3.position.x = this.cloudLX + mouse.x * -0.5;
      ImagecldL3.position.y = this.cloudLY + mouse.y * 0.5;

      ImagecldR1.position.x = this.cloudRX + mouse.x * -0.1;
      ImagecldR1.position.y = this.cloudLY + mouse.y * 0.1;
      ImagecldR2.position.x = this.cloudRX + mouse.x * -0.3;
      ImagecldR2.position.y = this.cloudLY + mouse.y * 0.3;
      ImagecldR3.position.x = this.cloudRX + mouse.x * -0.5;
      ImagecldR3.position.y = this.cloudLY + mouse.y * 0.5;

      titleImageCate.position.x = mouse.x * -0.1;
      titleImageCate.position.y = this.tthd + mouse.y * 0.1;
      Imagesubttcate.position.x = mouse.x * -0.1;
      Imagesubttcate.position.y = this.subtthd + mouse.y * 0.1;
      underLine.position.x = mouse.x * -0.1;
      underLine.position.y = this.underLiney + mouse.y * 0.1;

      imageflw.position.x = this.flwRX + mouse.x * -0.1;
      imageflw.position.y = this.flwLY + mouse.y * 0.1;

      imageflw2.position.x = this.flwLX + mouse.x * -0.1;
      imageflw2.position.y = this.flwLY + mouse.y * 0.1;
      imageflw.rotation.z = this.flwRotatez;
      imageflw2.rotation.z = this.flwLotatez;

      imagebk.position.x = mouse.x * -0.05;
      imagebk.position.y = this.bookY + mouse.y * 0.05;

      imagebkpopup.position.x = mouse.x * -0.05;
      imagebkpopup.position.y = this.bookY + 3.2 + mouse.y * 0.05;

      titleImageCate.material.opacity = this.opty;
      titleImageCate.material.opacity = this.opty;
      Imagesubttcate.material.opacity = this.opty;
      Imagesubttcate.material.opacity = this.opty;

      imagebkpopup.material.opacity = this.bkpopupOpt;

      const showOption = [
        ImageCLICK1,
        ImageCLICK1v2,
        ImageCLICK2,
        ImageCLICK2v2,
        ImageCLICK3,
        ImageCLICK3v2,
        ImageCLICK4,
        ImageCLICK4v2,
        ImageCLICK5,
        ImageCLICK5v2,
        ImageCLICK6,
        ImageCLICK6v2,
        ImageCLICK7,
        ImageCLICK7v2,
      ];

      for (const options of showOption) {
        options.visible = this.showOptiowar;
      }
      ImageCLICK4v3.visible = this.showOptionminiww;
      ImageCLICK4v4.visible = this.showOptionminiww;
      ImageCLICK4v2.visible = this.NoOptionminiww;
      ImageCLICK4.visible = this.NoOptionminiww;

      renderer.render(scene, this.camera);
    };
    render();

    window.addEventListener("resize", () => {
      width = container.clientWidth;
      height = container.clientHeight;
      renderer.setSize(width, height);
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
    });

    function TextureAnimator(
      texture,
      tilesHoriz,
      tilesVert,
      numTiles,
      tileDispDuration
    ) {
      // note: texture passed by reference, will be updated by the update function.

      this.tilesHorizontal = tilesHoriz;
      this.tilesVertical = tilesVert;
      // how many images does this spritesheet contain?
      //  usually equals tilesHoriz * tilesVert, but not necessarily,
      //  if there at blank tiles at the bottom of the spritesheet.
      this.numberOfTiles = numTiles;
      texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set(1 / this.tilesHorizontal, 1 / this.tilesVertical);

      // how long should each image be displayed?
      this.tileDisplayDuration = tileDispDuration;

      // how long has the current image been displayed?
      this.currentDisplayTime = 0;

      // which image is currently being displayed?
      this.currentTile = 0;

      this.update = function (milliSec) {
        this.currentDisplayTime += milliSec;
        while (this.currentDisplayTime > this.tileDisplayDuration) {
          this.currentDisplayTime -= this.tileDisplayDuration;
          this.currentTile++;
          if (this.currentTile == this.numberOfTiles) this.currentTile = 0;
          var currentColumn = this.currentTile % this.tilesHorizontal;
          texture.offset.x = currentColumn / this.tilesHorizontal;
          var currentRow = Math.floor(this.currentTile / this.tilesHorizontal);
          texture.offset.y = currentRow / this.tilesVertical;
        }
      };
    }
  },

  methods: {
    AnimationStart() {
      ////ANIMATON

      setTimeout(() => {
        gsap.to(this.underLine.scale, {
          duration: 2,
          x: 1.5,
          ease: "power2.out",
          stagger: {
            from: "center",
          },
        });

        gsap.to(this.$data, {
          duration: 2,
          opty: 1,
          onComplete: () => {
            this.showOptiowar = true;
            this.objectAlready = true;
            this.NoOptionminiww = true
          },
          ease: "power1.out",
        });

        gsap.to(this.$data, {
          duration: 3,
          pyImOdd: -0.9,
          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.$data, {
          duration: 3,
          pyImEven: -2.4,
          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.$data, {
          duration: 2,
          pyTImOdd: 1.7,
          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.$data, {
          duration: 2,
          pyTImEven: 0.2,
          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.$data, {
          duration: 5,
          cloudLX: -11,
          onComplete: () => {
            gsap.to(this.$data, {
              duration: 5,
              cloudLX: -12,
              ease: "sine.inOut",
              repeat: -1, // set to -1 to loop infinitely
              yoyo: true, // this will make the animation go up and down
            });
          },
          ease: "elastic.out(1, 1)",
        });
        gsap.to(this.$data, {
          duration: 5,
          cloudRX: 11,
          onComplete: () => {
            gsap.to(this.$data, {
              duration: 5,
              cloudRX: 12,
              ease: "sine.inOut",
              repeat: -1, // set to -1 to loop infinitely
              yoyo: true, // this will make the animation go up and down
            });
          },
          ease: "elastic.out(1, 1)",
        });

        gsap.to(this.$data, {
          duration: 3,
          flwLY: -6,
          ease: "elastic.out(1, 1)",
        });
        gsap.to(this.$data, {
          duration: 4,
          bookY: this.bookYE,
          ease: "elastic.out(1, 1)",
        });

        const tl = gsap.timeline({ repeat: -1 });

        tl.to(this.$data, { duration: 2, bkpopupOpt: 1 })
          .to(this.$data, { duration: 8, bkpopupOpt: 1 })
          .to(this.$data, { duration: 2, bkpopupOpt: 0 })
          .to(this.$data, { duration: 1, bkpopupOpt: 0 });
      }, 2000);
    },
    AnimationCon() {
      ////ANIMATON

      setTimeout(() => {
        gsap.to(this.$data, {
          duration: 4,
          flwRotatez: 0.3,
          ease: "sine.inOut",

          repeat: -1, // set to -1 to loop infinitely
          yoyo: true, // this will make the animation go up and down
        });
        gsap.to(this.$data, {
          duration: 4,
          flwLotatez: -0.3,
          ease: "sine.inOut",

          repeat: -1, // set to -1 to loop infinitely
          yoyo: true, // this will make the animation go up and down
        });
      }, 3000);
    },
    AnimationBook1() {
      if (
        this.showOptiowar == true &&
        this.checkClickFlag == false &&
        this.objectAlready == true
      ) {
        this.showOptiowar = false;
      }
      gsap.to(this.$data, {
        duration: 4,
        bookY: -7,
        ease: "elastic.out(1, 1)",
      });
    },
    AnimationBook2() {
      if (
        this.showOptiowar == false &&
        this.checkClickFlag == false &&
        this.objectAlready == true
      ) {
        this.showOptiowar = true;
      }
      gsap.to(this.$data, {
        duration: 4,
        bookY: this.bookYE,
        ease: "elastic.out(1, 1)",
      });
    },
    goToGp() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm1,
        y: this.pyImOdd,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/GrecoPersian");
        },
      });
    },
    goToCs() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm2,
        y: this.pyImEven,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/Crusade");
        },
      });
    },
    goToHun() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm3,
        y: this.pyImOdd,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/HundredYears");
        },
      });
    },
    goToWwI() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      this.showOptionminiww = false;
      gsap.to(this.camera.position, {
        x: this.pxIm4,
        y: this.pyImEven,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/WorldWarI");
        },
      });
    },
    goToWwII() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      this.showOptionminiww = false;
      gsap.to(this.camera.position, {
        x: this.pxIm4,
        y: this.pyImEven,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/WorldWarII");
        },
      });
    },
    goToKr() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm5,
        y: this.pyImOdd,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/Korean");
        },
      });
    },
    goToVn() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm6,
        y: this.pyImEven,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/Vietnam");
        },
      });
    },
    goToRU() {
      this.showOptiowar = false;
      this.checkClickFlag = true;
      gsap.to(this.camera.position, {
        x: this.pxIm7,
        y: this.pyImOdd,
        z: 5,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -1,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/RussiaUkraine");
        },
      });
    },

    showOption() {
      if (this.showOptionminiww == false) {
        this.showOptionminiww = true;
        this.NoOptionminiww= false;

        gsap.to(this.$data, {
          duration: 1,
          ttww1im4x: -1.3,
          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.$data, {
          duration: 1,
          ttww2im4x: 1.3,

          ease: "elastic.out(0.75, 0.5)",
        });

        gsap.to(this.titleWW2Image4.material, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        gsap.to(this.titleWW1Image4.material, {
          opacity: 1,
          duration: 0.5,
          ease: "power1.out",
        });

        setTimeout(() => {
          this.showOptionminiww = false;
          this.NoOptionminiww= true;
          gsap.to(this.$data, {
            duration: 1,
            ttww1im4x: 0,
            ease: "elastic.out(0.75, 0.5)",
          });

          gsap.to(this.$data, {
            duration: 1,
            ttww2im4x: 0,

            ease: "elastic.out(0.75, 0.5)",
          });

          gsap.to(this.titleWW2Image4.material, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          });

          gsap.to(this.titleWW1Image4.material, {
            opacity: 0,
            duration: 0.5,
            ease: "power1.out",
          });
        }, 10000);
      }
    },
  },
};
</script>


<style scoped>
#webglCanvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}

.effect-hot-spot {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 100;
}

</style>