const dialogflow = require('@google-cloud/dialogflow');
const { WebhookClient, Suggestion } = require('dialogflow-fulfillment');
const express = require("express")
const cors = require("cors");
var nodemailer = require('nodemailer');

const app = express();
app.use(express.json())
app.use(cors());

const PORT = process.env.PORT || 8080;

app.post("/webhook", async (req, res) => {
    var id = (res.req.body.session).substr(43);
    console.log(id)
    const agent = new WebhookClient({ request: req, response: res });

    function Email(agent) {
        console.log(`intent  =>  Email`);
        const {person, toCountry, fromCountry, date, time, email, phone, flightNumber} = agent.parameters;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'mkashan2585@gmail.com',
              pass: 'vvimvqoydrvqctyk'
            }
          });
        agent.add("Email Sent Successfully")
        var mailOptions = {
            from: 'mkashan2585@gmail.com',
            to: email,
            subject: 'Your Flight Ticket Confirmation',
            text: `<div style="margin: 50px auto; padding: 20px; max-width: 600px; background-color: #fff; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
            <div style="text-align: center; background-color: #007BFF; color: #fff; padding: 20px; border-radius: 10px 10px 0 0;">
                <h2 style="margin: 0;">Flight Ticket Confirmation</h2>
            </div>
            
            <div style="padding: 20px;">
                <p>Dear ${person.name},</p>
                
                <p>We are pleased to confirm your flight booking. Below are your travel details:</p>
                
                <h3 style="border-bottom: 2px solid #007BFF; padding-bottom: 5px; color: #007BFF;">Flight Details:</h3>
                <p><strong>Airline:</strong> Blue Airline</p>
                <p><strong>Flight Number:</strong> ${flightNumber}</p>
                <p><strong>Departure:</strong> ${date} and ${time}</p>
                <p><strong>From:</strong> ${fromCountry}</p>
                <p><strong>To:</strong> ${toCountry}</p>
                
                <h3 style="border-bottom: 2px solid #007BFF; padding-bottom: 5px; color: #007BFF;">Passenger Details:</h3>
                <p><strong>Name:</strong> ${person.name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Contact Number:</strong> ${phone}</p>
            </div>
            
            <p style="padding: 0 20px;">Thank you for choosing Blue Airline. We wish you a pleasant flight.</p>
            
            <div style="text-align: center; padding: 20px; background-color: #f4f4f4; border-radius: 0 0 10px 10px; margin-top: 20px;">
                <p>Sincerely,</p>
                <p>Kashan Malik<br>
                Manager<br>
                Blue Airline</p>
            </div>
        </div>`
          };
    }
    
    
    
   

    let intentMap = new Map(); 
    intentMap.set('Email', Email); 
    intentMap.set('Default Welcome Intent', Email); 
    intentMap.set('Email', Email); 
    
    agent.handleRequest(intentMap);
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});