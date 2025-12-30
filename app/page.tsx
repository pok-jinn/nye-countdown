'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [isNewYear, setIsNewYear] = useState(false);

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

  if (isNewYear) {
    return (
      <div className="h-screen w-screen bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-cyan-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px cyan, 0 0 40px cyan' }}>
            HAPPY NEW YEAR 2026!
          </h1>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen bg-[#0a0a0a] flex flex-col items-center justify-center overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-cyan-400 mb-8 drop-shadow-lg"
            style={{ textShadow: '0 0 10px cyan' }}>
          THE MARLIN SEAFOOD</h1>
          <h2 className="text-8xl md:text-8xl lg:text-4xl font-bold text-cyan-400 mb-8 drop-shadow-lg"
            style={{ textShadow: '0 0 10px cyan' }}>
          NEW YEAR'S EVE COUNTDOWN
        </h2>
        <div className="flex space-x-4 md:space-x-8 lg:space-x-12">
          <div className="text-center">
            <motion.div
              key={timeLeft.days}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl lg:text-9xl font-mono text-cyan-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px cyan, 0 0 40px cyan' }}
            >
              {timeLeft.days.toString().padStart(2, '0')}
            </motion.div>
            <p className="text-xl md:text-2xl text-cyan-300 mt-2">DAYS</p>
          </div>
          <div className="text-center">
            <motion.div
              key={timeLeft.hours}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl lg:text-9xl font-mono text-cyan-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px cyan, 0 0 40px cyan' }}
            >
              {timeLeft.hours.toString().padStart(2, '0')}
            </motion.div>
            <p className="text-xl md:text-2xl text-cyan-300 mt-2">HOURS</p>
          </div>
          <div className="text-center">
            <motion.div
              key={timeLeft.minutes}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl lg:text-9xl font-mono text-cyan-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px cyan, 0 0 40px cyan' }}
            >
              {timeLeft.minutes.toString().padStart(2, '0')}
            </motion.div>
            <p className="text-xl md:text-2xl text-cyan-300 mt-2">MINUTES</p>
          </div>
          <div className="text-center">
            <motion.div
              key={timeLeft.seconds}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="text-6xl md:text-8xl lg:text-9xl font-mono text-cyan-400 drop-shadow-lg"
              style={{ textShadow: '0 0 20px cyan, 0 0 40px cyan' }}
            >
              {timeLeft.seconds.toString().padStart(2, '0')}
            </motion.div>
            <p className="text-xl md:text-2xl text-cyan-300 mt-2">SECONDS</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
