import express from "express";
// import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { SESClient, SendEmailCommand, SES } from "@aws-sdk/client-ses";

const app = express();
dotenv.config();

console.log(port);

// AWS.config.update({ region: "eu-central-1" });


app.use(express.urlencoded());
app.use(bodyParser.json());

// const corsOptions = {
//    origin: "*",
//    // origin: ["https://www.owee.sk", "www.owee.sk", "owee.sk", "https://owee.sk", "https://owee-15664.firebaseapp.com", "https://owee-15664.web.app", "https://www.tiendapepe.sk"],
// };
app.use(cors(corsOptions));
// app.use((req, res, next) => {
//    res.setHeader("Access-Control-Allow-Origin", "*");
//    res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
// });

const sesClient = new SESClient();

app.post("/mail",  (req, res) => {
   let data = req.body;

   const html_contents = `
        <html>
            <h1 style='align:center'>Meno: ${data.name} ${data.last}</h1>
            <h3 style='align:center'>email: ${data.email}</h3>
            <p style='color:red'><strong>SERVICE: ${data.service} </strong></p>
            <p >Message: ${data.message}</p>
        </html>
            `;
   const params = {
      Destination: {
         ToAddresses: ["miso.krasnansky@gmail.com"],
      },
      Message: {
         Body: {
            Html: { Charset: "UTF-8", Data: html_contents },
         },
         Subject: { Charset: "UTF-8", Data: "subject  html template" },
      },
      Source: "miso.krasnansky@gmail.com",
   };

   if (!data.url) {
      throw new Error("no URL");
   } else {
      run(params);
      console.log(data);
   }
});

const run = async (params) => {
   try {
      const data = await sesClient.send(new SendEmailCommand(params));
      console.log(data);
   } catch (error) {
      console.log(error);
   }
};

app.listen(process.env.PORT || 5000);

// export default app