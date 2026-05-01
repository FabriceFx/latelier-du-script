# L'atelier du script 🛠️

> Générez du code Google Apps Script professionnel grâce à l'intelligence artificielle Gemini.

![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Gemini](https://img.shields.io/badge/Google_Gemini-API-4285F4?logo=google&logoColor=white)
![License](https://img.shields.io/badge/Licence-MIT-green)

## Présentation

**L'atelier du script** est un assistant conversationnel qui génère des scripts Google Apps Script sur mesure. Décrivez votre besoin d'automatisation pour Gmail, Sheets, Drive, Calendar ou Docs, et l'IA produit un code complet, documenté et prêt à l'emploi.

### Fonctionnalités

- 🤖 **Génération par IA** — Propulsé par l'API Google Gemini, l'assistant produit du code robuste en suivant les meilleures pratiques (Clean Code, ES6+, gestion des erreurs).
- 💬 **Chat conversationnel** — Affinez vos scripts au fil de la discussion : l'IA conserve le contexte de vos échanges.
- 📋 **Copier en un clic** — Chaque bloc de code dispose d'un bouton pour le copier dans le presse-papier.
- 📝 **Deux modes** — *Planifier* (architecture sans code) ou *Construire* (code complet).
- 📱 **Responsive** — Interface adaptée aux ordinateurs, tablettes et mobiles avec menu latéral rétractable.

## Capture d'écran

<!-- Ajoutez une capture d'écran de l'application ici -->
<!-- ![Capture d'écran](./screenshot.png) -->

## Installation

### Prérequis

- [Node.js](https://nodejs.org) version 18 ou supérieure
- Une clé API [Google Gemini](https://aistudio.google.com/app/apikey)

### 1. Cloner le projet

```bash
git clone https://github.com/FabriceFx/latelier-du-script.git
cd latelier-du-script
```

### 2. Installer les dépendances

```bash
# Frontend
npm install

# Backend
cd backend
npm install
cd ..
```

### 3. Lancer l'application

Ouvrez **deux terminaux** :

```bash
# Terminal 1 — Backend (port 3000)
node backend/server.js

# Terminal 2 — Frontend (port 5173)
npm run dev
```

Ouvrez votre navigateur sur **http://localhost:5173**, renseignez votre clé API dans les paramètres (menu latéral → Paramètres), et commencez à créer vos scripts !

## Stack technique

| Composant | Technologie |
|-----------|-------------|
| Frontend | React 19, Vite, TailwindCSS, react-markdown, react-syntax-highlighter |
| Backend | Node.js, Express, SQLite3 |
| IA | API Google Gemini (`@google/genai`) |

## Déploiement en production

```bash
# Compiler le frontend
npm run build

# Le dossier dist/ contient les fichiers statiques à servir (Nginx, Apache, etc.)

# Lancer le backend avec PM2
npm install -g pm2
pm2 start backend/server.js --name "atelier-backend"
```

## Structure du projet

```
├── backend/
│   ├── server.js          # Serveur Express + logique Gemini
│   └── package.json
├── src/
│   ├── App.jsx            # Layout principal + sidebar + routing
│   ├── main.jsx           # Point d'entrée React
│   └── pages/
│       ├── Chat.jsx       # Interface de chat + suggestions
│       ├── HelpFAQ.jsx    # Centre d'aide et FAQ
│       └── About.jsx      # À propos et mentions légales
├── public/
│   └── favicon.svg
├── index.html
├── tailwind.config.js
├── vite.config.js
└── package.json
```

## Auteur

**Fabrice Faucheux**
🌐 [faucheux.bzh](https://faucheux.bzh)
🐙 [github.com/FabriceFx](https://github.com/FabriceFx)

## Licence

Ce projet est distribué sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.
