// 防抖
function debounce(fn, wait, immediate) {
  let previous, context, result, timeout, args;
  let later = () => {
    const passed = Date.now() - previous;
    if (wait > passed) {
      timeout = setTimeout(fn, wait - passed);
    } else {
      clearTimeout(timeout);
      timeout = null;
      if (!immediate) {
        result = fn.apply(context, args);
        args = context = null
      }
    }
  }

  let debounced = function(..._args) {
    previous = Date.now();
    args = _args;
    context = this;
    if (!timeout) {
      timeout = setTimeout(later, wait);
      if (immediate) {
        result = fn.apply(context, args);
      }
    }
    return result;
  }

  return debounced
}