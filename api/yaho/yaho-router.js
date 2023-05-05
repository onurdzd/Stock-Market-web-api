const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
    res.status(200).json({message:"api sayfasındasın"})
})

router.get("/ask/:stock", async (req, res) => {
    let options = {
        method: 'GET',
        url: process.env.URL,
        params: {
          q: req.params.stock,
          region: 'US'
        },
        headers: {
          'X-RapidAPI-Key': process.env.API,
          'X-RapidAPI-Host': process.env.HOST
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
})



module.exports=router