import { useSafeState } from '@/hooks';
import { useEffect } from 'react';
import { browserReport } from 'pili-rtc-web';

const useSupported = () => {
  const [isBrowserSupported, setIsBrowserSupported] = useSafeState(true);

  useEffect(() => {
    setIsBrowserSupported(browserReport?.support);
  }, []);

  return {
    isBrowserSupported
  }
}

export default useSupported;