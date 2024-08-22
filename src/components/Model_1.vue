<script setup lang="ts">
import { TresCanvas, TresInstance } from "@tresjs/core";
import { OrbitControls } from "@tresjs/cientos";
import { useLoader } from "@tresjs/core";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader";
import GLTF from "three/examples/jsm/loaders/GLTFLoader";
//@ts-ignore
import { clone } from "three/examples/jsm/utils/SkeletonUtils";
import { nextTick, onMounted, shallowRef, ShallowRef, ref } from "vue";
import { gsap } from "gsap";

const BottleTopRightRef: ShallowRef<TresInstance | null> = shallowRef(null);
  const BottleBottomRightRef: ShallowRef<TresInstance | null> = shallowRef(null);
    const BottleTopMiddleRef: ShallowRef<TresInstance | null> = shallowRef(null);
      const BottleBottomMiddleRef: ShallowRef<TresInstance | null> = shallowRef(null);
        const BottleTopLeftRef: ShallowRef<TresInstance | null> = shallowRef(null);
          const BottleBottomLeftRef: ShallowRef<TresInstance | null> = shallowRef(null);
const isAnimating = ref(false); // Flag to track if the animation is ongoing

// Load the GLTF model
const { scene } = await useLoader<GLTF>(GLTFLoader, "VLaB_7.glb");

// Function to create clones of the model
const createClones = (scene: any, count: number) => {
  const clones = [];
  for (let i = 0; i < count; i++) {
    clones.push(clone(scene));
  }
  return clones;
};

// Create six clones of the model
const bottleClones = createClones(scene, 6);

onMounted(() => {
  nextTick(() => {
    console.log("loaded?", BottleTopRightRef.value !== null);
  });
});

function PE_record(bottle: TresInstance | null) {
  if (!isAnimating.value && bottle) {
    isAnimating.value = true; // Set the flag to true to prevent re-triggering during animation

    // Rotate the bottle by 45 degrees
    gsap.to(bottle.rotation, {
      y: bottle.rotation.y + Math.PI / 1, // 180 degrees in radians
      duration: 1, // Duration of the animation in seconds
      ease: "power2.inOut", // Easing function
      onComplete: () => {
        // Pause for 1 second before returning to the original position
        gsap.to(
          {},
          {
            duration: 1,
            onComplete: () => {
              gsap.to(bottle.rotation, {
                y: bottle.rotation.y - Math.PI * Math.random(), // Reverse the rotation
                duration: 1, // Duration of the return animation
                ease: "power2.inOut",
                onComplete: () => {
                  isAnimating.value = false; // Reset the flag after the animation is complete
                },
              });
            },
          }
        );
      },
    });
  }
}
</script>

<template>
  <!-- Header -->
    <header>
      <!-- Header content goes here -->
    </header>

    <!-- Main Content -->
    <main>
      <div class="leftMain">
        <TresCanvas >
    <TresPerspectiveCamera :position="[0, 0, 3]" :look-at="[0, 0, 0]" />
    <OrbitControls />

    <!-- <TresAmbientLight :intensity="1" /> -->
    <TresDirectionalLight cast-shadow :position="[0, 2, 4]" :intensity="1" />

    <!-- Bottle top right -->
    <primitive
      ref="BottleTopRightRef"
      :object="bottleClones[0]"
      :position="[-0.55, 0.17, -1.0]"
      :scale="1.55"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleTopRightRef)"
    />

    <!-- Bottle bottom right -->
    <primitive
      ref="BottleBottomRightRef"
      :object="bottleClones[1]"
      :position="[-0.21, -0.5, -0.5]"
      :scale="1.35"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleBottomRightRef)"
    />

    <!-- Bottle top middle -->
    <primitive
    ref="BottleTopMiddleRef"
      :object="bottleClones[2]"
      :position="[-1.15, 0.17, -1.0]"
      :scale="1.55"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleTopMiddleRef)"
    />

    <!-- Bottle bottom middle -->
    <primitive
    ref="BottleBottomMiddleRef"
      :object="bottleClones[3]"
      :position="[-0.72, -0.5, -0.5]"
      :scale="1.35"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleBottomMiddleRef)"
    />

    <!-- Bottle top left -->
    <primitive
    ref="BottleTopLeftRef"
      :object="bottleClones[4]"
      :position="[-1.7, 0.17, -1.0]"
      :scale="1.55"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleTopLeftRef)"
    />

    <!-- Bottle bottom left -->
    <primitive
    ref="BottleBottomLeftRef"
      :object="bottleClones[5]"
      :position="[-1.25, -0.5, -0.5]"
      :scale="1.35"
      :rotation="[Math.PI / 48, 0, 0]"
      @pointer-enter="PE_record(BottleBottomLeftRef)"
    />
    <TresDirectionalLight cast-shadow :position="[0, 2, 4]" :intensity="0.5" />
  </TresCanvas>

      </div>
      <div class="rightMain">
        <div class="warningMessage"><h1>Display site only, non-clickable links</h1></div>
      </div>
    </main>

    <!-- Footer -->
    <footer>
      <!-- Footer content goes here -->
    </footer>
  </template>

<style scoped>


header {
  flex: 0 0 auto;
  /* Add other styles for the header */
  
  height: 14vh;
  width: 100vw;
  background-image: url("/public/Header-strap.png");
  background-size: cover;
}

main {
  flex: 1;
  display: flex;
  /* Add other styles for the main content */
  
  height: fit-content;
  width: 100vw;
}

.leftMain {
  flex: 1;
  /* Add other styles for the leftMain div */
  
  height: 80vh;
  width: 50vw;
}

.rightMain {
  flex: 1;
  /* Add other styles for the rightMain div */
  
  height: 80vh;
  width: 50vw;
  background-image: url("/public/right_main_image.png");
  background-size: cover;
}

footer {
  flex: 0 0 auto;
  /* Add other styles for the footer */
  border: 2px rgb(255, 251, 0) solid;
  height: 10vh;
  width: 100vw;
  background-image: url("/public/footer_image.png");
  background-size: cover;
}

.warningMessage {
  position: relative;
  top: 50%;
  left: 0%;
  width: 30vw;
  background-color: cadetblue;
  height: 20vh;
  border: 2px purple solid;
  transform: rotate(45deg);
}
</style>
