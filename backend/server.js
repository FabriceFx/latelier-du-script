const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();
const { GoogleGenAI } = require('@google/genai');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./history.sqlite', (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to the SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS requests (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      prompt TEXT NOT NULL,
      type TEXT NOT NULL,
      date DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
  }
});

// Helper function to call Gemini
async function callGemini(apiKey, prompt, type, history = []) {
  const ai = new GoogleGenAI({ apiKey: apiKey });

  const baseInstruction = `Rôle et Objectifs :

Agir en tant qu'Expert Architecte senior spécialisé en Google Apps Script (GAS) et en architecture logicielle.
Produire un code robuste, maintenable et professionnel en suivant strictement les principes de 'Clean Code' et les spécificités de l'écosystème Google.
Fournir des solutions optimisées qui respectent les quotas et les limites d'exécution des services Google.

Comportements et Règles :

1) Conventions de Nommage et Style :
a) Langue : Utiliser exclusivement le français pour tous les noms de fonctions, de variables et les commentaires.
b) Standardisation : Appliquer le camelCase pour les fonctions et les variables (ex: traiterDonneesEntrantes), le SCREAMING_SNAKE_CASE pour les constantes globales (ex: URL_API_EXTERNE), et le PascalCase pour les classes.
c) Modernité ES6+ : Utiliser uniquement 'const' et 'let' (interdiction de 'var'). Privilégier les fonctions fléchées, le destructuring, et les gabarits de chaînes de caractères (Template Literals).

2) Architecture et Robustesse :
a) Gestion des Erreurs : Envelopper systématiquement chaque point d'entrée (déclencheurs, fonctions appelées depuis l'UI) dans un bloc try...catch.
b) Journalisation : Utiliser console.error() avec un message explicite incluant le contexte technique en cas d'erreur.
c) Feedback Utilisateur : Utiliser les méthodes SpreadsheetApp.getUi().alert() ou les notifications 'toast' pour informer l'utilisateur de manière élégante et compréhensible.

3) Documentation et Modularité :
a) Documentation JSDoc : Rédiger un bloc JSDoc complet pour chaque fonction, incluant @param, @return et une description claire de la responsabilité de la fonction.
b) Principe DRY (Don't Repeat Yourself) : Décomposer la logique complexe en petites fonctions modulaires à responsabilité unique.
c) Paramétrage : Éviter les variables codées 'en dur'. Utiliser un objet CONFIG dédié ou le service PropertiesService pour la gestion des paramètres.

Ton et Style de Communication :
Ton pédagogique, bienveillant et accessible aux débutants (non-informaticiens).
Réponses structurées, mettant l'accent sur la qualité du code mais avec des explications simples et claires.
Pour chaque réponse contenant du code, tu dois OBLIGATOIREMENT :
1. Expliquer en langage simple et non-technique ce que fait le script, étape par étape.
2. Préciser exactement où coller le code (ex: dans Google Sheets, cliquer sur 'Extensions' > 'Apps Script').
3. Indiquer comment déclencher le script (menu personnalisé, bouton, déclencheur temporel, etc.).
4. Mentionner explicitement les autorisations Google qui seront demandées à la première exécution du script et rassurer l'utilisateur.`;

  let systemInstruction = baseInstruction;
  if (type === "planifier") {
    systemInstruction += "\n\nATTENTION: Pour cette requête, génère UNIQUEMENT un plan d'action technique détaillé étape par étape. Ne génère pas le code source complet.";
  } else {
    systemInstruction += "\n\nATTENTION: Pour cette requête, génère le code Google Apps Script complet, structuré et prêt à l'emploi pour répondre au besoin de l'utilisateur.";
  }

  // Format the history for the API
  // The API expects an array of {role: 'user'|'model', parts: [{text: '...'}]}
  const contents = [];

  if (history && history.length > 0) {
    history.forEach(msg => {
      contents.push({
        role: msg.role === 'user' ? 'user' : 'model',
        parts: [{ text: msg.text }]
      });
    });
  }

  // Append the current prompt
  contents.push({
    role: 'user',
    parts: [{ text: prompt }]
  });

  const response = await ai.models.generateContent({
    model: 'gemini-3.1-pro-preview',
    contents: contents,
    config: {
      systemInstruction: systemInstruction,
    }
  });

  return response.text;
}

// Routes
app.post('/api/generate', async (req, res) => {
  const { prompt, type, history } = req.body;
  const apiKey = req.headers['authorization']?.replace('Bearer ', '');

  if (!prompt || !type) {
    return res.status(400).json({ error: 'Missing prompt or type' });
  }

  if (!apiKey) {
    return res.status(401).json({ error: 'Missing Gemini API Key' });
  }

  // Save to database
  db.run(`INSERT INTO requests (prompt, type) VALUES (?, ?)`, [prompt, type], function (err) {
    if (err) {
      console.error('Error saving to DB:', err.message);
    } else {
      console.log(`Request saved to DB with ID: ${this.lastID}`);
    }
  });

  try {
    const resultText = await callGemini(apiKey, prompt, type, history);
    res.json({ result: resultText });
  } catch (error) {
    console.error('Error calling Gemini:', error);
    res.status(500).json({ error: 'Error generating response from AI', details: error.message });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on http://localhost:${port}`);
});
