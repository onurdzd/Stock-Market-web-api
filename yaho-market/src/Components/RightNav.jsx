import axios from "axios";
import { useState, useEffect } from "react";
import gpt from "../assets/gpt.jpg";

const RightNav = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    async function fetchMyAPI() {
      let options3 = {
        method: "GET",
        url: import.meta.env.VITE_MARKET2_URL,
        params: { id: "markets" },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VERCEL_API,
          "X-RapidAPI-Host": import.meta.env.VITE_MARKET2_HOST,
        },
      };
      let response = await axios.request(options3);
      setNews(response.data.modules);
    }
    fetchMyAPI();
  }, []);

  return (
    <div className="flex-1 pt-2 mx-auto ">
      <h2 className="text-yellow-500 text-xl font-serif sm:pb-2 text-center">
        Öne Çıkan Haberler
      </h2>
      {news?.length>0 ? 
      <div className=" max-h-[600px] overflow-auto text-center pt-2">
        <div className="w-4/5 mx-auto max-w-[300px]">
          {news?.map((item, id) => (
            <div key={id} className="mb-3">
              {item?.stories.length > 9 && (
                <div className="border rounded">
                  <div>{item?.stories[0].title}</div>
                  <div className="text-[#cfc246] hover:text-slate-500">
                    <a href={item?.stories[0].shortURL}>Haber Linki</a>
                  </div>
                  <div className="text-center">
                    <img
                      className="mx-auto"
                      src={
                        item?.stories[0].thumbnailImage
                          ? item?.stories[0].thumbnailImage
                          : gpt
                      }
                      alt="baslik"
                    ></img>
                  </div>
                </div>
              )}
            </div>
          ))} 
        </div>
      </div>: <div className="text-center text-xl dark:text-white text-black mt-5 sm:min-h-[600px] min-h-[250px]">Yükleniyor...</div>}
    </div>
  );
};

export default RightNav;
