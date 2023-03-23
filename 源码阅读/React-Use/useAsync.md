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

## 2. useAsyncFc - 官方实现

```typescript
import { DependencyList, useCallback, useRef, useState } from 'react';
import useMountedState from './useMountedState';
import { FunctionReturningPromise, PromiseType } from './misc/types';

export default function useAsyncFn<T extends FunctionReturningPromise>(
  fn: T,
  deps: DependencyList = [],
  initialState: StateFromFunctionReturningPromise<T> = { loading: false }
): AsyncFnReturn<T> {
  const lastCallId = useRef(0);
  const isMounted = useMountedState();
  const [state, set] = useState<StateFromFunctionReturningPromise<T>>(initialState);

  const callback = useCallback((...args): ReturnType<T> => {
    const callId = ++lastCallId.current;

    if (!state.loading) {
      set((prevState) => ({ ...prevState, loading: true }));
    }

    return fn(...args).then(
      (value) => {
        isMounted() && callId === lastCallId.current && set({ value, loading: false });

        return value;
      },
      (error) => {
        isMounted() && callId === lastCallId.current && set({ error, loading: false });

        return error;
      }
    ) as ReturnType<T>;
  }, deps);

  return [state, callback as unknown as T];
}
```
接收的参数和返回的值，都是正常比较好理解的。

上面有两点需要注意，也是之前我没想明白的点了。
1. 使用isMounted的目的
isMounted是用来判断组件是否已经卸载的，如果组件已经卸载，但是这个时候异步请求还没有结束，那么就会出现异步请求结束后，
组件已经卸载的情况，这个时候就会出现报错，所以需要判断组件是否已经卸载，如果已经卸载，就不再去更新state了。
2. lastCallId的作用
刚开始也不理解为什么要加上callId = ++lastCallId.current;这个，想着不是每次都会重新渲染吗，为什么要加上这个呢？
后来发现，我们的useCallback函数是有deps的，如果这个deps变了，假如这个callback作为useEffect的dep,那么这个函数会再执行一遍。
```typescript
useEffect(() => {
    callback()
}, [callback])
```
由于组件更新时，ref的值不会变，所以当deps变化时，callback变化，从而导致useEffect这里callback重新执行。如果上一次的请求还没有处理完，
但是现在已经是新的请求了，且之前的请求不需要进行处理了（可能会影响到当前的state），所以需要加上callId = ++lastCallId.current;这个，来判断是否是最新的请求。