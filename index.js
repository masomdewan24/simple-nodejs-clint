const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
app.get('/', (req, res) =>{
    res.send('Simple Node Server is Running')
});

app.use(cors());
app.use(express.json())

const users = [
    {id: 1, name: 'Iqbal', email: 'iqbal@gmail.com'},
    {id: 2, name: 'Sumon', email: 'sumon@gmail.com'},
    {id: 3, name: 'Twhid', email: 'twhid@gmail.com'}
];

// username: dbuser1
//password: gerzOOaNv2FSyqSy



const uri = "mongodb+srv://dbuser1:gerzOOaNv2FSyqSy@cluster0.6scmlus.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(err => {
  const collection = client.db("simpleNode").collection("users");
  // perform actions on the collection object
  console.log('database connected')
  client.close();
});

app.get('/users', (req, res) =>{
    if(req.query.name){
        const search = req.query.name;
       const filtered = users.filter(usr => usr.name.toLowerCase().indexOf(search) >= 0)
        res.send(filtered)
    }
    else{
        res.send(users);
    }
    
})

app.post('/users', (req, res) =>{
    console.log('Post API called');
    const user = req.body;
    user.id = users.length +1;
    users.push(user);
    console.log(user);
    res.send(user);
})
app.listen(port, () =>{
    console.log(`Simple node server on port${port}`);
})