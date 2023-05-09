import { useState } from "react";
import axios from "axios";

const Arama = ({ setResult ,darkMode,loading,setLoading,setHisseKodu,setIlkArama}) => {
  const [data, setData] = useState();

  const request = async (e) => {
    e.preventDefault();
    //backend aktifken aşağısı
    // await axios
    //   .get(`http://localhost:${import.meta.env.VITE_PORT}/api/ask/${data}`, {
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     setLoading(false)
    //     setResult(res.data.message);
    //   })
    //   .catch((err) => console.log(err));

    let options = {
      method: 'GET',
      url: import.meta.env.VITE_URL,
      params: {
        q: data,
        region: 'US'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_API,
        'X-RapidAPI-Host': import.meta.env.VITE_HOST
      }
    };
  
    try {
      let response = await axios.request(options);
      if(response){
        setLoading(false)
        setResult(response.data.news)
      }else{
        setLoading(false)
        setResult([])
      }
  } catch (error) {
      console.error(error);
  }
  };

  return (
    <div className={`mb-5 text-center font-roboto min-w-[300px] ${
        darkMode == "true" ? "dark" : ""
      }`}>
      <form  onSubmit={(e) => request(e)}>
        <label>
          <input placeholder="Tesla,Amazon vb" className={`border-black border-2 block w-full mb-2 rounded p-1 text-center font-medium italic ${
      darkMode == true ? "inputdark" : ""
    }`} onChange={(e) => setData(e.target.value)} value={data}></input>
        </label>
        <button type="submit" className="bg-orange-600 border-2 border-black rounded mr-2 p-2 font-semibold" onClick={()=>{setLoading(!loading);setHisseKodu("");setIlkArama(false)}}>Getir</button>
        <button className="bg-lime-800 border-2 border-black rounded p-2 font-semibold" onClick={()=>{setHisseKodu("");setResult([]);setData("");setIlkArama(true)}}>Temizle</button>
      </form>
    </div>
  );
};

export default Arama;
