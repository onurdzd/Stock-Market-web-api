import axios from "axios";

module.exports =async (req,res)=>{
    console.log("vercel router req atıldı")
    if(req.method === "GET"){
        let options = {
            method: 'GET',
            url: import.meta.env.VITE_VERCEL_URL,
            params: {
              q: req.params.data,
              region: 'US'
            },
            headers: {
              'X-RapidAPI-Key': import.meta.env.VITE_VERCEL_API,
              'X-RapidAPI-Host': import.meta.env.VITE_VERCEL_HOST
            }
          };
        
          try {
            let response = await axios.request(options);
            if(response){
                res.status(200).json({message:response.data.news})
            }else{
                res.status(400).json({message:"Cevap yok"})
            }
        } catch (error) {
            console.error(error);
        }
    }else{
        res.send({status:"get req yok"})
    }
}
