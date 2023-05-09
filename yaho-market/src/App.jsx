import { useEffect, useState } from "react";
import Headers from "./Components/Headers";
import News from "./Components/News";
import Arama from "./Components/Arama";
import Footer from "./Components/Footer";
import LeftNav from "./Components/LeftNav";
import RightNav from "./Components/RightNav";

function App() {
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [ilkArama, setIlkArama] = useState(true);
  const [loading, setLoading] = useState(false);
  const [hisseKodu, setHisseKodu] = useState("");

  console.log(result);

  useEffect(() => {
    if (darkMode == true) {
      document.getElementById("root").classList.add("dark");
    }
  }, [darkMode]);


  useEffect(() => {
    for (let i = 0; i < result?.length; i++) {
      if (result[i].relatedTickers && result[i].relatedTickers !== "") {
        setHisseKodu(result[i].relatedTickers);
        break;
      } else {
        continue;
      }
    }
  }, [result]);

  return (
    <div className="flex h-full">
    <div className="flex-1  "><LeftNav></LeftNav></div>
    <div
      className={`flex flex-col max-w-[700px] flex-grow  ${
        darkMode == true ? "dark" : ""
      }`}
    >
      <Headers setDarkMode={setDarkMode} darkMode={darkMode}></Headers>
      <div
        className={`flex flex-col items-center my-0 mx-auto max-w-[1260px] ${
          darkMode == true ? "dark" : ""
        }`}
      >
        <Arama
          result={result}
          setResult={setResult}
          darkMode={darkMode}
          loading={loading}
          setLoading={setLoading}
          setHisseKodu={setHisseKodu}
          setIlkArama={setIlkArama}
          hisseKodu={hisseKodu}
        ></Arama>
        {result?.length > 0 && (
          <div className="mb-2">
            <span className="text-blue-700 font-semibold italic">
              Hisse Kodu:{" "}
            </span>
            <span className="italic font-semibold">
              {result?.length > 0 && hisseKodu}
            </span>
          </div>
        )}
        {ilkArama == true ? (
          <div className="italic font-medium">
            Lütfen öncelikle hisse araması yapın
          </div>
        ) : loading == true ? (
          <div className="italic font-medium">
            Hisse haberleri alınıyor, lütfen bekleyin...
          </div>
        ) : result?.length == 0 ? (
          <div className="italic font-medium">
            Aradığınız hisse sistemde bulunmuyor veya hatalı yazım.Tekrar
            deneyin.
          </div>
        ) : (
          <div className="mt-5 flex flex-wrap gap-5 justify-between ">
            {result?.map((item, i) => (
              <div
                key={i}
                className={`my-2 text-center border-2 md:w-2/5 py-5 rounded-md bg-green-100 ${
                  darkMode == true ? "dark" : ""
                }`}
              >
                <News item={item} darkMode={darkMode}></News>
              </div>
            ))}
          </div>
        )}
      </div>
      <Footer></Footer>
    </div>
    <div className="flex-1 h-full"><RightNav></RightNav></div>
    </div>
  );
}

export default App;
