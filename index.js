const express = require('express');
const cors = require('cors');
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
app.get('/users', (req, res) =>{
    res.send(users);
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