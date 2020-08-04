const express = require('express');
const shortid = require('shortid');

const server = express();
server.use(express.json());

let Nextusers = [
    { id: shortid.generate(), name: 'Sam', bio: "Sam's story" },
    { id: shortid.generate(), name: 'Tom', bio: "tom's toothpaste" },
    { id: shortid.generate(), name: 'Tim', bio: "tim's cook" },
    { id: shortid.generate(), name: 'Joe', bio: "Joe's adventure" },
    { id: shortid.generate(), name: 'Gabe', bio: "Gabe's lecture" },
    { id: shortid.generate(), name: 'John', bio: "John's parkride" },
    { id: shortid.generate(), name: 'Carl', bio: "Carl's theory" },
    { id: shortid.generate(), name: 'Bill', bio: "Bill's work, not bird" }
];

server.post('/api/Nextusers', (req, res) => {
    const user = req.body;
    user.id = shortid.generate();
    //        if ( !user.hasOwnProperty('name') || !user.hasOwnProperty('bio'))
    if (!user.name || !user.bio)
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    try {
        Nextusers.push(user);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    }
});

server.get('/api/Nextusers', (req, res) => {
    try {
        //        res.send(Nextusers);
        res.status(200).json(Nextusers);
    } catch (err) {
        res.status(500).json({ errorMessage: "The Nextusers information could not be retrieved." })
    }
});

server.get('/api/Nextusers/:id', (req, res) => {
    const userId = req.params.id;
    const user = Nextusers.find(x => x.id === userId)
    console.log("user:" + JSON.stringify(user));
    try {
        if (!user)
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        else
            res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    }
});

server.delete('/api/Nextusers/:id', (req, res) => {
    const userId = req.params.id;
    const originalLength = Nextusers.length;
    try {
        Nextusers = Nextusers.filter(x => x.id !== userId);
        if (originalLength === Nextusers.length) {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        } else {
             res.status(200).end();
            //  if you plan to send anything back, change from 204 to 200. 
            // The 204 code is only when you don't plan to send a response.
            // res.status(204).end();
        }
    }
    catch (err) {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
});

server.put('/api/Nextusers/:id', (req, res) => {
    const change = req.body;
    const changeId = req.params.id;
    let findUser = Nextusers.find(x => x.id === changeId);
    try {
        if (findUser) {
            console.log('findUser:' + json.stringify(findUser));
            Object.assign(findUser, change);
            res.status(200).json(findUser);
            if (!findUser)
                res.status(404).json({ message: `The user with the specified ID ${changeId} does not exist.` });
            if (!change.name || !change.bio)
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." });
        }
    } catch(error) {
        console.log("ERROR:" + error);
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    }
});

const port = 5000;
server.listen(port, () => console.log('server is running'));