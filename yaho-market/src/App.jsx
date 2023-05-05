import { useState } from "react";
import News from "./Components/News";
import Arama from "./Components/Arama";
import { TiWeatherNight } from "react-icons/ti";
import { BsSun } from "react-icons/bs";

function App() {
  const [result, setResult] = useState([]);
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const localTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!darkMode));
  };
  console.log(darkMode)
  const rootClassName=()=>{
    if (document.getElementById("root").className!="dark"){
      document.getElementById("root").classList.add('dark');
    }else{
      document.getElementById("root").classList.remove('dark');
    }
  }
  console.log(result);
  return (
    <div className={`bg-white ${darkMode == true ? "dark" : ""}`}>
      <div className="text-right pt-3 pr-10 text-2xl "><button
        onClick={() => {
          setDarkMode(!darkMode);
          localTheme();
          rootClassName();
        }}
      >
        {darkMode == true ? <TiWeatherNight></TiWeatherNight> : <BsSun></BsSun>}
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
          ></Arama>
        </div>
        <div className="mb-2">
          <span className="text-blue-700 font-semibold italic">
            Hisse Kodu:{" "}
          </span>
          <span className="italic">
            {result.length > 0 && result[4].relatedTickers}
          </span>
        </div>
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
      </div>
    </div>
  );
}

export default App;
