import { useEffect, useState } from 'react'
// import { use } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

type TData = {
  url: string;
  message: string;
  timeTaken: number;
};

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState<TData[] | undefined>();
  // useEffect(() => {
  //   const startEdgeTime = performance.now();

  //   fetch("/api/edge")
  //     .then((res) => {
  //       const endEdgeTime = performance.now();
  //       return (res.json() as Promise<TData>).then((data) => ({
  //         ...data,
  //         timeTaken: endEdgeTime - startEdgeTime,
  //       }));
  //     })
  //     .then((edgeData) => {
  //       setData((prevData) => [...(prevData ?? []), edgeData]);
  //     });

  //   const startLambdaTime = performance.now();

  //   fetch("/api/lambda")
  //     .then((res) => {
  //       const endLambdaTime = performance.now();
  //       return (res.json() as Promise<TData>).then((data) => ({
  //         ...data,
  //         timeTaken: endLambdaTime - startLambdaTime,
  //       }));
  //     })
  //     .then((lambdaData) => {
  //       setData((prevData) => [...(prevData ?? []), lambdaData]);
  //     });
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const startEdgeTime = performance.now();

      const edge = fetch("/api/edge").then((res) => {
        const endEdgeTime = performance.now();
        return (res.json() as Promise<TData>).then((data) => ({
          ...data,
          timeTaken: endEdgeTime - startEdgeTime,
        }));
      });

      const startLambdaTime = performance.now();

      const lambda = fetch("/api/lambda").then((res) => {
        const endLambdaTime = performance.now();
        return (res.json() as Promise<TData>).then((data) => ({
          ...data,
          timeTaken: endLambdaTime - startLambdaTime,
        }));
      });

      const response = await Promise.allSettled([edge, lambda]);

      const data = response
        .filter(
          (r): r is PromiseFulfilledResult<TData> => r.status === "fulfilled"
        )
        .map((r) => r.value);

      setData(data);
    }

    fetchData();
  }, []);

  console.log(data);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {data ? (
        <>
          <h1>{data[0]?.message}</h1>
          <h1>
            The time taken by edge was {`${data[0]?.timeTaken.toFixed(5)}`}
          </h1>
          <h1>{data[1]?.message}</h1>
          <h1>The time taken by edge was {`${data[1]?.timeTaken}`}</h1>
        </>
      ) : undefined}
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App
