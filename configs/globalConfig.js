import dotenv from 'dotenv';

// .env dosyasını yükle
dotenv.config();

const globalConfig = {

    // environment and port
    environment: process.env.NODE_ENV,
    port: process.env.PORT,

    // mongoDB
    mongoDev: process.env.DB_URI_DEV,
    mongoProd: process.env.DB_URI_PROD,

    // jwt secret key
    jwtSecret: process.env.JWT_SECRET,

    // Frontend URL
    frontendUrl: process.env.FRONTEND_URL
}

export default globalConfig;