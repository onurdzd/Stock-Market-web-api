import { useEffect ,useState} from "react"
import axios from "axios"

const LeftNav=()=>{
  const [marketData,setMarketData] =useState({})
  const [marketData2,setMarketData2] =useState({})

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
          "X-RapidAPI-Key":import.meta.env.VITE_VERCEL_API,
          "X-RapidAPI-Host": import.meta.env.VITE_MARKET_HOST,
        },
      };
      let options2 = {
        method: "GET",
        url: import.meta.env.VITE_MARKET3_URL,
        params: {
          id: 'aud,brl,cad,chf,cny,czk,dkk,eur,gbp,hkd,huf,inr,jpy,mxn,nok,nzd,pln,rub,sek,try,twd,usd,zar'
        },
        headers: {
          "X-RapidAPI-Key":import.meta.env.VITE_VERCEL_API,
          "X-RapidAPI-Host": import.meta.env.VITE_MARKET2_HOST,
        },
      };

      try {
        const response =await axios.request(options);
        setMarketData(response.data);
        const response2 = await axios.request(options2);
        setMarketData2(response2.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchMyAPI();
  }, []);

  let exoticCurrencies=[]
  for ( let i in marketData2.result){
    exoticCurrencies.push({currency:marketData2.result[i].symbol,price:marketData2.result[i].last.slice(0,5)})
  }

    return(
      <div className="flex-1 text-center">
            <h2 className="text-yellow-500 text-xl font-serif pb-3">Market Data</h2>
        <div className=" pt-2 sm:max-w-[400px] mx-auto max-h-[200px] sm:max-h-[600px] overflow-auto">
            <div className="text-blue-400 text-base font-serif pt-5">EURUSD:  {marketData["EUR/USD"] ? marketData["EUR/USD"].price.slice(0,5) :1.09510}</div>
            <div className="text-blue-400 text-base font-serif ">NASDAQ:  { marketData["NDX"] ? marketData["NDX"].price.slice(0,5) :13291.291}</div>
            {exoticCurrencies?.map((item,index)=>
              <div className="text-blue-400 text-base font-serif" key={index}>{item.currency+" : " + item.price}</div>)}
        </div>
        </div>
    )
}

export default LeftNav