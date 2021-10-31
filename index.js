const express = require('express')
const { MongoClient } = require('mongodb')
require('dotenv').config()
const app = express();
const port = 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1zbsq.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });


async function run() {
    try {
        await client.connect()
        const database = client.db('tourAddTravel');
        const toursCollection = database.collection('tours');

        //Post Api
        app.post('/tourShiping', async (req, res) => {
            const tour = {
                "img": "https://tour.com.bd/uploads/images/tours/slider/370472_M.V-Aboshar-2.jpg",
                "name": "SUNDARBAN TOUR KHULNA-Dhaka",
                "address": "Dhaka",
                "price": " 12000",
                "description": "Arrive at Khulna in the morning and transfer to our vessel...The boat will immediately start its journey towards the Sundarban forest. On the way, the boat will stop at Karamjal Eco Park and explore the mangrove forest walking through "
            }
            // const result = await toursCollection.insertOne(tour)
            // console.log(result);

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
