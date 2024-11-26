import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

// Load environment variables
dotenv.config();

app.post('/api/save-env', async (req, res) => {
  try {
    const { key, provider } = req.body;
    if (!key || !provider) {
      return res.status(400).json({ error: 'Missing key or provider' });
    }

    const envPath = path.resolve('.env');
    const envVarName = `VITE_${provider.toUpperCase()}_API_KEY`;
    
    let envContent = '';
    try {
      envContent = fs.readFileSync(envPath, 'utf-8');
    } catch (error) {
      // File doesn't exist, create it
      envContent = '';
    }

    // Parse existing env content
    const envLines = envContent.split('\n').filter(line => line.trim());
    const envMap = new Map();
    
    envLines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envMap.set(key.trim(), value.trim());
      }
    });

    // Update or add new key
    envMap.set(envVarName, key);

    // Write back to file
    const newEnvContent = Array.from(envMap.entries())
      .map(([key, value]) => `${key}=${value}`)
      .join('\n');

    fs.writeFileSync(envPath, newEnvContent);

    res.json({ success: true, message: 'API key saved successfully' });
  } catch (error) {
    console.error('Error saving API key:', error);
    res.status(500).json({ error: 'Failed to save API key' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});