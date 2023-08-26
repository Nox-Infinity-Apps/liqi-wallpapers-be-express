import { Router, Request, Response } from "express";

const ImageKit = require('imagekit');

const uuid = require('uuid');
const path = require('path');

const imagekit = new ImageKit({
  publicKey: 'public_EzVqgipj1p+23eWxxIVNI9kXhuk=',
  privateKey: 'private_urMEMg7gwpFbu9ijhtHdXkRdTqI=',
  urlEndpoint: 'https://ik.imagekit.io/surzols77'
});
const router: Router = Router();


router.get("/auth", (req, res) => {
  try {
    const token = req.query.token || uuid.v4();
    const expiration = Number(req.query.expire) || Number(Date.now()/1000)+ (60 * 10); // Default expiration in 10 mins

    const signatureObj = imagekit.getAuthenticationParameters(token, expiration);

    res.status(200).send(signatureObj);

  } catch (err) {
    console.error("Error while responding to auth request:", JSON.stringify(err, undefined, 2));
    res.status(500).send("Internal Server Error");
  }
});


router.get("/test", (req: Request, res: Response) => {
  res.json({
    message: "Hello World!",
  });
});

export default router;
