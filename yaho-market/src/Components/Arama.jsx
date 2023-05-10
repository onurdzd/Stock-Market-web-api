import { useState,useEffect } from "react";
import axios from "axios";
import News from "./News";


const Arama = ({ result,setResult ,darkMode,loading,setLoading,setHisseKodu,hisseKodu}) => {
  const [data, setData] = useState("");
  const [ilkArama, setIlkArama] = useState(true);

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


    //frontentden direk req:
    let options = {
      method: 'GET',
      url: import.meta.env.VITE_VERCEL_URL,
      params: {
        q: data,
        region: 'US'
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_VERCEL_API,
        'X-RapidAPI-Host': import.meta.env.VITE_VERCEL_HOST
      }
    };
   
      let response = await axios.request(options);
      if(response){
        setLoading(false)
        setResult(response.data.news)
      }else{
        setLoading(false)
        setResult([])
      }
  };

  return (
    <div  className={`flex flex-col items-center my-0 mx-auto max-w-[1260px] flex-grow ${
      darkMode == true ? "dark" : ""
    }`}>
    <div className={`mb-5 text-center font-roboto min-w-[300px] ${
        darkMode == "true" ? "dark" : ""
      }`}>
      <form onSubmit={(e) => request(e)}>
        <label>
          <input placeholder="Tesla,Amazon vb" value={data} className={`border-black border-2 block w-full mb-2 rounded p-1 text-center font-medium italic ${
      darkMode == true ? "inputdark" : ""
    }`} onChange={(e) => setData(e.target.value)} ></input>
        </label>
        <button type="submit" className="bg-orange-600 border-2 border-black rounded mr-2 p-2 font-semibold" onClick={()=>{setLoading(!loading);setHisseKodu("");setIlkArama(false)}}>Getir</button>
        <button type="button" className="bg-lime-800 border-2 border-black rounded p-2 font-semibold" onClick={()=>{setHisseKodu("");setResult([]);setData("");setIlkArama(true)}}>Temizle</button>
      </form>
    </div>
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
      
    )}</div>
  );
};

export default Arama;
