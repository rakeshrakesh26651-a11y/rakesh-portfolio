'use client';

import { useState, useEffect } from 'react';

export function useLiveClock() {
  const [timeString, setTimeString] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12; // 0 becomes 12
      const minutesFormatted = minutes < 10 ? `0${minutes}` : `${minutes}`;
      setTimeString(`${hours}:${minutesFormatted} ${ampm}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return timeString;
}
