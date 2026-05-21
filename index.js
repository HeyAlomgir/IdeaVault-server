const express = require('express');
const app = express();

const PORT = 5000

app.get('/',async(req,res)=>{
    res.send("Server is runnig !")
})

app.listen(PORT, ()=>{
    console.log(`Serrver runnign on port ${PORT}`);
})