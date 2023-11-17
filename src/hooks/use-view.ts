import {atom, useAtomValue, useSetAtom} from 'jotai'
import { useEffect } from 'react';

const viewAtom = atom<number>(15505)

export const useView = () => {
  const numberView = useAtomValue(viewAtom)
  const setView = useSetAtom(viewAtom)
  
  useEffect(() => {
    const interval = setInterval(() => {
      const newValueUpdating = generateRandomValue(numberView);
      setView(newValueUpdating);
    }, 5000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [numberView]);

  return {
    numberView: numberView === 15505 ? null : numberView,
  }
}


function generateRandomValue(currentValue: number) {
  const min = Math.max(currentValue - 1000, 12000);
  const max = Math.min(currentValue + 1000, 20000);
  const randomValue = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomValue;
}
