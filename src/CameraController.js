import { PerspectiveCamera, OrthographicCamera, MathUtils } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
export class CameraController {
  camera2D;

  camera3D;

  viewportCamera;

  cameraMode = "3D";

  controls;

  app;

  constructor(app) {
    const { width, height } = app.renderer.domElement.getBoundingClientRect();
    const aspect = width / height;

    this.camera2D = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      1,
      1000
    );
    this.camera2D.position.set(0, 50, 0);
    // this.camera2D.lookAt(0, 0, 0);

    this.camera3D = new PerspectiveCamera(30, aspect, 1, 3000);

    this.camera3D.position.set(3, 2, 3);
    this.camera3D.lookAt(0, 0, 0);

    this.viewportCamera = this.camera3D;
    this.controls = new OrbitControls(
      this.viewportCamera,
      app.renderer.domElement
    );
    this.controls.enableDamping = true;
    this.controls.maxPolarAngle = MathUtils.degToRad(89);
    this.controls.screenSpacePanning = false;
    this.controls.update();

    this.app = app;
  }
}
