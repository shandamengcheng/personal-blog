// 节流
function throttle(fn, wait) {
  let context, result, args;
  let previous = 0;
  let later = () => {
    previous = 0;
    timeout = null;
    result = fn.apply(context, args);
    if (!timeout) {
      context = args = null;
    }
  }

  let throttled = function(..._args) {
    context = this;
    args = _args;
    let now = Date.now();
    let remaining = wait - (now - previous);
    if (remaining <= 0) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = fn.apply(context, args);
      if (!timeout) {
        context = args = null;
      }
    } else if (!timeout) {
      timeout = setTimeout(later, remaining)
    }
  }
  return throttled
}