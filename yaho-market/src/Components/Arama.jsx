import { useState } from "react";
import axios from "axios";
import { PORT } from "../../config/config";

const Arama = ({ setResult ,darkMode,loading,setLoading,setHisseKodu}) => {
  const [data, setData] = useState();

  const request = async (e) => {
    e.preventDefault();
    await axios
      .get(`http://localhost:${PORT}/api/ask/${data}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        setLoading(false)
        setResult(res.data.message);
      })
      .catch((err) => console.log(err));
  };
  return (
    <div className={`mb-5 text-center font-roboto ${
        darkMode == "true" ? "dark" : ""
      }`}>
      <form onSubmit={(e) => request(e)}>
        <h1 className="font-bold text-orange-500 mt-5 text-2xl">Hisse Haberleri</h1>
        <label>
          <input placeholder="Tesla,Amazon vb" className={`border-black border-2 rounded p-1 mt-3 mr-2 text-center font-medium italic ${
      darkMode == true ? "inputdark" : ""
    }`} onChange={(e) => setData(e.target.value)}></input>
        </label>
        <button type="submit" className="bg-orange-600 border-2 border-black rounded p-1 font-semibold" onClick={()=>{setLoading(!loading);setHisseKodu("");setResult([])}}>Getir</button>
      </form>
    </div>
  );
};

export default Arama;
