import { useState } from "react";
import axios from "axios";
import { PORT } from "../../config/config";

const Arama = ({ setResult ,darkMode,loading,setLoading,setHisseKodu,setIlkArama}) => {
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
    <div className={`mb-5 text-center font-roboto w-full ${
        darkMode == "true" ? "dark" : ""
      }`}>
      <form  onSubmit={(e) => request(e)}>
        <label>
          <input placeholder="Tesla,Amazon vb" className={`border-black border-2 block w-full mb-2 rounded p-1 text-center font-medium italic ${
      darkMode == true ? "inputdark" : ""
    }`} onChange={(e) => setData(e.target.value)} value={data}></input>
        </label>
        <button type="submit" className="bg-orange-600 border-2 border-black rounded p-2 font-semibold" onClick={()=>{setLoading(!loading);setHisseKodu("");setIlkArama(false)}}>Getir</button>
        <button className="bg-lime-900 border-2 border-black rounded p-2 font-semibold" onClick={()=>{setHisseKodu("");setResult([]);setData("");setIlkArama(true)}}>Temizle</button>
      </form>
    </div>
  );
};

export default Arama;
