<script setup>
import { PhysicsLoader, THREE } from "enable3d";
import { AmmoPhysics } from "@enable3d/ammo-physics";
import { App } from "./app.js";
import { onMounted } from "vue";

onMounted(() => {
  const inited = (gltf) => {
    const obj1 = gltf.scene;

    obj1.position.set(0, 0.5, 0);
    obj1.rotateX(Math.PI / 2);

    app.PhysicsManager.createRigidBodyByObject(obj1, {
      shape: "box",
      collisionFlags: 2,
    });
  };
  const app = new App(
    {
      dom: document.querySelector("#container"),
      url: "/model/obj2.glb",
      background: "#eee",
    },
    inited
  );
});
</script>

<template>
  <div id="container"></div>
</template>

<style>
#app {
  height: 100%;
}
#container {
  height: 100%;
}
</style>
