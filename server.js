const express = require('express');
const htmlToDocx = require('html-to-docx');
var bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());

const port = 3030;

app.post('/convert', async (req, res) => {
    try {
        const htmlContent = req.body.html;

        const doc = await htmlToDocx(htmlContent,null,{fontSize: 28});

        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document');
        res.send({data:doc});
    } catch (error) {
        console.error(error);
        res.status(500).send('Conversion failed');
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});