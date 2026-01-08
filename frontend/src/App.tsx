import { useEffect, useState } from "react";
import TTSGenerator from "./components/TTSGenerator";
import BackendNotFound from "./components/notinstalled";
import CheckingBackend from "./components/CheckingBackend";
import StartingBackend from "./components/StartingBackend";

type StartupStage =
  | "checking-backend"
  | "starting-backend"
  | "backend-missing"
  | "ready";

function App() {
  const [stage, setStage] = useState<StartupStage>("checking-backend");

  useEffect(() => {
    // ✅ define listener as a variable
    const listener = (_: any, data: { stage: StartupStage }) => {
      console.log("Startup status:", data.stage);
      setStage(data.stage);
    };

    window.ipcRenderer.on("startup-status", listener);

    return () => {
      // ✅ remove the SAME listener
      window.ipcRenderer.off("startup-status", listener);
    };
  }, []);

  if (stage !== "ready") {
    if (stage === "checking-backend") {
      return <CheckingBackend />;
    }
    if (stage === "starting-backend") {
      return <StartingBackend />;
    }
    if (stage === "backend-missing") {
      return <BackendNotFound />;
    }
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <TTSGenerator />
    </div>
  );
}

export default App;
