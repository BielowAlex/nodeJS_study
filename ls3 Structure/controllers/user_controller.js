const fs = require("fs/promises");
const path = require("path");

const filePATH = path.join( 'db', 'data.txt');
console.log(filePATH);

module.exports = {

    getAllUsers: async (req, res)=>{
        const users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));
        console.log(users);
        res.status(201).json(users)
    },

    getUserById:async (req, res)=>{
        const userID = req.params.userId;
        const users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));

        if (userID < 0 || userID >= users.length) {
            res.status(404).json('Please enter valid id');
            return;
        }

        res.status(201).json(users[userID]);
    },

    postUser:async (req,res)=>{
        let users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));
        const newUser = {id: users[users.length - 1].id + 1, name: req.query.name};

        users.push(newUser);

        await fs.writeFile(filePATH, JSON.stringify(users).toString());
        users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));
        res.status(201).json(users);
    },

    updateUser:async (req,res)=>{
        const userID = req.params.userId;
        const users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));

        if (userID < 0 || userID >= users.length) {
            res.status(404).json('Please enter valid id');
            return;
        }

        users[userID].name = req.query.name;

        await fs.writeFile(filePATH, JSON.stringify(users).toString());

        res.status(201).json(users[userID]);
    },

    deleteUser:async(req,res)=>{
        const userID = req.params.userId;
        let users = await fs.readFile(filePATH).then(data => JSON.parse(data.toString()));

        if (userID < 0 || userID >= users.length) {
            res.status(404).json('Please enter valid id');
            return;
        }


        users.splice(userID, 1);
        console.log(users);
        await fs.writeFile(filePATH, JSON.stringify(users).toString());

        res.status(201).json(users)
    }

}