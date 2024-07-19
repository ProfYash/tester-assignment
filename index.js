const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const app = express();
app.use(express.json());
app.use(cors());
let totalHits = 0
const ipHits = new Map();
const logFilePath = path.join(__dirname, 'logs.txt');
function logToFile(message) {
    const logMessage = `${new Date().toISOString()} - ${message}\n`;
    fs.appendFileSync(logFilePath, logMessage, (err) => {
        if (err) {
            npm
            console.error('Failed to write to log file:', err);
        }
    });
}
app.get('/hits', (req, res) => {
    try {
        const { who } = req.headers
        if (who != "yash") {
            logToFile('Invalid Token access attempt in /hits endpoint');
            return res.status(200).json({ message: 'Invalid Token' });
        }
        logToFile('Accessed /hits endpoint');
        console.log("ipHIts", Object.fromEntries(ipHits))
        return res.status(200).json({ totalHits, ipHits: Object.fromEntries(ipHits) });

    } catch (error) {
        logToFile(`Error in /hits endpoint: ${error.message}`);
        console.log(error.message)
        return res.status(401).json({ message: 'Bad Gateway' });
    }
})
app.get('/logs', (req, res) => {
    try {
        const { who } = req.headers
        if (who != "yash") {
            logToFile('Invalid Token access attempt in /hits endpoint');
            return res.status(200).json({ message: 'Invalid Token' });
        }
        console.log();
        const log = fs.readFileSync('./logs.txt', { encoding: 'utf8' })
        // console.log("ipHIts", Object.fromEntries(ipHits))
        return res.status(200).json({ log });

    } catch (error) {
        logToFile(`Error in /hits endpoint: ${error.message}`);
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
            logToFile(`Unauthorized access attempt from IP: ${ip}`);
            return res.status(401).json({ message: 'Unauthorized' });
        }
        if (token != "qewysddiwuewnqweiwemwdowemew") {
            logToFile(`Invalid Token access attempt from IP: ${ip}`);
            return res.status(401).json({ message: 'Invalid Token' });
        }
        if (who != "yash") {
            totalHits++
            if (ipHits.has(ip)) {
                ipHits.set(ip, ipHits.get(ip) + 1);
            } else {
                ipHits.set(ip, 1);
            }
            logToFile(`Incremented hit count for IP: ${ip}`);
        }
        let maxNumber = arr[0];
        let secondMaxNumber = arr[1];

        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > maxNumber) {
                secondMaxNumber = maxNumber;
                maxNumber = arr[i];
            }
        }
        logToFile(`Second largest number calculated: ${secondMaxNumber}`);
        res.status(200).json({
            message: `Second largest number is ${secondMaxNumber}`
        });

    } catch (error) {
        logToFile(`Error in /second-largest endpoint: ${error.message}`);
        console.log(error.message)
        return res.status(401).json({ message: 'Bad Gateway' });

    }
});
// Catch-all 404 handler for undefined routes
app.use((req, res, next) => {
    logToFile(`404 - Not Found: ${req.originalUrl}`);
    res.status(404).json({ message: 'Endpoint not found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
    logToFile(`Error: ${err.message}`);
    res.status(500).json({ message: 'Internal Server Error' });
});
app.listen(3000, () => {
    logToFile("Server started at port 3000");
    console.log("Started At 3000")
})