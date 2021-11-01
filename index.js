const express = require('express')
const { MongoClient } = require('mongodb')
const cors = require('cors')
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
        const database = client.db('tourAddTravel');
        const toursCollection = database.collection('tours');

        //Post Api
        app.post('/tourShiping', async (req, res) => {
            const tours = req.body;
            console.log('hit the console api', tours);

            const result = await toursCollection.insertOne(tours)
            console.log(result);
            res.json(result)
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
