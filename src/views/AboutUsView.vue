<template>
  <div id="webglCanvas" ref="container"></div>
</template>


<script>
import * as THREE from "three";
import { gsap } from "gsap";
import ttcate from "@/assets/AboutUs/HdAbs.png";
import subttcate from "@/assets/AboutUs/subHdAbs.png";
import abs1v1 from "@/assets/AboutUs/Abs1/Abs1v1.png";
import abs1v2 from "@/assets/AboutUs/Abs1/Abs1v2.png";
import abs1v3 from "@/assets/AboutUs/Abs1/Abs1v3.png";
import abs1v4 from "@/assets/AboutUs/Abs1/Abs1v4.png";
import abs1v5 from "@/assets/AboutUs/Abs1/Abs1v5.png";
import abs1v6 from "@/assets/AboutUs/Abs1/Abs1v6.png";

import abs2v1 from "@/assets/AboutUs/Abs2/Abs2v1.png";
import abs2v2 from "@/assets/AboutUs/Abs2/Abs2v2.png";
import abs2v3 from "@/assets/AboutUs/Abs2/Abs2v3.png";
import abs2v4 from "@/assets/AboutUs/Abs2/Abs2v4.png";
import abs2v5 from "@/assets/AboutUs/Abs2/Abs2v5.png";
import abs2v6 from "@/assets/AboutUs/Abs2/Abs2v6.png";

import abs3v1 from "@/assets/AboutUs/Abs3/Abs3v1.png";
import abs3v2 from "@/assets/AboutUs/Abs3/Abs3v2.png";
import abs3v3 from "@/assets/AboutUs/Abs3/Abs3v3.png";
import abs3v4 from "@/assets/AboutUs/Abs3/Abs3v4.png";
import abs3v5 from "@/assets/AboutUs/Abs3/Abs3v5.png";
import abs3v6 from "@/assets/AboutUs/Abs3/Abs3v6.png";

import abs4v1 from "@/assets/AboutUs/Abs4/Abs4v1.png";
import abs4v2 from "@/assets/AboutUs/Abs4/Abs4v2.png";
import abs4v3 from "@/assets/AboutUs/Abs4/Abs4v3.png";
import abs4v4 from "@/assets/AboutUs/Abs4/Abs4v4.png";
import abs4v5 from "@/assets/AboutUs/Abs4/Abs4v5.png";
import abs4v6 from "@/assets/AboutUs/Abs4/Abs4v6.png";

import cldL1 from "@/assets/cloud/mockupCateL.png";
import cldL2 from "@/assets/cloud/mockupCateL-1.png";
import cldL3 from "@/assets/cloud/mockupCateL-2.png";
import cldR1 from "@/assets/cloud/mockupCateR.png";
import cldR2 from "@/assets/cloud/mockupCateR-1.png";
import cldR3 from "@/assets/cloud/mockupCateR-2.png";

import flw from "@/assets/flowers/flower1.webp";

export default {
  data() {
    return {
      AniFlagSpd: 40,
      isloaded: false,
      wwFlagClick: false,
      showOptiowar: false,
      tthd: 5,
      subtthd: 3.7,
      opty: 0,

      underLiney: 4.3,
      ttww2im4y: -1.9,
      pxIm1: 0.5,
      pyIm1: 0.5,
      pyIm1v1: 0.5,
      pxIm1cloudL: 0.2,
      pxIm1cloudR: 0.5,

      pxIm2: -6,
      pyIm2: -2,
      pyIm2v1: -2,
      pxIm2cloudL: -6,
      pxIm2cloudR: -6,

      pxIm3: 0.5,
      pyIm3: -5,
      pyIm3v1: -5,
      pxIm3cloudL: 0.2,
      pxIm3cloudR: 0.5,

      pxIm4: 7.5,
      pyIm4: -2,
      pyIm4v1: -2,
      pxIm4cloudL: 7.5,
      pxIm4cloudR: 7.8,

      sizeFlag: 6,
      cloudSize: 14,
      cloudLX: -23,
      cloudLY: 6,
      cloudRX: 23,

      flwLY: -11,
      flwRotatez: 0,
      flwLotatez: 0,
      flwLX: -12.5,

      flwRX: 12.5,

      bookY: -19,
      bookYE: -9,
      bkpopupOpt: 0,

      underLineScale: 0.001,

      showOptionww: false,
    };
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
    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      // window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

    scene.add(ImagecldR3);

    // create the abs1v6 image
    const textureabs1v6 = new THREE.TextureLoader().load(abs1v6);

    const imageabs1v6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v6);

    // create the abs1v5 image
    const textureabs1v5 = new THREE.TextureLoader().load(abs1v5);

    const imageabs1v5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v5);

    // create the abs1v4 image
    const textureabs1v4 = new THREE.TextureLoader().load(abs1v4);

    const imageabs1v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v4);

    // create the abs1v3 image
    const textureabs1v3 = new THREE.TextureLoader().load(abs1v3);

    const imageabs1v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v3);

    // create the abs1v2 image
    const textureabs1v2 = new THREE.TextureLoader().load(abs1v2);

    const imageabs1v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v2);

    // create the abs1v1 image
    const textureabs1v1 = new THREE.TextureLoader().load(abs1v1);

    const imageabs1v1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs1v1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs1v1);

    /////ABS2
    // create the abs2v6 image
    const textureabs2v6 = new THREE.TextureLoader().load(abs2v6);

    const imageabs2v6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v6);

    // create the abs2v5 image
    const textureabs2v5 = new THREE.TextureLoader().load(abs2v5);

    const imageabs2v5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v5);

    // create the abs2v4 image
    const textureabs2v4 = new THREE.TextureLoader().load(abs2v4);

    const imageabs2v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v4);

    // create the abs2v3 image
    const textureabs2v3 = new THREE.TextureLoader().load(abs2v3);

    const imageabs2v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v3);

    // create the abs2v2 image
    const textureabs2v2 = new THREE.TextureLoader().load(abs2v2);

    const imageabs2v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v2);

    // create the abs2v1 image
    const textureabs2v1 = new THREE.TextureLoader().load(abs2v1);

    const imageabs2v1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs2v1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs2v1);

    ////ABS3
    // create the abs3v6 image
    const textureabs3v6 = new THREE.TextureLoader().load(abs3v6);

    const imageabs3v6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v6);

    // create the abs3v5 image
    const textureabs3v5 = new THREE.TextureLoader().load(abs3v5);

    const imageabs3v5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v5);

    // create the abs3v4 image
    const textureabs3v4 = new THREE.TextureLoader().load(abs3v4);

    const imageabs3v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v4);

    // create the abs3v3 image
    const textureabs3v3 = new THREE.TextureLoader().load(abs3v3);

    const imageabs3v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v3);

    // create the abs3v2 image
    const textureabs3v2 = new THREE.TextureLoader().load(abs3v2);

    const imageabs3v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v2);

    // create the abs3v1 image
    const textureabs3v1 = new THREE.TextureLoader().load(abs3v1);

    const imageabs3v1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs3v1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs3v1);

    ////ABS4
    // create the abs4v6 image
    const textureabs4v6 = new THREE.TextureLoader().load(abs4v6);

    const imageabs4v6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v6);

    // create the abs4v5 image
    const textureabs4v5 = new THREE.TextureLoader().load(abs4v5);

    const imageabs4v5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v5);

    // create the abs4v4 image
    const textureabs4v4 = new THREE.TextureLoader().load(abs4v4);

    const imageabs4v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v4);

    // create the abs4v3 image
    const textureabs4v3 = new THREE.TextureLoader().load(abs4v3);

    const imageabs4v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v3);

    // create the abs4v2 image
    const textureabs4v2 = new THREE.TextureLoader().load(abs4v2);

    const imageabs4v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v2);

    // create the abs4v1 image
    const textureabs4v1 = new THREE.TextureLoader().load(abs4v1);

    const imageabs4v1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeFlag, this.sizeFlag),
      new THREE.MeshBasicMaterial({
        map: textureabs4v1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.opty,
      })
    );
    scene.add(imageabs4v1);

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

    // initialize raycaster and mouse

    const mouse = new THREE.Vector2();
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
      });
    }

    // render the scene
    const render = () => {
      requestAnimationFrame(render);

      // update the rotation of the images based on the mouse position

      imageabs1v1.position.x = this.pxIm1 + mouse.x * -0.1;
      imageabs1v1.position.y = this.pyIm1v1 + mouse.y * 0.1;
      imageabs1v2.position.x = this.pxIm1 + mouse.x * -0.05;
      imageabs1v2.position.y = this.pyIm1 + mouse.y * 0.06;
      imageabs1v3.position.x = this.pxIm1cloudR + mouse.x * -0.03;
      imageabs1v3.position.y = this.pyIm1 + mouse.y * 0.03;
      imageabs1v4.position.x = this.pxIm1 + mouse.x * -0.07;
      imageabs1v4.position.y = this.pyIm1 + mouse.y * 0.07;
      imageabs1v5.position.x = this.pxIm1cloudL + mouse.x * -0.04;
      imageabs1v5.position.y = this.pyIm1 + mouse.y * 0.04;
      imageabs1v6.position.x = this.pxIm1 + mouse.x * -0.05;
      imageabs1v6.position.y = this.pyIm1 + mouse.y * 0.05;

      imageabs2v1.position.x = this.pxIm2 + mouse.x * -0.1;
      imageabs2v1.position.y = this.pyIm2v1 + mouse.y * 0.1;
      imageabs2v2.position.x = this.pxIm2 + mouse.x * -0.05;
      imageabs2v2.position.y = this.pyIm2 + mouse.y * 0.06;
      imageabs2v3.position.x = this.pxIm2cloudR + mouse.x * -0.03;
      imageabs2v3.position.y = this.pyIm2 + mouse.y * 0.03;
      imageabs2v4.position.x = this.pxIm2 + mouse.x * -0.07;
      imageabs2v4.position.y = this.pyIm2 + mouse.y * 0.07;
      imageabs2v5.position.x = this.pxIm2cloudL + mouse.x * -0.04;
      imageabs2v5.position.y = this.pyIm2 + mouse.y * 0.04;
      imageabs2v6.position.x = this.pxIm2 + mouse.x * -0.05;
      imageabs2v6.position.y = this.pyIm2 + mouse.y * 0.05;

      imageabs3v1.position.x = this.pxIm3 + mouse.x * -0.1;
      imageabs3v1.position.y = this.pyIm3v1 + mouse.y * 0.1;
      imageabs3v2.position.x = this.pxIm3 + mouse.x * -0.05;
      imageabs3v2.position.y = this.pyIm3 + mouse.y * 0.06;
      imageabs3v3.position.x = this.pxIm3cloudR + mouse.x * -0.03;
      imageabs3v3.position.y = this.pyIm3 + mouse.y * 0.03;
      imageabs3v4.position.x = this.pxIm3 + mouse.x * -0.07;
      imageabs3v4.position.y = this.pyIm3 + mouse.y * 0.07;
      imageabs3v5.position.x = this.pxIm3cloudL + mouse.x * -0.04;
      imageabs3v5.position.y = this.pyIm3 + mouse.y * 0.04;
      imageabs3v6.position.x = this.pxIm3 + mouse.x * -0.05;
      imageabs3v6.position.y = this.pyIm3 + mouse.y * 0.05;

      imageabs4v1.position.x = this.pxIm4 + mouse.x * -0.1;
      imageabs4v1.position.y = this.pyIm4v1 + mouse.y * 0.1;
      imageabs4v2.position.x = this.pxIm4 + mouse.x * -0.05;
      imageabs4v2.position.y = this.pyIm4 + mouse.y * 0.06;
      imageabs4v3.position.x = this.pxIm4cloudL + mouse.x * -0.03;
      imageabs4v3.position.y = this.pyIm4 + mouse.y * 0.03;
      imageabs4v4.position.x = this.pxIm4 + mouse.x * -0.07;
      imageabs4v4.position.y = this.pyIm4 + mouse.y * 0.07;
      imageabs4v5.position.x = this.pxIm4cloudR + mouse.x * -0.04;
      imageabs4v5.position.y = this.pyIm4 + mouse.y * 0.04;
      imageabs4v6.position.x = this.pxIm4 + mouse.x * -0.05;
      imageabs4v6.position.y = this.pyIm4 + mouse.y * 0.05;

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

      imageflw.rotation.z = this.flwRotatez;
      imageflw2.position.x = this.flwLX + mouse.x * -0.1;
      imageflw2.position.y = this.flwLY + mouse.y * 0.1;
      imageflw2.rotation.z = this.flwLotatez;

      const imageOpty = [
        titleImageCate,
        Imagesubttcate,
        imageabs1v1,
        imageabs1v2,
        imageabs1v3,
        imageabs1v4,
        imageabs1v5,
        imageabs1v6,

        imageabs2v1,
        imageabs2v2,
        imageabs2v3,
        imageabs2v4,
        imageabs2v5,
        imageabs2v6,

        imageabs3v1,
        imageabs3v2,
        imageabs3v3,
        imageabs3v4,
        imageabs3v5,
        imageabs3v6,

        imageabs4v1,
        imageabs4v2,
        imageabs4v3,
        imageabs4v4,
        imageabs4v5,
        imageabs4v6,
      ];

      for (const image of imageOpty) {
        image.material.opacity = this.opty;
      }

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
  },

  methods: {
    AnimationStart() {
      ////ANIMATON

      ///Cloud
      gsap.to(this.$data, {
        duration: 5,
        pxIm1cloudR: 0.8,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 7,
        pxIm1cloudL: 0.5,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });

      gsap.to(this.$data, {
        duration: 6,
        pxIm2cloudR: -5.7,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 7,
        pxIm2cloudL: -6.3,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 6,
        pxIm3cloudR: 0.8,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 8,
        pxIm3cloudL: 0.5,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });

      gsap.to(this.$data, {
        duration: 6,
        pxIm4cloudR: 7.5,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 8,
        pxIm4cloudL: 7.2,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });

      ////Other
      gsap.to(this.$data, {
        duration: 5,
        pyIm1v1: 0.3,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });

      gsap.to(this.$data, {
        duration: 5.5,
        pyIm2v1: -2.3,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 6,
        pyIm3v1: -5.3,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });
      gsap.to(this.$data, {
        duration: 7,
        pyIm4v1: -2.3,
        ease: "sine.inOut",
        repeat: -1, // set to -1 to loop infinitely
        yoyo: true, // this will make the animation go up and down
      });

      setTimeout(() => {
        setTimeout(() => {
          this.showOptiowar = true;
        }, 2000);

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
          ease: "power1.out",
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
</style>