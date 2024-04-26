import { useEffect, useState } from 'react';

const useDelayedSearch = (onSubmit: (value: string) => void ): [string, React.Dispatch<React.SetStateAction<string>>] => {
    
    const [inputValue, setInputValue] = useState('');
      const [timer, setTimer] = useState<number | null>(null);
  
    useEffect(() => {
      if(timer) {
        clearTimeout(timer);
      }
  
      const newTimer = setTimeout(() => {
        if(inputValue) {
          onSubmit(inputValue);
        }
      }, 500);
  
      setTimer(newTimer);
  
      return () => clearTimeout(newTimer);
     // eslint-disable-next-line react-hooks/exhaustive-deps
     }, [inputValue, onSubmit]);
  
     return [inputValue, setInputValue];
  };

  export { useDelayedSearch }