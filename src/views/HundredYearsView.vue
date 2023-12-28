<template>
  <div id="webglCanvas" ref="container"></div>
  <div class="effect-hot-spot">
    <!-- <PageLoader v-if="!isloaded" /> -->
    <div class="loading-tips"></div>
    <div class="home-wrap">
      <div class="container-rl">
        <div class="container-rl">
          <div class="sub-container-rl">
            <div class="gesture" ref="containerVI"></div>
            <div class="sub-sub-container-rl">
              <div class="messagebtn no-select">
                คลิกเมาส์ค้างไว้แล้วลากเพื่อเลื่อนภาพ/กดแป้นพิมพ์ตัว ← →
                เพื่อควบคุมการเคลื่อนไหวของภาพ
              </div>
              <div class="rlbtn">
                <div
                  @mousedown="moveLeft = true"
                  @mouseup="moveLeft = false"
                  @mouseout="moveLeft = false"
                  @touchstart="moveLeft = true"
                  @touchend="moveLeft = false"
                  @touchcancel="moveLeft = false"
                  class="sub-rlbtn"
                >
                  <img
                    src="@/assets/leftbtn.png"
                    alt="LEFT"
                    draggable="false"
                  />
                </div>
                <div
                  @mousedown="moveRight = true"
                  @mouseup="moveRight = false"
                  @mouseout="moveRight = false"
                  @touchstart="moveRight = true"
                  @touchend="moveRight = false"
                  @touchcancel="moveRight = false"
                  class="sub-rlbtn"
                >
                  <img
                    src="@/assets/rightbtn.png"
                    alt="RIGHT"
                    draggable="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script >
import { gsap } from "gsap";
// import PageLoader from "@/views/PageLoader.vue";
import * as THREE from "three";
import Hammer from "hammerjs";

import ct1el1 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc1/100yrs-sc1v1.webp";
import ct1el2 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc1/100yrs-sc1v2.webp";
import hdtt from "@/assets/Contents/Titlecontents/100yrs.png";
import content1 from "@/assets/Contents/wars/CrusadeWar/Cr-sc-ct1.webp";
import hdtt2 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc-tt2.webp";
import trans1 from "@/assets/Contents/wars/HundredYearsWar/trans1v1Hun.webp";
import trans1v2 from "@/assets/Contents/wars/HundredYearsWar/trans1v2Hun.webp";
import trans2 from "@/assets/Contents/wars/HundredYearsWar/trans2Hun.webp";
import trans2v2 from "@/assets/Contents/wars/HundredYearsWar/trans2v2Hun.webp";
import trans2v3 from "@/assets/Contents/wars/HundredYearsWar/trans2v3Hun.webp";
import ct2el1 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc2/100yrs-sc2v1.webp";
import ct2el2 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc2/100yrs-sc2v2.webp";

import content3 from "@/assets/Contents/wars/HundredYearsWar/100yrs-sc-ct2.webp";
import el10foot1 from "@/assets/Contents/mockup5F1.webp";
import el10foot2 from "@/assets/Contents/mockup5F2.webp";
import el10foot3 from "@/assets/Contents/mockup5F3.webp";
import el10foot4 from "@/assets/Contents/mockup5F4.webp";
import el11door from "@/assets/Contents/Doors/Hundoor.webp";
import mockupgrassD1 from "@/assets/Contents/mockupgrassD.webp";
import mockupgrassD2 from "@/assets/Contents/mockupgrassD-1.webp";
import mockupgrassD3 from "@/assets/Contents/mockupgrassD-2.webp";
import mockupgrassD4 from "@/assets/Contents/mockupgrassD-3.webp";
import el11stair from "@/assets/Contents/mockup6.webp";
import gallery1 from "@/assets/Contents/wars/HundredYearsWar/100-gar-1.webp";
import gallery2 from "@/assets/Contents/wars/HundredYearsWar/100-gar-2.webp";
import gallery3 from "@/assets/Contents/wars/HundredYearsWar/100-gar-3.webp";

import galleryLabel from "@/assets/Contents/galleryLabel.webp";
import trans3 from "@/assets/Contents/wars/GrecoPersianWar/trans3GP/trans3GPv4.webp";
import trans3v2 from "@/assets/Contents/wars/HundredYearsWar/trans3Hun/trans3Hunv3.webp";
import trans3v3 from "@/assets/Contents/wars/HundredYearsWar/trans3Hun/trans3Hunv2.webp";
import trans3v4 from "@/assets/Contents/wars/HundredYearsWar/trans3Hun/trans3Hunv1.webp";

import LabelExit1 from "@/assets/Contents/exitDoor/LabelExit1.webp";

import exit1 from "@/assets/Contents/exitDoor/ExitDoor1.webp";
import exit2 from "@/assets/Contents/exitDoor/ExitDoor1v2.webp";
import exit3 from "@/assets/Contents/exitDoor/ExitDoor1v3.webp";
import exit4 from "@/assets/Contents/exitDoor/ExitDoor1v4.webp";
import exit5 from "@/assets/Contents/exitDoor/ExitDoor1v5.webp";
import exit6 from "@/assets/Contents/exitDoor/ExitDoor1v6.webp";
import exitForClick from "@/assets/Contents/exitDoor/ExitDoor1Forclick.webp";
import nvi from "@/assets/Click.webp";

export default {
  data() {
    return {
      isloaded: false,
      showbtn: true,
      AniSpd: 50,
      sizeimgContent1: 4,
      sizeimgContent2: 3,
      sizeimgFoots: 4,
      img1y: -0.4,
      img2x: 10,
      img2y: 0.5,
      stairR: 0,
      speedCameraX: 0.03,

      hdttOpty: 0,
      content1Opty: 0,
      elOpty: 0,
      hdtt2Opty: 1,
      trans1Opty: 0,
      el6pty: 0,
      content3Opty: 0,
      content3v2Opty: 0,
      el11stairOrpty: 0,
      gallery1Opty: 0,
      gallery2Opty: 0,
      gallery3Opty: 0,
      imageexitOpty: 0,

      exitdoorX: 40,
      exitdoor6X: 40,
      mockupgrass2Opty: 0,
      trans3x: 19,
      nviOpty: 0,

      ct1el1: ct1el1,
      ct1el2: ct1el2,
      ct2el1: ct2el1,
      ct2el2: ct2el2,
      el10foot1: el10foot1,
      el10foot2: el10foot2,
      el10foot3: el10foot3,
      el10foot4: el10foot4,
      el11door: el11door,
      mockupgrassD1: mockupgrassD1,
      mockupgrassD2: mockupgrassD2,
      mockupgrassD3: mockupgrassD3,
      mockupgrassD4: mockupgrassD4,
      el11stair: el11stair,
      hdtt: hdtt,
      content1: content1,
      hdtt2: hdtt2,
      content3: content3,
      gallery1: gallery1,
      gallery2: gallery2,
      gallery3: gallery3,

      trans1: trans1,
      trans1v2: trans1v2,
      galleryLabel: galleryLabel,
      trans2: trans2,
      trans2v2: trans2v2,
      trans2v3: trans2v3,
      trans3: trans3,
      trans3v2: trans3v2,
      trans3v3: trans3v3,
      trans3v4: trans3v4,
      exit1: exit1,
      exit2: exit2,
      exit3: exit3,
      exit4: exit4,
      exit5: exit5,
      exit6: exit6,
      LabelExit1: LabelExit1,
      exitForClick: exitForClick,
      nvi: nvi,
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
        this.PlayNavi();
      }
    });

    let container = document.getElementById("webglCanvas");
    let width = container.clientWidth;
    let height = container.clientHeight;
    // create the scene
    const scene = new THREE.Scene();

    // create the camera
    let cameraX = 0; // initialize the X position of the camera
    let cameraZ = -3; // initialize the Z position of the camera  -3
    let cameraY = 0; // initialize the Y position of the camera

    this.camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      // window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    scene.position.z = -1;

    // create the renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.addEventListener("webglcontextlost", function () {
      location.reload();
    });

    renderer.setSize(container.clientWidth, container.clientHeight);
    this.$refs.container.appendChild(renderer.domElement);

    // create the ct1el2 image
    const clockct1el2 = new THREE.Clock();
    const texturect1el2 = new THREE.TextureLoader().load(this.ct1el2);
    const anniect1el2 = new TextureAnimator(
      texturect1el2,
      10,
      6,
      60,
      this.AniSpd
    );
    const imagect1el2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgContent1, this.sizeimgContent1),
      new THREE.MeshBasicMaterial({
        map: texturect1el2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.elOpty,
      })
    );
    scene.add(imagect1el2);

    // create the ct1el1 image
    const clockct1el1 = new THREE.Clock();
    const texturect1el1 = new THREE.TextureLoader().load(this.ct1el1);
    const anniect1el1 = new TextureAnimator(
      texturect1el1,
      10,
      6,
      60,
      this.AniSpd
    );
    const imagect1el1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgContent1, this.sizeimgContent1),
      new THREE.MeshBasicMaterial({
        map: texturect1el1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.elOpty,
      })
    );
    scene.add(imagect1el1);
    imagect1el1.position.y = this.img1y;
    imagect1el2.position.y = this.img1y;

    imagect1el1.position.z = 1 + 0.9;
    imagect1el2.position.z = 1 + 0.7;

    // create the headtitle image
    const textureTitle = new THREE.TextureLoader().load(this.hdtt);
    const headtitle = new THREE.Mesh(
      new THREE.PlaneGeometry(
        this.sizeimgContent1 + 1,
        this.sizeimgContent1 + 1
      ),
      new THREE.MeshBasicMaterial({
        map: textureTitle,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.hdttOpty,
      })
    );

    scene.add(headtitle);
    headtitle.position.y = 2.1;

    // create the content1 image
    const texturecontent1 = new THREE.TextureLoader().load(this.content1);
    const content1 = new THREE.Mesh(
      new THREE.PlaneGeometry(
        this.sizeimgContent1 - 2.5,
        this.sizeimgContent1 - 2.5
      ),
      new THREE.MeshBasicMaterial({
        map: texturecontent1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.content1Opty,
      })
    );

    scene.add(content1);
    content1.position.z = 3;

    // create the trans1 image
    const texturetrans1 = new THREE.TextureLoader().load(this.trans1);
    const imagetrans1 = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: texturetrans1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.trans1Opty,
      })
    );
    scene.add(imagetrans1);

    imagetrans1.position.z = 3.5;

    // create the trans1v2 image
    const texturetrans1v2 = new THREE.TextureLoader().load(this.trans1v2);
    const imagetrans1v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(1.5, 1.5),
      new THREE.MeshBasicMaterial({
        map: texturetrans1v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.trans1Opty,
      })
    );
    scene.add(imagetrans1v2);

    imagetrans1v2.position.z = 3.3;

    // create the hdtt2 image
    const texturehdtt2 = new THREE.TextureLoader().load(this.hdtt2);
    const hdtt2 = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({
        map: texturehdtt2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.hdtt2Opty,
      })
    );
    scene.add(hdtt2);

    hdtt2.position.z = 3.4;

    // create the trans2 image
    const texturetrans2 = new THREE.TextureLoader().load(this.trans2);
    const imagetrans2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturetrans2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.el6pty,
      })
    );
    scene.add(imagetrans2);

    imagetrans2.position.z = 2.5;

    // create the trans2v2 image
    const texturetrans2v2 = new THREE.TextureLoader().load(this.trans2v2);
    const imagetrans2v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturetrans2v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.el6pty,
      })
    );
    scene.add(imagetrans2v2);

    imagetrans2v2.position.z = 2.3;

    // create the trans2v3 image
    const texturetrans2v3 = new THREE.TextureLoader().load(this.trans2v3);
    const imagetrans2v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturetrans2v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.el6pty,
      })
    );
    scene.add(imagetrans2v3);

    imagetrans2v3.position.z = 2;

    // create the ct2el2 image
    const clockct2el2 = new THREE.Clock();
    const textureimagect2el2 = new THREE.TextureLoader().load(this.ct2el2);
    const anniect2el2 = new TextureAnimator(
      textureimagect2el2,
      10,
      6,
      60,
      this.AniSpd
    );
    const imagect2el2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgContent2 + 2, this.sizeimgContent2),
      new THREE.MeshBasicMaterial({
        map: textureimagect2el2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.content3Opty,
      })
    );
    scene.add(imagect2el2);
    imagect2el2.position.z = -1.2;

    // create the ct2el1 image
    const clockct2el1 = new THREE.Clock();
    const textureimagect2el1 = new THREE.TextureLoader().load(this.ct2el1);
    const anniect2el1 = new TextureAnimator(
      textureimagect2el1,
      10,
      6,
      60,
      this.AniSpd
    );
    const imagect2el1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgContent2 + 2, this.sizeimgContent2),
      new THREE.MeshBasicMaterial({
        map: textureimagect2el1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.content3Opty,
      })
    );
    scene.add(imagect2el1);

    imagect2el1.position.z = -1;

    // create the content3 image
    const texturecontent3 = new THREE.TextureLoader().load(this.content3);
    const imagecontent3 = new THREE.Mesh(
      new THREE.PlaneGeometry(
        this.sizeimgContent2 + 2,
        this.sizeimgContent2 + 2
      ),
      new THREE.MeshBasicMaterial({
        map: texturecontent3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.content3v2Opty,
      })
    );
    scene.add(imagecontent3);
    imagecontent3.position.z = -0.5;

    // create the el10foot1 image
    const textureel10foot1 = new THREE.TextureLoader().load(this.el10foot1);
    const imageel10foot1 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgFoots, this.sizeimgFoots),
      new THREE.MeshBasicMaterial({
        map: textureel10foot1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageel10foot1);

    // create the el10foot2 image
    const textureel10foot2 = new THREE.TextureLoader().load(this.el10foot2);
    const imageel10foot2 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgFoots, this.sizeimgFoots),
      new THREE.MeshBasicMaterial({
        map: textureel10foot2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageel10foot2);

    // create the el10foot3 image
    const textureel10foot3 = new THREE.TextureLoader().load(this.el10foot3);
    const imageel10foot3 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgFoots, this.sizeimgFoots),
      new THREE.MeshBasicMaterial({
        map: textureel10foot3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageel10foot3);

    // create the el10foot4 image
    const textureel10foot4 = new THREE.TextureLoader().load(this.el10foot4);
    const imageel10foot4 = new THREE.Mesh(
      new THREE.PlaneGeometry(this.sizeimgFoots, this.sizeimgFoots),
      new THREE.MeshBasicMaterial({
        map: textureel10foot4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageel10foot4);

    const imageel10footX = 14;
    const imageel10footZ = 1;
    const imageel10footY = -2;

    imageel10foot1.position.z = imageel10footZ;
    imageel10foot2.position.z = imageel10footZ + 0.3;
    imageel10foot3.position.z = imageel10footZ + 0.4;
    imageel10foot4.position.z = imageel10footZ + 0.5;

    // create the galleryLabel image
    const texturegalleryLabel = new THREE.TextureLoader().load(
      this.galleryLabel
    );
    const imagegalleryLabel = new THREE.Mesh(
      new THREE.PlaneGeometry(2, 2),
      new THREE.MeshBasicMaterial({
        map: texturegalleryLabel,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagegalleryLabel);
    imagegalleryLabel.position.x = this.trans3x;
    imagegalleryLabel.position.y = -3.3;
    imagegalleryLabel.position.z = 3.5;

    // create the trans3 image
    const texturetrans3 = new THREE.TextureLoader().load(this.trans3);
    const imagetrans3 = new THREE.Mesh(
      new THREE.PlaneGeometry(7, 7),
      new THREE.MeshBasicMaterial({
        map: texturetrans3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagetrans3);

    imagetrans3.position.z = 3;

    // create the trans3v2 image
    const texturetrans3v2 = new THREE.TextureLoader().load(this.trans3v2);
    const imagetrans3v2 = new THREE.Mesh(
      new THREE.PlaneGeometry(6, 6),
      new THREE.MeshBasicMaterial({
        map: texturetrans3v2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagetrans3v2);

    imagetrans3v2.position.z = 3.2;

    // create the trans3v3 image
    const texturetrans3v3 = new THREE.TextureLoader().load(this.trans3v3);
    const imagetrans3v3 = new THREE.Mesh(
      new THREE.PlaneGeometry(5, 5),
      new THREE.MeshBasicMaterial({
        map: texturetrans3v3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagetrans3v3);
    imagetrans3v3.position.z = 3.7;

    // create the trans3v4 image
    const texturetrans3v4 = new THREE.TextureLoader().load(this.trans3v4);
    const imagetrans3v4 = new THREE.Mesh(
      new THREE.PlaneGeometry(4, 4),
      new THREE.MeshBasicMaterial({
        map: texturetrans3v4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagetrans3v4);
    imagetrans3v4.position.z = 4;

    // create the el11stair image
    const textureel11stair = new THREE.TextureLoader().load(this.el11stair);
    const imageel11stair = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: textureel11stair,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.el11stairOrpty,
      })
    );
    scene.add(imageel11stair);

    imageel11stair.position.z = -1;

    // create the mockupgrassD1 image
    const texturemockupgrassD1 = new THREE.TextureLoader().load(
      this.mockupgrassD1
    );
    const imagemockupgrassD1 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrassD1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrassD1);

    // create the mockupgrassD2 image
    const texturemockupgrassD2 = new THREE.TextureLoader().load(
      this.mockupgrassD2
    );
    const imagemockupgrassD2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrassD2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrassD2);

    // create the mockupgrassD3 image
    const texturemockupgrassD3 = new THREE.TextureLoader().load(
      this.mockupgrassD3
    );
    const imagemockupgrassD3 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrassD3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrassD3);

    // create the mockupgrassD4 image
    const texturemockupgrassD4 = new THREE.TextureLoader().load(
      this.mockupgrassD4
    );
    const imagemockupgrassD4 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrassD4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrassD4);

    imagemockupgrassD1.position.z = 1.5;

    imagemockupgrassD2.position.z = 2;

    imagemockupgrassD3.position.z = 2.5;

    imagemockupgrassD4.position.z = 3;

    // create the el11door image
    const textureel11door = new THREE.TextureLoader().load(this.el11door);
    const imageel11door = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: textureel11door,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageel11door);

    imageel11door.position.z = 1;

    // create the gallery1 image
    const texturegallery1 = new THREE.TextureLoader().load(this.gallery1);
    const imagegallery1 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturegallery1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.gallery1Opty,
      })
    );
    scene.add(imagegallery1);

    imagegallery1.position.z = -5;

    // create the gallery2 image
    const texturegallery2 = new THREE.TextureLoader().load(this.gallery2);
    const imagegallery2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturegallery2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.gallery2Opty,
      })
    );
    scene.add(imagegallery2);

    imagegallery2.position.z = -5;

    // create the gallery3 image
    const texturegallery3 = new THREE.TextureLoader().load(this.gallery3);
    const imagegallery3 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturegallery3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.gallery3Opty,
      })
    );
    scene.add(imagegallery3);

    imagegallery3.position.z = -5;

    // create the exit1 image
    const textureexit1 = new THREE.TextureLoader().load(this.exit1);
    const imageexit1 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit1);

    imageexit1.position.z = -7;

    // create the exit2 image
    const textureexit2 = new THREE.TextureLoader().load(this.exit2);
    const imageexit2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit2);

    imageexit2.position.y = -2.8;
    imageexit2.position.z = -7;

    // create the exit3 image
    const textureexit3 = new THREE.TextureLoader().load(this.exit3);
    const imageexit3 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit3);
    imageexit3.position.y = -2.8;
    imageexit3.position.z = -7;

    // create the exit4 image
    const textureexit4 = new THREE.TextureLoader().load(this.exit4);
    const imageexit4 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit4);

    imageexit4.position.y = -2.8;
    imageexit4.position.z = -7;

    // create the exit5 image
    const textureexit5 = new THREE.TextureLoader().load(this.exit5);
    const imageexit5 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit5,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit5);

    imageexit5.position.y = -2.8;
    imageexit5.position.z = -7;

    // create the exit6 image
    const textureexit6 = new THREE.TextureLoader().load(this.exit6);
    const imageexit6 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 4.5),
      new THREE.MeshBasicMaterial({
        map: textureexit6,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageexit6);

    imageexit6.position.y = -2.8;
    imageexit6.position.z = -7;

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

    imagenvi.position.x = 40;
    imagenvi.position.y = -2.8;
    imagenvi.position.z = -7;
    scene.add(imagenvi);

    // create the exitForClick image
    const textureexitForClick = new THREE.TextureLoader().load(
      this.exitForClick
    );
    const imageexitForClick = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 3),
      new THREE.MeshBasicMaterial({
        map: textureexitForClick,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imageexitForClick);
    imageexitForClick.position.x = 40;
    imageexitForClick.position.y = -2.8;
    imageexitForClick.position.z = -7;

    // create the LabelExit1 image
    const textureLabelExit1 = new THREE.TextureLoader().load(this.LabelExit1);
    const imageLabelExit1 = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1.5),
      new THREE.MeshBasicMaterial({
        map: textureLabelExit1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: this.imageexitOpty,
      })
    );
    scene.add(imageLabelExit1);

    imageLabelExit1.position.z = -6.5;

    // create the mockupgrass2D1 image
    const texturemockupgrass2D1 = new THREE.TextureLoader().load(
      this.mockupgrassD1
    );
    const imagemockupgrass2D1 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrass2D1,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrass2D1);

    // create the mockupgrass2D2 image
    const texturemockupgrass2D2 = new THREE.TextureLoader().load(
      this.mockupgrassD2
    );
    const imagemockupgrass2D2 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrass2D2,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrass2D2);

    // create the mockupgrass2D3 image
    const texturemockupgrass2D3 = new THREE.TextureLoader().load(
      this.mockupgrassD3
    );
    const imagemockupgrass2D3 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrass2D3,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrass2D3);

    // create the mockupgrass2D4 image
    const texturemockupgrass2D4 = new THREE.TextureLoader().load(
      this.mockupgrassD4
    );
    const imagemockupgrass2D4 = new THREE.Mesh(
      new THREE.PlaneGeometry(3, 3),
      new THREE.MeshBasicMaterial({
        map: texturemockupgrass2D4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 1,
      })
    );
    scene.add(imagemockupgrass2D4);

    imagemockupgrass2D1.position.z = -6;

    imagemockupgrass2D2.position.z = -5.5;

    imagemockupgrass2D3.position.z = -5;

    imagemockupgrass2D4.position.z = -4.5;

    // Keyboard controls
    const keyboard = {};
    window.addEventListener("keydown", (event) => {
      keyboard[event.code] = true;
    });
    window.addEventListener("keyup", (event) => {
      keyboard[event.code] = false;
    });

    // Add swipe gesture recognition with Hammer.js
    const vm = this; // capture the Vue component instance
    const mc = new Hammer.Manager(this.$refs.containerVI);
    mc.add(
      new Hammer.Pan({ direction: Hammer.DIRECTION_HORIZONTAL, threshold: 0 })
    );

    mc.on("pan", function (ev) {
      // Update the X position of the camera based on the swipe gesture

      if (ev.direction === Hammer.DIRECTION_LEFT) {
        if (cameraX <= 0 && cameraX >= -4.5) {
          cameraX -= 0.03;
          if (cameraX < -0.2 && cameraX >= -1.4) {
            vm.hdttOpty -= 0.025;
            vm.content1Opty += 0.05;
          } else if (cameraX <= -2 && cameraX >= -5) {
            vm.hdttOpty -= 0.05;
            vm.elOpty -= 0.025;
            vm.content1Opty -= 0.025;
            vm.hdtt2Opty += 0.05;
            vm.trans1Opty += 0.05;
            if (cameraX <= -3.5) {
              vm.el6pty += 0.005;
            }
          }
        } else if (cameraX <= -4.5 && cameraX >= -8 && cameraZ <= -1) {
          cameraX -= 0.03 + 0.02;
          cameraZ += 0.02;
          if (cameraX < -4.5) {
            vm.el6pty += 0.05;
            vm.content3Opty += 0.005;
            vm.content3v2Opty += 0.005;
          }
        } else if (cameraX <= -8 && cameraX >= -11) {
          cameraX -= 0.03;
          cameraZ = -1.2;
          cameraY = 0;
          if (cameraX < -8) {
            vm.content3Opty += 0.05;
            vm.content3v2Opty += 0.05;
          }
        } else if (
          cameraX <= -11 &&
          cameraX >= -17 &&
          cameraZ >= -4 &&
          cameraZ <= -1
        ) {
          cameraZ -= 0.02;
          cameraX -= 0.03 + 0.02;
          cameraY += 0.02;
          if (cameraX < -11) {
            vm.content3Opty -= 0.025;
            vm.content3v2Opty -= 0.025;
          }
        } else if (cameraX <= -16 && cameraX >= -23.9) {
          cameraX -= 0.03;
          cameraZ = -4;
          cameraY = 2.8;
        } else if (
          cameraX <= -23 &&
          cameraX >= -24 &&
          cameraZ >= -4.1 &&
          cameraZ <= 4
        ) {
          cameraZ += 0.02;
          cameraX = -24;
          cameraY = 2.8;
          if (cameraZ >= -0.07) {
            vm.stairR += 0.025;
            vm.el11stairOrpty += 0.025;
          }
          if (cameraZ >= 2.6) {
            vm.gallery1Opty += 0.05;
            vm.stairR += 0.025;
          }
        } else if (
          cameraY >= 2 &&
          cameraZ >= 4 &&
          cameraX <= -24 &&
          cameraX >= -38.9
        ) {
          cameraX -= 0.03;
          cameraZ = 4;
          cameraY = 2.8;
          if (cameraX < -25) {
            vm.gallery2Opty += 0.025;
          }
          if (cameraX < -30) {
            vm.gallery3Opty += 0.025;
            vm.mockupgrass2Opty += 0.05;
          }
        } else if (
          cameraX >= -39 &&
          cameraX <= -38 &&
          cameraZ >= 4 &&
          cameraZ <= 6
        ) {
          cameraZ += 0.02;
          cameraX = -39;

          if (cameraZ > 4) {
            vm.imageexitOpty += 0.05;
          }
        }
      } else if (ev.direction === Hammer.DIRECTION_RIGHT) {
        if (cameraX <= 0 && cameraX >= -4.5) {
          cameraX += 0.03;
          cameraZ = -3;
          if (cameraX > -2.8 && cameraX < -0.8) {
            vm.hdtt2Opty -= 0.05;
            vm.content1Opty += 0.05;
            vm.elOpty += 0.05;
          } else if (cameraX > -0.8) {
            vm.hdttOpty += 0.05;
            vm.content1Opty -= 0.05;
          } else if (cameraX > -4) {
            vm.el6pty -= 0.05;
          }
        } else if (
          cameraX <= -4.5 &&
          cameraX >= -8.1 &&
          cameraZ <= -1.2 &&
          cameraZ >= -3
        ) {
          cameraX += 0.03 + 0.02;
          cameraZ -= 0.02;
          if (cameraX > -7) {
            vm.content3Opty -= 0.02;
            vm.content3v2Opty -= 0.02;
          }
        } else if (cameraX <= -8.1 && cameraX >= -11.5) {
          cameraX += 0.03;
          cameraZ = -1.2;
          cameraY = 0;
          vm.content3Opty += 0.05;
          vm.content3v2Opty += 0.05;
        } else if (
          cameraX <= -11.01 &&
          cameraX >= -16.5 &&
          cameraZ >= -4.1 &&
          cameraZ <= -1.1
        ) {
          cameraZ += 0.02;
          cameraX += 0.03 + 0.02;
          cameraY -= 0.02;
          if (cameraZ > -3) {
            vm.content3Opty += 0.025;
            vm.content3v2Opty += 0.025;
          }
        } else if (
          cameraX <= -16.5 &&
          cameraX >= -24.1 &&
          cameraZ >= -4.1 &&
          cameraZ <= -4
        ) {
          cameraX += 0.03;
          cameraZ = -4;
          cameraY = 2.8;
        } else if (
          cameraX <= -24 &&
          cameraX >= -24.1 &&
          cameraZ >= -4.01 &&
          cameraZ <= 4.01
        ) {
          cameraZ -= 0.02;
          cameraX = -24;
          cameraY = 2.8;

          if (cameraZ < 0.4 && cameraZ > -2) {
            vm.stairR -= 0.025;
            vm.el11stairOrpty -= 0.05;
          } else if (cameraZ < 3) {
            vm.stairR -= 0.025;
            vm.gallery1Opty -= 0.05;
          }
        } else if (
          cameraZ >= -4.01 &&
          cameraZ <= 4.01 &&
          cameraX >= -39.01 &&
          cameraX <= -24.1
        ) {
          cameraX += 0.03;
          cameraZ = 4;
          cameraY = 2.8;
          vm.imageexitOpty -= 0.05;
          if (cameraX > -31 && cameraX < -26) {
            vm.gallery3Opty -= 0.05;
            vm.mockupgrass2Opty -= 0.05;
          } else if (cameraX > -26) {
            vm.gallery2Opty -= 0.05;
            vm.mockupgrass2Opty -= 0.05;
          }
        } else if (
          cameraX >= -39.01 &&
          cameraX <= -39 &&
          cameraZ >= 4.01 &&
          cameraZ <= 6.02
        ) {
          vm.imageexitOpty -= 0.005;
          cameraZ -= 0.02;
          cameraX = -39;
        }
      }
    });

    // create the parallax effect
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

        // set the cursor style to 'pointer' if an object is being hovered over
        raycaster.setFromCamera(mouse, this.camera);
        // const intersects = raycaster.intersectObjects(scene.children);
        const intersects = raycaster.intersectObjects([imageexitForClick]); // check for both cubes
        if (intersects.length > 0) {
          if (
            intersects[0].object === imageexitForClick &&
            imageexitForClick.visible == true
          ) {
            document.body.style.cursor = "pointer";
          }
        } else {
          document.body.style.cursor = "default";
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
      const intersects = raycaster.intersectObjects([imageexitForClick]); // check for both cubes

      // log "cube" if the first cube is clicked, or "cube2" if the second cube is clicked
      if (intersects.length > 0) {
        if (
          intersects[0].object === imageexitForClick &&
          imageexitForClick.visible == true
        ) {
          imageexitForClick.visible == false;
          this.backtoCate();
        }
      }
    });

    // render the scene
    const render = () => {
      requestAnimationFrame(render);
      const deltact1el1 = clockct1el1.getDelta();
      anniect1el1.update(deltact1el1 * 1000);
      const deltact1el2 = clockct1el2.getDelta();
      anniect1el2.update(deltact1el2 * 1000);
      const deltact2el1 = clockct2el1.getDelta();
      anniect2el1.update(deltact2el1 * 1000);
      const deltact2el2 = clockct2el2.getDelta();
      anniect2el2.update(deltact2el2 * 1000);

      // update the rotation of the images based on the mouse position
      imagect1el1.position.x = mouse.x * -0.01;
      imagect1el1.position.y = this.img1y + mouse.y * 0.01;
      imagect1el2.position.x = mouse.x * -0.02;
      imagect1el2.position.y = this.img1y + mouse.y * 0.02;

      content1.position.y = -0.02 + mouse.y * 0.01;
      content1.position.x = 2 + mouse.x * 0.01;
      hdtt2.position.y = mouse.y * 0.01;
      hdtt2.position.x = 3.7 + mouse.x * 0.01;
      imagecontent3.position.y = -1.2 + mouse.y * 0.01;
      imagecontent3.position.x = this.img2x + mouse.x * 0.01;
      imagetrans1.position.x = 3 + mouse.x * 0.01;
      imagetrans1.position.y = mouse.y * 0.01;
      imagetrans1v2.position.x = 3.3 + mouse.x * 0.005;
      imagetrans1v2.position.y = -0.1 + mouse.y * 0.01;
      imagetrans2.position.x = 6 + mouse.x * 0.005;
      imagetrans2.position.y = mouse.y * 0.005;
      imagetrans2v2.position.x = 6 + mouse.x * 0.01;
      imagetrans2v2.position.y = mouse.y * 0.01;
      imagetrans2v3.position.x = 6 + mouse.x * 0.02;
      imagetrans2v3.position.y = mouse.y * 0.02;
      imageel10foot1.position.x = imageel10footX + mouse.x * 0.01;
      imageel10foot1.position.y = imageel10footY + mouse.y * 0.01;
      imageel10foot2.position.x = imageel10footX + 0.4 + mouse.x * 0.01;
      imageel10foot2.position.y = imageel10footY - 0.2 + mouse.y * 0.01;
      imageel10foot3.position.x = imageel10footX + 0.4 + mouse.x * 0.01;
      imageel10foot3.position.y = imageel10footY - 0.4 + mouse.y * 0.01;
      imageel10foot4.position.x = imageel10footX + 0.9 + mouse.x * 0.01;
      imageel10foot4.position.y = imageel10footY - 0.9 + mouse.y * 0.01;
      imagegalleryLabel.position.x = this.trans3x + mouse.x * 0.01;
      imagegalleryLabel.position.y = -3.3 + mouse.y * 0.01;
      imagetrans3.position.y = -3.3 + mouse.y * 0.01;
      imagetrans3.position.x = this.trans3x + mouse.x * 0.03;
      imagetrans3v2.position.x = this.trans3x + mouse.x * 0.03;
      imagetrans3v2.position.y = -3 + mouse.y * 0.01;
      imagetrans3v3.position.x = this.trans3x + mouse.x * 0.03;
      imagetrans3v3.position.y = -2.9 + mouse.y * 0.01;
      imagetrans3v4.position.x = this.trans3x + mouse.x * 0.03;
      imagetrans3v4.position.y = -2.9 + mouse.y * 0.01;
      imagemockupgrassD1.position.x = 24 + mouse.x * 0.01;
      imagemockupgrassD1.position.y = -2.5 + mouse.y * 0.01;
      imagemockupgrassD2.position.x = 24 + mouse.x * 0.02;
      imagemockupgrassD2.position.y = -3 + mouse.y * 0.02;
      imagemockupgrassD3.position.x = 24 + mouse.x * 0.03;
      imagemockupgrassD3.position.y = -3.5 + mouse.y * 0.03;
      imagemockupgrassD4.position.x = 24 + mouse.x * 0.04;
      imagemockupgrassD4.position.y = -4 + mouse.y * 0.04;
      imageel11door.position.x = 24 + mouse.x * 0.01;
      imageel11door.position.y = -2.8 + mouse.y * 0.01;
      imageel11stair.position.x = 24 + mouse.x * 0.01;
      imageel11stair.position.y = -2.8 + mouse.y * 0.01;
      imagegallery1.position.x = 24 + mouse.x * 0.01;
      imagegallery1.position.y = -3 + mouse.y * 0.01;
      imagegallery2.position.x = 29 + mouse.x * 0.01;
      imagegallery2.position.y = -3 + mouse.y * 0.01;
      imagegallery3.position.x = 34 + mouse.x * 0.01;
      imagegallery3.position.y = -3 + mouse.y * 0.01;
      imageexit1.position.x = 40 + mouse.x * 0.01;
      imageexit1.position.y = -2.8 + mouse.y * 0.01;
      imagemockupgrass2D1.position.x = 39 + mouse.x * 0.01;
      imagemockupgrass2D1.position.y = -2.8 + mouse.y * 0.01;
      imagemockupgrass2D2.position.x = 39 + mouse.x * 0.02;
      imagemockupgrass2D2.position.y = -3 + mouse.y * 0.02;
      imagemockupgrass2D3.position.x = 39 + mouse.x * 0.03;
      imagemockupgrass2D3.position.y = -3.2 + mouse.y * 0.03;
      imagemockupgrass2D4.position.x = 39 + mouse.x * 0.04;
      imagemockupgrass2D4.position.y = -3.4 + mouse.y * 0.04;
      imageLabelExit1.position.x = 38.5 + mouse.x * 0.01;
      imageLabelExit1.position.y = -3.5 + mouse.y * 0.01;

      imagect2el2.position.x = this.img2x + mouse.x * -0.03;
      imagect2el2.position.y = this.img2y + mouse.y * 0.03;
      imagect2el1.position.x = this.img2x + mouse.x * -0.05;
      imagect2el1.position.y = this.img2y + mouse.y * 0.05;

      imageexit1.position.x = this.exitdoorX;
      imageexit2.position.x = this.exitdoorX + mouse.x * -0.04;
      imageexit3.position.x = this.exitdoorX + mouse.x * -0.035;
      imageexit4.position.x = this.exitdoorX + mouse.x * -0.03;
      imageexit5.position.x = this.exitdoorX + mouse.x * -0.025;
      imageexit6.position.x = this.exitdoor6X + mouse.x * -0.009;

      // Opacity
      imageel11stair.rotation.z = this.stairR;
      headtitle.material.opacity = this.hdttOpty;
      content1.material.opacity = this.content1Opty;
      // this.elOpty;
      const images = [imagect1el1, imagect1el2];

      for (const image of images) {
        image.material.opacity = this.elOpty;
      }

      hdtt2.material.opacity = this.hdtt2Opty;

      // this.trans1Opty;
      const imageTransI = [imagetrans1, imagetrans1v2];

      for (const image of imageTransI) {
        image.material.opacity = this.trans1Opty;
      }

      const imageTrans = [imagetrans2, imagetrans2v2, imagetrans2v3];

      for (const image of imageTrans) {
        image.material.opacity = this.el6pty;
      }

      // this.content3Opty;
      const content3 = [imagect2el2, imagect2el1];

      for (const image of content3) {
        image.material.opacity = this.content3Opty;
      }

      imagecontent3.material.opacity = this.content3v2Opty;
      imageel11stair.material.opacity = this.el11stairOrpty;
      imagegallery1.material.opacity = this.gallery1Opty;
      imagegallery2.material.opacity = this.gallery2Opty;
      imagegallery3.material.opacity = this.gallery3Opty;

      //this.imageexitOpty;
      const imageExit = [
        imageexit1,
        imageexit2,
        imageexit3,
        imageexit4,
        imageexit5,
        imageexit6,
        imageLabelExit1,
        imageexitForClick,
      ];

      for (const image of imageExit) {
        image.material.opacity = this.imageexitOpty;
      }

      // this.mockupgrass2Opty;
      const mockupGrass2 = [
        imagemockupgrass2D1,
        imagemockupgrass2D2,
        imagemockupgrass2D3,
        imagemockupgrass2D4,
      ];

      for (const image of mockupGrass2) {
        image.material.opacity = this.mockupgrass2Opty;
      }

      imageexitForClick.visible = imageexit6.material.opacity >= 1;
      imagenvi.material.opacity = this.nviOpty;
      imagenvi.visible = imageexit6.material.opacity >= 1;

      // Smoothly move the camera along the X-axis
      this.camera.position.x += (-cameraX - this.camera.position.x) * 0.05;
      this.camera.position.z += (-cameraZ - this.camera.position.z) * 0.05;
      this.camera.position.y += (-cameraY - this.camera.position.y) * 0.1;

      if (this.moveLeft || keyboard["ArrowLeft"]) {
        if (cameraX <= 0 && cameraX >= -4.5) {
          cameraX += this.speedCameraX;
          cameraZ = -3;
          if (cameraX > -2.8 && cameraX < -0.8) {
            this.hdtt2Opty -= 0.05;
            this.content1Opty += 0.05;
            this.elOpty += 0.05;
          } else if (cameraX > -0.8) {
            this.hdttOpty += 0.05;
            this.content1Opty -= 0.05;
          } else if (cameraX > -4) {
            this.el6pty -= 0.05;
          }
        } else if (
          cameraX <= -4.5 &&
          cameraX >= -8.1 &&
          cameraZ <= -1.2 &&
          cameraZ >= -3
        ) {
          cameraX += this.speedCameraX + 0.01;
          cameraZ -= 0.02;
          if (cameraX > -7) {
            this.content3Opty -= 0.02;
            this.content3v2Opty -= 0.02;
          }
        } else if (cameraX <= -8.1 && cameraX >= -11.5) {
          cameraX += this.speedCameraX;
          cameraZ = -1.2;
          cameraY = 0;
          this.content3Opty += 0.05;
          this.content3v2Opty += 0.05;
        } else if (
          cameraX <= -11.01 &&
          cameraX >= -16.5 &&
          cameraZ >= -4.1 &&
          cameraZ <= -1.1
        ) {
          cameraZ += 0.02;
          cameraX += this.speedCameraX + 0.01;
          cameraY -= 0.02;
          if (cameraZ > -3) {
            this.content3Opty += 0.025;
            this.content3v2Opty += 0.025;
          }
        } else if (
          cameraX <= -16.5 &&
          cameraX >= -24.1 &&
          cameraZ >= -4.1 &&
          cameraZ <= -4
        ) {
          cameraX += this.speedCameraX;
          cameraZ = -4;
          cameraY = 2.8;
        } else if (
          cameraX <= -24 &&
          cameraX >= -24.1 &&
          cameraZ >= -4.01 &&
          cameraZ <= 4.01
        ) {
          cameraZ -= 0.02;
          cameraX = -24;
          cameraY = 2.8;

          if (cameraZ < 0.4 && cameraZ > -2) {
            this.stairR -= 0.025;
            this.el11stairOrpty -= 0.05;
          } else if (cameraZ < 3) {
            this.stairR -= 0.025;
            this.gallery1Opty -= 0.05;
          }
        } else if (
          cameraZ >= -4.01 &&
          cameraZ <= 4.01 &&
          cameraX >= -39.01 &&
          cameraX <= -24.1
        ) {
          cameraX += this.speedCameraX;
          cameraZ = 4;
          cameraY = 2.8;
          this.imageexitOpty -= 0.05;
          if (cameraX > -31 && cameraX < -26) {
            this.gallery3Opty -= 0.05;
            this.imageexitOpty -= 0.05;
            this.mockupgrass2Opty -= 0.05;
          } else if (cameraX > -26) {
            this.gallery2Opty -= 0.05;
            this.mockupgrass2Opty -= 0.05;
          }
        } else if (
          cameraX >= -39.01 &&
          cameraX <= -39 &&
          cameraZ >= 4.01 &&
          cameraZ <= 6.02
        ) {
          this.imageexitOpty -= 0.005;
          cameraZ -= 0.02;
          cameraX = -39;
        }
      }
      if (this.moveRight || keyboard["ArrowRight"]) {
        if (cameraX <= 0 && cameraX >= -4.5) {
          cameraX -= this.speedCameraX;
          if (cameraX < -0.2 && cameraX >= -1.4) {
            this.hdttOpty -= 0.025;
            this.content1Opty += 0.05;
          } else if (cameraX <= -2 && cameraX >= -5) {
            this.hdttOpty -= 0.05;
            this.elOpty -= 0.025;
            this.content1Opty -= 0.025;
            this.hdtt2Opty += 0.05;
            this.trans1Opty += 0.05;
            if (cameraX <= -3.5) {
              this.el6pty += 0.005;
            }
          }
        } else if (cameraX <= -4.5 && cameraX >= -8 && cameraZ <= -1) {
          cameraX -= this.speedCameraX + 0.01;
          cameraZ += 0.02;
          if (cameraX < -4.5) {
            this.el6pty += 0.05;
            this.content3Opty += 0.005;
            this.content3v2Opty += 0.005;
          }
        } else if (cameraX <= -8 && cameraX >= -11) {
          cameraX -= this.speedCameraX;
          cameraZ = -1.2;
          cameraY = 0;
          if (cameraX < -8) {
            this.content3Opty += 0.05;
            this.content3v2Opty += 0.05;
          }
        } else if (
          cameraX <= -11 &&
          cameraX >= -17 &&
          cameraZ >= -4 &&
          cameraZ <= -1
        ) {
          cameraZ -= 0.02;
          cameraX -= this.speedCameraX + 0.01;
          cameraY += 0.02;
          if (cameraX < -11) {
            this.content3Opty -= 0.025;
            this.content3v2Opty -= 0.025;
          }
        } else if (cameraX <= -16 && cameraX >= -23.9) {
          cameraX -= this.speedCameraX;
          cameraZ = -4;
          cameraY = 2.8;
        } else if (
          cameraX <= -23 &&
          cameraX >= -24 &&
          cameraZ >= -4.1 &&
          cameraZ <= 4
        ) {
          cameraZ += 0.02;
          cameraX = -24;
          cameraY = 2.8;
          if (cameraZ >= -0.07) {
            this.stairR += 0.025;
            this.el11stairOrpty += 0.025;
          }
          if (cameraZ >= 2.6) {
            this.gallery1Opty += 0.05;
            this.stairR += 0.025;
          }
        } else if (
          cameraY >= 2 &&
          cameraZ >= 4 &&
          cameraX <= -24 &&
          cameraX >= -38.9
        ) {
          cameraX -= this.speedCameraX;
          cameraZ = 4;
          cameraY = 2.8;
          if (cameraX < -25) {
            this.gallery2Opty += 0.025;
          }
          if (cameraX < -30) {
            this.gallery3Opty += 0.025;
            this.mockupgrass2Opty += 0.05;
          }
        } else if (
          cameraX >= -39 &&
          cameraX <= -38 &&
          cameraZ >= 4 &&
          cameraZ <= 6
        ) {
          cameraZ += 0.02;
          cameraX = -39;

          if (cameraZ > 4) {
            this.imageexitOpty += 0.05;
          }
        }
      }

      if (cameraX >= 0) {
        cameraX = 0;
      }

      if (this.hdttOpty >= 1) {
        this.hdttOpty = 1;
      } else if (this.hdttOpty <= 0) {
        this.hdttOpty = 0;
      }

      if (this.content1Opty >= 1) {
        this.content1Opty = 1;
      } else if (this.content1Opty <= 0) {
        this.content1Opty = 0;
      }

      if (this.elOpty >= 1) {
        this.elOpty = 1;
      } else if (this.elOpty <= 0) {
        this.elOpty = 0;
      }

      if (this.hdtt2Opty >= 1) {
        this.hdtt2Opty = 1;
      } else if (this.hdtt2Opty <= 0) {
        this.hdtt2Opty = 0;
      }

      if (this.trans1Opty >= 1) {
        this.trans1Opty = 1;
      } else if (this.trans1Opty <= 0) {
        this.trans1Opty = 0;
      }

      if (this.el6pty >= 1) {
        this.el6pty = 1;
      } else if (this.el6pty <= 0) {
        this.el6pty = 0;
      }

      if (this.content3Opty >= 1) {
        this.content3Opty = 1;
      } else if (this.content3Opty <= 0) {
        this.content3Opty = 0;
      }

      if (this.el11stairOrpty >= 1) {
        this.el11stairOrpty = 1;
      } else if (this.el11stairOrpty <= 0) {
        this.el11stairOrpty = 0;
      }

      if (this.gallery1Opty >= 1) {
        this.gallery1Opty = 1;
      } else if (this.gallery1Opty <= 0) {
        this.gallery1Opty = 0;
      }

      if (this.gallery2Opty >= 1) {
        this.gallery2Opty = 1;
      } else if (this.gallery2Opty <= 0) {
        this.gallery2Opty = 0;
      }

      if (this.gallery3Opty >= 1) {
        this.gallery3Opty = 1;
      } else if (this.gallery3Opty <= 0) {
        this.gallery3Opty = 0;
      }

      if (this.content3v2Opty >= 1) {
        this.content3v2Opty = 1;
      } else if (this.content3v2Opty <= 0) {
        this.content3v2Opty = 0;
      }

      if (this.imageexitOpty >= 1) {
        this.imageexitOpty = 1;
      } else if (this.imageexitOpty <= 0) {
        this.imageexitOpty = 0;
      }

      if (this.mockupgrass2Opty >= 1) {
        this.mockupgrass2Opty = 1;
      } else if (this.mockupgrass2Opty <= 0) {
        this.mockupgrass2Opty = 0;
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
      setTimeout(() => {
        gsap.to(this.$data, {
          duration: 1,
          elOpty: 1,
          ease: "power2.out",
        });
        gsap.to(this.$data, {
          duration: 1,
          hdttOpty: 1,
          ease: "power2.out",
        });

        gsap.to(".sub-sub-container-rl", {
          duration: 1,
          opacity: 1,
          ease: "power2.out",
        });
      }, 2000);
    },
    backtoCate() {
      gsap.to(this.camera.position, {
        x: 40,
        z: -7,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
      gsap.to(this.camera.position, {
        z: -9,
        delay: 1,
        duration: 2,
        ease: "elastic.out(1, 1)",
        onComplete: () => {
          this.$router.push("/Home");
        },
      });

      gsap.to(this.$data, {
        exitdoorX: 39.93,
        duration: 2,
        ease: "elastic.out(1, 1)",
      });
    },
    PlayNavi() {
      const tl = gsap.timeline({ repeat: -1 });

      tl.to(this.$data, { duration: 2, nviOpty: 1 })
        .to(this.$data, { duration: 2, nviOpty: 1 })
        .to(this.$data, { duration: 2, nviOpty: 0 })
        .to(this.$data, { duration: 1, nviOpty: 0 });
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

.image_home {
  width: 100%;
  height: 100%;
  /* background-color: rgba(162, 0, 255, 0.521); */
}

.effect-hot-spot .home-wrap .navHP {
  cursor: pointer;
}

.home-wrap {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  /* margin: 5% 0; */
  /* background-color: rgba(182, 153, 153, 0.288); */
}
.container-rl {
  position: relative;
  width: 100%;
  height: 100%;
  /* background-color: rgba(80, 190, 47, 0.479); */
}

.no-select {
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-touch-callout: none;
  /* -webkit-tap-highlight-color: rgba(0, 0, 0, 0); */
  outline: none;
  border: none;
}

.sub-container-rl {
  position: absolute;
  height: 100%;
  width: 100%;

  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  flex-direction: column;
}
.gesture {
  height: 100%;
  width: 100%;
}
.sub-sub-container-rl {
  bottom: 0;
  position: sticky;
  position: -webkit-sticky;
  padding-right: 2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  height: 10%;
  width: 100%;
  overflow: hidden;
  opacity: 0;
}
.messagebtn {
  height: auto;
  width: 40%;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 0.9vw;
  font-family: "Prompt", sans-serif;
}
.rlbtn {
  margin-left: 3%;
  height: 100%;
  width: 12%;
  pointer-events: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  z-index: 102;
  -webkit-touch-callout: none;
  -ms-touch-action: none;
  touch-action: none;
}

.sub-rlbtn {
  position: relative;
  width: 50%;
  height: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  cursor: pointer;
}
.sub-rlbtn img {
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: scale-down;
}

.sub-rlbtn:hover {
  -webkit-filter: invert(50%); /* Safari 6.0 - 9.0 */
  filter: invert(50%);
}
</style>