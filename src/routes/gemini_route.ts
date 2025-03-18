import express, { Request, Response } from 'express';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

router.post('/', async (req: Request, res: Response) => {
  const prompt = req.body.prompt;
  console.log(req.body)
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = process.env.GEMINI_API_URL;

  if (!apiKey || !apiUrl) {
    return res.status(500).json({ error: 'API Key or URL not configured.' });
  }

  const requestBody = {
    contents: [
      {
        parts: [
          {
            text: prompt + 'up to 100 words',
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(
       apiUrl,
       requestBody,
    {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(response.data.candidates[0].content.parts[0].text);
    res.json({ response: response.data.candidates[0].content.parts[0].text });
  } catch (error: any) {
    console.error('Error calling Gemini API:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'Failed to get response from Gemini.' });
  }
});

export default router;