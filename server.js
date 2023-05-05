const express = require('express');
const dotenv = require('dotenv');
const app = express();
const path = require('path');

dotenv.config();

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

app.get('/port', (req, res) => {
   res.send(process.env.PORT)
})
const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});