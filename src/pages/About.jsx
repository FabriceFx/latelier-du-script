import React from 'react';

function About() {
  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white">
      <main className="max-w-3xl mx-auto w-full px-6 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12 prose prose-sm md:prose-base max-w-none prose-blue">
          
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">À propos et mentions légales</h1>
          
          <div className="flex items-center gap-6 mb-10 p-6 bg-gray-50 rounded-2xl border border-gray-100">
            <div className="w-16 h-16 rounded-full bg-google-blue text-white flex items-center justify-center text-2xl font-bold shrink-0">
              FF
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900 m-0">Fabrice Faucheux</h2>
              <p className="text-gray-500 mt-1 mb-2 m-0">Créateur de L'atelier du script</p>
              <a 
                href="https://faucheux.bzh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-google-blue hover:text-blue-700 font-medium flex items-center gap-1 no-underline"
              >
                faucheux.bzh
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </a>
            </div>
          </div>

          <h2>Mentions légales</h2>
          <p>
            L'application <strong>L'atelier du script</strong> est une interface permettant de générer du code Google Apps Script via l'API Google Gemini.
          </p>
          
          <h3>Hébergement et traitement des données</h3>
          <p>
            Cette application est conçue pour fonctionner localement ou sur votre propre infrastructure d'hébergement. 
            Les requêtes effectuées sont stockées dans une base de données SQLite locale (<code>history.sqlite</code>) pour assurer le maintien de l'historique conversationnel.
          </p>
          
          <h3>Clé API et sécurité</h3>
          <p>
            L'utilisation de cette application requiert une clé API fournie par Google AI Studio. 
            <strong>Votre clé API n'est jamais transmise à des serveurs tiers</strong> autres que les serveurs officiels de Google pour le traitement de l'IA. 
            Elle est stockée uniquement de manière locale dans la mémoire de votre navigateur (via <code>localStorage</code>) pour votre confort d'utilisation.
          </p>

          <h3>Responsabilité</h3>
          <p>
            Le code généré par l'intelligence artificielle est fourni à titre indicatif. Bien que le modèle soit instruit pour suivre les meilleures pratiques ("Clean Code", gestion des erreurs), il appartient à l'utilisateur final de relire, tester et valider le code avant toute mise en production dans un environnement Google Workspace sensible. L'auteur ne saurait être tenu responsable d'une éventuelle perte de données liée à l'exécution d'un script généré.
          </p>

          <hr className="my-8" />
          
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} Fabrice Faucheux. Tous droits réservés.
          </p>

        </div>
      </main>
    </div>
  );
}

export default About;
