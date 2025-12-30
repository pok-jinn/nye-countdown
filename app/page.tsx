'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isNewYear, setIsNewYear] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const targetDate = new Date('2026-01-01T00:00:00');

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setIsNewYear(true);
        clearInterval(interval);
        // Trigger confetti
        import('canvas-confetti').then((confetti) => {
          const duration = 15 * 1000;
          const animationEnd = Date.now() + duration;

          const randomInRange = (min: number, max: number) => {
            return Math.random() * (max - min) + min;
          };

          const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
              clearInterval(interval);
              return;
            }

            const particleCount = 50 * (timeLeft / duration);

            confetti.default({
              particleCount,
              startVelocity: randomInRange(50, 100),
              spread: randomInRange(50, 70),
              origin: {
                x: randomInRange(0.1, 0.3),
                y: Math.random() - 0.2,
              },
            });
            confetti.default({
              particleCount,
              startVelocity: randomInRange(50, 100),
              spread: randomInRange(50, 70),
              origin: {
                x: randomInRange(0.7, 0.9),
                y: Math.random() - 0.2,
              },
            });
          }, 250);
        });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isNewYear && videoRef.current) {
      videoRef.current.play().catch(e => console.log('Autoplay failed:', e));
    }
  }, [isNewYear]);

  if (isNewYear) {
    return (
      <div style={{height: '100vh', width: '100vw', overflow: 'hidden', background: 'black'}}>
        <video
          src="/background.mp4"
          autoPlay
          muted
          loop
          playsInline
          style={{width: '100vw', height: '100vh', objectFit: 'cover'}}
        />
        <div style={{position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none'}}>
          <h1 style={{color: 'white', fontSize: '6vw', fontWeight: 'bold', textShadow: '0 0 20px white, 0 0 40px white', textAlign: 'center', width: '100vw'}}>
            HAPPY NEW YEAR 2026!
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      overflow: 'hidden',
      background: 'black',
      position: 'relative'
    }}>
      <video
        src="/background.mp4"
        autoPlay
        muted
        loop
        playsInline
        style={{
          width: '100vw',
          height: '100vh',
          objectFit: 'cover',
          position: 'absolute',
          top: 0,
          left: 0,
          zIndex: 0,
          opacity: 0.3
        }}
      />
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
      }}>
        <h1 style={{color: '#00ffff', fontSize: '3vw', fontWeight: 'bold', textShadow: '0 0 10px cyan', marginBottom: '1vh', textAlign: 'center'}}>
          THE MARLIN SEAFOOD
        </h1>
        <h2 style={{color: '#00ffff', fontSize: '3vw', fontWeight: 'bold', textShadow: '0 0 10px cyan', marginBottom: '3vh', textAlign: 'center'}}>
          NEW YEAR'S EVE COUNTDOWN
        </h2>
        <div style={{display: 'flex', gap: '2vw', justifyContent: 'center', flexWrap: 'wrap'}}>
          <div style={{textAlign: 'center'}}>
            <div style={{color: '#00ffff', fontSize: '10vw', fontWeight: 'bold', textShadow: '0 0 20px cyan, 0 0 40px cyan', fontFamily: 'monospace'}}>
              {timeLeft.days.toString().padStart(2, '0')}
            </div>
            <p style={{color: '#00ffff', fontSize: '1.5vw', marginTop: '0.5vh'}}>DAYS</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{color: '#00ffff', fontSize: '10vw', fontWeight: 'bold', textShadow: '0 0 20px cyan, 0 0 40px cyan', fontFamily: 'monospace'}}>
              {timeLeft.hours.toString().padStart(2, '0')}
            </div>
            <p style={{color: '#00ffff', fontSize: '1.5vw', marginTop: '0.5vh'}}>HOURS</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{color: '#00ffff', fontSize: '10vw', fontWeight: 'bold', textShadow: '0 0 20px cyan, 0 0 40px cyan', fontFamily: 'monospace'}}>
              {timeLeft.minutes.toString().padStart(2, '0')}
            </div>
            <p style={{color: '#00ffff', fontSize: '1.5vw', marginTop: '0.5vh'}}>MINUTES</p>
          </div>
          <div style={{textAlign: 'center'}}>
            <div style={{color: '#00ffff', fontSize: '10vw', fontWeight: 'bold', textShadow: '0 0 20px cyan, 0 0 40px cyan', fontFamily: 'monospace'}}>
              {timeLeft.seconds.toString().padStart(2, '0')}
            </div>
            <p style={{color: '#00ffff', fontSize: '1.5vw', marginTop: '0.5vh'}}>SECONDS</p>
          </div>
        </div>
      </div>
    </div>
  );
}
