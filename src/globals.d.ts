// src/globals.d.ts
declare module "three/examples/jsm/loaders/GLTFLoader" {
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  export default GLTFLoader;
}

declare module "three/examples/jsm/loaders/DRACOLoader" {
  import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";
  export default DRACOLoader;
}

declare module "three/addons/loaders/GLTFLoader" {
  import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
  export { GLTFLoader };
}