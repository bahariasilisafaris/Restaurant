import { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Sparkles, 
  Rotate3d, 
  Layers, 
  Sun, 
  Flame, 
  Moon, 
  Maximize2, 
  ChevronUp, 
  ChevronDown, 
  UtensilsCrossed, 
  Wine, 
  Coffee 
} from 'lucide-react';

export type DishId = 'wagyu' | 'cocktail' | 'dessert';
export type LightingMood = 'candlelight' | 'studio' | 'sunset';

interface FoodStage3DProps {
  scrollProgress: number; // 0.0 to 1.0
  activeSection: string;
  onSelectDishForReservation?: (dishName: string) => void;
}

export default function FoodStage3D({
  scrollProgress,
  activeSection,
  onSelectDishForReservation
}: FoodStage3DProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<DishId>('wagyu');
  const [isExploded, setIsExploded] = useState(false);
  const [lightingMood, setLightingMood] = useState<LightingMood>('candlelight');
  const [isInteractive, setIsInteractive] = useState(false);
  const [isDockCollapsed, setIsDockCollapsed] = useState(false);
  const [rotationSpeed, setRotationSpeed] = useState(1); // 0 = paused, 1 = normal, 2 = fast

  // Internal Three.js state references
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    controls: OrbitControls | null;
    dishGroups: Record<DishId, THREE.Group>;
    activeDishGroup: THREE.Group | null;
    lights: {
      keyLight: THREE.DirectionalLight | null;
      fillLight: THREE.DirectionalLight | null;
      rimLight: THREE.PointLight | null;
      hemiLight: THREE.HemisphereLight | null;
      candlePoint: THREE.PointLight | null;
    };
    animFrameId: number;
    clock: THREE.Clock;
    isSoftwareGl: boolean;
    scrollProgress: number;
    isExploded: boolean;
    lightingMood: LightingMood;
    rotationSpeed: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    controls: null,
    dishGroups: {} as Record<DishId, THREE.Group>,
    activeDishGroup: null,
    lights: {
      keyLight: null,
      fillLight: null,
      rimLight: null,
      hemiLight: null,
      candlePoint: null,
    },
    animFrameId: 0,
    clock: new THREE.Clock(),
    isSoftwareGl: false,
    scrollProgress: 0,
    isExploded: false,
    lightingMood: 'candlelight',
    rotationSpeed: 1,
  });

  // Keep stateRef synced with React state
  useEffect(() => {
    stateRef.current.scrollProgress = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    stateRef.current.isExploded = isExploded;
  }, [isExploded]);

  useEffect(() => {
    stateRef.current.lightingMood = lightingMood;
    updateLighting(lightingMood);
  }, [lightingMood]);

  useEffect(() => {
    stateRef.current.rotationSpeed = rotationSpeed;
  }, [rotationSpeed]);

  // Switch dish model in Three.js scene
  useEffect(() => {
    const { dishGroups, scene } = stateRef.current;
    if (!scene) return;

    Object.entries(dishGroups).forEach(([id, group]) => {
      group.visible = id === selectedDish;
      if (id === selectedDish) {
        stateRef.current.activeDishGroup = group;
        group.position.y = 0;
        group.scale.setScalar(1);
      }
    });
  }, [selectedDish]);

  // Update lighting preset
  const updateLighting = useCallback((mood: LightingMood) => {
    const { lights } = stateRef.current;
    if (!lights.keyLight || !lights.fillLight || !lights.hemiLight || !lights.candlePoint) return;

    if (mood === 'candlelight') {
      lights.keyLight.color.setHex(0xffb366);
      lights.keyLight.intensity = 2.2;
      lights.fillLight.color.setHex(0x664422);
      lights.fillLight.intensity = 0.8;
      lights.hemiLight.color.setHex(0xffe0b2);
      lights.hemiLight.groundColor.setHex(0x1a0d00);
      lights.hemiLight.intensity = 0.9;
      lights.candlePoint.color.setHex(0xffaa44);
      lights.candlePoint.intensity = 3.5;
    } else if (mood === 'studio') {
      lights.keyLight.color.setHex(0xffffff);
      lights.keyLight.intensity = 2.8;
      lights.fillLight.color.setHex(0xd0e0ff);
      lights.fillLight.intensity = 1.4;
      lights.hemiLight.color.setHex(0xffffff);
      lights.hemiLight.groundColor.setHex(0x222222);
      lights.hemiLight.intensity = 1.2;
      lights.candlePoint.color.setHex(0xffeedd);
      lights.candlePoint.intensity = 1.5;
    } else if (mood === 'sunset') {
      lights.keyLight.color.setHex(0xff7733);
      lights.keyLight.intensity = 3.0;
      lights.fillLight.color.setHex(0x993355);
      lights.fillLight.intensity = 1.2;
      lights.hemiLight.color.setHex(0xffbb77);
      lights.hemiLight.groundColor.setHex(0x1a0a1a);
      lights.hemiLight.intensity = 1.0;
      lights.candlePoint.color.setHex(0xff8833);
      lights.candlePoint.intensity = 3.8;
    }
  }, []);

  // Initialize Three.js scene once
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // 1. Detect software WebGL
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return false;
      }
    })();
    stateRef.current.isSoftwareGl = isSoftwareGl;

    // 2. Setup Scene & Camera
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x08090a, 0.05);
    stateRef.current.scene = scene;

    const width = container.clientWidth;
    const height = container.clientHeight;
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 1.8, 4.4);
    stateRef.current.camera = camera;

    // 3. Renderer with ACESFilmicToneMapping & SRGBColorSpace
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // 4. Studio Environment via PMREMGenerator & RoomEnvironment
    try {
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
      pmremGenerator.dispose();
    } catch {
      // Graceful fallback if PMREM environment fails
    }

    // 5. Studio 3-Point Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xffe0b2, 0x110800, 1.0);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffb366, 2.4);
    keyLight.position.set(3, 5, 3);
    keyLight.castShadow = !isSoftwareGl;
    if (keyLight.castShadow) {
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      keyLight.shadow.camera.near = 0.5;
      keyLight.shadow.camera.far = 12;
      keyLight.shadow.camera.left = -2.5;
      keyLight.shadow.camera.right = 2.5;
      keyLight.shadow.camera.top = 2.5;
      keyLight.shadow.camera.bottom = -2.5;
      keyLight.shadow.bias = -0.0005;
      keyLight.shadow.normalBias = 0.02;
    }
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x664422, 0.9);
    fillLight.position.set(-3, 3, -2);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xd4af37, 2.2, 8);
    rimLight.position.set(0, 3, -3);
    scene.add(rimLight);

    const candlePoint = new THREE.PointLight(0xffaa44, 3.5, 6, 1.5);
    candlePoint.position.set(1.5, 1.0, 1.5);
    scene.add(candlePoint);

    stateRef.current.lights = { keyLight, fillLight, rimLight, hemiLight, candlePoint };

    // 6. Contact Shadow Disc beneath models
    const shadowGeo = new THREE.PlaneGeometry(3.6, 3.6);
    // Procedural radial shadow canvas texture
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const grad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    grad.addColorStop(0, 'rgba(0,0,0,0.85)');
    grad.addColorStop(0.35, 'rgba(0,0,0,0.55)');
    grad.addColorStop(0.7, 'rgba(0,0,0,0.18)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    sCtx.fillStyle = grad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    shadowTex.colorSpace = THREE.SRGBColorSpace;
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.75,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.y = -0.65;
    scene.add(shadowMesh);

    // 7. Orbit Controls for Interactive mode
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = !isSoftwareGl;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.05; // Don't go below ground
    controls.minDistance = 2.0;
    controls.maxDistance = 6.5;
    controls.target.set(0, 0, 0);
    controls.enabled = false; // Enabled only when user toggles 3D inspection
    stateRef.current.controls = controls;

    // -------------------------------------------------------------
    // BUILD 3 COMPOSITE PROCEDURAL DISH MODELS (Groups of 3-12 parts)
    // -------------------------------------------------------------

    // Helper: Procedural seared Wagyu meat texture
    const meatCanvas = document.createElement('canvas');
    meatCanvas.width = 512;
    meatCanvas.height = 512;
    const mCtx = meatCanvas.getContext('2d')!;
    mCtx.fillStyle = '#6b1c1c'; // Deep cooked interior red
    mCtx.fillRect(0, 0, 512, 512);
    // Wagyu marbling streaks
    mCtx.fillStyle = '#d99494';
    for (let i = 0; i < 40; i++) {
      mCtx.fillRect(Math.random() * 512, Math.random() * 512, Math.random() * 80 + 10, 2);
    }
    // Charred crust streaks
    mCtx.fillStyle = '#1a0c08';
    for (let i = 0; i < 18; i++) {
      mCtx.fillRect(0, i * 28 + Math.random() * 5, 512, 7);
    }
    const meatTex = new THREE.CanvasTexture(meatCanvas);
    meatTex.colorSpace = THREE.SRGBColorSpace;
    meatTex.anisotropy = renderer.capabilities.getMaxAnisotropy();

    // Helper: Procedural slate plate texture
    const slateCanvas = document.createElement('canvas');
    slateCanvas.width = 512;
    slateCanvas.height = 512;
    const slCtx = slateCanvas.getContext('2d')!;
    slCtx.fillStyle = '#151618';
    slCtx.fillRect(0, 0, 512, 512);
    // Subtle mineral flecks
    for (let i = 0; i < 300; i++) {
      slCtx.fillStyle = Math.random() > 0.5 ? '#24272c' : '#0e0f11';
      slCtx.beginPath();
      slCtx.arc(Math.random() * 512, Math.random() * 512, Math.random() * 3 + 1, 0, Math.PI * 2);
      slCtx.fill();
    }
    const slateTex = new THREE.CanvasTexture(slateCanvas);
    slateTex.colorSpace = THREE.SRGBColorSpace;

    // Helper: Procedural marble texture
    const marbleCanvas = document.createElement('canvas');
    marbleCanvas.width = 512;
    marbleCanvas.height = 512;
    const mbCtx = marbleCanvas.getContext('2d')!;
    mbCtx.fillStyle = '#e8eaed';
    mbCtx.fillRect(0, 0, 512, 512);
    mbCtx.strokeStyle = 'rgba(100, 110, 125, 0.4)';
    mbCtx.lineWidth = 3;
    for (let i = 0; i < 6; i++) {
      mbCtx.beginPath();
      mbCtx.moveTo(0, Math.random() * 512);
      mbCtx.bezierCurveTo(
        Math.random() * 256, Math.random() * 512,
        Math.random() * 384, Math.random() * 512,
        512, Math.random() * 512
      );
      mbCtx.stroke();
    }
    const marbleTex = new THREE.CanvasTexture(marbleCanvas);
    marbleTex.colorSpace = THREE.SRGBColorSpace;

    // --- DISH 1: A5 Miyazaki Wagyu & Truffle Gastronomy ---
    const wagyuGroup = new THREE.Group();
    wagyuGroup.name = 'wagyu-dish';

    // 1. Stoneware Plate Base
    const plateGeo = new THREE.CylinderGeometry(1.65, 1.5, 0.12, 48);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x181a1d,
      map: slateTex,
      roughness: 0.75,
      metalness: 0.1,
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.y = -0.55;
    plate.receiveShadow = !isSoftwareGl;
    wagyuGroup.add(plate);

    // 2. Satin Gold Outer Rim Lip
    const rimGeo = new THREE.TorusGeometry(1.66, 0.024, 16, 64);
    const rimMat = new THREE.MeshPhysicalMaterial({
      color: 0xd4af37,
      metalness: 0.95,
      roughness: 0.22,
      clearcoat: 0.8,
    });
    const rim = new THREE.Mesh(rimGeo, rimMat);
    rim.rotation.x = Math.PI / 2;
    rim.position.y = -0.49;
    wagyuGroup.add(rim);

    // 3. Velvety Parsnip Puree Swoosh
    const pureeGeo = new THREE.CylinderGeometry(1.05, 1.15, 0.04, 32);
    const pureeMat = new THREE.MeshStandardMaterial({
      color: 0xf4ecd8,
      roughness: 0.45,
      metalness: 0.05,
    });
    const puree = new THREE.Mesh(pureeGeo, pureeMat);
    puree.position.set(0, -0.47, 0);
    puree.userData = { explodeOffset: 0.08 };
    wagyuGroup.add(puree);

    // 4. Glossy Truffle Demi-Glace Pool
    const sauceGeo = new THREE.CylinderGeometry(0.85, 0.9, 0.03, 32);
    const sauceMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f0b07,
      roughness: 0.06,
      metalness: 0.1,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const sauce = new THREE.Mesh(sauceGeo, sauceMat);
    sauce.position.set(0.05, -0.44, 0.02);
    sauce.userData = { explodeOffset: 0.15 };
    wagyuGroup.add(sauce);

    // 5. Seared A5 Wagyu Tenderloin Steak Cutlet
    // Beveled rectangular shape
    const wagyuMeshGeo = new THREE.BoxGeometry(0.9, 0.42, 0.65, 4, 4, 4);
    // Smooth corners
    const pos = wagyuMeshGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const len = Math.sqrt(x * x + z * z);
      if (len > 0.4) {
        pos.setX(i, x * 0.95);
        pos.setZ(i, z * 0.95);
      }
    }
    wagyuMeshGeo.computeVertexNormals();

    const wagyuMat = new THREE.MeshStandardMaterial({
      map: meatTex,
      roughness: 0.35,
      metalness: 0.15,
    });
    const wagyuSteak = new THREE.Mesh(wagyuMeshGeo, wagyuMat);
    wagyuSteak.position.set(0, -0.22, 0);
    wagyuSteak.castShadow = !isSoftwareGl;
    wagyuSteak.userData = { explodeOffset: 0.35 };
    wagyuGroup.add(wagyuSteak);

    // 6. Glazed Morel Mushrooms (3 parts)
    const morelMat = new THREE.MeshStandardMaterial({
      color: 0x2b1d14,
      roughness: 0.5,
      metalness: 0.1,
    });
    const morelOffsets = [
      { x: -0.55, z: 0.28, rot: 0.3 },
      { x: 0.52, z: 0.25, rot: -0.4 },
      { x: 0.35, z: -0.35, rot: 0.7 },
    ];
    morelOffsets.forEach((off, idx) => {
      const morelGroup = new THREE.Group();
      const capGeo = new THREE.ConeGeometry(0.12, 0.28, 12);
      const stemGeo = new THREE.CylinderGeometry(0.05, 0.07, 0.14, 10);
      const cap = new THREE.Mesh(capGeo, morelMat);
      cap.position.y = 0.14;
      const stem = new THREE.Mesh(stemGeo, pureeMat);
      morelGroup.add(cap);
      morelGroup.add(stem);
      morelGroup.position.set(off.x, -0.38, off.z);
      morelGroup.rotation.z = off.rot;
      morelGroup.userData = { explodeOffset: 0.25 + idx * 0.05 };
      wagyuGroup.add(morelGroup);
    });

    // 7. 24-Karat Floating Gold Leaf Flakes
    const goldMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      metalness: 0.98,
      roughness: 0.1,
      clearcoat: 1.0,
      side: THREE.DoubleSide,
    });
    const goldFlakesGroup = new THREE.Group();
    goldFlakesGroup.userData = { explodeOffset: 0.55 };
    for (let i = 0; i < 7; i++) {
      const flakeGeo = new THREE.PlaneGeometry(0.08, 0.08);
      const flake = new THREE.Mesh(flakeGeo, goldMat);
      flake.position.set(
        (Math.random() - 0.5) * 0.45,
        0.02 + Math.random() * 0.06,
        (Math.random() - 0.5) * 0.35
      );
      flake.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      goldFlakesGroup.add(flake);
    }
    goldFlakesGroup.position.set(0, 0.02, 0);
    wagyuGroup.add(goldFlakesGroup);

    // 8. Delicate Micro-Greens and edible flowers
    const herbMat = new THREE.MeshStandardMaterial({
      color: 0x3d702b,
      roughness: 0.6,
      side: THREE.DoubleSide,
    });
    const herbGroup = new THREE.Group();
    herbGroup.userData = { explodeOffset: 0.45 };
    for (let i = 0; i < 6; i++) {
      const leafGeo = new THREE.SphereGeometry(0.06, 8, 8);
      leafGeo.scale(0.5, 1.8, 0.2);
      const leaf = new THREE.Mesh(leafGeo, herbMat);
      leaf.position.set(
        (Math.random() - 0.5) * 0.6,
        -0.02,
        (Math.random() - 0.5) * 0.4
      );
      leaf.rotation.set(Math.random() * 0.4, Math.random() * Math.PI, Math.random() * 0.5);
      herbGroup.add(leaf);
    }
    wagyuGroup.add(herbGroup);

    scene.add(wagyuGroup);
    stateRef.current.dishGroups['wagyu'] = wagyuGroup;
    stateRef.current.activeDishGroup = wagyuGroup;

    // --- DISH 2: The Alchemist: Smoked Amber Old Fashioned ---
    const cocktailGroup = new THREE.Group();
    cocktailGroup.name = 'cocktail-dish';
    cocktailGroup.visible = false;

    // 1. Polished aged brass coaster
    const coasterGeo = new THREE.CylinderGeometry(1.2, 1.25, 0.08, 48);
    const coasterMat = new THREE.MeshPhysicalMaterial({
      color: 0xc89842,
      metalness: 0.9,
      roughness: 0.25,
      clearcoat: 0.8,
    });
    const coaster = new THREE.Mesh(coasterGeo, coasterMat);
    coaster.position.y = -0.6;
    cocktailGroup.add(coaster);

    // 2. Crystal Tumbler Glass (MeshPhysicalMaterial with transmission)
    const glassOuterGeo = new THREE.CylinderGeometry(0.78, 0.68, 1.2, 32, 1, true);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: isSoftwareGl ? 0 : 0.95,
      opacity: isSoftwareGl ? 0.35 : 1,
      transparent: true,
      roughness: 0.03,
      ior: 1.54,
      thickness: 0.6,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const glass = new THREE.Mesh(glassOuterGeo, glassMat);
    glass.position.y = 0.05;
    glass.castShadow = !isSoftwareGl;
    cocktailGroup.add(glass);

    // Glass Heavy Base
    const glassBaseGeo = new THREE.CylinderGeometry(0.68, 0.68, 0.24, 32);
    const glassBase = new THREE.Mesh(glassBaseGeo, glassMat);
    glassBase.position.y = -0.46;
    cocktailGroup.add(glassBase);

    // 3. Golden Amber Bourbon Liquid
    const liquidGeo = new THREE.CylinderGeometry(0.72, 0.64, 0.72, 32);
    const liquidMat = new THREE.MeshPhysicalMaterial({
      color: 0xd97706,
      roughness: 0.05,
      metalness: 0.05,
      transmission: isSoftwareGl ? 0 : 0.8,
      transparent: true,
      opacity: 0.85,
      attenuationColor: new THREE.Color(0x9a3412),
      attenuationDistance: 0.8,
    });
    const liquid = new THREE.Mesh(liquidGeo, liquidMat);
    liquid.position.y = -0.05;
    liquid.userData = { explodeOffset: 0.15 };
    cocktailGroup.add(liquid);

    // 4. Hand-Carved Clear Crystal Ice Prism
    const iceGeo = new THREE.BoxGeometry(0.48, 0.52, 0.48);
    const iceMat = new THREE.MeshPhysicalMaterial({
      color: 0xf0fdf4,
      transmission: isSoftwareGl ? 0 : 0.92,
      roughness: 0.08,
      ior: 1.31,
      transparent: true,
      opacity: 0.85,
    });
    const ice = new THREE.Mesh(iceGeo, iceMat);
    ice.position.set(0.04, -0.08, 0.02);
    ice.rotation.set(0.15, 0.35, 0.1);
    ice.userData = { explodeOffset: 0.32 };
    cocktailGroup.add(ice);

    // 5. Charred Orange Twist Ribbon
    const twistCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.35, 0.2, -0.3),
      new THREE.Vector3(0.1, 0.35, -0.4),
      new THREE.Vector3(0.4, 0.45, 0.1),
      new THREE.Vector3(0.2, 0.65, 0.45),
    ]);
    const twistGeo = new THREE.TubeGeometry(twistCurve, 32, 0.05, 12, false);
    const twistMat = new THREE.MeshStandardMaterial({
      color: 0xe65100,
      roughness: 0.4,
      metalness: 0.1,
    });
    const twist = new THREE.Mesh(twistGeo, twistMat);
    twist.userData = { explodeOffset: 0.48 };
    cocktailGroup.add(twist);

    // 6. Smoked Cinnamon Quill with Glowing Tip
    const cinnGeo = new THREE.CylinderGeometry(0.04, 0.04, 1.3, 12);
    const cinnMat = new THREE.MeshStandardMaterial({
      color: 0x4e2712,
      roughness: 0.85,
    });
    const cinnamon = new THREE.Mesh(cinnGeo, cinnMat);
    cinnamon.rotation.z = -0.45;
    cinnamon.rotation.x = 0.2;
    cinnamon.position.set(0.22, 0.35, 0.15);
    cinnamon.userData = { explodeOffset: 0.65 };
    cocktailGroup.add(cinnamon);

    // Glowing tip
    const emberGeo = new THREE.SphereGeometry(0.045, 10, 10);
    const emberMat = new THREE.MeshBasicMaterial({ color: 0xff5500 });
    const ember = new THREE.Mesh(emberGeo, emberMat);
    ember.position.set(0.48, 0.9, 0.05);
    ember.userData = { explodeOffset: 0.65 };
    cocktailGroup.add(ember);

    scene.add(cocktailGroup);
    stateRef.current.dishGroups['cocktail'] = cocktailGroup;

    // --- DISH 3: Soleil: Golden Citrus Dome ---
    const dessertGroup = new THREE.Group();
    dessertGroup.name = 'dessert-dish';
    dessertGroup.visible = false;

    // 1. Carrara Marble Pedestal
    const pedestalGeo = new THREE.CylinderGeometry(1.4, 1.45, 0.14, 48);
    const pedestalMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f7,
      map: marbleTex,
      roughness: 0.25,
      metalness: 0.05,
    });
    const pedestal = new THREE.Mesh(pedestalGeo, pedestalMat);
    pedestal.position.y = -0.55;
    dessertGroup.add(pedestal);

    // 2. Glossy Mirrored Dark Chocolate Hemisphere Dome
    const domeGeo = new THREE.SphereGeometry(0.82, 48, 24, 0, Math.PI * 2, 0, Math.PI / 2);
    const domeMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a0d0a,
      roughness: 0.12,
      metalness: 0.2,
      clearcoat: 1.0,
      clearcoatRoughness: 0.05,
    });
    const dome = new THREE.Mesh(domeGeo, domeMat);
    dome.position.y = -0.48;
    dome.castShadow = !isSoftwareGl;
    dome.userData = { explodeOffset: 0.25 };
    dessertGroup.add(dome);

    // 3. Spun Golden Sugar Spiral Halo
    const haloCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.7, 0),
      new THREE.Vector3(0.4, 0.6, 0.2),
      new THREE.Vector3(0.5, 0.4, -0.3),
      new THREE.Vector3(-0.3, 0.35, -0.4),
      new THREE.Vector3(-0.6, 0.2, 0.1),
      new THREE.Vector3(-0.2, 0.05, 0.5),
    ]);
    const haloGeo = new THREE.TubeGeometry(haloCurve, 48, 0.02, 10, false);
    const haloMat = new THREE.MeshPhysicalMaterial({
      color: 0xffd700,
      metalness: 0.95,
      roughness: 0.15,
      clearcoat: 1.0,
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    halo.position.y = 0.2;
    halo.userData = { explodeOffset: 0.65 };
    dessertGroup.add(halo);

    // 4. Candied Blood Orange Translucent Disc
    const orangeDiscGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.03, 32);
    const orangeDiscMat = new THREE.MeshPhysicalMaterial({
      color: 0xd9480f,
      roughness: 0.2,
      transmission: isSoftwareGl ? 0 : 0.7,
      transparent: true,
      opacity: 0.85,
    });
    const orangeDisc = new THREE.Mesh(orangeDiscGeo, orangeDiscMat);
    orangeDisc.rotation.z = 0.2;
    orangeDisc.rotation.x = -0.3;
    orangeDisc.position.set(0.2, 0.38, 0.1);
    orangeDisc.userData = { explodeOffset: 0.45 };
    dessertGroup.add(orangeDisc);

    // 5. Blackberry Coulis Droplets around perimeter
    const dropGeo = new THREE.SphereGeometry(0.06, 12, 12);
    dropGeo.scale(1, 0.4, 1);
    const dropMat = new THREE.MeshPhysicalMaterial({
      color: 0x3b0764,
      roughness: 0.05,
      clearcoat: 1.0,
    });
    const dropsGroup = new THREE.Group();
    dropsGroup.userData = { explodeOffset: 0.12 };
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r = 1.05 + (i % 2) * 0.12;
      const drop = new THREE.Mesh(dropGeo, dropMat);
      drop.position.set(Math.cos(angle) * r, -0.46, Math.sin(angle) * r);
      dropsGroup.add(drop);
    }
    dessertGroup.add(dropsGroup);

    scene.add(dessertGroup);
    stateRef.current.dishGroups['dessert'] = dessertGroup;

    // Pre-warm renderer
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // -------------------------------------------------------------
    // RENDER / TICK ANIMATION LOOP
    // -------------------------------------------------------------
    let frameId = 0;

    function afterDraw(cb: () => void) {
      const gl = renderer.getContext() as WebGL2RenderingContext;
      const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
      gl.flush();
      const poll = () => {
        const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
        if (state === gl.UNSIGNALED) {
          frameId = window.setTimeout(poll, 5);
        } else {
          gl.deleteSync(sync);
          frameId = window.setTimeout(cb, 80);
        }
      };
      frameId = window.setTimeout(poll, 5);
    }

    function tick() {
      const delta = stateRef.current.clock.getDelta();
      const elapsed = stateRef.current.clock.getElapsedTime();
      const {
        activeDishGroup,
        scrollProgress: sProgress,
        isExploded: exploded,
        rotationSpeed: rSpeed,
        controls: ctrl
      } = stateRef.current;

      // Handle interactive OrbitControls
      if (ctrl && ctrl.enabled) {
        ctrl.update();
      }

      if (activeDishGroup) {
        // Continuous gentle float bobbing
        const floatY = Math.sin(elapsed * 1.5) * 0.04;
        
        // When not manually orbiting, scroll binds rotation and position
        if (!ctrl || !ctrl.enabled) {
          // Scroll rotation interpolation
          const targetRotY = elapsed * 0.25 * rSpeed + sProgress * Math.PI * 4;
          const targetRotX = 0.15 + Math.sin(sProgress * Math.PI * 2) * 0.2;
          
          activeDishGroup.rotation.y = THREE.MathUtils.damp(activeDishGroup.rotation.y, targetRotY, 4, delta);
          activeDishGroup.rotation.x = THREE.MathUtils.damp(activeDishGroup.rotation.x, targetRotX, 4, delta);

          // Subtle scroll-dependent perspective positioning
          const targetPosY = floatY + Math.sin(sProgress * Math.PI) * 0.15;
          activeDishGroup.position.y = THREE.MathUtils.damp(activeDishGroup.position.y, targetPosY, 4, delta);
        } else {
          // In interactive mode, maintain gentle float
          activeDishGroup.position.y = THREE.MathUtils.damp(activeDishGroup.position.y, floatY, 4, delta);
        }

        // Exploded view kinematics on sub-parts
        activeDishGroup.children.forEach((child) => {
          if (child.userData && typeof child.userData.explodeOffset === 'number') {
            const targetY = exploded ? child.userData.explodeOffset * 1.4 : 0;
            const currentY = child.userData.currentOffset || 0;
            const newY = THREE.MathUtils.damp(currentY, targetY, 6, delta);
            child.userData.currentOffset = newY;
            child.position.y += (newY - currentY);
          }
        });
      }

      // Candle light subtle flicker
      if (stateRef.current.lights.candlePoint) {
        stateRef.current.lights.candlePoint.intensity = 3.2 + Math.sin(elapsed * 9) * 0.35 + Math.cos(elapsed * 17) * 0.2;
      }

      renderer.render(scene, camera);

      if (isSoftwareGl) {
        afterDraw(tick);
      } else {
        frameId = requestAnimationFrame(tick);
      }
    }

    tick();
    stateRef.current.animFrameId = frameId;

    // Handle container resize
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      clearTimeout(frameId);
      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Toggle interactive OrbitControls
  const toggleInteractive = () => {
    const nextState = !isInteractive;
    setIsInteractive(nextState);
    if (stateRef.current.controls) {
      stateRef.current.controls.enabled = nextState;
      if (!nextState) {
        // Reset camera gently
        if (stateRef.current.camera) {
          stateRef.current.camera.position.set(0, 1.8, 4.4);
          stateRef.current.controls.target.set(0, 0, 0);
        }
      }
    }
  };

  const getDishName = (id: DishId) => {
    switch (id) {
      case 'wagyu': return 'A5 Miyazaki Wagyu & Truffle';
      case 'cocktail': return 'The Smoked Amber Old Fashioned';
      case 'dessert': return 'Soleil: Golden Citrus Dome';
    }
  };

  return (
    <div className="relative w-full h-[650px] md:h-[780px] overflow-hidden select-none">
      {/* 3D WebGL Canvas Mount */}
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Floating Badge & Section Breadcrumb */}
      <div className="absolute top-6 left-6 z-10 flex items-center gap-3 pointer-events-none">
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md border border-white/10 px-3.5 py-1.5 rounded-full text-xs text-amber-300 font-medium tracking-wide uppercase">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Interactive 3D Stage</span>
        </div>
        <span className="hidden sm:inline-block text-xs text-neutral-400 font-mono">
          {activeSection.toUpperCase()} · SCROLL TO TRANSFORM
        </span>
      </div>

      {/* Top Right: Free 3D Orbit Inspection Toggle */}
      <div className="absolute top-6 right-6 z-10 flex items-center gap-2">
        <button
          onClick={toggleInteractive}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-full transition-all border ${
            isInteractive 
              ? 'bg-amber-400 text-black border-amber-300 shadow-lg shadow-amber-400/20' 
              : 'bg-black/60 backdrop-blur-md text-white/90 border-white/15 hover:border-amber-400/50 hover:text-white'
          }`}
          title="Toggle 360 degree drag inspection"
        >
          <Rotate3d className="w-3.5 h-3.5" />
          <span>{isInteractive ? 'Orbit Active (Drag to Rotate)' : 'Inspect 360°'}</span>
        </button>
      </div>

      {/* Center Left Subtle Dish Info Overlay */}
      <div className="absolute left-6 md:left-12 bottom-32 md:bottom-28 z-10 max-w-sm pointer-events-none transition-opacity duration-300">
        <div className="text-amber-400/80 text-xs tracking-widest uppercase mb-1 font-mono">
          Featured Culinary Creation
        </div>
        <h3 className="text-2xl md:text-3xl font-serif text-white tracking-tight drop-shadow-md">
          {getDishName(selectedDish)}
        </h3>
        <p className="text-xs md:text-sm text-neutral-300/90 mt-1.5 line-clamp-2 leading-relaxed">
          {selectedDish === 'wagyu' && 'A5 Miyazaki Wagyu rested in thyme butter, black winter truffle reduction, glazed morel mushrooms, and 24k gold leaf.'}
          {selectedDish === 'cocktail' && '15-Year Pappy Van Winkle bourbon, black walnut bitters, hand-carved ice sphere, and charred cedar smoke.'}
          {selectedDish === 'dessert' && 'Valrhona Grand Cru chocolate dome with Sicilian blood orange compote, spun sugar halo, and blackberry coulis.'}
        </p>

        {onSelectDishForReservation && (
          <button
            onClick={() => onSelectDishForReservation(getDishName(selectedDish))}
            className="pointer-events-auto mt-3 inline-flex items-center gap-2 text-xs font-semibold text-amber-300 hover:text-amber-200 transition-colors border-b border-amber-300/50 pb-0.5"
          >
            <span>Reserve Table for this Dish</span>
            <span>→</span>
          </button>
        )}
      </div>

      {/* UNIFIED COLLAPSIBLE BOTTOM CONTROL DOCK (Three.js Skill §5) */}
      <div 
        className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 w-[95%] max-w-[860px] transition-transform duration-300 ease-out ${
          isDockCollapsed ? 'translate-y-[calc(100%-38px)]' : 'translate-y-0'
        }`}
      >
        {/* Collapse / Expand Toggle Button */}
        <div className="flex justify-center -mb-px">
          <button
            onClick={() => setIsDockCollapsed(!isDockCollapsed)}
            className="flex items-center gap-1.5 px-4 py-1.5 bg-neutral-900/90 border border-white/15 border-b-0 rounded-t-lg text-[11px] text-neutral-300 hover:text-white transition-colors backdrop-blur-md shadow-lg"
          >
            {isDockCollapsed ? <ChevronUp className="w-3.5 h-3.5 text-amber-400" /> : <ChevronDown className="w-3.5 h-3.5 text-amber-400" />}
            <span>{isDockCollapsed ? 'Show 3D Controls' : 'Hide Controls (Zen Mode)'}</span>
          </button>
        </div>

        {/* Dock Surface */}
        <div className="bg-neutral-950/90 border border-white/15 rounded-xl p-3 md:p-4 backdrop-blur-xl shadow-2xl flex flex-col md:flex-row items-center justify-between gap-4">
          
          {/* Dish Switcher Tabs */}
          <div className="flex items-center gap-1.5 p-1 bg-white/5 border border-white/10 rounded-lg w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setSelectedDish('wagyu')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedDish === 'wagyu'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <UtensilsCrossed className="w-3.5 h-3.5" />
              <span>A5 Miyazaki Wagyu</span>
            </button>

            <button
              onClick={() => setSelectedDish('cocktail')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedDish === 'cocktail'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Wine className="w-3.5 h-3.5" />
              <span>Smoked Cocktail</span>
            </button>

            <button
              onClick={() => setSelectedDish('dessert')}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-all ${
                selectedDish === 'dessert'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm font-semibold'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Coffee className="w-3.5 h-3.5" />
              <span>Soleil Citrus Dome</span>
            </button>
          </div>

          {/* Secondary Controls: Exploded View, Lighting Mood, Speed */}
          <div className="flex items-center gap-2.5 w-full md:w-auto justify-end">
            
            {/* Exploded View Toggle */}
            <button
              onClick={() => setIsExploded(!isExploded)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                isExploded
                  ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                  : 'bg-white/5 text-neutral-300 border-white/10 hover:border-white/20'
              }`}
              title="Separate layers to inspect ingredients"
            >
              <Layers className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Exploded</span>
              <span>Layers</span>
            </button>

            {/* Lighting Mood Cycle */}
            <div className="flex items-center bg-white/5 border border-white/10 rounded-lg p-0.5">
              <button
                onClick={() => setLightingMood('candlelight')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMood === 'candlelight' ? 'bg-amber-500/30 text-amber-300' : 'text-neutral-400 hover:text-white'
                }`}
                title="Intimate Candlelight"
              >
                <Flame className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMood('studio')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMood === 'studio' ? 'bg-amber-500/30 text-amber-300' : 'text-neutral-400 hover:text-white'
                }`}
                title="Studio Spotlight"
              >
                <Sun className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setLightingMood('sunset')}
                className={`p-1.5 rounded-md transition-colors ${
                  lightingMood === 'sunset' ? 'bg-amber-500/30 text-amber-300' : 'text-neutral-400 hover:text-white'
                }`}
                title="Sunset Amber"
              >
                <Moon className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rotation Speed Toggle */}
            <button
              onClick={() => setRotationSpeed((prev) => (prev === 1 ? 2 : prev === 2 ? 0 : 1))}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs text-neutral-300 hover:text-white transition-colors"
              title="Cycle rotation speed"
            >
              <Rotate3d className="w-3 h-3 text-amber-400" />
              <span className="font-mono text-[11px]">
                {rotationSpeed === 0 ? 'Paused' : rotationSpeed === 1 ? '1x' : '2x'}
              </span>
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}
