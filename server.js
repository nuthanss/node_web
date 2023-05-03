const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'index.html'));
// });

// app.use('/contact', (req, res) => {
//     res.sendFile(path.join(__dirname, './public', 'contact.html'));
// });

const PORT = 3002;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`);
});