import { useEffect, useMemo, useState } from 'react';

export type ConnectionEffectiveType = 'wifi' | '4g' | '3g' | '2g';

export type NetworkTextMap = {
  [key in ConnectionEffectiveType]: string;
} & {
  default: string;
}

const getNetworkText = (connection: any): string => {
  const networkTextMap: NetworkTextMap = {
    'wifi': '当前网络检测已通过',
    '4g': '当前网络检测已通过',
    '3g': '当前网络检测已通过',
    '2g': '当前信号差，建议切换网络环境',
    default: '当前无网络，请检查后重新尝试'
  };
  return connection.downlink ? networkTextMap[connection.effectiveType as ConnectionEffectiveType] : networkTextMap.default;
};

const getNavigatorConnection = () => {
  return (navigator as any).connection ||
      (navigator as any).mozConnection ||
      (navigator as any).webkitConnection;
}

const useNetwork = () => {
  const connection = useMemo(() => getNavigatorConnection(), []);
  const [network, setNetwork] = useState({
    text: getNetworkText(connection),
    connection
  });
  useEffect(() => {
    const updateConnectionStatus = () => {
      const connection = getNavigatorConnection();
      console.log(connection.downlink);
      setNetwork({
        text: getNetworkText(connection),
        connection
      });
    };
    connection.addEventListener('change', updateConnectionStatus);
    return () => {
      connection.addEventListener('change', updateConnectionStatus);
    };
  }, [connection]);
  return network;
};

export default useNetwork;