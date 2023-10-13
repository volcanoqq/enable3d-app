<script setup>
import { PhysicsLoader, THREE, Project, Scene3D } from "enable3d";
import { App } from "./app.js";
import { onMounted } from "vue";

let app;

// your demo it work
class MainScene extends Scene3D {
  async preload() {
    this.load.preload("obj2", "/model/obj2.glb");
  }

  async create() {
    this.warpSpeed();
    this.camera.position.set(2, 2, 4);
    this.physics.debug?.enable();

    {
      const obj = (await this.load.gltf("obj2")).scene;

      const box = new THREE.Box3();
      const size = new THREE.Vector3();
      const center = new THREE.Vector3();
      box.setFromObject(obj).getSize(size);
      box.setFromObject(obj).getCenter(center);

      // obj.traverse((child) => {
      //   if (child.isMesh) {
      //     child.geometry.translate(-center.x, -center.y, -center.z);
      //   }
      // });

      this.add.existing(obj);

      obj.position.set(0, 1, 0);
      obj.rotateX(Math.PI / 4);// rotation match

      this.physics.add.existing(obj, {
        shape: "box",
        width: size.x,
        height: size.y,
        depth: size.z,
        collisionFlags: 2,
      });
    }
  }
}

onMounted(() => {
  // my way, rotation mismatch
  const inited = (obj) => {
    const obj1 = obj;

    // obj1.rotateX(Math.PI / 4);//rotation mismatch
    obj1.rotateX(Math.PI / 2);//rotation mismatch

    app.PhysicsManager.createRigidBodyByObject(obj1, {
      shape: "box",
      collisionFlags: 2,
    });
  };

  PhysicsLoader("/lib/ammo/kripken", () => {
    new Project({ scenes: [MainScene], parent: "container2" });

    app = new App(
      {
        dom: document.querySelector("#container"),
        url: "/model/obj2.glb",
        background: "#eee",
      },
      inited
    );
  });
});
</script>

<template>
  <div id="container"></div>
  <div id="container2"></div>
</template>

<style>
#app {
  height: 100%;
  display: flex;
}
#container {
  flex: 0 0 50%;
  height: 100%;
}
#container2 {
  flex: 0 0 50%;
  height: 100%;
  overflow: hidden;
}
</style>
