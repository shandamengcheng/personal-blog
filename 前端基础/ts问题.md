### Type => 类型别名

> a name for any type

```typescript
type Point = {
  x: number;
  y: number;
};
```

### interface 接口 => 命名一个对象类型的另一种方式

```typescript
interface Point {
  x: number;
  y: number;
}
```

### type 和 interface 的区别

在大多数情况下，可以任意选择两者之一来声明类型。基本所有 interface 可用的功能都可以在 type 中使用。

> 关键区别：type 不能 re-open 来添加新属性，而 interface 始终是可拓展的。

- interface 与 type 添加新属性的方式

```typescript
interface Animal {
  name: string;
}
interface Bear extends Animal {
  honey: boolean;
}

type Animal = {
  name: string;
};
// 通过交集拓展类型
type Bear = Animal & {
  honey: boolean;
};
```

- 给已经存在的类型声明添加新的属性

```typescript
interface Window {
  title: string;
}
interface Window {
  ts: TypeScriptAPI;
}

type Window = {
  title: string;
};
type Window = {
  ts: TypeScriptAPI;
};
// Error: Duplicate identifier 'Window'
```

### 不同点

1. interface 重复声明会进行声明合并，type 重复声明会报错
2. 如果想要进行类型拓展，interface 通过 extends 即可，type 需要通过交集&来拓展。
3. interface 只可以用于声明对象的形状，不能重命名基本类型。type 可以。
4. [类型错误时，interface 声明一般会有 interface 名称，type 没有](https://www.typescriptlang.org/play?#code/PTAEGEHsFsAcEsA2BTATqNrLusgzngIYDm+oA7koqIYuYQJ56gCueyoAUCKAC4AWHAHaFcoSADMaQ0PCG80EwgGNkALk6deDWBwCyo6LVABeUAG9Ooa6BG41oPL1RzinAL6aJLIct7xIGWRlfkgDaCNEAApoB3DIgEoLKxtlQLxIFAA6REhiGKy7ZASPTR5kLOIs0AAVQQxULHQAI2Rc8goqGjpGZjYOAWFRfUNjbjBeSFBUZAk0PinBvh0Ocn54ENlmZAAPXT9kABMNYND42ijzW2GHAEYAJgBmABZH0HcS8dr67V1xKQABtAAaBBDMtnx6rsVLxHMMaMwjBFaAAaL7NFiwwjMeC8ADkzCEkFhrWQMkO8BmfkQDGuuEOKNqKwAysoXLBeF9yIE8bDcPIAjJcbIZEtMNhQLgCCRXF4fH5BRgQpAAIJCeCRGIOK5FBxOFxCYjvJKWGygNJCDLZXL5aCFYYlTycU6q9WanU3UAPF4AVmNQA)
5. interface 只能用来描述对象类型，type 可以用来编写各种类型。（包含3）

```
type OrNull<Type> = Type | null;

type OneOrMany<Type> = Type | Type[];

type Arr = typeof title;

type Arr = [Array<number>, number]
```

#### type 来简化类型

```typescript
interface T1 {
  a: number;
}

interface T2 {
  b: number;
}

interface T3 {
  c: number;
}
type Type = T1 | T2 | T3;

interface T4<T extends Type> {
  param: T;
}

export const initialValue: T4<T2> = {
  param: {
    b: 1,
  },
};
```

> 上面的场景刚好符合 type 的名称: 类型别名。我们给 T1 | T2 | T3 一个类型别名。

> https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces
