# useAsync源码学习

## 1. useAsync - 自己实现

```js
import { useEffect, useRef, useState } from 'react';

export default function useAsync(asyncFunction,  deps = []) {
    const [state, set] = useState({
        isloading: false,
        value: null,
        error: null,
        });
    const mounted = useRef(false);
    useEffect(() => {
        mounted.current = true;
        if (!state.isloading) {
            set({ isloading: true, value: null, error: null });
        }
        asyncFunction()
            .then(value => {
                // 这里加上是防止出现异步请求时，组件已经卸载的情况
                if (mounted.current) {
                    set({ isloading: false, value, error: null });
                }
            })
            .catch(error => {
                if (mounted.current) {
                    set({ isloading: false, value: null, error });
                }
            });
        return () => {
            mounted.current = false;
        };
    }, deps);
    }
```
