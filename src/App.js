import { useState } from "react";
import { Loading } from "./Loading";
import { Modal } from "./Modal";
import { Quiz } from "./Quiz";
import { SetupForm } from "./SetupForm";
import { useData } from "./utilities";

function App() {
  const [{ waiting, loading }] = useData();
  const [correct, setCorrect] = useState(0);

  if (waiting) {
    return <SetupForm />;
  }
  if (loading) {
    return <Loading />;
  }
  return (
    <main>
      <Modal correct={correct} setCorrect={setCorrect} />
      <Quiz correct={correct} setCorrect={setCorrect} />
    </main>
  );
}

export default App;
