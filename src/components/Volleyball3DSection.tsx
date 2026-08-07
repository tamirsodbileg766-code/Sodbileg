import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Trophy, Users, Play, RotateCcw, Volume2, VolumeX, Flame, Zap, Shield, Sparkles, Gamepad2, ArrowUp } from 'lucide-react';

interface Player3D {
  mesh: THREE.Group;
  bodyMesh: THREE.Mesh;
  shadowMesh: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  position: THREE.Vector3;
  targetPos: THREE.Vector3;
  velocity: THREE.Vector3;
  team: 'red' | 'blue';
  isHuman: boolean;
  playerNum: number;
  isJumping: boolean;
  jumpVel: number;
  chargeTime: number;
  score: number;
  name: string;
}

export const Volleyball3DSection: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  // Game Settings & State
  const [gameMode, setGameMode] = useState<'1v1' | '2p_local' | '3v3'>('2p_local');
  const [jumpPowerMode, setJumpPowerMode] = useState<'normal' | 'super' | 'anime'>('super');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [redScore, setRedScore] = useState<number>(0);
  const [blueScore, setBlueScore] = useState<number>(0);
  const [rallyCount, setRallyCount] = useState<number>(0);
  const [maxRally, setMaxRally] = useState<number>(0);
  const [lastEvent, setLastEvent] = useState<string>('3D Волейболын шинэчилсэн үсрэх системтэй тоглоомд тайван тоглоорой!');
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [cameraMode, setCameraMode] = useState<'action' | 'tv' | 'side'>('action');
  const [isSpiking, setIsSpiking] = useState<boolean>(false);

  // Sound Synth via Web Audio API
  const playSound = (type: 'hit' | 'spike' | 'whistle' | 'point' | 'bounce' | 'jump') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;

      if (type === 'jump') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'hit') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.1);
        gain.gain.setValueAtTime(0.4, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'spike') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(700, now);
        osc.frequency.exponentialRampToValueAtTime(90, now + 0.25);
        gain.gain.setValueAtTime(0.7, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'whistle') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(1800, now);
        osc.frequency.linearRampToValueAtTime(2200, now + 0.15);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'point') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.1); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.2); // G5
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);
        osc.start(now);
        osc.stop(now + 0.4);
      } else if (type === 'bounce') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.exponentialRampToValueAtTime(60, now + 0.08);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      }
    } catch {
      // AudioContext fallback
    }
  };

  // Three.js State Refs
  const stateRef = useRef({
    isPlaying: false,
    gameMode: '2p_local' as '1v1' | '2p_local' | '3v3',
    jumpPowerMode: 'super' as 'normal' | 'super' | 'anime',
    cameraMode: 'action' as 'action' | 'tv' | 'side',
    keys: {} as Record<string, boolean>,
    triggerP1Jump: false,
    triggerP2Jump: false,
  });

  useEffect(() => {
    stateRef.current.isPlaying = isPlaying;
    stateRef.current.gameMode = gameMode;
    stateRef.current.jumpPowerMode = jumpPowerMode;
    stateRef.current.cameraMode = cameraMode;
  }, [isPlaying, gameMode, jumpPowerMode, cameraMode]);

  const handleManualP1Jump = () => {
    stateRef.current.triggerP1Jump = true;
  };

  const handleManualP2Jump = () => {
    stateRef.current.triggerP2Jump = true;
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0c12);
    scene.fog = new THREE.FogExp2(0x0a0c12, 0.012);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 14, 22);
    camera.lookAt(0, 2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.65);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xfffbeb, 1.3);
    dirLight.position.set(12, 25, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 60;
    dirLight.shadow.camera.left = -16;
    dirLight.shadow.camera.right = 16;
    dirLight.shadow.camera.top = 16;
    dirLight.shadow.camera.bottom = -16;
    scene.add(dirLight);

    // Stadium Point Lights
    const lightSpot1 = new THREE.PointLight(0x38bdf8, 1.8, 30);
    lightSpot1.position.set(-14, 12, -10);
    scene.add(lightSpot1);

    const lightSpot2 = new THREE.PointLight(0xf43f5e, 1.8, 30);
    lightSpot2.position.set(14, 12, -10);
    scene.add(lightSpot2);

    // 3. Court Setup (Dimensions: 18m length, 10m width)
    const COURT_LENGTH = 18;
    const COURT_WIDTH = 10;

    const courtGeo = new THREE.PlaneGeometry(COURT_WIDTH, COURT_LENGTH);
    const courtMat = new THREE.MeshStandardMaterial({
      color: 0x181a24,
      roughness: 0.35,
      metalness: 0.1,
    });
    const court = new THREE.Mesh(courtGeo, courtMat);
    court.rotation.x = -Math.PI / 2;
    court.receiveShadow = true;
    scene.add(court);

    // Court Wood Border
    const borderGeo = new THREE.PlaneGeometry(COURT_WIDTH + 4, COURT_LENGTH + 4);
    const borderMat = new THREE.MeshStandardMaterial({ color: 0x07080c, roughness: 0.8 });
    const border = new THREE.Mesh(borderGeo, borderMat);
    border.rotation.x = -Math.PI / 2;
    border.position.y = -0.01;
    border.receiveShadow = true;
    scene.add(border);

    // Boundary Lines
    const lineMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const lineThick = 0.12;

    const lineLeft = new THREE.Mesh(new THREE.PlaneGeometry(lineThick, COURT_LENGTH), lineMat);
    lineLeft.rotation.x = -Math.PI / 2;
    lineLeft.position.set(-COURT_WIDTH / 2, 0.01, 0);
    scene.add(lineLeft);

    const lineRight = lineLeft.clone();
    lineRight.position.x = COURT_WIDTH / 2;
    scene.add(lineRight);

    const lineTop = new THREE.Mesh(new THREE.PlaneGeometry(COURT_WIDTH, lineThick), lineMat);
    lineTop.rotation.x = -Math.PI / 2;
    lineTop.position.set(0, 0.01, -COURT_LENGTH / 2);
    scene.add(lineTop);

    const lineBottom = lineTop.clone();
    lineBottom.position.z = COURT_LENGTH / 2;
    scene.add(lineBottom);

    const centerLine = new THREE.Mesh(new THREE.PlaneGeometry(COURT_WIDTH, lineThick * 1.5), new THREE.MeshBasicMaterial({ color: 0xf43f5e }));
    centerLine.rotation.x = -Math.PI / 2;
    centerLine.position.set(0, 0.01, 0);
    scene.add(centerLine);

    // 4. Net & Net Posts
    const NET_HEIGHT = 2.43;
    const postGeo = new THREE.CylinderGeometry(0.08, 0.08, NET_HEIGHT, 16);
    const postMat = new THREE.MeshStandardMaterial({ color: 0x475569, metalness: 0.8, roughness: 0.2 });

    const postLeft = new THREE.Mesh(postGeo, postMat);
    postLeft.position.set(-COURT_WIDTH / 2 - 0.2, NET_HEIGHT / 2, 0);
    postLeft.castShadow = true;
    scene.add(postLeft);

    const postRight = postLeft.clone();
    postRight.position.x = COURT_WIDTH / 2 + 0.2;
    scene.add(postRight);

    // Net Mesh
    const netGeo = new THREE.PlaneGeometry(COURT_WIDTH + 0.4, 1.2);
    const netTexture = new THREE.CanvasTexture((() => {
      const canvas = document.createElement('canvas');
      canvas.width = 128;
      canvas.height = 128;
      const ctx = canvas.getContext('2d')!;
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, 128, 128);
      ctx.strokeStyle = '#222222';
      ctx.lineWidth = 4;
      for (let i = 0; i <= 128; i += 16) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 128);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(0, i);
        ctx.lineTo(128, i);
        ctx.stroke();
      }
      return canvas;
    })());
    netTexture.wrapS = THREE.RepeatWrapping;
    netTexture.wrapT = THREE.RepeatWrapping;
    netTexture.repeat.set(16, 4);

    const netMat = new THREE.MeshStandardMaterial({
      map: netTexture,
      transparent: true,
      opacity: 0.85,
      side: THREE.DoubleSide,
    });
    const net = new THREE.Mesh(netGeo, netMat);
    net.position.set(0, NET_HEIGHT - 0.6, 0);
    scene.add(net);

    const tapeGeo = new THREE.BoxGeometry(COURT_WIDTH + 0.4, 0.08, 0.04);
    const tapeMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const tape = new THREE.Mesh(tapeGeo, tapeMat);
    tape.position.set(0, NET_HEIGHT, 0);
    scene.add(tape);

    // 5. Volleyball 3D Sphere & Shadow Marker
    const BALL_RADIUS = 0.28;
    const ballGeo = new THREE.SphereGeometry(BALL_RADIUS, 24, 24);
    const ballCanvas = document.createElement('canvas');
    ballCanvas.width = 256;
    ballCanvas.height = 128;
    const bCtx = ballCanvas.getContext('2d')!;
    bCtx.fillStyle = '#ffffff';
    bCtx.fillRect(0, 0, 256, 128);
    bCtx.fillStyle = '#2563eb';
    bCtx.fillRect(0, 0, 85, 128);
    bCtx.fillStyle = '#f59e0b';
    bCtx.fillRect(170, 0, 85, 128);

    const ballTex = new THREE.CanvasTexture(ballCanvas);
    const ballMat = new THREE.MeshStandardMaterial({ map: ballTex, roughness: 0.3, metalness: 0.1 });
    const ball = new THREE.Mesh(ballGeo, ballMat);
    ball.castShadow = true;
    scene.add(ball);

    // Ball Landing Ring Shadow on court
    const ballShadowGeo = new THREE.RingGeometry(0.1, 0.35, 16);
    const ballShadowMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b, side: THREE.DoubleSide, transparent: true, opacity: 0.7 });
    const ballShadow = new THREE.Mesh(ballShadowGeo, ballShadowMat);
    ballShadow.rotation.x = -Math.PI / 2;
    ballShadow.position.y = 0.02;
    scene.add(ballShadow);

    // Ball Physics Variables
    const ballPos = new THREE.Vector3(0, 4, 3);
    const ballVel = new THREE.Vector3(0, 3, -4);
    ball.position.copy(ballPos);

    // 6. Players Setup
    const players: Player3D[] = [];

    const createPlayer = (team: 'red' | 'blue', num: number, isHuman: boolean, startZ: number, startX: number, name: string): Player3D => {
      const group = new THREE.Group();

      // Body / Torso
      const torsoGeo = new THREE.CylinderGeometry(0.3, 0.25, 0.9, 12);
      const teamColor = team === 'red' ? 0xe11d48 : 0x2563eb;
      const torsoMat = new THREE.MeshStandardMaterial({ color: teamColor, roughness: 0.5 });
      const torso = new THREE.Mesh(torsoGeo, torsoMat);
      torso.position.y = 0.85;
      torso.castShadow = true;
      group.add(torso);

      // Head
      const headGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const headMat = new THREE.MeshStandardMaterial({ color: 0xfde047, roughness: 0.8 });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.y = 1.45;
      head.castShadow = true;
      group.add(head);

      // Arms / Hands
      const armGeo = new THREE.BoxGeometry(0.12, 0.5, 0.12);
      const armMat = new THREE.MeshStandardMaterial({ color: teamColor });
      const leftArm = new THREE.Mesh(armGeo, armMat);
      leftArm.position.set(-0.35, 0.85, 0);
      group.add(leftArm);

      const rightArm = new THREE.Mesh(armGeo, armMat);
      rightArm.position.set(0.35, 0.85, 0);
      group.add(rightArm);

      // Player Shadow
      const pShadowGeo = new THREE.CircleGeometry(0.45, 16);
      const pShadowMat = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.5 });
      const pShadow = new THREE.Mesh(pShadowGeo, pShadowMat);
      pShadow.rotation.x = -Math.PI / 2;
      pShadow.position.y = 0.01;
      scene.add(pShadow);

      group.position.set(startX, 0, startZ);
      scene.add(group);

      return {
        mesh: group,
        bodyMesh: torso,
        shadowMesh: pShadow,
        leftArm,
        rightArm,
        position: new THREE.Vector3(startX, 0, startZ),
        targetPos: new THREE.Vector3(startX, 0, startZ),
        velocity: new THREE.Vector3(0, 0, 0),
        team,
        isHuman,
        playerNum: num,
        isJumping: false,
        jumpVel: 0,
        chargeTime: 0,
        score: 0,
        name
      };
    };

    // Instantiate Players
    const p1 = createPlayer('red', 1, true, 4.5, 0, 'Содбилэг (P1 - Red)');
    players.push(p1);

    const p2 = createPlayer('blue', 1, true, -4.5, 0, 'Opponent (P2 - Blue)');
    players.push(p2);

    // Teammates for 3v3
    const p1_wing = createPlayer('red', 2, false, 6, -2.5, 'Red Wing');
    p1_wing.mesh.visible = false;
    p1_wing.shadowMesh.visible = false;
    players.push(p1_wing);

    const p1_setter = createPlayer('red', 3, false, 2.5, 2, 'Red Setter');
    p1_setter.mesh.visible = false;
    p1_setter.shadowMesh.visible = false;
    players.push(p1_setter);

    const p2_wing = createPlayer('blue', 2, false, -6, 2.5, 'Blue Wing');
    p2_wing.mesh.visible = false;
    p2_wing.shadowMesh.visible = false;
    players.push(p2_wing);

    const p2_setter = createPlayer('blue', 3, false, -2.5, -2, 'Blue Setter');
    p2_setter.mesh.visible = false;
    p2_setter.shadowMesh.visible = false;
    players.push(p2_setter);

    // Key Listeners
    const keys: Record<string, boolean> = {};
    const handleKeyDown = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = true;
      keys[e.code] = true;
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keys[e.key.toLowerCase()] = false;
      keys[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Reset Serve Function
    const resetServe = (servingTeam: 'red' | 'blue') => {
      ballPos.set(0, 3.8, servingTeam === 'red' ? 6 : -6);
      ballVel.set(
        (Math.random() - 0.5) * 1.5,
        5.0,
        servingTeam === 'red' ? -5.5 : 5.5
      );
      ball.position.copy(ballPos);

      p1.position.set(0, 0, 4.5);
      p2.position.set(0, 0, -4.5);

      p1.mesh.position.copy(p1.position);
      p2.mesh.position.copy(p2.position);

      playSound('whistle');
    };

    let animationFrameId: number;
    const clock = new THREE.Clock();

    // Helper: Execute Jump according to power mode
    const triggerPlayerJump = (player: Player3D) => {
      if (player.isJumping) return;

      const pMode = stateRef.current.jumpPowerMode;
      let initialJumpSpeed = 8.0; // Normal high jump
      if (pMode === 'super') initialJumpSpeed = 10.0; // Super Volleyball Spike jump!
      if (pMode === 'anime') initialJumpSpeed = 12.5; // Floaty Anime Spike jump!

      player.isJumping = true;
      player.jumpVel = initialJumpSpeed;

      // Raise arms up in spike preparation pose
      player.leftArm.rotation.x = -Math.PI * 0.75;
      player.rightArm.rotation.x = -Math.PI * 0.75;

      playSound('jump');
    };

    // Game Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = Math.min(clock.getDelta(), 0.1);
      const isCurrentlyPlaying = stateRef.current.isPlaying;
      const currentMode = stateRef.current.gameMode;
      const currentCameraMode = stateRef.current.cameraMode;
      const currentJumpMode = stateRef.current.jumpPowerMode;

      // Update 3v3 visibility
      const is3v3 = currentMode === '3v3';
      p1_wing.mesh.visible = is3v3;
      p1_wing.shadowMesh.visible = is3v3;
      p1_setter.mesh.visible = is3v3;
      p1_setter.shadowMesh.visible = is3v3;

      p2_wing.mesh.visible = is3v3;
      p2_wing.shadowMesh.visible = is3v3;
      p2_setter.mesh.visible = is3v3;
      p2_setter.shadowMesh.visible = is3v3;

      if (isCurrentlyPlaying) {
        // --- 1. HUMAN CONTROLS ---
        const moveSpeed = 8.0 * delta;

        // Player 1 (Red) Movement: WASD
        if (keys['w'] || keys['KeyW']) p1.position.z -= moveSpeed;
        if (keys['s'] || keys['KeyS']) p1.position.z += moveSpeed;
        if (keys['a'] || keys['KeyA']) p1.position.x -= moveSpeed;
        if (keys['d'] || keys['KeyD']) p1.position.x += moveSpeed;

        // P1 Jump Trigger (R key, Space key, or UI Button)
        if (keys['r'] || keys['KeyR'] || keys[' '] || keys['Space'] || stateRef.current.triggerP1Jump) {
          triggerPlayerJump(p1);
          stateRef.current.triggerP1Jump = false;
        }

        // Bound P1 to Red court side
        p1.position.z = Math.max(0.4, Math.min(COURT_LENGTH / 2 - 0.5, p1.position.z));
        p1.position.x = Math.max(-COURT_WIDTH / 2 + 0.5, Math.min(COURT_WIDTH / 2 - 0.5, p1.position.x));

        // Player 2 Controls
        if (currentMode === '2p_local') {
          if (keys['ArrowUp']) p2.position.z -= moveSpeed;
          if (keys['ArrowDown']) p2.position.z += moveSpeed;
          if (keys['ArrowLeft']) p2.position.x -= moveSpeed;
          if (keys['ArrowRight']) p2.position.x += moveSpeed;

          if (keys['Enter'] || keys['Numpad0'] || stateRef.current.triggerP2Jump) {
            triggerPlayerJump(p2);
            stateRef.current.triggerP2Jump = false;
          }
        } else {
          // AI Bot for Player 2
          const botTargetX = ballPos.x;
          const botTargetZ = Math.min(-0.8, Math.max(-COURT_LENGTH / 2 + 0.8, ballPos.z));

          p2.position.x += (botTargetX - p2.position.x) * 4.2 * delta;
          p2.position.z += (botTargetZ - p2.position.z) * 4.2 * delta;

          // Bot Jump/Spike when ball is approaching
          const distToBall = p2.position.distanceTo(new THREE.Vector3(ballPos.x, 0, ballPos.z));
          if (distToBall < 2.2 && ballPos.y > 2.0 && !p2.isJumping && ballPos.z < 0) {
            triggerPlayerJump(p2);
          }
        }

        // Bound P2 to Blue court side
        p2.position.z = Math.max(-COURT_LENGTH / 2 + 0.5, Math.min(-0.4, p2.position.z));
        p2.position.x = Math.max(-COURT_WIDTH / 2 + 0.5, Math.min(COURT_WIDTH / 2 - 0.5, p2.position.x));

        // Smooth Jump Physics & Animation
        const gravityAcc = currentJumpMode === 'anime' ? 14.0 : (currentJumpMode === 'super' ? 18.0 : 20.0);

        players.forEach((p) => {
          if (p.isJumping) {
            p.position.y += p.jumpVel * delta;
            p.jumpVel -= gravityAcc * delta;

            // Rotate arms dynamically while airborne
            if (p.jumpVel < 0) {
              // Descending spike pose
              p.leftArm.rotation.x = Math.PI * 0.2;
              p.rightArm.rotation.x = Math.PI * 0.2;
            }

            if (p.position.y <= 0) {
              p.position.y = 0;
              p.isJumping = false;
              p.jumpVel = 0;

              // Reset arms on ground
              p.leftArm.rotation.x = 0;
              p.rightArm.rotation.x = 0;
            }
          }

          p.mesh.position.copy(p.position);
          p.shadowMesh.position.set(p.position.x, 0.01, p.position.z);

          // Shadow shrink when higher in air
          const sScale = Math.max(0.15, 1 - p.position.y / 6);
          p.shadowMesh.scale.set(sScale, sScale, sScale);
        });

        // --- 2. BALL PHYSICS ---
        const GRAVITY = -9.81;
        ballVel.y += GRAVITY * delta;

        ballPos.x += ballVel.x * delta;
        ballPos.y += ballVel.y * delta;
        ballPos.z += ballVel.z * delta;

        // Ball Rotation
        ball.rotation.x += ballVel.z * delta * 0.5;
        ball.rotation.z -= ballVel.x * delta * 0.5;

        // Ball Shadow Position & Scale
        ballShadow.position.set(ballPos.x, 0.02, ballPos.z);
        const shadowScale = Math.max(0.2, 1 - ballPos.y / 10);
        ballShadow.scale.set(shadowScale, shadowScale, shadowScale);

        // --- 3. NET COLLISION ---
        if (Math.abs(ballPos.z) < 0.3 && ballPos.y < NET_HEIGHT) {
          ballVel.z *= -0.6;
          ballVel.y *= 0.8;
          playSound('bounce');
          setLastEvent('🏐 Бөмбөг сүлжээнд хүрч ойлоо!');
        }

        // --- 4. PLAYER BALL HIT & HIGH SPIKE CHECK ---
        players.forEach((p) => {
          if (!p.mesh.visible) return;

          const pHeadPos = p.position.clone().add(new THREE.Vector3(0, 1.2 + p.position.y, 0));
          const dist = ballPos.distanceTo(pHeadPos);

          if (dist < 1.25) {
            if (p.isJumping && p.position.y > 0.8) {
              // POWERFUL VOLLEYBALL SPIKE!
              playSound('spike');
              setIsSpiking(true);
              setTimeout(() => setIsSpiking(false), 450);

              const spikeSpeedZ = currentJumpMode === 'anime' ? -15 : (currentJumpMode === 'super' ? -13 : -11);
              const dir = p.team === 'red' ? 1 : -1;

              ballVel.set(
                (Math.random() - 0.5) * 5,
                2.2, // Downward sharp angle
                spikeSpeedZ * dir
              );

              setLastEvent(`🔥 ${p.name} ӨНДӨР ҮСРЭЛТЭЭС ХҮЧТЭЙ ДОТОЛГОО (SPIKE) ХИЙЛЭЭ!`);
            } else {
              // Standard Bump / Set
              playSound('hit');
              ballVel.set(
                (Math.random() - 0.5) * 3,
                7.0, // High arc pass
                p.team === 'red' ? -5.5 : 5.5
              );
              setLastEvent(`✨ ${p.name} бөмбөгийг өндөрт дамжууллаа.`);
            }

            setRallyCount((prev) => {
              const newRally = prev + 1;
              setMaxRally((max) => Math.max(max, newRally));
              return newRally;
            });
          }
        });

        // --- 5. COURT FLOOR BOUNCE / POINT SCORE ---
        if (ballPos.y <= BALL_RADIUS) {
          ballPos.y = BALL_RADIUS;
          playSound('point');

          if (ballPos.z < 0) {
            setRedScore((s) => s + 1);
            setLastEvent('🎯 Бөмбөг Цэнхэр талбайд буулаа! Улаан Баг ОНОО АВЛАА!');
            resetServe('red');
          } else {
            setBlueScore((s) => s + 1);
            setLastEvent('🎯 Бөмбөг Улаан талбайд буулаа! Цэнхэр Баг ОНОО АВЛАА!');
            resetServe('blue');
          }

          setRallyCount(0);
        }

        // Out of Bounds check
        if (Math.abs(ballPos.x) > COURT_WIDTH / 2 + 3 || Math.abs(ballPos.z) > COURT_LENGTH / 2 + 3) {
          setLastEvent('⚠️ Бөмбөг аут гарлаа (OUT)!');
          resetServe(ballPos.z > 0 ? 'blue' : 'red');
          setRallyCount(0);
        }

        ball.position.copy(ballPos);
      }

      // --- 6. CAMERA POSITION MODES ---
      if (currentCameraMode === 'action') {
        const camTargetX = ballPos.x * 0.3;
        const camTargetZ = ballPos.z * 0.4 + 14;
        camera.position.x += (camTargetX - camera.position.x) * 2 * delta;
        camera.position.z += (camTargetZ - camera.position.z) * 2 * delta;
        camera.position.y = 13 + Math.abs(ballPos.y) * 0.2;
        camera.lookAt(ballPos.x * 0.2, 1.5, ballPos.z * 0.2);
      } else if (currentCameraMode === 'tv') {
        camera.position.set(16, 18, 16);
        camera.lookAt(0, 0, 0);
      } else if (currentCameraMode === 'side') {
        camera.position.set(18, 6, 0);
        camera.lookAt(0, 2, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!mountRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const togglePlay = () => {
    setIsPlaying((prev) => {
      const next = !prev;
      if (next) playSound('whistle');
      return next;
    });
  };

  const resetGame = () => {
    setRedScore(0);
    setBlueScore(0);
    setRallyCount(0);
    setIsPlaying(false);
    setLastEvent('Тоглоом дахин эхэллээ. Үсрэлтийн систем бэлэн!');
  };

  return (
    <section id="volleyball3d" className="py-20 bg-[#0a0b10] text-white relative overflow-hidden border-b border-white/10">
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:32px_32px] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-[10px] font-bold uppercase tracking-widest mb-3 backdrop-blur-sm">
            <Trophy className="w-3.5 h-3.5 text-rose-500" />
            <span>3D Multiplayer Volleyball Engine — Шинэчилсэн Үсрэх Систем</span>
          </div>
          <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-white uppercase tracking-tight mb-3">
            3D Волейболын Тэмцээн
          </h2>
          <p className="text-white/70 text-sm sm:text-base font-medium">
            Өндөр үсрэлт, Spike довтолгоо, 2-тоглогчийн горим болон товчлуураар шууд үсрэх шинэчилсэн системтэй 3D тоглоом!
          </p>
        </div>

        {/* Dashboard Bar: Scoreboard & Controls */}
        <div className="bg-zinc-900/90 border border-white/15 p-4 sm:p-6 mb-6 shadow-2xl backdrop-blur-md">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Red Team Score */}
            <div className="flex items-center gap-3 bg-rose-950/60 border border-rose-500/40 px-4 py-2">
              <div className="w-3 h-3 bg-rose-500 rounded-full animate-pulse" />
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-rose-300 block">
                  УЛААН БАГ (P1)
                </span>
                <span className="text-2xl font-black font-unbounded text-white">
                  {redScore}
                </span>
              </div>
            </div>

            {/* Rally & Match Info */}
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Flame className={`w-4 h-4 ${isSpiking ? 'text-amber-400 animate-bounce' : 'text-zinc-500'}`} />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Дараалсан дамжуулалт (Rally): {rallyCount}
                </span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                Дээд рекорд: {maxRally} hit
              </span>
            </div>

            {/* Blue Team Score */}
            <div className="flex items-center gap-3 bg-blue-950/60 border border-blue-500/40 px-4 py-2">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-blue-300 block text-right">
                  ЦЭНХЭР БАГ ({gameMode === '2p_local' ? 'P2' : 'BOT'})
                </span>
                <span className="text-2xl font-black font-unbounded text-white text-right block">
                  {blueScore}
                </span>
              </div>
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Action Event Ticker */}
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-zinc-300">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span className="font-semibold text-white">{lastEvent}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-1.5 bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
                title="Дуу хаах/нээх"
              >
                {soundEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4 text-rose-400" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mode & Jump Power Selectors */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          {/* Game Modes */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setGameMode('2p_local')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                gameMode === '2p_local'
                  ? 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-zinc-900 border-white/20 text-zinc-400 hover:text-white'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>2P (P1 vs P2)</span>
            </button>

            <button
              onClick={() => setGameMode('1v1')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                gameMode === '1v1'
                  ? 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-zinc-900 border-white/20 text-zinc-400 hover:text-white'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>1v1 AI Боттой</span>
            </button>

            <button
              onClick={() => setGameMode('3v3')}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer flex items-center gap-1.5 ${
                gameMode === '3v3'
                  ? 'bg-rose-600 border-rose-500 text-white'
                  : 'bg-zinc-900 border-white/20 text-zinc-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>3v3 Баг</span>
            </button>
          </div>

          {/* Jump Power Setting Controls */}
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-amber-400 tracking-wider flex items-center gap-1">
              <Zap className="w-3 h-3" />
              Үсрэлтийн систем:
            </span>

            <button
              onClick={() => setJumpPowerMode('normal')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                jumpPowerMode === 'normal' ? 'bg-amber-400 text-black border-amber-400 font-extrabold' : 'bg-zinc-900 border-white/20 text-zinc-400'
              }`}
            >
              Энгийн (8m)
            </button>

            <button
              onClick={() => setJumpPowerMode('super')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                jumpPowerMode === 'super' ? 'bg-amber-400 text-black border-amber-400 font-extrabold' : 'bg-zinc-900 border-white/20 text-zinc-400'
              }`}
            >
              Өндөр Spike (10m)
            </button>

            <button
              onClick={() => setJumpPowerMode('anime')}
              className={`px-2.5 py-1 text-[11px] font-bold uppercase border transition-all cursor-pointer ${
                jumpPowerMode === 'anime' ? 'bg-amber-400 text-black border-amber-400 font-extrabold' : 'bg-zinc-900 border-white/20 text-zinc-400'
              }`}
            >
              Аниме Float (12.5m)
            </button>
          </div>
        </div>

        {/* 3D WebGL Canvas Container */}
        <div className="relative w-full h-[480px] sm:h-[560px] bg-zinc-950 border border-white/20 shadow-2xl overflow-hidden group">
          <div ref={mountRef} className="w-full h-full" />

          {/* Touch / Mouse On-Screen Jump Buttons */}
          {isPlaying && (
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
              {/* P1 Action Jump Button */}
              <button
                onClick={handleManualP1Jump}
                className="pointer-events-auto px-5 py-3 bg-rose-600/90 hover:bg-rose-500 active:scale-90 border-2 border-rose-300 text-white font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md"
              >
                <ArrowUp className="w-5 h-5 animate-bounce" />
                <span>P1 (УЛААН) ҮСРЭХ & SPIKE</span>
              </button>

              {/* P2 Action Jump Button */}
              {gameMode === '2p_local' && (
                <button
                  onClick={handleManualP2Jump}
                  className="pointer-events-auto px-5 py-3 bg-blue-600/90 hover:bg-blue-500 active:scale-90 border-2 border-blue-300 text-white font-black text-xs uppercase tracking-wider shadow-2xl flex items-center gap-2 cursor-pointer transition-all backdrop-blur-md"
                >
                  <ArrowUp className="w-5 h-5 animate-bounce" />
                  <span>P2 (ЦЭНХЭР) ҮСРЭХ & SPIKE</span>
                </button>
              )}
            </div>
          )}

          {/* Overlay Start Play Trigger */}
          {!isPlaying && (
            <div className="absolute inset-0 bg-black/75 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
              <Trophy className="w-16 h-16 text-rose-500 mb-4 animate-bounce" />
              <h3 className="font-unbounded font-black text-2xl sm:text-3xl text-white uppercase mb-2">
                3D Волейболын Шинэчилсэн Систем
              </h3>
              <p className="text-zinc-300 text-xs sm:text-sm max-w-md mb-6 leading-relaxed">
                Үсрэлтийн өндөр, физикийг шинэчлэн сайжрууллаа! Гар дээрээс R (эсвэл Space) болон Enter, эсвэл дэлгэц дээрх [ҮСРЭХ] товчоор шууд Spike цохино уу!
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <button
                  onClick={togglePlay}
                  className="px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-lg active:scale-95"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>ТОГЛООМ ЭХЛҮҮЛЭХ</span>
                </button>
              </div>
            </div>
          )}

          {/* Floating Game Controls Bottom overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none z-10">
            <div className="bg-black/80 backdrop-blur-md px-3 py-2 border border-white/20 text-[11px] font-mono text-zinc-300 pointer-events-auto flex items-center gap-4">
              <div>
                <span className="text-rose-400 font-bold">P1 (Red):</span> W A S D + <span className="bg-rose-900/60 text-white px-1.5 py-0.5 font-bold">R</span>
              </div>
              {gameMode === '2p_local' && (
                <div>
                  <span className="text-blue-400 font-bold">P2 (Blue):</span> ↑ ↓ ← → + <span className="bg-blue-900/60 text-white px-1.5 py-0.5 font-bold">ENTER</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2 pointer-events-auto">
              <button
                onClick={togglePlay}
                className="px-4 py-2 bg-zinc-800/90 hover:bg-zinc-700 border border-white/20 text-white font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-1.5"
              >
                {isPlaying ? 'ТҮР ЗОГСООХ' : 'ҮРГЭЛЖЛҮҮЛЭХ'}
              </button>

              <button
                onClick={resetGame}
                className="p-2 bg-zinc-800/90 hover:bg-zinc-700 border border-white/20 text-white transition-colors cursor-pointer"
                title="Дахин эхлүүлэх"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Controls Instructions Card */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-white/15 p-5">
            <h4 className="font-unbounded font-black text-sm uppercase text-rose-400 mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4" />
              <span>Player 1 (Улаан Баг) - Үсрэх & Довтлох</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="p-2 bg-black/40 border border-white/10">
                <span className="font-bold text-white block">W A S D</span>
                <span className="text-[11px] text-zinc-400">Талбай дээр шилжих</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/10">
                <span className="font-bold text-rose-400 block">R ТОВЧ (эсвэл SPACE)</span>
                <span className="text-[11px] text-zinc-400">Өндөрт үсрэх & Spike цохилт</span>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-white/15 p-5">
            <h4 className="font-unbounded font-black text-sm uppercase text-blue-400 mb-3 flex items-center gap-2">
              <Gamepad2 className="w-4 h-4" />
              <span>Player 2 (Цэнхэр Баг - Local 2P) - Үсрэх & Довтлох</span>
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-zinc-300">
              <div className="p-2 bg-black/40 border border-white/10">
                <span className="font-bold text-white block">СУМТАЙ ТОЎЧИДУУД (↑ ↓ ← →)</span>
                <span className="text-[11px] text-zinc-400">Талбай дээр шилжих</span>
              </div>
              <div className="p-2 bg-black/40 border border-white/10">
                <span className="font-bold text-blue-400 block">ENTER / ДЭЛГЭЦИЙН ТОВЧ</span>
                <span className="text-[11px] text-zinc-400">Өндөрт үсрэх & Spike цохилт</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
