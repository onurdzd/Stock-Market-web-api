import { useEffect, useState } from "react";
import axios from "axios";
import { BsSearch } from "react-icons/bs";

const LeftNav = () => {
  const [marketData, setMarketData] = useState({});
  const [marketData2, setMarketData2] = useState({});
  let exoticCurrencies = [];
  const [filteredCurrencies,setFilteredCurrencies]=useState([]);

  //localhost req:
  //     useEffect(() => {
  //     async function fetchMyAPI() {
  //       let options2 = {
  //         method: "GET",
  //         url: import.meta.env.VITE_MARKET_URL,
  //         params: {
  //           symbol: "EUR/USD,NDX",
  //           format: "json",
  //           outputsize: "30",
  //         },
  //         headers: {
  //           "X-RapidAPI-Key":
  //           import.meta.env.VITE_VERCEL_API,
  //           "X-RapidAPI-Host": import.meta.env.VITE_MARKET_HOST,
  //         },
  //       };

  //       try {
  //         const response =await axios.request(options2);
  //         console.log(marketData)
  //         setMarketData(response.data);
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     }
  //     fetchMyAPI();
  //   }, []);

  useEffect(() => {
    async function fetchMyAPI() {
      let options = {
        method: "GET",
        url: import.meta.env.VITE_MARKET_URL,
        params: {
          symbol: "EUR/USD,NDX",
          format: "json",
          outputsize: "30",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VERCEL_API,
          "X-RapidAPI-Host": import.meta.env.VITE_MARKET_HOST,
        },
      };
      let options2 = {
        method: "GET",
        url: import.meta.env.VITE_MARKET3_URL,
        params: {
          id: "aud,brl,cad,chf,cny,czk,dkk,eur,gbp,hkd,huf,inr,jpy,mxn,nok,nzd,pln,rub,sek,try,twd,usd,zar",
        },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_VERCEL_API,
          "X-RapidAPI-Host": import.meta.env.VITE_MARKET2_HOST,
        },
      };

      try {
        const response = await axios.request(options);
        setMarketData(response.data);
        const response2 = await axios.request(options2);
        setMarketData2(response2.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  for (let i in marketData2.result) {
    exoticCurrencies.push({
      currency: marketData2.result[i].symbol,
      price: marketData2.result[i].last.slice(0, 5),
    });
  }
 
  exoticCurrencies.push({
    currency: "EURUSD",
    price: marketData["EUR/USD"]?.price.slice(0, 5),
  },{
    currency: "NASDAQ",
    price: marketData["NDX"]?.price.slice(0, 5),
  });

  exoticCurrencies.sort((a,b)=> {
    if (a.currency === "NASDAQ" || a.currency === "EURUSD" || a.currency === "EURTRY") return -1; 
  return a.currency.localeCompare(b.currency)})

  const searchParite=(e)=>{
    setFilteredCurrencies(exoticCurrencies.filter(item=> item.currency.includes(e.toUpperCase())))
  }

  return (
    <div className="flex-1 text-center">
      <h2 className="text-yellow-500 text-xl font-serif pb-4">Market Data</h2>
      <div className="flex items-center justify-center gap-1 pb-2">
        <BsSearch></BsSearch>
        <input
        onChange={e=>searchParite(e.target.value)}
          placeholder="Parite ismini girin"
          className="dark:border-[#7f7f7f] max-w-[150px] border-black border-2 block w-full mb-2 rounded p-1 text-center font-medium italic text-black"
        ></input>
      </div>
      <div className="pt-3 sm:min-h-[200px] sm:max-w-[400px] mx-auto max-h-[200px] sm:max-h-[300px] overflow-auto">
        {Object.keys(marketData2).length==0 ? (
          <div className="text-xl dark:text-[#7f7f7f]">Yükleniyor...</div>
        ) : ( filteredCurrencies?.length>0 ? 
          filteredCurrencies?.map((item, index) => (
            <div
              className="cursor-pointer w-[90%] mx-auto hover:scale-105 text-black dark:text-[#7f7f7f] text-base font-bold font-sans pb-2"
              key={index}
            >
              {item.currency + " : " + item.price}
            </div>
          )):
          exoticCurrencies?.map((item, index) => (
            <div
              className="cursor-pointer w-[90%] mx-auto hover:scale-105 text-black dark:text-[#7f7f7f] text-base font-bold font-sans pb-2"
              key={index}
            >
              {item.currency + " : " + item.price}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftNav;
