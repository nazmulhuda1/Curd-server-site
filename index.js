const express = require('express');
const cors = require('cors')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express()
const port = process.env.PORT || 5000;

// midellwere
app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sednmxn.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run() {
    try {
        const usersCollection = client.db('curdOparetions').collection('users');

        // post user
        app.post('/users', async (req, res) => {
            const query = req.body;
            const result = await usersCollection.insertOne(query)
            res.send(result)
        })



        // get user & show client site
        app.get('/users', async (req, res) => {
            const user = req.body;
            const result = await usersCollection.find(user).toArray()
            res.send(result)
        })


        // get user find
        app.get('/users/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.findOne(query)
            res.send(user);
        })


        // delete user 
        app.delete('/users/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const user = await usersCollection.deleteOne(query)
            res.send(user)
        })



        // user Update
        app.patch('/users/:id', async (req, res) => {
            const id = req.params.id;
            const filter = { _id: ObjectId(id) };
            const user = req.body;
            const option = { upsert: true };
            const updatedUser = {
                $set: {
                    name: user.name,
                    email: user.email
                }
            }
            const result = await usersCollection.updateOne(filter, updatedUser, option)
            res.send(result)
        })






    }
    finally {

    }

}
run().catch(err => console.log(err))










// ---------------
app.get('/', (req, res) => {
    res.send('travel site is working')
})
app.listen(port, () => {
    console.log(`travel server site is running on ${port}`)
})