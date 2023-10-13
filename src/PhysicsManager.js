// import { PhysicsLoader } from "enable3d";
import { AmmoPhysics } from "@enable3d/ammo-physics";
import * as THREE from "three";
export class PhysicsManager {
  constructor(app) {
    this.physics = new AmmoPhysics(app.scene);
    this.physics.debug.enable(true);
  }

  createRigidBodyByObject(object, options = {}) {
    const box = new THREE.Box3();
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.setFromObject(object).getSize(size);
    box.setFromObject(object).getCenter(center);

    this.physics.add.existing(object, {
      width: size.x,
      height: size.y,
      depth: size.z,
      ...options,
    });
  }

  update(delta) {
    this.physics.update(delta * 1000);
    this.physics.updateDebugger();
  }
}
