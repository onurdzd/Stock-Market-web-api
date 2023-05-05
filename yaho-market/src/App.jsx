import { useEffect, useState } from "react";
import News from "./Components/News";
import Arama from "./Components/Arama";
import { TiWeatherNight } from "react-icons/ti";
import { BsSun } from "react-icons/bs";

function App() {
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );
  const [loading, setLoading] = useState(false);
  const [hisseKodu,setHisseKodu]=useState("")

  const localTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!darkMode));
  };

  console.log(result);

  const rootClassName = () => {
    if (document.getElementById("root").className != "dark") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  };

  useEffect(()=>{
    if(darkMode==true){
      document.getElementById("root").classList.add("dark");
    }
  },[darkMode])

  useEffect(()=>{
    for(let i=0;i<result.length;i++){
      if(result[i].relatedTickers && result[i].relatedTickers!==""){
        setHisseKodu(result[i].relatedTickers)
        break
      }else{
        continue
      }
    }
  },[result.length>0])

  return (
    <div className={`bg-white ${darkMode == true ? "dark" : ""}`}>
      <div className="text-right pt-3 pr-10 text-2xl ">
        <button
          onClick={() => {
            setDarkMode(!darkMode);
            localTheme();
            rootClassName();
          }}
        >
          {darkMode == true ? (
            <TiWeatherNight></TiWeatherNight>
          ) : (
            <BsSun></BsSun>
          )}
        </button>
      </div>
      <div
        className={`flex flex-col items-center w-3/4 my-0 mx-auto ${
          darkMode == true ? "dark" : ""
        }`}
      >
        <div>
          <Arama
            result={result}
            setResult={setResult}
            darkMode={darkMode}
            loading={loading}
            setLoading={setLoading}
            setHisseKodu={setHisseKodu}
          ></Arama>
        </div>
        {result.length > 0 && (
          <div className="mb-2">
            <span className="text-blue-700 font-semibold italic">
              Hisse Kodu:{" "}
            </span>
            <span className="italic font-semibold">
              {result.length > 0 && hisseKodu }
            </span>
          </div>
        )}
        {loading == true ? (
          <div className="italic font-medium">Hisse haberleri alınıyor, lütfen bekleyin...</div>
        ) : result.length==0 ? <div className="italic font-medium">Aradığın hisse sistemde bulunmuyor veya hatalı yazım</div> : (
          <div className="mt-5 flex flex-wrap gap-10 justify-center ">
            {result.map((item, i) => (
              <div
                key={i}
                className={`my-2 text-center border-2 w-full md:w-2/5 py-5 rounded-md bg-green-100 ${
                  darkMode == true ? "dark" : ""
                }`}
              >
                <News item={item} darkMode={darkMode}></News>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
