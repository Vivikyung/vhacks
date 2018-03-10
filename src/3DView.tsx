import * as BABYLON from 'babylonjs'
import { observer } from 'mobx-react'
import * as React from 'react'
import AppState from './AppState'
import { autorun } from 'mobx';

@observer
export default class View3D extends React.Component<{ appState: AppState }, {}> {
  private _canvas: HTMLCanvasElement;
  private _engine: BABYLON.Engine;
  private _scene: BABYLON.Scene;
  private _camera: BABYLON.FreeCamera;
  private _light: BABYLON.Light;
  private _videoPlane: BABYLON.Mesh;
  private _vrHelper: BABYLON.VRExperienceHelper;

  private _planeLeft: BABYLON.Mesh;
  private _planeRight: BABYLON.Mesh;
  private _planeBack: BABYLON.Mesh;
  private _planeTop: BABYLON.Mesh;

  componentDidMount() {
    this._canvas = this.refs.canvasRef as HTMLCanvasElement;
    this._engine = new BABYLON.Engine(this._canvas, true);
    this.create();
    this.doRender();
  }

  create() {
    this._scene = new BABYLON.Scene(this._engine);
    this._vrHelper = this._scene.createDefaultVRExperience({
      createDeviceOrientationCamera: true,
      createFallbackVRDeviceOrientationFreeCamera: true
    });

    let baseSize = 30;

    this._camera = new BABYLON.FreeCamera('camera1', new BABYLON.Vector3(0, baseSize, -baseSize / 3), this._scene);
    this._camera.setTarget(new BABYLON.Vector3(0, baseSize * 2, 0))

    this._camera.attachControl(this._canvas, false);

    this._light = new BABYLON.HemisphericLight('light1', new BABYLON.Vector3(0, 1, 0), this._scene);
    let ground = BABYLON.MeshBuilder.CreateGround('ground',
      { width: baseSize, height: baseSize, subdivisions: 10 }, this._scene);
    this._vrHelper.enableTeleportation({ floorMeshName: "ground" });

    this._videoPlane = BABYLON.MeshBuilder.CreatePlane("videoPlane", { width: baseSize, height: baseSize }, this._scene);
    this._videoPlane.position = new BABYLON.Vector3(0, baseSize / 2, baseSize / 2)
    var myMaterial = new BABYLON.StandardMaterial("videoMaterial", this._scene);
    //myMaterial.diffuseColor = BABYLON.Color3.Red();
    this._videoPlane.material = myMaterial;

    this._planeLeft = BABYLON.MeshBuilder.CreatePlane("planeLeft", { width: baseSize, height: baseSize }, this._scene);
    this._planeLeft.position = new BABYLON.Vector3(-baseSize / 2, baseSize / 2, 0)
    this._planeLeft.rotate(BABYLON.Axis.Y, -Math.PI / 2)
    var leftMaterial = new BABYLON.StandardMaterial("leftMaterial", this._scene);
    leftMaterial.diffuseColor = BABYLON.Color3.Green();
    this._planeLeft.material = leftMaterial;

    this._planeRight = BABYLON.MeshBuilder.CreatePlane("planeRight", { width: baseSize, height: baseSize }, this._scene);
    this._planeRight.position = new BABYLON.Vector3(baseSize / 2, baseSize / 2, 0)
    this._planeRight.rotate(BABYLON.Axis.Y, Math.PI / 2)
    var rightMaterial = new BABYLON.StandardMaterial("rightMaterial", this._scene);
    rightMaterial.diffuseColor = BABYLON.Color3.Red();
    this._planeRight.material = rightMaterial;

    this._planeBack = BABYLON.MeshBuilder.CreatePlane("planeBack", { width: baseSize, height: baseSize }, this._scene);
    this._planeBack.position = new BABYLON.Vector3(0, baseSize / 2, -baseSize / 2)
    this._planeBack.rotate(BABYLON.Axis.Y, Math.PI)
    var backMaterial = new BABYLON.StandardMaterial("backMaterial", this._scene);
    backMaterial.diffuseColor = BABYLON.Color3.Blue();
    this._planeBack.material = backMaterial;

    this._planeTop = BABYLON.MeshBuilder.CreatePlane("planeTop", { width: baseSize, height: baseSize }, this._scene);
    this._planeTop.position = new BABYLON.Vector3(0, baseSize, 0)
    this._planeTop.rotate(BABYLON.Axis.X, -Math.PI / 2)
    var topMaterial = new BABYLON.StandardMaterial("topMaterial", this._scene);
    topMaterial.diffuseColor = BABYLON.Color3.Yellow();
    this._planeTop.material = topMaterial;

    autorun(() => {
      if (this.props.appState.videoElement)
        (this._videoPlane.material as BABYLON.StandardMaterial).diffuseTexture = new BABYLON.VideoTexture('vidtex', this.props.appState.videoElement, this._scene);
      console.log("updated tex")
    })
  }

  doRender() {
    this._engine.runRenderLoop(() => {
      this._scene.render();
    });
  }

  render() {
    return <canvas style={{ width: "100%", height: "100%" }} ref='canvasRef' />
  }
}