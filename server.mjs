import { fileURLToPath } from 'url';
import { dirname } from 'path';
import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import jwt from 'jsonwebtoken';
import fetch from 'node-fetch';

// Get the directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
dotenv.config();

app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

// app.use('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'contact.html'));
// });
// const data = 123;
// app.use('/contact', (req, res) => {
//     res.render('contact', { data })
//  })
function cretaeToken() {
    const expiresIn = "2h";
    const key = process.env.JWT_SIGNING_KEY; 
    const payload ={
        audience: "ui-soul",
        subject: "soul"
    }
    return jwt.sign(payload, key, { expiresIn });
}

app.post('/register', async (req, res) => {

    let status;
    let message;
    
    const token = cretaeToken();
    await fetch('http://localhost:9000/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( req.body )
    }).then(res => res.json())
        .then(data => {
            status = data.status;
            message= data.message;
        }).catch(err => {
            console.log(err)
            //alert('Something went wrong !');
        })
        res.status(status).json({ status, message });
})

app.post('/login', async (req, res) => {

    console.log(req.body)
    let status;
    let message;
    let access_token;
    
    const token = cretaeToken();
    await fetch('http://localhost:9000/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
             Authorization: `Bearer ${token}`
        },
        body: JSON.stringify( req.body )
    }).then(res => res.json())
        .then(data => {
            status = data.status;
            message= data.message;
            access_token=data.access_token
        }).catch(err => {
            console.log(err)
            //alert('Something went wrong !');
        })
        res.status(status).json({ status, message });
})
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});