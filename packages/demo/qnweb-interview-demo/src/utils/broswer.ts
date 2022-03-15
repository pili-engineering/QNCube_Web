export const os = function () {
  let ua = navigator.userAgent,
    isWindowsPhone: boolean = /(?:Windows Phone)/.test(ua),
    isSymbian: boolean = /(?:SymbianOS)/.test(ua) || isWindowsPhone,
    isAndroid: boolean = /(?:Android)/.test(ua),
    isFireFox: boolean = /(?:Firefox)/.test(ua),
    isChrome: boolean = /(?:Chrome|CriOS)/.test(ua),
    isTablet: boolean = /(?:iPad|PlayBook)/.test(ua) || (isAndroid && !/(?:Mobile)/.test(ua)) || (isFireFox && /(?:Tablet)/.test(ua)),
    isPhone: boolean = /(?:iPhone)/.test(ua) && !isTablet,
    isPc: boolean = !isPhone && !isAndroid && !isSymbian;
  return {
    isTablet, isPhone, isAndroid, isPc, isChrome
  };
}();