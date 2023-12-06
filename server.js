import express from 'express';
import routes from './routes/index.js';
import cors from "cors";
import path from "path";
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: true,
    credentials: true,
    // exposedHeaders: ["set-cookie"],
};

app.use(express.json());
app.set("trust proxy", 1);
app.use(cors(corsOptions));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/', routes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!`);
});

export default app;