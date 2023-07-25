import { useState } from "react";
import Headers from "./Components/Headers";
import Arama from "./Components/Arama";
import Footer from "./Components/Footer";
import LeftNav from "./Components/LeftNav";
import RightNav from "./Components/RightNav";
import MainNav from "./Components/MainNav";

function App() {
  const [result, setResult] = useState([]);
   const [loading, setLoading] = useState(false);
  const [hisseKodu, setHisseKodu] = useState("");

  return (
    <div className=" dark:bg-slate-900 dark:text-zinc-50">
      <Headers ></Headers>
      <MainNav></MainNav>
      <div className="md:flex md:flex-row flex flex-col gap-5">
          <LeftNav></LeftNav>
          <Arama
            result={result}
            setResult={setResult}
            loading={loading}
            setLoading={setLoading}
            setHisseKodu={setHisseKodu}
            hisseKodu={hisseKodu}
          ></Arama>
          <RightNav></RightNav>
      </div>
          <Footer></Footer>
    </div>
  );
}

export default App;
