import React, { useEffect, useState } from 'react';

interface Confetti {
  id: number;
  x: number;
  y: number;
  color: string;
}

const CelebrationEffect: React.FC = () => {
  const [confettis, setConfettis] = useState<Confetti[]>([]);
  
  useEffect(() => {
    // Generate confetti at random positions
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#FB8F67', '#98D8C8'];
    const newConfettis: Confetti[] = [];
    
    for (let i = 0; i < 200; i++) { // Increase the number of confetti pieces
      newConfettis.push({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }
    
    setConfettis(newConfettis);
    
    // Clean up after animation finishes
    const timer = setTimeout(() => {
      setConfettis([]);
    }, 5000); // Increase the duration of the confetti effect
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-50">
      {confettis.map((confetti) => (
        <div
          key={confetti.id}
          className="celebration-confetti"
          style={{
            left: `${confetti.x}%`,
            top: `${confetti.y}%`,
            backgroundColor: confetti.color,
            animationDelay: `${Math.random() * 0.5}s`,
            animationDuration: '2s', // Adjust the animation duration
            animationName: 'fall', // Add a custom animation
          }}
        />
      ))}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-4xl font-bold animate-pulse-scale text-primary">
          New Record!
        </div>
      </div>
    </div>
  );
};

export default CelebrationEffect;