const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors');
const { query } = require('express');
require('dotenv').config()
const app = express();
const port = process.env.port || 5000;

app.use(cors())
app.use(express.json())
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        //order client 
        const clientData = client.db('tourAddTravel');
        const clientOrderCollection = clientData.collection('ClientOrder')
        //offer book mongodb 
        const database = client.db('tourAddTravel');
        const offerCollection = database.collection('offers');

        //tour book  mongodb
        const databases = client.db('tourAddTravel');
        const toursCollection = databases.collection('TourBook');


        //Get Api offer
        app.get('/offers', async (req, res) => {
            const cursor = offerCollection.find({})
            const offers = await cursor.toArray();
            res.send(offers);
        })
        //get Api tour 
        app.get('/tour', async (req, res) => {
            const cursors = toursCollection.find({})
            const tour = await cursors.toArray();
            res.send(tour);
        })


        //Post sadaron data Api
        app.post('/tourShiping', async (req, res) => {
            const offers = req.body;
            // console.log('hit the console api', tours);

            const result = await toursCollection.insertOne(offers)
            // console.log(result);
            res.json(result)
        })
        // post all time client data store 

        app.get('/allorder', async (req, res) => {
            let query = {};
            const email = req.query.email;
            if (email) {
                query = { email: email };

            }
            const cursor = clientOrderCollection.find(query);
            const ClientOrder = await cursor.toArray();
            res.json(ClientOrder);

        })
        app.post('/allOrder', async (req, res) => {
            const allOrder = req.body;
            allOrder.createdAt = new Date();
            // console.log('hit the allOrder', allOrder);
            const results = await clientOrderCollection.insertOne(allOrder)
            res.json(results)
        })

    }
    finally {
        // await client.close();
    }

}
run().catch(console.dir);












app.get('/', (req, res) => {
    res.send('Running Tourism Server')
})
app.listen(port, () => {
    console.log('Running Tourism Server Port', port);
})
