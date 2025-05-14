const express = require('express');

const app = express();

app.get('/', (req, res) => {
    res.send("<div>안녕하세요</div>")
})

app.listen(3000, () => {
    console.log("서버")
})