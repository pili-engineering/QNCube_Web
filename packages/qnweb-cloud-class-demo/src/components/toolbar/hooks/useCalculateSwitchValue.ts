import { useEffect, useState } from 'react';
import { ToolbarProps } from '../index';

export const useCalculateSwitchValue = (
  direction: Exclude<ToolbarProps['direction'], undefined>,
  elementId: string,
  gap: number,
) => {
  const [switchValue, setSwitchValue] = useState<number>(0);
  useEffect(() => {
    /**
     * 防止有图片资源，导致计算有误
     */
    const load = () => {
      const element = document.getElementById(elementId);
      const mapSwitchValue = {
        horizontal: element?.getClientRects()[0].height || 0,
        vertical: element?.getClientRects()[0].width || 0,
      };
      const realSwitchValue = mapSwitchValue[direction] + gap;
      setSwitchValue(realSwitchValue);
    };
    window.addEventListener('load', load);
    return () => {
      window.removeEventListener('load', load);
    };
  }, [direction, elementId, gap]);

  return [
    switchValue,
  ];
};
