import { useState } from "react";
import Loader from "./components/Loader";
import Desktop from "./components/Desktop";

function App() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded ? (
        <Loader onFinish={() => setLoaded(true)} />
      ) : (
        <Desktop />
      )}
    </>
  );
}

export default App;
