<template>
  <div id="webglCanvas" ref="container"></div>
</template>


<script >
import { gsap } from "gsap";
import * as THREE from "three";
import intro from "@/assets/HP/intro.webp";
import el1 from "@/assets/HP/HP1.webp";
import el2 from "@/assets/HP/HP2.webp";
import el3 from "@/assets/HP/HP3.webp";
import el4 from "@/assets/HP/HP4.webp";
import el5 from "@/assets/HP/HP5.webp";
import el6 from "@/assets/HP/HP6.webp";
import el6v2 from "@/assets/HP/HP6v2.webp";
import el7 from "@/assets/HP/HP7.webp";
import el8 from "@/assets/HP/HP8.webp";
import el8v2 from "@/assets/HP/HP8v2.webp";
import el9 from "@/assets/HP/HP9.webp";
import el9v2 from "@/assets/HP/HP9v2.webp";
import el10 from "@/assets/HP/HP10.webp";
import hdtt1 from "@/assets/HP/tthd/tthd1.webp";
import hdtt2 from "@/assets/HP/tthd/tthd2.webp";
import hdtt3 from "@/assets/HP/tthd/tthd3.webp";
import hdtt4 from "@/assets/HP/tthd/tthd4.webp";
import hdtt5 from "@/assets/HP/tthd/tthd5.webp";
import hdtt6 from "@/assets/HP/tthd/tthd6.webp";
import hdtt7 from "@/assets/HP/tthd/tthd7.webp";
import hdtt8 from "@/assets/HP/tthd/tthd8.webp";
import hdtt9 from "@/assets/HP/tthd/tthd9.webp";
import hdtt10 from "@/assets/HP/tthd/tthd10.webp";
import hdtt11 from "@/assets/HP/tthd/tthd11.webp";
import hdtt12 from "@/assets/HP/tthd/tthd12.webp";
import nvhp from "@/assets/HP/navHP1.webp";
import nvhp2 from "@/assets/HP/navHP2.webp";
import nvi from "@/assets/Click.webp";
import exitForClick from "@/assets/Contents/exitDoor/ExitDoor1Forclick.webp";

export default {
  data() {
    return {
      AniSpd: 50,
      isloaded: false,
      sizeImg: 6,
      pxhdtt: 2.5,
      pyhdtt: 0.5,
      pzhdtt: 0,
      pxnvhp: 2.5,
      pynvhp: -1.5,
      pznvhp: 0,
      sizetthd: 4.6,
      pxIm: -2.5,
      pzIm: 0,
      opty: 0,
      introOpty: 0,
      nviOpty: 0,
      nvi1Opty: 0,

      flwRotat: 3,
      compassRo: 0,
      shownavHP: false,

      el1: el1,
      el2: el2,
      el3: el3,
      el4: el4,
      el5: el5,
      el6: el6,
      el6v2: el6v2,
      el7: el7,
      el8: el8,
      el8v2: el8v2,
      el9: el9,
      el9v2: el9v2,
      el10: el10,
      intro: intro,
      hdtt1: hdtt1,
      hdtt2: hdtt2,
      hdtt3: hdtt3,
      hdtt4: hdtt4,
      hdtt5: hdtt5,
      hdtt6: hdtt6,
      hdtt7: hdtt7,
      hdtt8: hdtt8,
      hdtt9: hdtt9,
      hdtt10: hdtt10,
      hdtt11: hdtt11,
      hdtt12: hdtt12,
      nvhp: nvhp,
      nvhp2: nvhp2,
      nvi: nvi,
      nvi1: nvi,
      exitForClick: exitForClick,
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
    this.AnimationStart();
    // get a reference to the gyro-values div
    this.gyroValuesDiv = document.getElementById("gyro-values");

    let container = document.getElementById("webglCanvas");
    let width = container.clientWidth;
    let height = container.clientHeight;
    // create the scene
    const scene = new THREE.Scene();

    // create the camera
    this.camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    this.camera.position.z = 5;

    // create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.addEventListener("webglcontextlost", function () {
      location.reload();
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // create the 10th image
    const texture10 = new THREE.TextureLoader().load(this.el10);
    const image10 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture10,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image10);

    // create the 9th image
    const clock9 = new THREE.Clock();
    const texture9 = new THREE.TextureLoader().load(this.el9);
    const annie9 = new TextureAnimator(texture9, 10, 6, 60, this.AniSpd);
    const image9 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture9,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(image9);

    // create the 9v2th image
    const textureel9v2 = new THREE.TextureLoader().load(this.el9v2);
    const imageel9v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: textureel9v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(imageel9v2);

    // create the 8th image
    const clock8 = new THREE.Clock();
    const texture8 = new THREE.TextureLoader().load(this.el8);
    const annie8 = new TextureAnimator(texture8, 10, 6, 60, this.AniSpd);
    const image8 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture8,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(image8);

    // create the 8v2th image
    const textureel8v2 = new THREE.TextureLoader().load(this.el8v2);
    const imageel8v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: textureel8v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(imageel8v2);

    // create the 7th image
    const texture7 = new THREE.TextureLoader().load(this.el7);
    const image7 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture7,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image7);

    // create the 6th image
    const clock6 = new THREE.Clock();
    const texture6 = new THREE.TextureLoader().load(this.el6);
    const annie6 = new TextureAnimator(texture6, 10, 6, 60, this.AniSpd);
    const image6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture6,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(image6);

    // create the 6v2th image
    const textureel6v2 = new THREE.TextureLoader().load(this.el6v2);
    const imageel6v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: textureel6v2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    // scene.add(imageel6v2);

    // create the 5th image
    const texture5 = new THREE.TextureLoader().load(this.el5);
    const image5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture5,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image5);

    // create the 4th image
    const texture4 = new THREE.TextureLoader().load(this.el4);
    const image4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image4);

    // create the 3th image
    const texture3 = new THREE.TextureLoader().load(this.el3);
    const image3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image3);

    // create the 2th image
    const clock2 = new THREE.Clock();
    const texture2 = new THREE.TextureLoader().load(this.el2);
    const annie2 = new TextureAnimator(texture2, 10, 6, 60, this.AniSpd);
    const image2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image2);

    // create the 1th image
    const clock = new THREE.Clock();
    const texture = new THREE.TextureLoader().load(this.el1);
    const annie = new TextureAnimator(texture, 10, 6, 60, this.AniSpd);
    const image1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeImg, this.sizeImg),
      new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    scene.add(image1);

    // create the hdtt1 image
    const texturehdtt1 = new THREE.TextureLoader().load(hdtt1);
    const imagehdtt1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt1,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt1.position.z = this.pzhdtt;
    scene.add(imagehdtt1);

    // create the hdtt2 image
    const texturehdtt2 = new THREE.TextureLoader().load(hdtt2);
    const imagehdtt2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt2.position.z = this.pzhdtt;
    scene.add(imagehdtt2);

    // create the hdtt3 image
    const texturehdtt3 = new THREE.TextureLoader().load(hdtt3);
    const imagehdtt3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt3,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt3.position.z = this.pzhdtt - 0.3;
    scene.add(imagehdtt3);

    // create the hdtt4 image
    const texturehdtt4 = new THREE.TextureLoader().load(hdtt4);
    const imagehdtt4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt4,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );
    imagehdtt4.position.z = this.pzhdtt;
    scene.add(imagehdtt4);

    // create the hdtt5 image
    const texturehdtt5 = new THREE.TextureLoader().load(hdtt5);
    const imagehdtt5 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt5,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt5.position.z = this.pzhdtt;
    scene.add(imagehdtt5);

    // create the hdtt6 image
    const texturehdtt6 = new THREE.TextureLoader().load(hdtt6);
    const imagehdtt6 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt6,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt6.position.z = this.pzhdtt - 0.3;
    scene.add(imagehdtt6);

    // create the hdtt7 image
    const texturehdtt7 = new THREE.TextureLoader().load(hdtt7);
    const imagehdtt7 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt7,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt7.position.z = this.pzhdtt;
    scene.add(imagehdtt7);

    // create the hdtt8 image
    const texturehdtt8 = new THREE.TextureLoader().load(hdtt8);
    const imagehdtt8 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt8,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt8.position.z = this.pzhdtt;
    scene.add(imagehdtt8);

    // create the hdtt9 image
    const texturehdtt9 = new THREE.TextureLoader().load(hdtt9);
    const imagehdtt9 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt9,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt9.position.z = this.pzhdtt;
    scene.add(imagehdtt9);

    // create the hdtt10 image
    const texturehdtt10 = new THREE.TextureLoader().load(hdtt10);
    const imagehdtt10 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt10,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt10.position.z = this.pzhdtt;
    scene.add(imagehdtt10);

    // create the hdtt11 image
    const texturehdtt11 = new THREE.TextureLoader().load(hdtt11);
    const imagehdtt11 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt11,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt11.position.z = this.pzhdtt;
    scene.add(imagehdtt11);

    // create the hdtt12 image
    const texturehdtt12 = new THREE.TextureLoader().load(hdtt12);
    const imagehdtt12 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizetthd, this.sizetthd),
      new THREE.MeshBasicMaterial({
        map: texturehdtt12,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagehdtt12.position.z = this.pzhdtt;
    scene.add(imagehdtt12);

    // create the nvhp image
    const texturenvhp = new THREE.TextureLoader().load(this.nvhp);
    const imagenvhp = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        map: texturenvhp,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvhp.position.z = this.pznvhp;
    scene.add(imagenvhp);

    // create the nvhp2 image
    const texturenvhp2 = new THREE.TextureLoader().load(this.nvhp2);
    const imagenvhp2 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        map: texturenvhp2,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvhp2.position.z = this.pznvhp;
    scene.add(imagenvhp2);

    // create the nvi image
    const texturenvi = new THREE.TextureLoader().load(this.nvi);
    const imagenvi = new THREE.Mesh(
      new THREE.PlaneGeometry(0.7, 0.7),
      new THREE.MeshBasicMaterial({
        map: texturenvi,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvi.position.z = this.pznvhp;
    scene.add(imagenvi);

    // create the nvhpForC image
    const texturenvhpForC = new THREE.TextureLoader().load(this.exitForClick);
    const imagenvhpForC = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        map: texturenvhpForC,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvhpForC.position.z = this.pznvhp;
    scene.add(imagenvhpForC);

    // create the intro image
    const textureintro = new THREE.TextureLoader().load(this.intro);
    const imageintro = new THREE.Mesh(
      new THREE.PlaneGeometry(9, 9),
      new THREE.MeshBasicMaterial({
        map: textureintro,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imageintro.position.z = this.pznvhp;
    scene.add(imageintro);

    // create the nvi1 image
    const texturenvi1 = new THREE.TextureLoader().load(this.nvi1);
    const imagenvi1 = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.9),
      new THREE.MeshBasicMaterial({
        map: texturenvi1,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvi1.position.y = -2.5;
    imagenvi1.position.z = this.pznvhp;
    scene.add(imagenvi1);

    // create the nvi1ForC image
    const texturenvi1ForC = new THREE.TextureLoader().load(this.exitForClick);
    const imagenvi1ForC = new THREE.Mesh(
      new THREE.PlaneGeometry(0.9, 0.9),
      new THREE.MeshBasicMaterial({
        map: texturenvi1ForC,
        side: THREE.DoubleSide,
        transparent: true,
      })
    );

    imagenvi1ForC.position.y = -2.5;
    imagenvi1ForC.position.z = this.pznvhp;
    scene.add(imagenvi1ForC);

    // initialize raycaster and mouse
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    const mouse2 = new THREE.Vector2();
    // initialize gyroscope data
    // let gyroX = 0;
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
      scene.add(imageel6v2);
      scene.add(imageel8v2);
      scene.add(imageel9v2);
      
      
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
        // gyroX = gyroX * 0.9 + event.gamma * 0.1;
        gyroY = gyroY * 0.9 + beta * 0.9;

        // calculate normalized device coordinates (-1 to 1) for gyroscope position
        mouse.x = (gyroY / 90) * 2 - 1;
        // mouse.y = (gyroX / 90) * 2 - 1;
      });
    } else {
      scene.add(image6);
      scene.add(image8);
      scene.add(image9);
      // add event listener to container for mouse movement
      document.addEventListener("mousemove", (event) => {
        // calculate normalized device coordinates (-1 to 1) for mouse position
        const rect = container.getBoundingClientRect();
        mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

        // set the cursor style to 'pointer' if an object is being hovered over
        raycaster.setFromCamera(mouse, this.camera);
        // const intersects = raycaster.intersectObjects(scene.children);
        const intersects = raycaster.intersectObjects([
          imagenvhpForC,
          imagenvi1ForC,
        ]); // check for both cubes
        if (intersects.length > 0) {
          if (
            (intersects[0].object === imagenvi1ForC &&
              imagenvi1ForC.visible == true) ||
            (imagenvhpForC && imagenvhpForC.visible == true)
          ) {
            this.$refs.container.style.cursor = "pointer ";
          }
        } else {
          this.$refs.container.style.cursor = "default";
        }
      });
    }

    // add event listener to container for mouse click
    document.addEventListener("click", (event) => {
      // calculate normalized device coordinates (-1 to 1) for mouse2 position
      const rect = container.getBoundingClientRect();
      mouse2.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse2.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      // set the cursor style to 'default' after the click
      this.$refs.container.style.cursor = "default";

      // update the raycaster with the mouse2 position
      raycaster.setFromCamera(mouse2, this.camera);

      // get the intersecting object(s)
      const intersects = raycaster.intersectObjects([
        imagenvhpForC,
        imagenvi1ForC,
      ]); // check for both cubes

      // log "cube" if the first cube is clicked, or "cube2" if the second cube is clicked
      if (intersects.length > 0) {
        if (
          intersects[0].object === imagenvhpForC &&
          imagenvhpForC.visible == true
        ) {
          this.goToCate();
        } else if (
          intersects[0].object === imagenvi1ForC &&
          imagenvi1ForC.visible == true
        ) {
          imagenvi1ForC.visible == false;
          this.goToFirstPage();
          this.requestPermission();
        }
      }
    });

    // render the scene
    const render = () => {
      requestAnimationFrame(render);

      // Opacity
      // this.mockupgrass2Opty;
      const images = [
        image1,
        image2,
        image3,
        image4,
        image5,
        image6,
        imageel6v2,
        image7,
        image8,
        imageel8v2,
        image9,
        imageel9v2,
        image10,
        imagehdtt1,
        imagehdtt2,
        imagehdtt3,
        imagehdtt4,
        imagehdtt5,
        imagehdtt6,
        imagehdtt7,
        imagehdtt8,
        imagehdtt9,
        imagehdtt10,
        imagehdtt11,
        imagehdtt12,
        imagenvhp,
        imagenvhp2,
        imagenvhpForC,
      ];

      for (const image of images) {
        image.material.opacity = this.opty;
      }

      imageintro.material.opacity = this.introOpty;
      imagenvi.material.opacity = this.nviOpty;
      imagenvi1.material.opacity = this.nvi1Opty;
      imagenvi1ForC.material.opacity = this.nvi1Opty;

      imagenvi1ForC.visible = imagenvi1.material.opacity >= 1;
      imagenvhpForC.visible = imagenvhp.material.opacity >= 1;

      const delta = clock.getDelta();
      annie.update(delta * 1000);
      const delta2 = clock2.getDelta();
      annie2.update(delta2 * 1000);
      const delta6 = clock6.getDelta();
      annie6.update(delta6 * 1000);
      const delta8 = clock8.getDelta();
      annie8.update(delta8 * 1000);
      const delta9 = clock9.getDelta();
      annie9.update(delta9 * 1000);
      // update the rotation of the images based on the mouse position

      image1.position.x = this.pxIm + mouse.x * -0.03;
      image1.position.y = mouse.y * 0.03;
      image2.position.x = this.pxIm + mouse.x * -0.04;
      image2.position.y = mouse.y * 0.04;
      image3.position.x = this.pxIm + mouse.x * -0.04;
      image3.position.y = mouse.y * 0.04;
      image4.position.x = this.pxIm + mouse.x * -0.04;
      image4.position.y = mouse.y * 0.04;
      image5.position.x = this.pxIm + mouse.x * -0.05;
      image5.position.y = mouse.y * 0.05;
      image6.position.x = this.pxIm + mouse.x * -0.06;
      image6.position.y = mouse.y * 0.06;
      image7.position.x = this.pxIm + mouse.x * -0.07;
      image7.position.y = -0.2 + mouse.y * 0.07;
      image8.position.x = this.pxIm + mouse.x * -0.08;
      image8.position.y = mouse.y * 0.08;
      image9.position.x = this.pxIm + mouse.x * -0.09;
      image9.position.y = mouse.y * 0.09;
      image10.position.x = this.pxIm + mouse.x * -0.1;
      image10.position.y = mouse.y * 0.1;

      imageel6v2.position.x = this.pxIm + mouse.x * -0.06;
      imageel6v2.position.y = mouse.y * 0.06;
      imageel8v2.position.x = this.pxIm + mouse.x * -0.08;
      imageel8v2.position.y = mouse.y * 0.08;
      imageel9v2.position.x = this.pxIm + mouse.x * -0.09;
      imageel9v2.position.y = mouse.y * 0.09;

      imagehdtt1.position.x = this.pxhdtt + mouse.x * -0.03;
      imagehdtt1.position.y = this.pyhdtt + mouse.y * 0.03;
      imagehdtt2.position.x = this.pxhdtt + mouse.x * -0.04;
      imagehdtt2.position.y = this.pyhdtt + mouse.y * 0.04;
      imagehdtt3.position.x = this.pxhdtt + mouse.x * -0.09;
      imagehdtt3.position.y = this.pyhdtt + mouse.y * 0.09;
      imagehdtt4.position.x = this.pxhdtt + mouse.x * -0.05;
      imagehdtt4.position.y = this.pyhdtt + mouse.y * 0.05;
      imagehdtt5.position.x = this.pxhdtt + mouse.x * -0.03;
      imagehdtt5.position.y = this.pyhdtt + mouse.y * 0.03;
      imagehdtt6.position.x = this.pxhdtt + mouse.x * -0.09;
      imagehdtt6.position.y = this.pyhdtt + mouse.y * 0.09;
      imagehdtt7.position.x = this.pxhdtt + mouse.x * -0.02;
      imagehdtt7.position.y = this.pyhdtt + mouse.y * 0.02;
      imagehdtt8.position.x = this.pxhdtt + mouse.x * -0.07;
      imagehdtt8.position.y = this.pyhdtt + mouse.y * 0.07;
      imagehdtt9.position.x = this.pxhdtt + mouse.x * -0.05;
      imagehdtt9.position.y = this.pyhdtt + mouse.y * 0.05;
      imagehdtt10.position.x = this.pxhdtt + mouse.x * -0.06;
      imagehdtt10.position.y = this.pyhdtt + mouse.y * 0.06;
      imagehdtt11.position.x = this.pxhdtt + mouse.x * -0.09;
      imagehdtt11.position.y = this.pyhdtt + mouse.y * 0.09;
      imagehdtt12.position.x = this.pxhdtt + mouse.x * -0.05;
      imagehdtt12.position.y = this.pyhdtt + mouse.y * 0.05;

      imagenvhp.position.x = this.pxnvhp + mouse.x * -0.03;
      imagenvhp.position.y = this.pynvhp + mouse.y * 0.03;
      imagenvhp2.position.x = this.pxnvhp + mouse.x * -0.03;
      imagenvhp2.position.y = this.pynvhp + mouse.y * 0.03;
      imagenvhpForC.position.x = this.pxnvhp + mouse.x * -0.03;
      imagenvhpForC.position.y = this.pynvhp + mouse.y * 0.03;

      imagenvi.position.x = this.pxnvhp + mouse.x * -0.05;
      imagenvi.position.y = this.pynvhp + mouse.y * 0.05;

      imagenvhp2.rotation.z = this.compassRo;

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
      window.addEventListener("load", (event) => {
        if (event.target.readyState === "complete") {
          setTimeout(() => {
            gsap.to(this.$data, {
              introOpty: 1,

              duration: 2,
              onComplete: () => {
                gsap.to(this.$data, {
                  nvi1Opty: 1,
                  duration: 1,
                  ease: "power1.out",
                });
              },
              ease: "power1.out",
            });
          }, 2000);
        }
      });
    },
    goToFirstPage() {
      gsap.to(this.$data, {
        introOpty: 0,
        nvi1Opty: 0,
        duration: 1,
        onComplete: () => {
          gsap.to(this.camera.position, {
            duration: 3,
            z: 4,
            ease: "elastic.out(0.75, 0.5)",
          });
          gsap.to(this.$data, {
            opty: 1,
            duration: 1,
            ease: "power1.out",
          });
          setTimeout(() => {
            const tl = gsap.timeline({ repeat: -1 });

            tl.to(this.$data, { duration: 2, nviOpty: 1 })
              .to(this.$data, { duration: 2, nviOpty: 1 })
              .to(this.$data, { duration: 2, nviOpty: 0 })
              .to(this.$data, { duration: 1, nviOpty: 0 });
          }, 2000);
        },
        ease: "power1.out",
      });
    },
    goToCate() {
      gsap.to(this.camera.position, {
        y: 0,
        duration: 2,
      });

      gsap.to(this.$data, {
        duration: 0.5,
        compassRo: -1,
        onComplete: () => {
          gsap.to(this.$data, {
            duration: 3,
            compassRo: 9,
            onComplete: () => {
              this.$router.push("/Home");
            },
            ease: "elastic.out(1, 1)",
          });
        },
        ease: "sine.inOut",
      });
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


<style scoped>
#webglCanvas {
  position: absolute;
  left: 0;
  top: 0;
  width: 100% !important;
  height: 100% !important;
}
</style>