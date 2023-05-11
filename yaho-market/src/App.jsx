import { useEffect, useState } from "react";
import Headers from "./Components/Headers";
import Arama from "./Components/Arama";
import Footer from "./Components/Footer";
import LeftNav from "./Components/LeftNav";
import RightNav from "./Components/RightNav";

function App() {
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [loading, setLoading] = useState(false);
  const [hisseKodu, setHisseKodu] = useState("");

  console.log(result);

  useEffect(() => {
    if (darkMode == true) {
      document.getElementById("root").classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex ">
      <div className="flex-1  ">
        <LeftNav></LeftNav>
      </div>
      <div
        className={`flex flex-col max-w-[700px] flex-grow ${
          darkMode == true ? "dark" : ""
        }`}
      >
        <Headers setDarkMode={setDarkMode} darkMode={darkMode}></Headers>
        <Arama
          result={result}
          setResult={setResult}
          darkMode={darkMode}
          loading={loading}
          setLoading={setLoading}
          setHisseKodu={setHisseKodu}
          hisseKodu={hisseKodu}
        ></Arama>
        <Footer></Footer>
      </div>
      <div className="flex-1 h-full">
        <RightNav></RightNav>
      </div>
    </div>
  );
}

export default App;
