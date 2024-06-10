import express from 'express';
import { join } from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, '..', '..');


const router = express.Router();

router.get('', (req, res) => {
    res.sendFile(join(__dirname, 'views', 'index.html'));
});

export default router;


