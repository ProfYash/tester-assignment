const express = require("express")
const cors = require("cors")
const app = express()
app.use(express.json())
app.use(cors())
let totalHits = 0
const ipHits = new Map();
app.get('/hits', (req, res) => {
    try {
        const { who } = req.headers
        if (who != "yash") {
            return res.status(200).json({ message: 'Invalid Token' });
        }
        console.log("ipHIts", Object.fromEntries(ipHits))
        return res.status(200).json({ totalHits, ipHits: Object.fromEntries(ipHits) });

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: 'Bad Gateway' });
    }
})
app.post('/second-largest', (req, res) => {
    try {
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
        console.log(ip)
        const { arr } = req.body;
        const { authorization, who } = req.headers
        let token
        if (authorization && authorization.startsWith('Bearer ')) {
            token = authorization.split(' ')[1];
        } else {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (token != "qewysddiwuewnqweiwemwdowemew") {
            return res.status(401).json({ message: 'Invalid Token' });
        }
        if (who != "yash") {
            totalHits++
            if (ipHits.has(ip)) {
                ipHits.set(ip, ipHits.get(ip) + 1);
            } else {
                ipHits.set(ip, 1);
            }

        }
        let maxNumber = arr[0];
        let secondMaxNumber = arr[1];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxNumber) {
                secondMaxNumber = maxNumber;
                maxNumber = arr[i];
            }
        }
        res.status(200).json({
            message: `Second largest number is ${secondMaxNumber}`
        });

    } catch (error) {
        console.log(error.message)
        return res.status(401).json({ message: 'Bad Gateway' });

    }
});
app.listen(3000, () => {
    console.log("Started At 3000")
})