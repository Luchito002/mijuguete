import './App.css'
import * as THREE from "three"
import { useEffect } from "react";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

function App() {
  let model: THREE.Group;

  useEffect(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    // scene
    const scene: THREE.Scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      1000
    );
    camera.position.set(0, 4, 0); // Move camera further back for better view

    // renderer
    const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
    });

    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(window.devicePixelRatio);


    //3dモデルのインポート
    const gltfLoader = new GLTFLoader();

    gltfLoader.load("./models/scene.gltf", (gltf) => {
      model = gltf.scene;
      model.scale.set(0.01, 0.01, 0.01);
      model.rotation.y = Math.PI / 10;
      
      scene.add(model);
    });

    //アニメーション
    const tick = () => {
      if (model && camera) {
        const speed = 0.0001; 
        const radius = 5;
        const angle = Date.now() * speed;
        camera.position.x = Math.sin(angle) * radius;
        camera.position.z = Math.cos(angle) * radius;
        camera.lookAt(model.position);
      }
      
      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    tick();

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
      renderer.setPixelRatio(window.devicePixelRatio);
    })
  }, []);

  return (
    <>
      <canvas id="canvas"></canvas>
      <div className="mainContent">
        <h2 className="neonText">MI JUGUETE FAVORITO</h2>
        <h1 className="neonText">¡¡GODZILLA!!</h1>
      </div>

      <div className="backgroundGradientPink"></div>
      <div className="backgroundGradientBlue"></div>
    </>
  )
}

export default App;
