const express = require('express')
const app = express();
const cors = require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const port = process.env.PORT || 5000;


app.use(express.json())
app.use(cors());

// app.use(cors({ origin: ["http://localhost:3000",], }));



const uri = `mongodb+srv://${process.env.NAME_DB}:${process.env.PASSWORD_DB}@cluster0.gweohfd.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri)
const run = async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


    try {

        const UserInfoCollection = client.db("econnection").collection("userInfo");
        const postCollection = client.db("econnection").collection("postData");

        app.post("/user", async (req, res) => {
            const user = req.body;
            const result = await UserInfoCollection.insertOne(user);
            res.send(result);
        });

        app.get('/user', async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const user = await UserInfoCollection.find(query).toArray();
            res.send(user)
        })


        app.post('/postData', async (req, res) => {
            const postData = req.body;
            const result = await postCollection.insertOne(postData);
            res.send(result);
        })


    } finally {

    }


}

run().catch(console.dir)



app.get('/', async (req, res) => {
    res.send('eapps server is running now')
})

app.listen(port, () => {
    console.log(`server listening on port ${port}`)
})



