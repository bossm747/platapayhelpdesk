import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

const SUPABASE_URL = "https://dqnzvtcguhpkrsgxogax.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRxbnp2dGNndWhwa3JzZ3hvZ2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDk4MjQxNzAsImV4cCI6MjAyNTQwMDE3MH0.qDTKLaXB-LnDEE8TH54zn-oWdp9u1hi_C8PHJ_dgBYs";

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
      envContent = '';
    }

    const envLines = envContent.split('\n').filter(line => line.trim());
    const envMap = new Map();
    
    envLines.forEach(line => {
      const [key, value] = line.split('=');
      if (key && value) {
        envMap.set(key.trim(), value.trim());
      }
    });

    envMap.set(envVarName, key);

    if (!envMap.has('VITE_SUPABASE_URL')) {
      envMap.set('VITE_SUPABASE_URL', SUPABASE_URL);
    }
    if (!envMap.has('VITE_SUPABASE_ANON_KEY')) {
      envMap.set('VITE_SUPABASE_ANON_KEY', SUPABASE_ANON_KEY);
    }

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