const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())

app.post('/second-largest', (req, res) => {
    const { arr } = req.body;
    const { authorization } = req.headers
    let token
    if (authorization && authorization.startsWith('Bearer ')) {
        token = authorization.split(' ')[1];
    } else {
        return res.status(401).json({ message: 'Unauthorized' });
    }
    if (token != "qewysddiwuewnqweiwemwdowemew") {
        return res.status(401).json({ message: 'Invalid Token' });
    }
    let maxNumber = arr[0];
    let secondMaxNumber = arr[1];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > maxNumber) {
            secondMaxNumber = maxNumber;
            maxNumber = arr[i];
        }
    }
    console.log(`Second largest number is ${secondMaxNumber}`)
    res.status(200).json({
        message: `Second largest number is ${secondMaxNumber}`
    });
});
app.listen(3000, () => {
    console.log("Started At 3000")
})