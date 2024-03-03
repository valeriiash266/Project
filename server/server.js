const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const PORT = 3001;
const DB_FILE = 'users.json';
const ADS_FILE = 'ads.json';

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});


app.put('/ads/:id', (req, res) => {
    const {id} = req.params
    const {title, description, img} = req.body

    if (!title || !description || !img) {
        return res.status(400).json({message: "No required"})
    }
    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
        let ads = JSON.parse(data)
        const index = ads.findIndex(ad => ad.id === id)

        if (index === -1) {
            return res.status(404).json({message: 'Ad not found'})
        }

        ads[index] = {id, title, description, img}

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (err) => {
            if (err) {
                return res.status(500).json({message: 'Intenal Server Error'})
            }
            res.status(200).json({message: 'Ad update seccessufully'})
        })
    })
})


app.delete('/ads/:id', (req, res) => {
    const {id} = req.params

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message: 'Error'})
        }
        let ads = JSON.parse(data)
        const index = ads.findIndex(ad => ad.id === id)

        if (index === -1) {
            return res.status(404).json({message: 'Ad not found'})
        }
        ads.splice(index, 1)

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (err) => {
            if (err) {
                return res.status(500).json({message: 'Error server'})
            }
            res.status(200).json({message: 'Ad delected successfully'})
        })
    })
})


app.post('/register', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const users = JSON.parse(data);

        if (users[username]) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        users[username] = { password };

        fs.writeFile(DB_FILE, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
});


app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    fs.readFile(DB_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const users = JSON.parse(data);

        if (!users[username] || users[username].password !== password) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        res.json({ message: 'Login successful' });
    });
});

app.post('/ads/create', (req, res) => {
    const { title, description, img } = req.body;

    if (!title || !description || !img) {
        return res.status(400).json({ message: 'Title, description, and img are required' });
    }

    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ message: 'Internal Server Error' });
        }

        const ads = JSON.parse(data);
        const newAd = {id: Date.now().toString(), title, description, img };

        ads.push(newAd);

        fs.writeFile(ADS_FILE, JSON.stringify(ads, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ message: 'Internal Server Error' });
            }
            res.status(201).json({ message: 'Ad created successfully' });
        });
    });
});

app.get('/ads', (req, res) => {
    fs.readFile(ADS_FILE, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({message: 'Internal Server Error'})
        }
        const ads = JSON.parse(data)
        res.json(ads)
    })
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
