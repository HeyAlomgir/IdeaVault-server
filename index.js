const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
dotenv.config();


const uri =process.env.MONGODB_URI;


const app = express();
const PORT = process.env.PORT

app.use(cors());
app.use(express.json());

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


async function run() {
  try {
   await client.connect();

   const db = client.db("idyavalut");
   const idyavalutCollection = db.collection("idyas");

   app.post('/idya',async (req,res)=>{
    const idyaData = req.body;
    console.log(idyaData);
    const result = await idyavalutCollection.insertOne(idyaData);
    res.json(result);
   })

    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/',async(req,res)=>{
    res.send("Server is runnig !")
})

app.listen(PORT, ()=>{
    console.log(`Serrver runnign on port ${PORT}`);
})