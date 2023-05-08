import { TiWeatherNight } from "react-icons/ti";
import { BsSun } from "react-icons/bs";

const Headers = ({ darkMode, setDarkMode }) => {
  const rootClassName = () => {
    if (document.getElementById("root").className != "dark") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  };

  const localTheme = () => {
    localStorage.setItem("theme", JSON.stringify(!darkMode));
  };

  return (
    <div>
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
      <h1 className="font-bold italic text-orange-500 pt-5 mb-10 text-6xl text-center">
        Hisse Haberleri
      </h1>
    </div>
  );
};

export default Headers;
