import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Shield, Zap, Swords, Crosshair, RotateCcw, Volume2, Sparkles, Users, Radio, Trees, Trophy } from 'lucide-react';
import { TIGREAL_DATA } from '../data/portfolioData';

interface SkillCooldowns {
  s1: number; // max 3s
  s2: number; // max 5s
  ult: number; // max 8s
  flicker: number; // max 10s
}

interface HeroBot {
  name: string;
  role: string;
  isAlly: boolean;
  mesh: THREE.Group;
  hp: number;
  maxHp: number;
  velocity: THREE.Vector3;
  knockupVelocity: number;
  isStunned: boolean;
  stunTimer: number;
  attackTimer: number;
  hpBarMesh?: THREE.Mesh;
}

export const Tigreal3DGame: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [gameMode, setGameMode] = useState<'teamfight' | 'practice'>('teamfight');
  const [comboScore, setComboScore] = useState(0);
  const [stunsCount, setStunsCount] = useState(0);
  const [blueScore, setBlueScore] = useState(0);
  const [redScore, setRedScore] = useState(0);
  const [announcement, setAnnouncement] = useState<string | null>("🎮 5v5 Moniyan Forest Battle — Тоглож эхлээрэй!");
  const [cameraMode, setCameraMode] = useState<'moba' | 'chase'>('moba');

  // Skill cooldown states for UI display
  const [cooldowns, setCooldowns] = useState<SkillCooldowns>({
    s1: 0,
    s2: 0,
    ult: 0,
    flicker: 0,
  });

  // Game Engine Refs
  const gameRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    player: THREE.Group;
    playerVelocity: THREE.Vector3;
    playerMesh: THREE.Group;
    shieldMesh: THREE.Mesh;
    swordMesh: THREE.Mesh;
    allies: HeroBot[];
    enemies: HeroBot[];
    effects: THREE.Mesh[];
    keys: { [key: string]: boolean };
    cooldownTimers: SkillCooldowns;
    isAttacking: boolean;
    attackAnimTimer: number;
  } | null>(null);

  const announce = (msg: string) => {
    setAnnouncement(msg);
    setTimeout(() => {
      setAnnouncement(null);
    }, 2200);
  };

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight || 480;

    // 1. SCENE & CAMERA
    const scene = new THREE.Scene();
    // MLBB Moniyan Forest Atmosphere (Night/Twilight Jungle)
    scene.background = new THREE.Color(0x0a1612);
    scene.fog = new THREE.FogExp2(0x0a1612, 0.018);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 20, 24);
    camera.lookAt(0, 0, 0);

    // 2. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 3. LIGHTS
    const ambientLight = new THREE.AmbientLight(0x7dd3fc, 0.6); // Cool sky ambient
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffedd5, 1.3); // Warm sunlight through trees
    dirLight.position.set(25, 45, 15);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 1024;
    dirLight.shadow.mapSize.height = 1024;
    dirLight.shadow.camera.near = 0.5;
    dirLight.shadow.camera.far = 120;
    dirLight.shadow.camera.left = -35;
    dirLight.shadow.camera.right = 35;
    dirLight.shadow.camera.top = 35;
    dirLight.shadow.camera.bottom = -35;
    scene.add(dirLight);

    // Orange Glow Light on Tigreal/Center
    const centerPointLight = new THREE.PointLight(0xd94f04, 2, 25);
    centerPointLight.position.set(0, 6, 0);
    scene.add(centerPointLight);

    // 4. JUNGLE ENVIRONMENT & TERRAIN ("Oin Modppr bayjuulah")
    // Ground plane - Lush Jungle Grass
    const groundGeo = new THREE.PlaneGeometry(80, 80, 32, 32);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x143323, // Deep Moniyan jungle grass
      roughness: 0.9,
      metalness: 0.1,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Stone Pathway Lane down the center
    const laneGeo = new THREE.PlaneGeometry(16, 80);
    const laneMat = new THREE.MeshStandardMaterial({
      color: 0x2d3748,
      roughness: 0.7,
      metalness: 0.2,
    });
    const lane = new THREE.Mesh(laneGeo, laneMat);
    lane.rotation.x = -Math.PI / 2;
    lane.position.y = 0.01;
    lane.receiveShadow = true;
    scene.add(lane);

    // River across the jungle (diagonal / horizontal blue channel)
    const riverGeo = new THREE.PlaneGeometry(80, 10);
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      roughness: 0.1,
      metalness: 0.8,
      transparent: true,
      opacity: 0.85,
    });
    const river = new THREE.Mesh(riverGeo, riverMat);
    river.rotation.x = -Math.PI / 2;
    river.rotation.z = Math.PI / 6; // Angled river
    river.position.y = 0.02;
    scene.add(river);

    // Helper functions for Jungle Trees, Rocks, Bushes
    const createTree = (x: number, z: number, scale = 1) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, 0, z);

      // Trunk
      const trunkGeo = new THREE.CylinderGeometry(0.4 * scale, 0.6 * scale, 3 * scale, 6);
      const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a2e18, roughness: 0.9 });
      const trunk = new THREE.Mesh(trunkGeo, trunkMat);
      trunk.position.y = (1.5 * scale);
      trunk.castShadow = true;
      treeGroup.add(trunk);

      // Foliage Layer 1 (Lower)
      const leaf1Geo = new THREE.ConeGeometry(2.2 * scale, 3.5 * scale, 7);
      const leafMat1 = new THREE.MeshStandardMaterial({ color: 0x166534, roughness: 0.6 });
      const leaf1 = new THREE.Mesh(leaf1Geo, leafMat1);
      leaf1.position.y = (3.5 * scale);
      leaf1.castShadow = true;
      treeGroup.add(leaf1);

      // Foliage Layer 2 (Upper)
      const leaf2Geo = new THREE.ConeGeometry(1.6 * scale, 2.8 * scale, 7);
      const leafMat2 = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 });
      const leaf2 = new THREE.Mesh(leaf2Geo, leafMat2);
      leaf2.position.y = (5.2 * scale);
      leaf2.castShadow = true;
      treeGroup.add(leaf2);

      scene.add(treeGroup);
    };

    const createRock = (x: number, z: number, scale = 1) => {
      const rockGeo = new THREE.DodecahedronGeometry(1.2 * scale, 1);
      const rockMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.8, metalness: 0.2 });
      const rock = new THREE.Mesh(rockGeo, rockMat);
      rock.position.set(x, 0.6 * scale, z);
      rock.rotation.set(Math.random(), Math.random(), Math.random());
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    };

    const createBush = (x: number, z: number) => {
      const bushGeo = new THREE.SphereGeometry(1.2, 8, 8);
      const bushMat = new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.9 });
      const bush = new THREE.Mesh(bushGeo, bushMat);
      bush.scale.set(1.4, 0.8, 1.2);
      bush.position.set(x, 0.5, z);
      bush.castShadow = true;
      scene.add(bush);
    };

    // Populate Forest Trees around map perimeter & jungle areas
    const treePositions = [
      [-28, -28], [-20, -28], [-12, -28], [12, -28], [20, -28], [28, -28],
      [-28, 28], [-20, 28], [-12, 28], [12, 28], [20, 28], [28, 28],
      [-30, -18], [-30, -8], [-30, 8], [-30, 18],
      [30, -18], [30, -8], [30, 8], [30, 18],
      // Inner Jungle Patches (Top-Left & Bottom-Right)
      [-18, -12], [-22, -14], [-16, -18], [-24, -8],
      [18, 12], [22, 14], [16, 18], [24, 8],
      [-15, 12], [-18, 16], [15, -12], [18, -16]
    ];

    treePositions.forEach(([x, z]) => {
      createTree(x, z, 0.9 + Math.random() * 0.4);
    });

    // Populate Rocks & Bushes in Jungle
    const rockPositions = [
      [-12, -10], [-22, 5], [14, 10], [22, -8],
      [-8, 20], [8, -22], [-25, -25], [25, 25]
    ];
    rockPositions.forEach(([x, z]) => createRock(x, z, 1 + Math.random() * 0.8));

    const bushPositions = [
      [-10, -6], [10, 6], [-14, 8], [14, -8],
      [-6, -18], [6, 18], [0, 12], [0, -12]
    ];
    bushPositions.forEach(([x, z]) => createBush(x, z));

    // Glowing Moniyan Crystal Pillars
    const crystalGeo = new THREE.OctahedronGeometry(1.2, 0);
    const crystalMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
    const c1 = new THREE.Mesh(crystalGeo, crystalMat);
    c1.position.set(-10, 3, -15);
    scene.add(c1);

    const c2 = new THREE.Mesh(crystalGeo, crystalMat);
    c2.position.set(10, 3, 15);
    scene.add(c2);

    // 5. TIGREAL PLAYER MESH (Stylized 3D Tank Knight)
    const playerGroup = new THREE.Group();
    playerGroup.position.set(0, 0, 8); // Start on Blue side

    const playerInner = new THREE.Group();

    // Body/Torso Armor
    const bodyGeo = new THREE.CylinderGeometry(0.8, 0.6, 2, 8);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.3;
    body.castShadow = true;
    playerInner.add(body);

    // Gold Chestpiece Accent
    const chestGeo = new THREE.BoxGeometry(0.9, 0.8, 0.9);
    const chestMat = new THREE.MeshStandardMaterial({ color: 0xd94f04, metalness: 0.9, roughness: 0.1 });
    const chest = new THREE.Mesh(chestGeo, chestMat);
    chest.position.set(0, 1.5, 0.1);
    chest.castShadow = true;
    playerInner.add(chest);

    // Head / Helmet
    const headGeo = new THREE.SphereGeometry(0.55, 12, 12);
    const headMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.1 });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 2.6;
    head.castShadow = true;
    playerInner.add(head);

    // Helmet Visor Glow
    const visorGeo = new THREE.BoxGeometry(0.6, 0.15, 0.3);
    const visorMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    visor.position.set(0, 2.65, 0.4);
    playerInner.add(visor);

    // Shield (Left Arm)
    const shieldGeo = new THREE.BoxGeometry(0.2, 2.2, 1.4);
    const shieldMat = new THREE.MeshStandardMaterial({ color: 0xd94f04, metalness: 0.8, roughness: 0.2 });
    const shieldMesh = new THREE.Mesh(shieldGeo, shieldMat);
    shieldMesh.position.set(-1.0, 1.4, 0.3);
    shieldMesh.rotation.y = Math.PI / 6;
    shieldMesh.castShadow = true;
    playerInner.add(shieldMesh);

    // Greatsword (Right Arm)
    const swordGroup = new THREE.Group();
    swordGroup.position.set(1.0, 1.2, 0.2);

    const hiltGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.6);
    const hiltMat = new THREE.MeshStandardMaterial({ color: 0x78350f });
    const hilt = new THREE.Mesh(hiltGeo, hiltMat);
    hilt.position.y = -0.3;
    swordGroup.add(hilt);

    const bladeGeo = new THREE.BoxGeometry(0.12, 2.8, 0.4);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xf1f5f9, metalness: 0.95, roughness: 0.1 });
    const swordMesh = new THREE.Mesh(bladeGeo, bladeMat);
    swordMesh.position.y = 1.2;
    swordMesh.castShadow = true;
    swordGroup.add(swordMesh);

    playerInner.add(swordGroup);

    // Cape
    const capeGeo = new THREE.PlaneGeometry(1.2, 2.0);
    const capeMat = new THREE.MeshStandardMaterial({ color: 0xb91c1c, side: THREE.DoubleSide });
    const cape = new THREE.Mesh(capeGeo, capeMat);
    cape.position.set(0, 1.4, -0.6);
    cape.rotation.x = 0.2;
    playerInner.add(cape);

    playerGroup.add(playerInner);
    scene.add(playerGroup);

    // 6. MULTIPLAYER BOTS CREATION (Allies - Blue Team & Enemies - Red Team)
    const createBotHero = (name: string, role: string, isAlly: boolean, startX: number, startZ: number): HeroBot => {
      const botGroup = new THREE.Group();
      botGroup.position.set(startX, 0, startZ);

      // Hero Body Mesh
      const primaryColor = isAlly ? (role === 'Mage' ? 0x8b5cf6 : role === 'MM' ? 0x0ea5e9 : 0x0284c7) : 0xd97706;
      const bodyGeo = new THREE.CylinderGeometry(0.65, 0.45, 1.7, 8);
      const bodyMat = new THREE.MeshStandardMaterial({ color: primaryColor, roughness: 0.5 });
      const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
      bodyMesh.position.y = 1.0;
      bodyMesh.castShadow = true;
      botGroup.add(bodyMesh);

      // Head
      const hGeo = new THREE.SphereGeometry(0.45, 10, 10);
      const hMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc });
      const headMesh = new THREE.Mesh(hGeo, hMat);
      headMesh.position.y = 2.1;
      headMesh.castShadow = true;
      botGroup.add(headMesh);

      // Team Ring Indicator on Floor (Blue for Ally, Red for Enemy)
      const ringGeo = new THREE.RingGeometry(0.8, 1.0, 16);
      const ringMat = new THREE.MeshBasicMaterial({ color: isAlly ? 0x38bdf8 : 0xef4444, side: THREE.DoubleSide });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.03;
      botGroup.add(ring);

      scene.add(botGroup);

      return {
        name,
        role,
        isAlly,
        mesh: botGroup,
        hp: 100,
        maxHp: 100,
        velocity: new THREE.Vector3(),
        knockupVelocity: 0,
        isStunned: false,
        stunTimer: 0,
        attackTimer: 0,
      };
    };

    // Spawn 5v5 Blue Allies (Layla, Eudora, Miya, Gusion)
    const initialAllies: HeroBot[] = [
      createBotHero('Layla', 'MM', true, -4, 12),
      createBotHero('Eudora', 'Mage', true, 4, 12),
      createBotHero('Miya', 'MM', true, -6, 15),
      createBotHero('Gusion', 'Assassin', true, 6, 15),
    ];

    // Spawn 5v5 Red Enemies (Balmond, Zilong, Saber, Nana, Layla-bot)
    const initialEnemies: HeroBot[] = [
      createBotHero('Balmond', 'Fighter', false, -5, -10),
      createBotHero('Zilong', 'Fighter', false, 5, -10),
      createBotHero('Saber', 'Assassin', false, 0, -14),
      createBotHero('Nana', 'Mage', false, -7, -16),
      createBotHero('Layla-Bot', 'MM', false, 7, -16),
    ];

    // 7. GAME STATE REF
    const keysState: { [key: string]: boolean } = {};

    const cooldownsTimer: SkillCooldowns = {
      s1: 0,
      s2: 0,
      ult: 0,
      flicker: 0,
    };

    gameRef.current = {
      scene,
      camera,
      renderer,
      player: playerGroup,
      playerVelocity: new THREE.Vector3(),
      playerMesh: playerInner,
      shieldMesh,
      swordMesh,
      allies: initialAllies,
      enemies: initialEnemies,
      effects: [],
      keys: keysState,
      cooldownTimers: cooldownsTimer,
      isAttacking: false,
      attackAnimTimer: 0,
    };

    // 8. KEYBOARD LISTENERS
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent browser scroll when playing 3D game
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' ', 'KeyW', 'KeyA', 'KeyS', 'KeyD'].includes(e.code)) {
        if (document.activeElement === container || container.contains(document.activeElement)) {
          e.preventDefault();
        }
      }

      keysState[e.code] = true;

      // Hotkey Skills
      if (e.code === 'Digit1' || e.code === 'KeyQ') {
        triggerSkill1();
      } else if (e.code === 'Digit2' || e.code === 'KeyE') {
        triggerSkill2();
      } else if (e.code === 'Digit3' || e.code === 'KeyR') {
        triggerUlt();
      } else if (e.code === 'Space' || e.code === 'KeyF') {
        triggerFlicker();
      } else if (e.code === 'KeyJ') {
        triggerBasicAttack();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      keysState[e.code] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // 9. MAIN ANIMATION LOOP & AI BOT LOGIC
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const now = performance.now();
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const g = gameRef.current;
      if (!g) return;

      // Update cooldown timers
      if (g.cooldownTimers.s1 > 0) g.cooldownTimers.s1 = Math.max(0, g.cooldownTimers.s1 - delta);
      if (g.cooldownTimers.s2 > 0) g.cooldownTimers.s2 = Math.max(0, g.cooldownTimers.s2 - delta);
      if (g.cooldownTimers.ult > 0) g.cooldownTimers.ult = Math.max(0, g.cooldownTimers.ult - delta);
      if (g.cooldownTimers.flicker > 0) g.cooldownTimers.flicker = Math.max(0, g.cooldownTimers.flicker - delta);

      setCooldowns({ ...g.cooldownTimers });

      // Player Movement Physics
      const moveSpeed = 12.0;
      let moveX = 0;
      let moveZ = 0;

      if (g.keys['KeyW'] || g.keys['ArrowUp']) moveZ -= 1;
      if (g.keys['KeyS'] || g.keys['ArrowDown']) moveZ += 1;
      if (g.keys['KeyA'] || g.keys['ArrowLeft']) moveX -= 1;
      if (g.keys['KeyD'] || g.keys['ArrowRight']) moveX += 1;

      if (moveX !== 0 || moveZ !== 0) {
        const moveVec = new THREE.Vector3(moveX, 0, moveZ).normalize();
        g.player.position.x += moveVec.x * moveSpeed * delta;
        g.player.position.z += moveVec.z * moveSpeed * delta;

        // Bound to arena
        g.player.position.x = THREE.MathUtils.clamp(g.player.position.x, -32, 32);
        g.player.position.z = THREE.MathUtils.clamp(g.player.position.z, -32, 32);

        // Rotate facing direction
        const targetAngle = Math.atan2(moveVec.x, moveVec.z);
        g.playerMesh.rotation.y = THREE.MathUtils.lerp(g.playerMesh.rotation.y, targetAngle, 0.2);

        // Walking tilt animation
        g.playerMesh.rotation.z = Math.sin(now * 0.015) * 0.08;
      } else {
        g.playerMesh.rotation.z = THREE.MathUtils.lerp(g.playerMesh.rotation.z, 0, 0.1);
      }

      // Attack Animation decay
      if (g.isAttacking) {
        g.attackAnimTimer += delta * 10;
        g.swordMesh.rotation.x = Math.sin(g.attackAnimTimer) * 1.5;
        if (g.attackAnimTimer >= Math.PI) {
          g.isAttacking = false;
          g.swordMesh.rotation.x = 0;
        }
      }

      // Camera Follow
      if (cameraMode === 'moba') {
        g.camera.position.x = THREE.MathUtils.lerp(g.camera.position.x, g.player.position.x, 0.1);
        g.camera.position.z = THREE.MathUtils.lerp(g.camera.position.z, g.player.position.z + 22, 0.1);
        g.camera.position.y = 22;
        g.camera.lookAt(g.player.position.x, 0, g.player.position.z);
      } else {
        // Chase Cam
        const angle = g.playerMesh.rotation.y;
        const camDist = 12;
        const targetCamX = g.player.position.x - Math.sin(angle) * camDist;
        const targetCamZ = g.player.position.z - Math.cos(angle) * camDist;
        g.camera.position.x = THREE.MathUtils.lerp(g.camera.position.x, targetCamX, 0.1);
        g.camera.position.z = THREE.MathUtils.lerp(g.camera.position.z, targetCamZ, 0.1);
        g.camera.position.y = 8;
        g.camera.lookAt(g.player.position.x, 2, g.player.position.z);
      }

      // AI BOT BEHAVIOR: Blue Allies Follow Tigreal & Shoot Stunned Enemies
      g.allies.forEach((ally, i) => {
        // Find nearest active enemy
        let targetEnemy: HeroBot | null = null;
        let minDist = 999;
        g.enemies.forEach((enemy) => {
          if (enemy.hp > 0) {
            const d = ally.mesh.position.distanceTo(enemy.mesh.position);
            if (d < minDist) {
              minDist = d;
              targetEnemy = enemy;
            }
          }
        });

        if (targetEnemy && minDist < 15) {
          // Move towards target / Shoot range
          const dir = new THREE.Vector3().subVectors((targetEnemy as HeroBot).mesh.position, ally.mesh.position).normalize();
          if (minDist > 5) {
            ally.mesh.position.addScaledVector(dir, 6 * delta);
          }

          // Ally Attack Particle Effect
          ally.attackTimer += delta;
          if (ally.attackTimer >= 1.2) {
            ally.attackTimer = 0;

            // Shoot Projectile FX
            const pGeo = new THREE.SphereGeometry(0.3, 8, 8);
            const pMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
            const pMesh = new THREE.Mesh(pGeo, pMat);
            pMesh.position.copy(ally.mesh.position);
            pMesh.position.y = 1.5;
            g.scene.add(pMesh);
            g.effects.push(pMesh);

            // Deal damage to enemy
            (targetEnemy as HeroBot).hp -= 15;
            if ((targetEnemy as HeroBot).hp <= 0) {
              (targetEnemy as HeroBot).mesh.position.set(0, -50, 0); // Despawn
              setBlueScore((prev) => prev + 1);
              announce(`⚔️ ${ally.name} (${ally.role}) - Дайсны баатрыг устгалаа!`);
            }
          }
        } else {
          // Follow Tigreal Tank
          const followPos = g.player.position.clone().add(new THREE.Vector3((i - 1.5) * 3, 0, 4));
          ally.mesh.position.lerp(followPos, 0.05);
        }
      });

      // AI BOT BEHAVIOR: Red Enemies Physics, Stun & Counter Attack
      g.enemies.forEach((enemy) => {
        if (enemy.hp <= 0) return;

        // Knockup Physics
        if (enemy.knockupVelocity !== 0 || enemy.mesh.position.y > 0) {
          enemy.mesh.position.y += enemy.knockupVelocity * delta;
          enemy.knockupVelocity -= 25 * delta; // gravity
          if (enemy.mesh.position.y <= 0) {
            enemy.mesh.position.y = 0;
            enemy.knockupVelocity = 0;
          }
        }

        // Stun Timer
        if (enemy.isStunned) {
          enemy.stunTimer -= delta;
          if (enemy.stunTimer <= 0) {
            enemy.isStunned = false;
            enemy.mesh.rotation.z = 0;
          } else {
            enemy.mesh.rotation.z = Math.sin(now * 0.03) * 0.2; // wobble stun
          }
        } else {
          // Advance towards Tigreal/Allies
          const distToPlayer = enemy.mesh.position.distanceTo(g.player.position);
          if (distToPlayer > 3 && distToPlayer < 18) {
            const dir = new THREE.Vector3().subVectors(g.player.position, enemy.mesh.position).normalize();
            enemy.mesh.position.addScaledVector(dir, 4.5 * delta);
          }
        }
      });

      // Cleanup Visual Effects
      for (let i = g.effects.length - 1; i >= 0; i--) {
        const fx = g.effects[i];
        fx.scale.addScalar(delta * 4);
        (fx.material as THREE.MeshBasicMaterial).opacity -= delta * 1.5;
        if ((fx.material as THREE.MeshBasicMaterial).opacity <= 0) {
          g.scene.remove(fx);
          g.effects.splice(i, 1);
        }
      }

      g.renderer.render(g.scene, g.camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!mountRef.current || !gameRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight || 480;
      gameRef.current.camera.aspect = w / h;
      gameRef.current.camera.updateProjectionMatrix();
      gameRef.current.renderer.setSize(w, h);
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
    };
  }, [cameraMode, gameMode]);

  // Skill Handlers
  const triggerSkill1 = () => {
    const g = gameRef.current;
    if (!g || g.cooldownTimers.s1 > 0) return;

    g.cooldownTimers.s1 = 3.0;
    g.isAttacking = true;
    g.attackAnimTimer = 0;

    // Create 3D Shockwave
    const playerPos = g.player.position;
    const facingAngle = g.playerMesh.rotation.y;

    const waveGeo = new THREE.BoxGeometry(3.5, 0.2, 9);
    const waveMat = new THREE.MeshBasicMaterial({ color: 0xd94f04, transparent: true, opacity: 0.85 });
    const waveMesh = new THREE.Mesh(waveGeo, waveMat);

    const dirX = Math.sin(facingAngle);
    const dirZ = Math.cos(facingAngle);

    waveMesh.position.set(playerPos.x + dirX * 4, 0.1, playerPos.z + dirZ * 4);
    waveMesh.rotation.y = facingAngle;
    g.scene.add(waveMesh);
    g.effects.push(waveMesh);

    // Damage / Hit Check
    let hitCount = 0;
    g.enemies.forEach((enemy) => {
      if (enemy.hp <= 0) return;
      const dist = enemy.mesh.position.distanceTo(playerPos);
      if (dist < 8) {
        enemy.hp -= 25;
        enemy.isStunned = true;
        enemy.stunTimer = 1.2;
        hitCount++;
      }
    });

    setComboScore((prev) => prev + hitCount * 100);
    announce(`Skill 1: Shockwave! (${hitCount} дайсан удаашрав)`);
  };

  const triggerSkill2 = () => {
    const g = gameRef.current;
    if (!g || g.cooldownTimers.s2 > 0) return;

    g.cooldownTimers.s2 = 5.0;

    // Sacred Hammer Charge Forward
    const facingAngle = g.playerMesh.rotation.y;
    const dirX = Math.sin(facingAngle);
    const dirZ = Math.cos(facingAngle);

    const chargeDist = 7;
    g.player.position.x += dirX * chargeDist;
    g.player.position.z += dirZ * chargeDist;

    // Clamp
    g.player.position.x = THREE.MathUtils.clamp(g.player.position.x, -30, 30);
    g.player.position.z = THREE.MathUtils.clamp(g.player.position.z, -30, 30);

    // Knockup surrounding enemies
    let knockedCount = 0;
    g.enemies.forEach((enemy) => {
      if (enemy.hp <= 0) return;
      const dist = enemy.mesh.position.distanceTo(g.player.position);
      if (dist < 6.5) {
        enemy.knockupVelocity = 14; // Jump into 3D air!
        enemy.isStunned = true;
        enemy.stunTimer = 1.8;
        knockedCount++;
      }
    });

    setStunsCount((prev) => prev + knockedCount);
    setComboScore((prev) => prev + knockedCount * 200);
    announce(`Skill 2: Sacred Hammer Knockup! (${knockedCount} дайсан агаарт хөөрлөө)`);
  };

  const triggerUlt = () => {
    const g = gameRef.current;
    if (!g || g.cooldownTimers.ult > 0) return;

    g.cooldownTimers.ult = 8.0;

    const playerPos = g.player.position;

    // Giant Implosion Ring FX
    const ringGeo = new THREE.RingGeometry(0.5, 11.0, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xd94f04, side: THREE.DoubleSide, transparent: true, opacity: 0.95 });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = -Math.PI / 2;
    ringMesh.position.set(playerPos.x, 0.1, playerPos.z);
    g.scene.add(ringMesh);
    g.effects.push(ringMesh);

    // Pull ALL nearby enemies to center & stun
    let pulledCount = 0;
    g.enemies.forEach((enemy) => {
      if (enemy.hp <= 0) return;
      const dist = enemy.mesh.position.distanceTo(playerPos);
      if (dist < 13) {
        // Drag towards Tigreal
        enemy.mesh.position.lerp(playerPos, 0.88);
        enemy.knockupVelocity = 10;
        enemy.isStunned = true;
        enemy.stunTimer = 2.8;
        pulledCount++;
      }
    });

    setStunsCount((prev) => prev + pulledCount);
    setComboScore((prev) => prev + pulledCount * 500);

    if (pulledCount >= 4) {
      announce(`🔥 SAVAGE TIGREAL IMPLOSION! (${pulledCount} ДАЙСАН БАГИЙН СТУНД ТАТЛАА)`);
    } else {
      announce(`Ultimate: Implosion! (${pulledCount} дайсан татаж Stun өгөв)`);
    }
  };

  const triggerFlicker = () => {
    const g = gameRef.current;
    if (!g || g.cooldownTimers.flicker > 0) return;

    g.cooldownTimers.flicker = 10.0;

    const facingAngle = g.playerMesh.rotation.y;
    const flashDist = 11;
    g.player.position.x += Math.sin(facingAngle) * flashDist;
    g.player.position.z += Math.cos(facingAngle) * flashDist;

    // Flash FX
    const flashGeo = new THREE.SphereGeometry(2.5, 16, 16);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.copy(g.player.position);
    g.scene.add(flashMesh);
    g.effects.push(flashMesh);

    announce(`✨ FLICKER DASH!`);
  };

  const triggerBasicAttack = () => {
    const g = gameRef.current;
    if (!g) return;

    g.isAttacking = true;
    g.attackAnimTimer = 0;

    let hit = 0;
    g.enemies.forEach((enemy) => {
      if (enemy.hp > 0 && enemy.mesh.position.distanceTo(g.player.position) < 3.8) {
        enemy.hp -= 20;
        hit++;
        if (enemy.hp <= 0) {
          enemy.mesh.position.set(0, -50, 0);
          setBlueScore((prev) => prev + 1);
          announce(`⚔️ Tigreal (You) - Kill Enemy ${enemy.name}!`);
        }
      }
    });

    if (hit > 0) {
      setComboScore((prev) => prev + hit * 50);
    }
  };

  const respawnEnemies = () => {
    const g = gameRef.current;
    if (!g) return;

    g.enemies.forEach((enemy, idx) => {
      const angles = [0, 1.2, 2.4, 3.6, 4.8];
      const r = 11;
      enemy.mesh.position.set(Math.cos(angles[idx]) * r, 0, Math.sin(angles[idx]) * r - 10);
      enemy.hp = 100;
      enemy.isStunned = false;
    });

    announce(`Дайсны баг шинээр гарч ирлээ!`);
  };

  return (
    <div className="relative w-full bg-[#0b0f19] border-2 border-black shadow-xl overflow-hidden text-white">
      {/* Top Game Bar HUD */}
      <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-[#111111] border-b border-white/15 text-xs font-mono z-10 relative">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-[#D94F04] rounded-full animate-ping" />
            <span className="font-unbounded font-black text-amber-400 uppercase text-xs">MONIYAN FOREST 5v5</span>
          </div>
          <span className="text-white/40 hidden sm:inline">|</span>
          <div className="flex items-center gap-2 bg-black/60 px-2 py-0.5 border border-white/20">
            <Users className="w-3.5 h-3.5 text-sky-400" />
            <span className="text-sky-400 font-bold">BLUE {blueScore}</span>
            <span className="text-white/40">:</span>
            <span className="text-red-400 font-bold">RED {redScore}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 border border-white/20">
            <span className="text-white/60">ОНОО:</span>
            <span className="font-unbounded font-black text-[#D94F04] text-sm">{comboScore}</span>
          </div>

          <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1 border border-white/20">
            <span className="text-white/60">STUNS:</span>
            <span className="font-unbounded font-black text-amber-400 text-sm">{stunsCount}</span>
          </div>

          <button
            onClick={() => setCameraMode(cameraMode === 'moba' ? 'chase' : 'moba')}
            className="px-2.5 py-1 bg-white/10 hover:bg-white/20 border border-white/20 text-[10px] font-bold uppercase transition-colors cursor-pointer"
          >
            {cameraMode === 'moba' ? '🎥 MOBA View' : '🎥 Chase Cam'}
          </button>
        </div>
      </div>

      {/* 3D Canvas Mounting Area */}
      <div
        ref={mountRef}
        tabIndex={0}
        onClick={() => setIsPlaying(true)}
        className="w-full h-[400px] sm:h-[480px] bg-[#0a1612] relative outline-none cursor-crosshair focus:ring-2 focus:ring-[#D94F04]"
      >
        {/* Floating In-Game Announcement Banner */}
        {announcement && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none animate-bounce">
            <div className="px-4 py-2 bg-[#D94F04] border-2 border-white text-white font-unbounded font-black text-xs sm:text-sm uppercase tracking-wider shadow-2xl">
              {announcement}
            </div>
          </div>
        )}

        {/* Start Game Overlay Prompt */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/75 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 bg-[#D94F04] border-2 border-white rounded-full flex items-center justify-center mb-4 text-2xl animate-pulse">
              🌲
            </div>
            <h3 className="font-unbounded font-black text-xl sm:text-2xl text-white uppercase mb-2">
              Tigreal 3D Moniyan Forest 5v5 Arena
            </h3>
            <p className="text-white/80 text-xs sm:text-sm max-w-md mb-6 font-medium">
              Ойн мод, хад чулуу, тулааны талбарт <strong>W, A, S, D</strong> товчоор яван, багийн нөхөдтэйгөө (Layla, Eudora, Miya) хамтран дайсны багийг Stun дээр татаж устгаарай!
            </p>
            <button
              onClick={() => setIsPlaying(true)}
              className="px-8 py-3.5 bg-[#D94F04] hover:bg-white hover:text-[#111111] text-white font-unbounded font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg border-2 border-white active:scale-95"
            >
              🎮 5v5 Тулаан Эхлүүлэх (Энд Дараарай)
            </button>
          </div>
        )}
      </div>

      {/* Bottom Skill Bar & Mobile Touch Controls */}
      <div className="p-4 bg-[#111111] border-t border-white/15">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto">
          {/* Skill 1: Attack Wave */}
          <button
            onClick={triggerSkill1}
            disabled={cooldowns.s1 > 0}
            className={`p-3 border flex flex-col items-center justify-center relative transition-all cursor-pointer active:scale-95 ${
              cooldowns.s1 > 0
                ? 'bg-black/50 border-white/10 opacity-50'
                : 'bg-[#1e293b] hover:bg-[#D94F04] border-white/20'
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Zap className="w-4 h-4 text-amber-400" />
              <span className="font-bold text-xs">Skill 1</span>
            </div>
            <span className="text-[10px] text-white/70">Shockwave [Q / 1]</span>
            {cooldowns.s1 > 0 && (
              <span className="absolute inset-0 bg-black/80 flex items-center justify-center font-unbounded font-black text-amber-400 text-sm">
                {cooldowns.s1.toFixed(1)}s
              </span>
            )}
          </button>

          {/* Skill 2: Sacred Hammer */}
          <button
            onClick={triggerSkill2}
            disabled={cooldowns.s2 > 0}
            className={`p-3 border flex flex-col items-center justify-center relative transition-all cursor-pointer active:scale-95 ${
              cooldowns.s2 > 0
                ? 'bg-black/50 border-white/10 opacity-50'
                : 'bg-[#1e293b] hover:bg-[#D94F04] border-white/20'
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Crosshair className="w-4 h-4 text-sky-400" />
              <span className="font-bold text-xs">Skill 2</span>
            </div>
            <span className="text-[10px] text-white/70">Knockup [E / 2]</span>
            {cooldowns.s2 > 0 && (
              <span className="absolute inset-0 bg-black/80 flex items-center justify-center font-unbounded font-black text-amber-400 text-sm">
                {cooldowns.s2.toFixed(1)}s
              </span>
            )}
          </button>

          {/* Ultimate: Implosion */}
          <button
            onClick={triggerUlt}
            disabled={cooldowns.ult > 0}
            className={`p-3 border flex flex-col items-center justify-center relative transition-all cursor-pointer active:scale-95 ${
              cooldowns.ult > 0
                ? 'bg-black/50 border-white/10 opacity-50'
                : 'bg-[#D94F04] hover:bg-amber-600 border-amber-400 shadow-[0_0_15px_rgba(217,79,4,0.5)]'
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Swords className="w-4 h-4 text-white" />
              <span className="font-unbounded font-black text-xs">ULTIMATE</span>
            </div>
            <span className="text-[10px] text-white/90">Implosion [R / 3]</span>
            {cooldowns.ult > 0 && (
              <span className="absolute inset-0 bg-black/80 flex items-center justify-center font-unbounded font-black text-amber-400 text-sm">
                {cooldowns.ult.toFixed(1)}s
              </span>
            )}
          </button>

          {/* Spell: Flicker */}
          <button
            onClick={triggerFlicker}
            disabled={cooldowns.flicker > 0}
            className={`p-3 border flex flex-col items-center justify-center relative transition-all cursor-pointer active:scale-95 ${
              cooldowns.flicker > 0
                ? 'bg-black/50 border-white/10 opacity-50'
                : 'bg-[#1e293b] hover:bg-[#D94F04] border-white/20'
            }`}
          >
            <div className="flex items-center gap-1 mb-1">
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span className="font-bold text-xs">FLICKER</span>
            </div>
            <span className="text-[10px] text-white/70">Flash [Space / F]</span>
            {cooldowns.flicker > 0 && (
              <span className="absolute inset-0 bg-black/80 flex items-center justify-center font-unbounded font-black text-amber-400 text-sm">
                {cooldowns.flicker.toFixed(1)}s
              </span>
            )}
          </button>

          {/* Respawn Enemies Button */}
          <button
            onClick={respawnEnemies}
            className="p-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-xs uppercase flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Шинэчлэх</span>
          </button>
        </div>
      </div>
    </div>
  );
};
