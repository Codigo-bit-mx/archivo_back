const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENTE_ID);

const googleVerify = async (id_token) => {
    console.log("dentro de google verify")
    console.log(id_token);

    const ticket = await client.verifyIdToken({
        id_token,
        audience: process.env.GOOGLE_CLIENTE_ID
    });

   console.log(ticket);
} 

module.exports = googleVerify;