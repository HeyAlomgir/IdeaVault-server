const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
dotenv.config();


const uri = process.env.MONGODB_URI;


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
    // await client.connect();

    const db = client.db("idyavalut");
    const idyavalutCollection = db.collection("idyas");
    


    app.get('/trending-ideas', async (req, res) => {
      const result = await idyavalutCollection.find().limit(6).toArray();
      res.json(result);
    });


    app.get('/idya', async (req, res) => {
      const result = await idyavalutCollection.find().toArray();
      res.json(result)
    })

    app.get("/idya/user/:userId",async(req,res)=>{
      const {userId} = req.params;
      const result = await idyavalutCollection.find({userId}).toArray();
      res.json(result);
    })

    app.patch("/idya/user/:userId",async(req,res)=>{
      const {userId}=req.params;
      const updateData = req.body;
      const result = await idyavalutCollection.updateOne({
        _id:new ObjectId(userId)
      })
      res.json(result)
    })

    app.post('/idya', async (req, res) => {
      const idyaData = req.body;
      console.log(idyaData);
      const result = await idyavalutCollection.insertOne(idyaData);
      res.json(result);
    })

    app.get("/idya/:id", async (req, res) => {
      const { id } = req.params;
      const result = await idyavalutCollection.findOne({
        _id: new ObjectId(id)
      });
      res.json(result);
    });





    // comment all api

    app.post('/comments', async (req, res) => {
      try {
        const commentData = req.body;

        const result = await db.collection("comments").insertOne(commentData);
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to post comment" });
      }
    });

    app.get('/comments/:ideaId', async (req, res) => {
      try {
        const { ideaId } = req.params;
        const result = await db.collection("comments").find({ ideaId: ideaId }).toArray();
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Failed to fetch comments" });
      }
    });


    // my-interaciton

    app.get('/my-comments', async (req, res) => {
      try {
        const userEmailParam = req.query.email;
        const result = await db.collection("comments").find({ userEmail: userEmailParam }).toArray();
        res.json(result);

      } catch (error) {
        console.error(error);
        res.json([]);
      }
    });




    // database to delte api
    app.delete("/comments/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const result = await db.collection("comments").deleteOne({
          _id: new ObjectId(id)
        });
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Delete failed" });
      }
    });

    // databse theke update
    app.patch("/comments/:id", async (req, res) => {
      try {
        const { id } = req.params;
        const commentText = req.body;
        const result = await db.collection("comments").updateOne(
          { _id: new ObjectId(id) },
          { $set: commentText }
        );
        res.json(result);
      } catch (error) {
        res.status(500).json({ message: "Update failed" });
      }
    });




    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', async (req, res) => {
  res.send("Server is runnig !")
})

app.listen(PORT, () => {
  console.log(`Serrver runnign on port ${PORT}`);
})