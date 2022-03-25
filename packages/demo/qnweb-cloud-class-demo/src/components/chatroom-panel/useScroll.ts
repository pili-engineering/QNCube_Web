import {
  useCallback, useEffect, useState,
} from 'react';

const useScroll = (elementId: string) => {
  const [scrollHeight, setScrollHeight] = useState(0);

  const scrollToBottom = useCallback(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTop = element.scrollHeight;
      setScrollHeight(
        element.scrollHeight,
      );
    }
  }, [elementId]);

  const scrollToTop = useCallback(() => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollTop = 0;
      setScrollHeight(
        element.scrollHeight,
      );
    }
  }, [elementId]);

  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  return {
    scrollHeight,
    scrollToBottom,
    scrollToTop,
  };
};

export default useScroll;
