import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.urlencoded());
app.use(bodyParser.json());

const corsOptions = {
   origin: "*",
   // origin: ["https://www.owee.sk", "www.owee.sk", "owee.sk", "https://owee.sk", "https://owee-15664.firebaseapp.com", "https://owee-15664.web.app", "https://www.tiendapepe.sk"],
};
app.use(cors(corsOptions));
app.use((req, res, next) => {
   res.setHeader("Access-Control-Allow-Origin", "*");
   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
});

app.post("/mail", cors(corsOptions), (req, res) => {
   let data = req.body;
   console.log(data);
   if (!data.url) {
      res.status(500).send({ website: data.url, error: "Missing url" });
      return res;
   } else {
      res.status(200).send({ website: data.url, websiteStatus: response.status });
      if (response.status !== 200) {
         sendMail(data, response.status);
      }
      return res;
   }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  });