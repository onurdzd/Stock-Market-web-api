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
    <div className="text-center pt-5 flex flex-col items-center ">
      <h1 className="text-yellow-500 text-xl font-serif pb-5">
        Öne Çıkan Haberler
      </h1>
      {news?.map((item, id) => (
        <div key={id} className="flex flex-col items-center w-3/5 ">
            {item?.stories.length > 9 && (
              <div className="mb-3 border rounded ">
                <div>{item?.stories[0].title}</div>
                <div className="text-[#cfc246] hover:text-slate-500">
                  <a href={item?.stories[0].shortURL}>Haber Linki</a>
                </div>
                <div className="text-center">
                  <img
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
  );
};

export default RightNav;
