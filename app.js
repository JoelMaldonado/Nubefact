const express = require('express')
const app = express();
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();
app.use(express.json())
app.use(cors());

app.post('/nubefact', (req, res) => {

    const apiUrl = req.body.url;
    const data = req.body.data;
    const headers = {
        'Authorization': req.body.token,
        'Content-Type': 'application/json',
    };

    console.log(req.body);

    axios.post(apiUrl, data, { headers })
        .then(response => {
            res.json(response.data);
        })
        .catch(error => {
            if (error.response) {
                res.status(error.response.status).json(error.response.data);
            } else {
                res.status(500).json({ error: 'Hubo un error al realizar la solicitud al servicio de boletas' });
            }
        });
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${process.env.PORT || 5000}`);
});