


const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require("cors");

const objectId = require('mongodb').ObjectId;
require('dotenv').config();
const app = express();
// MiddleWare
app.use(cors());
app.use(express.json())
const port = process.env.PORT || 5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zpk1a.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//console.log(uri) // for checking user/pass is alright

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect();
        const database = client.db("bloodbank");
        const bloodCollection = database.collection("bloodGroupList");
        const Doners = database.collection("doners");
        const DonerRequest = database.collection("donerRequestStore");
        // const usersCollection = database.collection("users");


        //GET API ALL bloodGroup

        app.get('/bloodGroupList', async (req, res) => {
            const cursor = bloodCollection.find({});
            const bloodGroup = await cursor.toArray();
            res.send(bloodGroup)
        })

        // GET SINGLE BloodGroup API

        app.get('/bloodGroupList/:id', async (req, res) => {
            const id = req.params.id;

            const query = { _id: objectId(id) };
            console.log(query)
            const bloodGroup = await bloodCollection.findOne(query);
            res.json(bloodGroup);
        })


        // POST API BloodGroup
        app.post('/bloodGroupList', async (req, res) => {
            const bloodGroup = req.body;

            console.log("Hitting the post", bloodGroup)
            const result = await bloodCollection.insertOne(bloodGroup);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result)
        })

        // //DELETE API BloodGroup


        app.delete('/bloodGroupList/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: objectId(id) };
            const result = await bloodCollection.deleteOne(query);

            console.log('deleting bloodGroup with id ', result);

            res.json(result);
        })



        // Doners

        // //GET API Doners

        app.get('/doners', async (req, res) => {
            const cursor = Doners.find({});
            const doners = await cursor.toArray();
            res.send(doners)
        })

        // //GET SINGLE API Doners

        app.get('/doners/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: objectId(id) };
            const doners = await Doners.findOne(query);
            // console.log('load user with id: ', id);
            res.send(doners);
        })
        // // // POST API Doners
        app.post('/doners', async (req, res) => {
            const doners = req.body;

            console.log(doners)
            const result = await Doners.insertOne(doners);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            res.send(result)

        })




        // //DELETE API Doners


        app.delete('/doners/:id', async (req, res) => {
            const id = req.params.id;
            console.log(id)
            const query = { _id: objectId(id) };
            const result = await Doners.deleteOne(query);

            console.log('deleting purchases with id ', result);

            res.json(result);
        })




        //GET API DonerRequiste

        app.get('/donerRequestStore', async (req, res) => {
            const cursor = DonerRequest.find({});
            const DonerRequestcollection = await cursor.toArray();
            res.send(DonerRequestcollection)
        })

        app.post("/donerRequestStore", async (req, res) => {
            const DonerRequestcollection = req.body;
            const result = await DonerRequest.insertOne(DonerRequestcollection);
            console.log(result);
            res.json(result);
        });















    } finally {
        //await client.close();
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Runnig blood SERVER')
})


app.listen(port, () => {
    console.log("Runnig blood server on port", port)
})












