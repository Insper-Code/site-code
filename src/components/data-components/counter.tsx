import { useEffect, useState } from "react";

export function useCounter(target: number, isVisible: boolean, duration = 2000) {
  const [count, setCount] = useState(0);
  const [animationId, setAnimationId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isVisible) {
      let start = 0;
      const increment = target / (duration / 16);

      const interval = setInterval(() => {
        start += increment;
        if (start >= target) {
          setCount(target);
          clearInterval(interval);
        } else {
          setCount(Math.ceil(start));
        }
      }, 16);

      setAnimationId(interval);
    } else {
      setCount(0);
      if (animationId) clearInterval(animationId);
    }

    return () => {
      if (animationId) clearInterval(animationId);
    };
  }, [isVisible, target, duration]);

  return count;
}
