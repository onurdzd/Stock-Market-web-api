import { useState, useEffect } from "react";
import axios from "axios";
import News from "./News";
import {BsSearch} from "react-icons/bs"

const Arama = ({
  result,
  setResult,
  loading,
  setLoading,
  setHisseKodu,
  hisseKodu,
}) => {
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
      method: "GET",
      url: import.meta.env.VITE_VERCEL_URL,
      params: {
        q: data,
        region: "US",
      },
      headers: {
        "X-RapidAPI-Key": import.meta.env.VITE_VERCEL_API,
        "X-RapidAPI-Host": import.meta.env.VITE_VERCEL_HOST,
      },
    };

    let response = await axios.request(options);
    if (response) {
      setLoading(false);
      setResult(response.data.news);
    } else {
      setLoading(false);
      setResult([]);
    }
  };

  return (
    <div className="flex-1 mx-auto flex flex-col justify-center sm:min-h-[700px] sm:px-20">
      <h2 className="text-center mb-1">Aramak istediğiniz hisseyi girin:</h2>
      <div className="mb-2 text-center font-roboto min-w-[200px] ">
        <form onSubmit={(e) => request(e)} className="w-full">
        <div className="flex items-center justify-center gap-1"><BsSearch></BsSearch><input
              placeholder="Hisse ismini girin"
              value={data}
              className="dark:border-[#7f7f7f] max-w-[300px]  border-black border-2 block w-full mb-2 rounded p-1 text-center font-medium italic text-black"
              onChange={(e) => setData(e.target.value)}
            ></input></div>
          <button
            type="submit"
            className="min-w-[93px] bg-[#6ba945] border-2 border-black rounded mr-2 py-2 px-4 font-semibold hover:scale-105 hover:bg-[#479219]"
            onClick={() => {
              setLoading(!loading);
              setHisseKodu("");
              setIlkArama(false);
            }}
          >
            Getir
          </button>
          <button
            type="button"
            className="bg-[#8f8282] border-2 border-black rounded py-2 px-4 font-semibold hover:scale-105 hover:bg-[#323431]"
            onClick={() => {
              setHisseKodu("");
              setResult([]);
              setData("");
              setIlkArama(true);
            }}
          >
            Temizle
          </button>
        </form>
        <div className="mt-5">
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
        </div>
      </div>
      <div className="flex flex-col items-center my-0 mx-auto max-w-[700px] ">
        {ilkArama == true ? (
          <div className="italic font-medium text-center">
            Lütfen öncelikle hisse araması yapın
          </div>
        ) : loading == true ? (
          <div className="italic font-medium text-center">
            Hisse haberleri alınıyor, lütfen bekleyin...
          </div>
        ) : result?.length == 0 ? (
          <div className="italic font-medium text-center">
            Aradığınız hisse sistemde bulunmuyor veya hatalı yazım.Tekrar
            deneyin.
          </div>
        ) : (
          <div className="flex flex-wrap gap-3 justify-between max-h-[480px] overflow-auto">
            {result?.map((item, i) => (
              <div
                key={i}
                className="w-full mx-3 text-center border-2 md:w-2/5 py-3 rounded-md bg-green-100"
              >
                <News item={item}></News>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Arama;
