import { TiWeatherNight } from "react-icons/ti";
import { BsSun } from "react-icons/bs";
import { useEffect, useState } from "react";

const Headers = () => {
  const [darkMode, setDarkMode] = useState(
    JSON.parse(localStorage.getItem("theme"))
  );

  const rootClassName = () => {
    if (document.getElementById("root").className != "dark") {
      document.getElementById("root").classList.add("dark");
    } else {
      document.getElementById("root").classList.remove("dark");
    }
  };

  useEffect(() => {
    if (darkMode == true) {
      document.getElementById("root").classList.add("dark");
    }
  }, [darkMode]);

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
    </div>
  );
};

export default Headers;
