import { useEffect ,useState} from "react"
import axios from "axios"

const LeftNav=()=>{
  const [marketData,setMarketData] =useState({})

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


    return(
        <div className="text-center pt-5 ">
            <h2 className="text-yellow-500 text-xl font-serif">Market Data</h2>
            <div className="text-yellow-600 text-l font-serif pt-5">EUR/USD:  {marketData["EUR/USD"] ? marketData["EUR/USD"].price :1.09510}</div>
            <div className="text-yellow-600 text-l font-serif pt-2">NASDAQ:  { marketData["NDX"] ? marketData["NDX"].price :13291.291}</div>
        </div>
    )
}

export default LeftNav