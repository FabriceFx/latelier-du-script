import React from 'react';

function HelpFAQ() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      <main className="max-w-4xl mx-auto w-full px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 prose prose-sm md:prose-base max-w-none prose-blue">
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">Centre d'aide et FAQ</h1>
          <p className="text-gray-500 text-lg mb-10">
            Tout ce que vous devez savoir pour exploiter au mieux L'atelier du script.
          </p>

          <hr className="my-8" />

          <h2>Comment configurer ma clé API Gemini ?</h2>
          <p>
            Pour utiliser L'atelier du script, vous devez fournir votre propre clé API Google Gemini. Cette clé permet à l'application de se connecter aux serveurs d'intelligence artificielle de Google.
          </p>
          <ol>
            <li>Rendez-vous sur <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noopener noreferrer">Google AI Studio</a>.</li>
            <li>Connectez-vous avec votre compte Google.</li>
            <li>Cliquez sur le bouton <strong>Create API key</strong>.</li>
            <li>Copiez la clé générée (elle commence généralement par <code>AIza...</code>).</li>
            <li>Revenez sur L'atelier du script, ouvrez le menu latéral gauche et cliquez sur <strong>Paramètres</strong> en bas du panneau.</li>
            <li>Collez votre clé. Elle sera sauvegardée en toute sécurité dans votre navigateur local.</li>
          </ol>

          <h2>Quelle est la différence entre "Planifier" et "Construire" ?</h2>
          <p>
            L'atelier du script propose deux approches distinctes pour s'adapter à votre façon de travailler :
          </p>
          <ul>
            <li><strong>Planifier :</strong> L'assistant agit comme un Architecte. Il ne générera <em>aucun code complet</em>, mais vous fournira une stratégie étape par étape détaillée. C'est idéal pour concevoir l'architecture d'un projet avant de se lancer.</li>
            <li><strong>Construire :</strong> L'assistant agit comme un Développeur Senior. Il écrira le script Google Apps Script complet, prêt à être copié-collé dans votre éditeur, en respectant les meilleures pratiques de développement.</li>
          </ul>

          <h2>Où copier-coller le code Google Apps Script généré ?</h2>
          <p>
            Une fois le code généré par l'outil, vous devez l'insérer dans votre projet Google Workspace :
          </p>
          <ol>
            <li>Ouvrez votre document Google (Sheets, Docs, Forms, etc.).</li>
            <li>Dans le menu supérieur, cliquez sur <strong>Extensions</strong> &gt; <strong>Apps Script</strong>.</li>
            <li>L'éditeur de code s'ouvre. Supprimez tout le code par défaut (souvent <code>function myFunction() {}</code>).</li>
            <li>Collez le code généré (vous pouvez utiliser le bouton <strong>Copier</strong> en haut à droite de chaque bloc de code).</li>
            <li>Cliquez sur l'icône de disquette 💾 (ou <code>Ctrl+S</code> / <code>Cmd+S</code>) pour enregistrer.</li>
            <li>Si le script ajoute un menu personnalisé, vous devrez rafraîchir votre document Google (F5) pour le voir apparaître.</li>
          </ol>

          <h2>Le contexte (mémoire) est-il conservé pendant la conversation ?</h2>
          <p>
            <strong>Oui !</strong> L'atelier du script mémorise l'historique complet de votre conversation actuelle. 
            Si vous lui demandez de générer un code, vous pouvez ensuite lui répondre : <em>"Ajoute une fonction pour envoyer un email"</em>, et il modifiera le script précédent de manière intelligente.
            <br/><br/>
            <em>Note : L'historique est réinitialisé si vous actualisez la page ou cliquez sur "Nouveau chat".</em>
          </p>

          <h2>Mes données ou ma clé API sont-elles envoyées à des tiers ?</h2>
          <p>
            <strong>Non.</strong> Votre clé API est stockée dans le <code>localStorage</code> de votre navigateur web. Elle n'est envoyée qu'à votre propre serveur local (ou serveur OVH hébergeant le backend) au moment de la requête, qui la relaie directement aux serveurs officiels de Google Gemini. L'historique de vos requêtes est sauvegardé sur votre propre serveur dans une base de données locale (SQLite).
          </p>

          <hr className="my-8" />

          <h2>Comment héberger L'atelier du script sur ma propre machine ?</h2>
          <p>
            Le code source est disponible gratuitement sur GitHub. Vous pouvez installer l'application en quelques minutes sur votre Mac, PC ou serveur Linux.
          </p>

          <h3>Prérequis</h3>
          <ul>
            <li><a href="https://nodejs.org" target="_blank" rel="noopener noreferrer">Node.js</a> version 18 ou supérieure (inclut <code>npm</code>).</li>
            <li><a href="https://git-scm.com" target="_blank" rel="noopener noreferrer">Git</a> pour cloner le dépôt.</li>
            <li>Une clé API Google Gemini (voir la section ci-dessus).</li>
          </ul>

          <h3>Installation pas à pas</h3>
          <p><strong>1. Cloner le projet depuis GitHub :</strong></p>
          <pre><code>git clone https://github.com/FabriceFx/latelier-du-script.git{"\n"}cd latelier-du-script</code></pre>

          <p><strong>2. Installer les dépendances du frontend :</strong></p>
          <pre><code>npm install</code></pre>

          <p><strong>3. Installer les dépendances du backend :</strong></p>
          <pre><code>cd backend{"\n"}npm install{"\n"}cd ..</code></pre>

          <p><strong>4. Lancer le serveur backend</strong> (dans un premier terminal) :</p>
          <pre><code>node backend/server.js</code></pre>
          <p>
            Vous devriez voir le message : <em>"Backend server running on http://localhost:3000"</em>.
          </p>

          <p><strong>5. Lancer le frontend</strong> (dans un second terminal) :</p>
          <pre><code>npm run dev</code></pre>
          <p>
            L'application sera accessible à l'adresse <code>http://localhost:5173/</code>.
          </p>

          <h3>Déploiement sur un serveur (OVH, VPS, etc.)</h3>
          <p>
            Pour un usage permanent sur un serveur distant, il est recommandé d'utiliser <a href="https://pm2.keymetrics.io/" target="_blank" rel="noopener noreferrer">PM2</a> pour maintenir le backend actif en arrière-plan :
          </p>
          <pre><code>npm install -g pm2{"\n"}pm2 start backend/server.js --name "atelier-backend"</code></pre>
          <p>
            Pour le frontend, vous pouvez le compiler en version optimisée puis le servir avec Nginx ou Apache :
          </p>
          <pre><code>npm run build</code></pre>
          <p>
            Le dossier <code>dist/</code> généré contient les fichiers statiques à déployer sur votre serveur web.
          </p>

          <p>
            📦 <strong>Code source :</strong>{' '}
            <a href="https://github.com/FabriceFx/latelier-du-script" target="_blank" rel="noopener noreferrer">
              github.com/FabriceFx/latelier-du-script
            </a>
          </p>

        </div>
      </main>
    </div>
  );
}

export default HelpFAQ;
