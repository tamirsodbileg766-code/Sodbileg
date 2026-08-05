import React, { useEffect, useRef, useState } from 'react';
import { Trophy, Zap, Shield, Target, RotateCcw, Activity, Play, Volume2, VolumeX, Sparkles, Award, ArrowLeft, ArrowRight, ArrowUp, Flame } from 'lucide-react';

interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  rotation: number;
  trail: { x: number; y: number; opacity: number }[];
  isSuperSpike: boolean;
}

interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  width: number;
  height: number;
  isGrounded: boolean;
  color: string;
  name: string;
}

export const VolleyballSection: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [botScore, setBotScore] = useState(0);
  const [setsWonPlayer, setSetsWonPlayer] = useState(0);
  const [setsWonBot, setSetsWonBot] = useState(0);
  const [rallyLength, setRallyLength] = useState(0);
  const [maxRally, setMaxRally] = useState(0);
  const [lastSpikeSpeed, setLastSpikeSpeed] = useState(0);
  const [announcement, setAnnouncement] = useState<string | null>("🏐 Тоглож эхлэхийн тулд 'Тоглох' дээр дараарай!");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');

  // Input states
  const keysRef = useRef<{ [key: string]: boolean }>({});
  const mobileControlsRef = useRef({ left: false, right: false, jump: false, spike: false });

  // Web Audio synth for retro arcade sound FX
  const playSound = (type: 'hit' | 'spike' | 'point' | 'whistle') => {
    if (!soundEnabled) return;
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      const now = ctx.currentTime;
      if (type === 'hit') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(150, now + 0.1);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'spike') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(600, now);
        osc.frequency.exponentialRampToValueAtTime(120, now + 0.2);
        gain.gain.setValueAtTime(0.5, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'point') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.1);
        osc.frequency.setValueAtTime(783.99, now + 0.2);
        gain.gain.setValueAtTime(0.3, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'whistle') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(2200, now);
        osc.frequency.setValueAtTime(2400, now + 0.08);
        osc.frequency.setValueAtTime(2200, now + 0.16);
        gain.gain.setValueAtTime(0.25, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      }
    } catch {
      // Audio fallback
    }
  };

  const showBanner = (text: string) => {
    setAnnouncement(text);
    setTimeout(() => {
      setAnnouncement(null);
    }, 2500);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = true;
      if (['ArrowUp', 'ArrowLeft', 'ArrowRight', 'Space', ' '].includes(e.key)) {
        if (e.target === document.body || e.target === canvasRef.current) {
          e.preventDefault();
        }
      }
    };
    const handleKeyUp = (e: KeyboardEvent) => {
      keysRef.current[e.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 700;
    const height = 380;
    canvas.width = width;
    canvas.height = height;

    const gravity = 0.35;
    const netHeight = 100;
    const netWidth = 10;
    const netX = width / 2 - netWidth / 2;
    const groundY = height - 40;

    // Player 1 (Sodbileg - Left side)
    const p1: Player = {
      x: 120,
      y: groundY - 50,
      vx: 0,
      vy: 0,
      width: 32,
      height: 50,
      isGrounded: true,
      color: '#111111',
      name: 'Содбилэгийн Баг',
    };

    // Opponent Bot (Right side)
    const bot: Player = {
      x: 550,
      y: groundY - 50,
      vx: 0,
      vy: 0,
      width: 32,
      height: 50,
      isGrounded: true,
      color: '#111111',
      name: 'ӨРСӨЛДӨГЧ БОТ',
    };

    // Ball
    const ball: Ball = {
      x: 160,
      y: 120,
      vx: 2,
      vy: -3,
      radius: 14,
      rotation: 0,
      trail: [],
      isSuperSpike: false,
    };

    let p1Touches = 0;
    let botTouches = 0;
    let currentRally = 0;
    let animationId: number;

    const resetBall = (toPlayer = true) => {
      ball.x = toPlayer ? 160 : 540;
      ball.y = 120;
      ball.vx = toPlayer ? 2 : -2;
      ball.vy = -3;
      ball.trail = [];
      ball.isSuperSpike = false;
      p1Touches = 0;
      botTouches = 0;
      p1.x = 120;
      p1.y = groundY - p1.height;
      p1.vy = 0;
      bot.x = 550;
      bot.y = groundY - bot.height;
      bot.vy = 0;
    };

    const awardPoint = (toPlayer: boolean, reason: string) => {
      playSound('point');
      currentRally = 0;
      setRallyLength(0);

      if (toPlayer) {
        setPlayerScore((prev) => {
          const next = prev + 1;
          if (next >= 15) {
            setSetsWonPlayer((s) => s + 1);
            showBanner("🏆 СЕТИЙН ЯЛАГЧ! Содбилэг 15 оноо авлаа!");
            playSound('whistle');
            setBotScore(0);
            return 0;
          }
          showBanner(`🔥 Оноо Содбилэгт! (${reason})`);
          return next;
        });
        resetBall(true);
      } else {
        setBotScore((prev) => {
          const next = prev + 1;
          if (next >= 15) {
            setSetsWonBot((s) => s + 1);
            showBanner("⚠️ Өрсөлдөгч Бот Сетийг хожлоо!");
            playSound('whistle');
            setPlayerScore(0);
            return 0;
          }
          showBanner(`❌ Оноо Өрсөлдөгчид! (${reason})`);
          return next;
        });
        resetBall(false);
      }
    };

    // Main Game Loop
    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      if (isPlaying && !isPausedRef.current) {
        // --- 1. CONTROLS & MOVEMENT (P1 - Sodbileg) ---
        const moveSpeed = 8.5; // High responsiveness
        const jumpForce = -11.0;

        const leftPressed = keysRef.current['a'] || keysRef.current['arrowleft'] || mobileControlsRef.current.left;
        const rightPressed = keysRef.current['d'] || keysRef.current['arrowright'] || mobileControlsRef.current.right;
        const jumpPressed = keysRef.current['w'] || keysRef.current['arrowup'] || keysRef.current[' '] || mobileControlsRef.current.jump;
        const spikePressed = keysRef.current['j'] || keysRef.current['k'] || mobileControlsRef.current.spike;

        if (leftPressed) p1.x -= moveSpeed;
        if (rightPressed) p1.x += moveSpeed;

        // Player Bounds
        p1.x = Math.max(20, Math.min(netX - p1.width - 5, p1.x));

        // Jump
        if (jumpPressed && p1.isGrounded) {
          p1.vy = jumpForce;
          p1.isGrounded = false;
        }

        // P1 Gravity
        p1.vy += gravity;
        p1.y += p1.vy;
        if (p1.y >= groundY - p1.height) {
          p1.y = groundY - p1.height;
          p1.vy = 0;
          p1.isGrounded = true;
        }

        // --- 2. BOT AI (Opponent) ---
        let botSpeed = difficulty === 'easy' ? 2.8 : difficulty === 'medium' ? 4.2 : 5.8;
        const targetX = ball.x > netX ? ball.x - 15 : 550;

        if (bot.x < targetX - 5) bot.x += botSpeed;
        else if (bot.x > targetX + 5) bot.x -= botSpeed;

        bot.x = Math.max(netX + netWidth + 5, Math.min(width - bot.width - 20, bot.x));

        // Bot Jump AI
        if (ball.x > netX && ball.y < groundY - 70 && Math.abs(ball.x - (bot.x + bot.width / 2)) < 35 && bot.isGrounded) {
          if (Math.random() < (difficulty === 'easy' ? 0.35 : difficulty === 'medium' ? 0.75 : 0.9)) {
            bot.vy = jumpForce;
            bot.isGrounded = false;
          }
        }

        bot.vy += gravity;
        bot.y += bot.vy;
        if (bot.y >= groundY - bot.height) {
          bot.y = groundY - bot.height;
          bot.vy = 0;
          bot.isGrounded = true;
        }

        // --- 3. BALL PHYSICS & COLLISIONS ---
        ball.vy += gravity * 0.75;
        ball.x += ball.vx;
        ball.y += ball.vy;
        ball.rotation += ball.vx * 0.05;

        // Add ball trail
        ball.trail.push({ x: ball.x, y: ball.y, opacity: 1.0 });
        if (ball.trail.length > (ball.isSuperSpike ? 10 : 5)) {
          ball.trail.shift();
        }
        ball.trail.forEach((t) => (t.opacity *= 0.8));

        // Net Collision
        if (
          ball.x + ball.radius > netX &&
          ball.x - ball.radius < netX + netWidth &&
          ball.y + ball.radius > groundY - netHeight
        ) {
          if (ball.y < groundY - netHeight + 15) {
            ball.vy = -Math.abs(ball.vy) * 0.8;
          } else {
            ball.vx = -ball.vx * 0.7;
          }
        }

        // Ceiling and Wall Collisions
        if (ball.y - ball.radius <= 0) {
          ball.y = ball.radius;
          ball.vy = Math.abs(ball.vy) * 0.8;
        }
        if (ball.x - ball.radius <= 0) {
          ball.x = ball.radius;
          ball.vx = Math.abs(ball.vx) * 0.8;
        }
        if (ball.x + ball.radius >= width) {
          ball.x = width - ball.radius;
          ball.vx = -Math.abs(ball.vx) * 0.8;
        }

        // Player 1 Hit Detection (Sodbileg - Generous Hit Detection)
        const p1CenterX = p1.x + p1.width / 2;
        const p1CenterY = p1.y + p1.height / 2;
        const distP1 = Math.hypot(ball.x - p1CenterX, ball.y - p1CenterY);

        const isPlayerNearby = distP1 < ball.radius + p1.width * 1.5 ||
          (ball.x >= p1.x - 22 && ball.x <= p1.x + p1.width + 22 && ball.y >= p1.y - 20 && ball.y <= p1.y + p1.height + 25);

        if (isPlayerNearby) {
          p1Touches++;
          botTouches = 0;
          currentRally++;
          setRallyLength(currentRally);
          setMaxRally((prev) => Math.max(prev, currentRally));

          // Allow generous touches without penalty
          if (p1Touches > 8) {
            awardPoint(false, "Олон хүрэлт");
          } else {
            const hitAngle = (ball.x - p1CenterX) / (p1.width / 2);
            if (spikePressed || !p1.isGrounded) {
              ball.isSuperSpike = true;
              ball.vx = 7.5 + Math.random() * 2.5;
              ball.vy = 3.5 + Math.random() * 2;
              playSound('spike');
              const speedKm = Math.round(Math.abs(ball.vx) * 12 + 45);
              setLastSpikeSpeed(speedKm);
              showBanner(`⚡ СҮРЛЭГ ДОБТОЛГОО! (${speedKm} км/ц)`);
            } else {
              ball.isSuperSpike = false;
              ball.vx = Math.max(4.5, hitAngle * 5 + 4.5);
              ball.vy = -11.0;
              playSound('hit');
            }
          }
        }

        // Opponent Bot Hit Detection
        const botCenterX = bot.x + bot.width / 2;
        const botCenterY = bot.y + bot.height / 2;
        const distBot = Math.hypot(ball.x - botCenterX, ball.y - botCenterY);

        if (distBot < ball.radius + bot.width / 1.5) {
          botTouches++;
          p1Touches = 0;
          currentRally++;
          setRallyLength(currentRally);
          setMaxRally((prev) => Math.max(prev, currentRally));

          if (botTouches > 3) {
            awardPoint(true, "ӨРСӨЛДӨГЧ 3-аас олон хүрэв");
          } else {
            const hitAngle = (ball.x - botCenterX) / (bot.width / 2);
            if (!bot.isGrounded && Math.random() > 0.3) {
              ball.isSuperSpike = true;
              ball.vx = -(7 + Math.random() * 3);
              ball.vy = 4 + Math.random() * 3;
              playSound('spike');
            } else {
              ball.isSuperSpike = false;
              ball.vx = hitAngle * 5 - 4;
              ball.vy = -10;
              playSound('hit');
            }
          }
        }

        // Floor Touches / Point Scoring
        if (ball.y + ball.radius >= groundY) {
          ball.y = groundY - ball.radius;
          if (ball.x < netX) {
            awardPoint(false, "Бөмбөг танай талбайд буулаа");
          } else {
            awardPoint(true, "Сүрлэг довтолгоо талбайд буулаа");
          }
        }
      }

      // --- 4. CANVAS RENDERING (GRAPHICS) ---
      ctx.fillStyle = '#E2E8F0';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#D97706';
      ctx.fillRect(0, groundY, width, height - groundY);

      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, groundY - 220, width - 40, 220);

      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(200, groundY - 220);
      ctx.lineTo(200, groundY);
      ctx.moveTo(500, groundY - 220);
      ctx.lineTo(500, groundY);
      ctx.strokeStyle = '#FFFFFF';
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = '#111111';
      ctx.fillRect(netX, groundY - netHeight, netWidth, netHeight);
      ctx.fillRect(netX - 2, groundY - netHeight - 4, netWidth + 4, 8);

      ball.trail.forEach((t) => {
        ctx.beginPath();
        ctx.arc(t.x, t.y, ball.radius * 0.8, 0, Math.PI * 2);
        ctx.fillStyle = ball.isSuperSpike
          ? `rgba(17, 17, 17, ${t.opacity})`
          : `rgba(200, 200, 200, ${t.opacity})`;
        ctx.fill();
      });

      ctx.save();
      ctx.translate(ball.x, ball.y);
      ctx.rotate(ball.rotation);
      ctx.beginPath();
      ctx.arc(0, 0, ball.radius, 0, Math.PI * 2);
      ctx.fillStyle = ball.isSuperSpike ? '#111111' : '#F8FAFC';
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#111111';
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, ball.radius * 0.7, 0, Math.PI);
      ctx.strokeStyle = '#1E293B';
      ctx.stroke();
      ctx.restore();

      // Draw Player 1
      ctx.fillStyle = p1.color;
      ctx.fillRect(p1.x, p1.y + 15, p1.width, p1.height - 15);
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 2;
      ctx.strokeRect(p1.x, p1.y + 15, p1.width, p1.height - 15);

      ctx.beginPath();
      ctx.arc(p1.x + p1.width / 2, p1.y + 10, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#E2E8F0';
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('7', p1.x + 12, p1.y + 34);

      // Draw Bot
      ctx.fillStyle = bot.color;
      ctx.fillRect(bot.x, bot.y + 15, bot.width, bot.height - 15);
      ctx.strokeRect(bot.x, bot.y + 15, bot.width, bot.height - 15);

      ctx.beginPath();
      ctx.arc(bot.x + bot.width / 2, bot.y + 10, 12, 0, Math.PI * 2);
      ctx.fillStyle = '#94A3B8';
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 12px monospace';
      ctx.fillText('1', bot.x + 12, bot.y + 34);

      ctx.fillStyle = '#111111';
      ctx.font = 'bold 10px sans-serif';
      ctx.fillText(p1.name, p1.x - 5, p1.y - 6);
      ctx.fillText(bot.name, bot.x - 5, bot.y - 6);

      animationId = requestAnimationFrame(loop);
    };

    animationId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [isPlaying, difficulty]);

  return (
    <section id="volleyball" className="py-24 bg-[#F7F7F7] text-[#111111] relative border-t border-black/15 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-black/15 text-[#111111] text-[10px] font-bold uppercase tracking-widest mb-3">
              <Trophy className="w-3.5 h-3.5 text-black" />
              <span>Section 04 — Волейбол Тоглоом</span>
            </div>
            <h2 className="font-unbounded text-2xl sm:text-4xl font-black text-[#111111] uppercase tracking-tight">
              2D Волейболын Лиг & Довтолгооны Тэмцээн
            </h2>
          </div>
          <p className="text-[#111111]/70 text-sm max-w-md mt-4 md:mt-0 font-medium">
            Содбилэгийн волейболын дуртай байрлал (Outside Hitter) дээр утас болон компьютерээсээ тоглоорой!
          </p>
        </div>

        {/* Volleyball Main Game Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Main Arcade Court Canvas */}
          <div className="lg:col-span-8 bg-white border border-black/20 p-4 sm:p-6 flex flex-col justify-between relative shadow-sm">
            {/* Header / Score Display Bar */}
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-black/10 flex-wrap gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-[#111111] text-white px-2.5 py-1 font-unbounded font-black text-xs sm:text-sm uppercase">
                  <span>СОДБИЛЭГ: {playerScore}</span>
                  <span className="text-white/60 text-[10px] sm:text-xs">({setsWonPlayer} Set)</span>
                </div>
                <span className="font-bold text-[#111111]/40 text-xs">VS</span>
                <div className="flex items-center gap-1.5 sm:gap-2 bg-zinc-700 text-white px-2.5 py-1 font-unbounded font-black text-xs sm:text-sm uppercase">
                  <span>БОТ: {botScore}</span>
                  <span className="text-white/60 text-[10px] sm:text-xs">({setsWonBot} Set)</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className="p-1.5 sm:p-2 border border-black/15 hover:bg-black/5 text-[#111111] transition-colors cursor-pointer"
                  title="Аудио Тохируулга"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-black" /> : <VolumeX className="w-4 h-4 text-black/40" />}
                </button>

                <div className="flex bg-[#F7F7F7] border border-black/15 p-0.5 text-[10px] font-bold uppercase">
                  {(['easy', 'medium', 'hard'] as const).map((lvl) => (
                    <button
                      key={lvl}
                      onClick={() => setDifficulty(lvl)}
                      className={`px-2 py-1 transition-colors cursor-pointer ${
                        difficulty === lvl ? 'bg-[#111111] text-white' : 'text-[#111111]/70 hover:text-black'
                      }`}
                    >
                      {lvl === 'easy' ? 'Амархан' : lvl === 'medium' ? 'Дунд' : 'Про'}
                    </button>
                  ))}
                </div>

                {isPlaying && (
                  <div className="flex items-center gap-1.5 ml-1">
                    <button
                      onClick={() => {
                        const next = !isPaused;
                        setIsPaused(next);
                        isPausedRef.current = next;
                      }}
                      className="px-2.5 py-1 bg-[#111111] hover:bg-zinc-800 border border-black text-white font-bold text-[10px] sm:text-xs uppercase transition-colors cursor-pointer flex items-center gap-1"
                      title="Тоглоом Зогсоох / Үргэлжлүүлэх"
                    >
                      {isPaused ? '▶️ Эхлүүлэх' : '⏸️ Зогсоох'}
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setIsPaused(false);
                        isPausedRef.current = false;
                      }}
                      className="px-2.5 py-1 bg-zinc-800 hover:bg-black border border-black text-white font-bold text-[10px] sm:text-xs uppercase transition-colors cursor-pointer"
                      title="Тоглоомоос Гарах"
                    >
                      🛑 Гарах
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Announcement Banner */}
            {announcement && (
              <div className="bg-[#111111] text-white text-center py-2 px-4 text-xs font-bold uppercase tracking-wider mb-2 animate-fadeIn border border-white/20 flex items-center justify-center gap-2">
                <Sparkles className="w-3.5 h-3.5 text-white" />
                <span>{announcement}</span>
              </div>
            )}

            {/* Canvas Viewport */}
            <div className="relative w-full aspect-[7/3.8] bg-[#E2E8F0] border-2 border-[#111111] overflow-hidden touch-none select-none">
              <canvas ref={canvasRef} className="w-full h-full block" />

              {/* Pause Overlay */}
              {isPlaying && isPaused && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
                  <div className="w-16 h-16 bg-[#111111] border-2 border-white rounded-full flex items-center justify-center mb-3 text-2xl animate-bounce">
                    ⏸️
                  </div>
                  <h3 className="font-unbounded font-black text-xl sm:text-2xl text-white uppercase mb-2">
                    ВОЛЕЙБОЛ ТҮР ЗОГССОН (PAUSED)
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm max-w-md mb-6 font-medium">
                    Та тоглоомыг түр зогсоолоо. Үргэлжлүүлэх эсвэл шинээр эхлүүлэх боломжтой.
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-3">
                    <button
                      onClick={() => {
                        setIsPaused(false);
                        isPausedRef.current = false;
                      }}
                      className="py-3 px-6 bg-white text-[#111111] hover:bg-zinc-200 font-unbounded font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg border border-white"
                    >
                      ▶️ Үргэлжлүүлэх
                    </button>
                    <button
                      onClick={() => {
                        setPlayerScore(0);
                        setBotScore(0);
                        setIsPaused(false);
                        isPausedRef.current = false;
                      }}
                      className="py-3 px-6 bg-white/20 hover:bg-white/30 text-white font-unbounded font-black text-xs uppercase tracking-widest transition-all cursor-pointer border border-white/20"
                    >
                      🔄 Оноо Дахин Эхлүүлэх
                    </button>
                    <button
                      onClick={() => {
                        setIsPlaying(false);
                        setIsPaused(false);
                        isPausedRef.current = false;
                      }}
                      className="py-3 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-unbounded font-black text-xs uppercase tracking-widest transition-all cursor-pointer border border-white/30"
                    >
                      🛑 Тоглоом Дуусгах
                    </button>
                  </div>
                </div>
              )}

              {!isPlaying && (
                <div className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-20">
                  <div className="w-16 h-16 bg-[#111111] border-2 border-white rounded-full flex items-center justify-center mb-4 text-2xl animate-bounce">
                    🏐
                  </div>
                  <h3 className="font-unbounded font-black text-xl sm:text-2xl text-white uppercase mb-2">
                    2D Волейболын Тэмцээн Эхлүүлэх
                  </h3>
                  <p className="text-white/80 text-xs sm:text-sm max-w-md mb-6 font-medium">
                    Утасны мэдрэгч товчнууд эсвэл компьютерийн <strong>A, D, W / Space, J</strong> даралтаар тоглоно!
                  </p>
                  <button
                    onClick={() => setIsPlaying(true)}
                    className="py-3 px-8 bg-white hover:bg-zinc-200 text-[#111111] font-unbounded font-black text-xs uppercase tracking-widest transition-all cursor-pointer shadow-lg flex items-center gap-2"
                  >
                    <Play className="w-4 h-4 fill-current text-[#111111]" />
                    <span>Тоглож Эхлэх</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile / On-screen Interactive Touch Controls */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 pt-3 border-t border-black/10">
              {/* Left & Right Movement Touch Buttons */}
              <div className="flex gap-2">
                <button
                  onTouchStart={(e) => { e.preventDefault(); mobileControlsRef.current.left = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); mobileControlsRef.current.left = false; }}
                  onMouseDown={() => (mobileControlsRef.current.left = true)}
                  onMouseUp={() => (mobileControlsRef.current.left = false)}
                  className="flex-1 py-3 bg-[#111111] active:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider select-none cursor-pointer touch-none flex items-center justify-center gap-1 active:scale-95 rounded"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Зүүн</span>
                </button>
                <button
                  onTouchStart={(e) => { e.preventDefault(); mobileControlsRef.current.right = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); mobileControlsRef.current.right = false; }}
                  onMouseDown={() => (mobileControlsRef.current.right = true)}
                  onMouseUp={() => (mobileControlsRef.current.right = false)}
                  className="flex-1 py-3 bg-[#111111] active:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider select-none cursor-pointer touch-none flex items-center justify-center gap-1 active:scale-95 rounded"
                >
                  <span>Баруун</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Jump & Spike Action Touch Buttons */}
              <div className="flex gap-2 sm:col-span-3">
                <button
                  onTouchStart={(e) => { e.preventDefault(); mobileControlsRef.current.jump = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); mobileControlsRef.current.jump = false; }}
                  onMouseDown={() => (mobileControlsRef.current.jump = true)}
                  onMouseUp={() => (mobileControlsRef.current.jump = false)}
                  className="flex-1 py-3 bg-[#111111] active:bg-zinc-800 text-white font-bold text-xs uppercase tracking-wider select-none cursor-pointer touch-none flex items-center justify-center gap-1 active:scale-95 rounded"
                >
                  <ArrowUp className="w-4 h-4 text-white" />
                  <span>Үсрэх (W)</span>
                </button>
                <button
                  onTouchStart={(e) => { e.preventDefault(); mobileControlsRef.current.spike = true; }}
                  onTouchEnd={(e) => { e.preventDefault(); mobileControlsRef.current.spike = false; }}
                  onMouseDown={() => (mobileControlsRef.current.spike = true)}
                  onMouseUp={() => (mobileControlsRef.current.spike = false)}
                  className="flex-1 py-3 bg-[#111111] active:bg-zinc-800 border border-white/30 text-white font-black text-xs uppercase tracking-wider select-none cursor-pointer touch-none flex items-center justify-center gap-1 active:scale-95 rounded shadow-md"
                >
                  <Flame className="w-4 h-4 fill-current text-white" />
                  <span>Довтлох (J)</span>
                </button>
              </div>
            </div>
          </div>

          {/* Volleyball Stats & Tactical Card */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-6">
            {/* Real-time Match Stats */}
            <div className="p-6 bg-white border border-black/20 shadow-sm">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-4 flex items-center justify-between border-b border-black/10 pb-2">
                <span>Тоглолтын Үзүүлэлт</span>
                <Activity className="w-4 h-4 text-black" />
              </h4>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-xl font-black text-black font-unbounded block">
                    {lastSpikeSpeed > 0 ? `${lastSpikeSpeed} км/ц` : '-'}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Сүүлийн Довтолгоо
                  </span>
                </div>

                <div className="p-3.5 bg-[#F7F7F7] border border-black/10">
                  <span className="text-xl font-black text-[#111111] font-unbounded block">
                    {maxRally}
                  </span>
                  <span className="text-[10px] text-[#111111]/70 font-bold uppercase tracking-wider">
                    Хамгийн урт Ралли
                  </span>
                </div>
              </div>

              {/* Position Info */}
              <div className="p-4 bg-[#F7F7F7] border border-black/10">
                <div className="flex items-center gap-2 mb-2">
                  <Award className="w-4 h-4 text-black" />
                  <span className="font-bold text-xs uppercase tracking-wider text-[#111111]">Outside Hitter (OH)</span>
                </div>
                <p className="text-xs text-[#111111]/70 font-medium leading-relaxed">
                  Содбилэгийн тоглодог үндсэн байрлал. Зүүн жигүүрээс өндөр үсрэлттэйгээр блокийн дээгүүр довтлох ба хамгаалалтад чухал үүрэгтэй.
                </p>
              </div>
            </div>

            {/* Pro Volleyball Controls Guide */}
            <div className="p-6 bg-white border border-black/20 shadow-sm space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-widest text-[#111111]/60 mb-3 border-b border-black/10 pb-2">
                Удирдлагын Тайлбар
              </h4>

              <div className="flex items-center justify-between text-xs p-2 bg-[#F7F7F7]">
                <span className="font-bold text-[#111111]">Зүүн / Баруун (A, D)</span>
                <span className="text-[#111111]/70 font-mono">Шилжих</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 bg-[#F7F7F7]">
                <span className="font-bold text-[#111111]">Үсрэх (W / Space)</span>
                <span className="text-[#111111]/70 font-mono">Үсрэлт / Блок</span>
              </div>
              <div className="flex items-center justify-between text-xs p-2 bg-[#F7F7F7]">
                <span className="font-bold text-[#111111]">Довтлох (J / K)</span>
                <span className="text-black font-bold font-mono">Шигшээ Довтолгоо</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
