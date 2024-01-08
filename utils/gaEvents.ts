declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

export const gaEventEmitter = () => {
  const track = (eventName: string, data = {}) => {
    window.gtag?.("event", eventName, data);
  };

  return {
    track,
  };
};

export default gaEventEmitter();
