export const os = function () {
  const ua = navigator.userAgent;
  const isWindowsPhone: boolean = /(?:Windows Phone)/.test(ua);
  const isSymbian: boolean = /(?:SymbianOS)/.test(ua) || isWindowsPhone;
  const isAndroid: boolean = /(?:Android)/.test(ua);
  const isFireFox: boolean = /(?:Firefox)/.test(ua);
  const isChrome: boolean = /(?:Chrome|CriOS)/.test(ua);
  const isTablet: boolean = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua));
  const isPhone: boolean = /(?:iPhone)/.test(ua) && !isTablet;
  const isPc: boolean = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet,
    isPhone,
    isAndroid,
    isPc,
    isChrome
  };
}();
