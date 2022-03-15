export function setWatcher(page) {
  const watch = page.watch;
  const proxy = new Proxy(page, {
    get: function (target, propKey, receiver) {
      console.log(`getting ${propKey}!`);
      return Reflect.get(target, propKey, receiver);
    },
    set: function (target, propKey, value, receiver) {
      console.log(`setting ${propKey}!`);
      const watchCallback = watch[propKey];
      if (watchCallback) {
        watchCallback.bind(page)(value);
      }
      return Reflect.set(target, propKey, value, receiver);
    }
  });
  return proxy;
}