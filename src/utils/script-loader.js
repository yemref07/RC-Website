export function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = callback;
    script.defer = true;
    document.head.appendChild(script);
  }
  