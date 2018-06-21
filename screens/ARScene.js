import React from 'react';
import { View, Text, Image } from 'react-native';
import { AR, Asset, Location, Permissions } from 'expo';
// Let's alias ExpoTHREE.AR as ThreeAR so it doesn't collide with Expo.AR.
import { Button } from 'native-base';
import ExpoTHREE, { AR as ThreeAR, THREE } from 'expo-three';
// Let's also import `expo-graphics`
// expo-graphics manages the setup/teardown of the gl context/ar session, creates a frame-loop, and observes size/orientation changes.
// it also provides debug information with `isArCameraStateEnabled`
import { View as GraphicsView, ARRunningState } from 'expo-graphics';
// import { _throwIfAudioIsDisabled } from 'expo/src/av/Audio';

import io from 'socket.io-client';

const host = 'https://ar-shooter-server.herokuapp.com/';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.socket = io(host);
    this.socket.on('connect', () => {});
  }
  componentDidMount() {
    // Turn off extra warnings
    THREE.suppressExpoWarnings(true);
    ThreeAR.suppressWarnings();
  }

  render() {
    // You need to add the `isArEnabled` & `arTrackingConfiguration` props.
    // `isArRunningStateEnabled` Will show us the play/pause button in the corner.
    // `isArCameraStateEnabled` Will render the camera tracking information on the screen.
    // `arTrackingConfiguration` denotes which camera the AR Session will use.
    // World for rear, Face for front (iPhone X only)
    return (
      <View style={{ flex: 1 }}>
        <GraphicsView
          style={{ flex: 5 }}
          onContextCreate={this.onContextCreate}
          onRender={this.onRender}
          onResize={this.onResize}
          isArEnabled
          // isArRunningStateEnabled
          isArCameraStateEnabled
          arTrackingConfiguration={AR.TrackingConfigurations.World}
        />

        <Button onPress={this.showPosition} full light>
          <Text> Shoot </Text>
        </Button>
      </View>
    );
  }

  // When our context is built we can start coding 3D things.
  onContextCreate = async ({ gl, scale: pixelRatio, width, height }) => {
    // This will allow ARKit to collect Horizontal surfaces
    AR.setPlaneDetection(AR.PlaneDetectionTypes.Horizontal);

    // Create a 3D renderer
    this.renderer = new ExpoTHREE.Renderer({
      gl,
      pixelRatio,
      width,
      height
    });

    // We will add all of our meshes to this scene.
    this.scene = new THREE.Scene();
    // This will create a camera texture and use it as the background for our scene
    this.scene.background = new ThreeAR.BackgroundTexture(this.renderer);
    // Now we make a camera that matches the device orientation.
    // Ex: When we look down this camera will rotate to look down too!

    this.camera = new ThreeAR.Camera(width, height, 0.01, 1000);

    var x = 0.01;
    var y = 0.01;
    const crossHairGeometry = new THREE.Geometry();
    const crossHairMaterial = new THREE.LineBasicMaterial({ color: 0xaaffaa });

    crossHairGeometry.vertices.push(new THREE.Vector3(0, y, 0));
    crossHairGeometry.vertices.push(new THREE.Vector3(0, -y, 0));
    crossHairGeometry.vertices.push(new THREE.Vector3(0, 0, 0));
    crossHairGeometry.vertices.push(new THREE.Vector3(x, 0, 0));
    crossHairGeometry.vertices.push(new THREE.Vector3(-x, 0, 0));

    this.crosshair = new THREE.Line(crossHairGeometry, crossHairMaterial);

    // place it in the center
    var crosshairPercentX = 50;
    var crosshairPercentY = 50;
    var crosshairPositionX = (crosshairPercentX / 100) * 2 - 1;
    var crosshairPositionY = (crosshairPercentY / 100) * 2 - 1;

    this.crosshair.position.x = crosshairPositionX * this.camera.aspect;
    this.crosshair.position.y = crosshairPositionY;

    this.crosshair.position.z = -0.3;
    this.scene.add(this.crosshair);
    //CUBE
    // Simple color material
    // Make a cube - notice that each unit is 1 meter in real life, we will make our box 0.1 meters
    const geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);

    const material = new THREE.MeshPhongMaterial({
      color: 0xff00ff
    });

    // Combine our geometry and material
    this.cube = new THREE.Mesh(geometry, material);

    this.cube.position.z = -1;
    this.cube.position.x = 1;
    // Add the cube to the scene
    this.scene.add(this.cube);

    // Setup a light so we can see the cube color
    // AmbientLight colors all things in the scene equally.
    this.scene.add(new THREE.AmbientLight(0xffffff));

    // Create this cool utility function that let's us see all the raw data points.
    this.points = new ThreeAR.Points();
    // Add the points to our scene...
    this.scene.add(this.points);
  };

  // When the phone rotates, or the view changes size, this method will be called.
  onResize = ({ x, y, scale, width, height }) => {
    // Let's stop the function if we haven't setup our scene yet
    if (!this.renderer) {
      return;
    }
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(scale);
    this.renderer.setSize(width, height);
  };

  // Called every frame.
  onRender = async () => {
    // This will make the points get more rawDataPoints from Expo.AR
    this.points.update();
    // Finally render the scene with the AR Camera
    this.cube.rotation.x += 0.07;
    this.cube.rotation.y += 0.04;
    this.renderer.render(this.scene, this.camera);
  };

  showPosition = () => {
    let aim = new THREE.Vector3();
    let position = new THREE.Vector3();
    // current position
    this.camera.getWorldPosition(position);
    // current direction
    this.camera.getWorldDirection(aim);
    // Assuming player2 is at position (1, -1), (x, z)
    // Player one facing negative z axis.
    // flip z axis sign for player facing positive z axis.
    // player2x - player1x
    let x = 1 - position.x;
    // player1z - player2z
    let z = position.z + 1;
    // angle needed to hit.
    let thetaNeeded = Math.atan(x / z);
    // actual viewing angle.
    let theta = Math.atan(aim.x / aim.z); // positive if on other side of z axis.
    if (aim.z < 0) theta *= -1;
    console.log('theta needed: ', THREE.Math.radToDeg(thetaNeeded));
    console.log('current theta: ', THREE.Math.radToDeg(theta));
    // pythagorean thm.
    let magnitude = Math.sqrt(
      Math.pow(1 - position.x, 2) + Math.pow(position.z + 1, 2)
    );
    // xsin(theta)
    let vx = Math.sin(theta) * magnitude;
    // zcos(theta)
    let vz = Math.cos(theta) * magnitude; // positive if on other side of z axis.
    if (aim.z < 0) vz *= -1;
    // given theta and origin => destination.
    const destination = {
      x: position.x + vx,
      z: position.z + vz
    };
    console.log(`destination: (${destination.x}, ${destination.z})`);
    // let bufferTheta = Math.abs(theta - thetaNeeded);
    let bufferX = Math.abs(1 - destination.x);
    let bufferZ = Math.abs(destination.z + 1);
    // console.log('bufferTheta: ', bufferTheta);
    console.log('bufferX: ', bufferX);
    console.log('bufferZ: ', bufferZ);
    if (/*bufferTheta < 0.1 && */ bufferX < 0.05 && bufferZ < 0.05)
      console.log('HIT!!!!');
    else console.log('miss....');
    this.socket.emit('position', { position, aim });
  };
}
