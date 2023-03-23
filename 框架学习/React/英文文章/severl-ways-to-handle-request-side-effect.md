# several ways to handle request side effect that you should know

In React, useEffect is commonly used to handle side effect, including handle request side effects. 

However, when it comes to handling requests, it's common to use async/await, but passing an async function as the first argument of useEffect will result in an error.


This is because useEffect expects a function that returns void, but async functions return a promise.

Therefore, there are several ways to handle request side effects without errors that you should know.

### 1. use an async function expression
```typescript

const [data, setData] = useState(null);

useEffect(() => {
    const fetchData = async () => {
        const result = await fetch(
            'YOUR_URL_HERE'
        );
        setData(result.data);
    }
    fetchData();
}, []);
```

You can also abstract the function expression into a useCallback hook outside the useEffect so that you can use it in other places:

```typescript
const [data, setData] = useState(null);

// useCallback can accept an async fucntion as its argument
const fetchData = useCallback(async () => {
    const result = await fetch(
        'YOUR_URL_HERE'
    );
    setData(result.data);
}, [])

useEffect(() => {
    fetchData()
}, [])
```

### 2. use an IIFE
```typescript
const [data, setData] = useState(null);

useEffect(() => {
    (async () => {
        const result = await fetch(
            'YOUR_URL_HERE'
        );
        setData(result.data);
    })()
}, [])
```

### 3. use Promise.then
```typescript
const [data, setData] = useState(null);

useEffect(() => {
    fetch( 'YOUR_URL_HERE')
        .then(result => setData(result.data));
}, [])
```

### 4. use function declaration
```typescript
const [data, setData] = useState(null);
useEffect(() => {
    async function fetchData() {
        const result = await fetch(
            'YOUR_URL_HERE'
        );
        setData(result.data);
    }
    fetchData();
}, [])
```
Also, you can abstract this function declaration into a useCallback hook outside the useEffect so that you can use it in other places.


Hope these ways can work for you. :)