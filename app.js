import express from 'express';
import cors from 'cors';
import axios from 'axios';
import dotenv from 'dotenv';

const app = express();
app.use(express.json())
app.use(cors());
dotenv.config();

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
                res.status(500).json({ error: 'Hubo un error al realizar la solicitud' });
            }
        });
});


app.listen(process.env.PORT, () => {
    console.log(`Servidor Express en ejecución en el puerto ${process.env.PORT || 5000}`);
});