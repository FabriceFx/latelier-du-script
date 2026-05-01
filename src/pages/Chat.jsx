import React, { useState, useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Copy Button Component
function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-white/10 hover:bg-white/20 text-gray-300 hover:text-white transition-all border border-white/10"
      title="Copier le code"
    >
      {copied ? (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-400">
            <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
          </svg>
          <span className="text-green-400">Copié !</span>
        </>
      ) : (
        <>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184" />
          </svg>
          Copier
        </>
      )}
    </button>
  );
}

// Loading messages for the animated spinner
const loadingMessages = [
  "Analyse du besoin...",
  "Conception de l'architecture...",
  "Rédaction du script...",
  "Optimisation du code...",
  "Ajout de la documentation..."
];

function Chat({ messages, setMessages, apiKey, setShowSettings }) {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  const messagesEndRef = useRef(null);
  const mainRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Cycle loading messages
  useEffect(() => {
    if (!isLoading) {
      setLoadingMessageIndex(0);
      return;
    }
    const interval = setInterval(() => {
      setLoadingMessageIndex(prev => (prev + 1) % loadingMessages.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [isLoading]);

  // Show/hide scroll-to-top button
  useEffect(() => {
    const el = mainRef.current;
    if (!el) return;
    const handleScroll = () => {
      setShowScrollTop(el.scrollTop > 400);
    };
    el.addEventListener('scroll', handleScroll);
    return () => el.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    mainRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSuggestionClick = (suggestion) => {
    setPrompt(suggestion);
  };

  const generateAction = async (type) => {
    setErrorMessage('');
    
    if (!prompt.trim()) {
      setErrorMessage("Merci de décrire ton idée avant de continuer.");
      return;
    }
    if (!apiKey?.trim()) {
      setErrorMessage("Veuillez renseigner votre clé API Gemini dans les paramètres (en bas à gauche).");
      setShowSettings(true);
      return;
    }

    const currentPrompt = prompt;
    setPrompt('');
    setIsLoading(true);

    const userMessage = { role: 'user', text: currentPrompt };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);

    try {
      const response = await fetch('http://localhost:3000/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ 
          prompt: currentPrompt, 
          type: type,
          history: messages 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || data.details || 'Erreur inconnue du serveur');
      }

      setMessages([...newMessages, { role: 'model', text: data.result }]);
    } catch (error) {
      console.error('Error during generation:', error);
      setErrorMessage(`Erreur: ${error.message}`);
      setPrompt(currentPrompt);
      setMessages(messages); 
    } finally {
      setIsLoading(false);
    }
  };

  const handlePlanifier = () => generateAction('planifier');
  const handleConstruire = () => generateAction('construire');

  const suggestions = [
    { emoji: "📧", text: "Extraire les pièces jointes PDF de mes e-mails et les classer dans des dossiers Drive par expéditeur." },
    { emoji: "📧", text: "Archiver automatiquement les e-mails de plus de 30 jours qui ne sont pas marqués comme importants." },
    { emoji: "📧", text: "Créer un brouillon de réponse automatique pour chaque e-mail contenant le mot 'devis'." },
    { emoji: "📊", text: "Créer un menu personnalisé dans Sheets pour formater, trier et nettoyer les données d'un coup." },
    { emoji: "📊", text: "Générer un rapport PDF récapitulatif à partir des données d'un Google Sheet chaque lundi." },
    { emoji: "📊", text: "Protéger automatiquement les lignes d'un Sheet dont la colonne 'Statut' est à 'Validé'." },
    { emoji: "📊", text: "Envoyer une alerte par e-mail quand une valeur dépasse un seuil dans une cellule Sheets." },
    { emoji: "📁", text: "Dupliquer l'arborescence d'un dossier Drive complet dans un autre emplacement." },
    { emoji: "📁", text: "Lister tous les fichiers de plus de 50 Mo dans mon Drive et les consigner dans un Sheet." },
    { emoji: "📁", text: "Renommer par lot tous les fichiers d'un dossier Drive avec un préfixe et une date." },
    { emoji: "📅", text: "Créer des événements Calendar en masse à partir d'un tableau de dates dans Sheets." },
    { emoji: "📅", text: "Envoyer un résumé quotidien des événements du jour par e-mail chaque matin à 8h." },
    { emoji: "📝", text: "Générer des contrats Google Docs personnalisés en remplaçant des balises par les données d'un Sheet." },
    { emoji: "📝", text: "Envoyer un e-mail de bienvenue personnalisé à chaque réponse soumise via Google Forms." },
    { emoji: "⚡", text: "Créer une web app avec interface HTML pour importer un fichier CSV sur Google Drive." },
    { emoji: "⚡", text: "Appeler une API REST externe et insérer les données dans un Sheet automatiquement." },
  ];

  const renderInputArea = (isCentered = false) => (
    <div className={`w-full ${isCentered ? 'max-w-4xl mx-auto' : 'bg-white border-t border-gray-200 p-4 shrink-0 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]'}`}>
      <div className={`flex flex-col gap-3 ${!isCentered ? 'max-w-4xl mx-auto' : ''}`}>
        {errorMessage && (
          <div className="text-sm text-red-600 flex items-center px-4 py-3 bg-red-50 rounded-xl border border-red-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            {errorMessage}
          </div>
        )}
        
        <div className={`relative bg-white border border-gray-200 rounded-2xl focus-within:border-gray-400 focus-within:shadow-md transition-all ${isCentered ? 'shadow-lg' : 'shadow-sm'}`}>
          <textarea 
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Décrivez le script que vous souhaitez créer..."
            className={`w-full resize-none outline-none px-5 pt-4 pb-2 bg-transparent rounded-2xl ${isCentered ? 'min-h-[100px] text-base' : 'min-h-[56px] max-h-[180px] text-base'}`}
            disabled={isLoading}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleConstruire();
              }
            }}
          ></textarea>
          
          <div className="flex justify-end items-center gap-2 px-3 pb-3">
            <button 
              onClick={handlePlanifier}
              disabled={isLoading || !prompt.trim()}
              title="Obtenir un plan d'action étape par étape, sans code"
              className="group flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border border-gray-200 text-gray-600 bg-white hover:bg-gray-50 hover:border-gray-300 disabled:opacity-40 disabled:hover:bg-white disabled:hover:border-gray-200 transition-all"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-google-yellow transition-colors">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              Planifier
            </button>
            <button 
              onClick={handleConstruire}
              disabled={isLoading || !prompt.trim()}
              title="Générer le code source complet, prêt à l'emploi"
              className="group flex items-center gap-2 px-5 py-2 rounded-full text-sm font-medium text-white bg-gray-800 hover:bg-gray-700 disabled:opacity-40 disabled:hover:bg-gray-800 transition-all shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
              Construire
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      <main ref={mainRef} className="flex-1 overflow-y-auto w-full relative">
        {messages.length === 0 ? (
          /* ───── Écran d'accueil ───── */
          <div className="flex flex-col items-center px-6 max-w-6xl mx-auto py-10 md:py-14">
            
            <div className="text-center mb-10 animate-fade-in-up">
              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight text-gray-900 tracking-tight">
                Bonjour, comment puis-je vous aider ?
              </h1>
              <p className="text-base text-gray-500 mt-3 max-w-xl mx-auto">
                Décrivez votre besoin d'automatisation Google Workspace et je génère le script Apps Script correspondant.
              </p>
            </div>

            <div className="w-full max-w-3xl animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              {renderInputArea(true)}
            </div>
            
            <div className="w-full mt-12 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-5 text-center">Ou choisissez un exemple pour commencer</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 w-full">
                {suggestions.map((suggestion, index) => (
                  <div 
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion.text)}
                    className="bg-gray-50 hover:bg-blue-50 px-4 py-3.5 rounded-xl border border-gray-100 hover:border-blue-200 cursor-pointer transition-all duration-150 group"
                  >
                    <p className="text-sm text-gray-600 group-hover:text-gray-800 leading-snug">
                      <span className="mr-1.5">{suggestion.emoji}</span>
                      {suggestion.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer signature */}
            <div className="mt-16 pb-6 text-center text-xs text-gray-400">
              Créé par{' '}
              <a href="https://faucheux.bzh" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-google-blue transition-colors">
                Fabrice Faucheux
              </a>
              {' '}· Propulsé par Google Gemini
            </div>
          </div>
        ) : (
          /* ───── Historique du Chat ───── */
          <div className="max-w-4xl mx-auto w-full px-4 py-8 flex flex-col gap-6">
            {messages.map((msg, index) => (
              <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'user' ? (
                  <div className="bg-gray-100 text-gray-800 px-5 py-4 rounded-2xl max-w-[85%] shadow-sm whitespace-pre-wrap text-[15px]">
                    {msg.text}
                  </div>
                ) : (
                  <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-xs font-semibold text-gray-600 uppercase tracking-wider flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-google-blue">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                      L'atelier du script
                    </div>
                    <div className="p-6 text-gray-800 overflow-x-auto prose prose-sm md:prose-base max-w-none prose-blue markdown-body">
                      <ReactMarkdown
                        components={{
                          code({node, inline, className, children, ...props}) {
                            const match = /language-(\w+)/.exec(className || '')
                            return !inline && match ? (
                              <div className="relative group/code">
                                <CopyButton text={String(children).replace(/\n$/, '')} />
                                <SyntaxHighlighter
                                  style={vscDarkPlus}
                                  language={match[1]}
                                  PreTag="div"
                                  className="rounded-md my-4 !pt-12"
                                  {...props}
                                >
                                  {String(children).replace(/\n$/, '')}
                                </SyntaxHighlighter>
                              </div>
                            ) : (
                              <code className={`${className} bg-gray-100 text-gray-800 px-1.5 py-0.5 rounded-md font-mono text-[0.9em] border border-gray-200`} {...props}>
                                {children}
                              </code>
                            )
                          }
                        }}
                      >
                        {msg.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white px-5 py-4 rounded-2xl shadow-sm border border-gray-200 flex items-center gap-3 text-gray-500 font-medium">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-google-blue rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 bg-google-red rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 bg-google-yellow rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                    <span className="w-2 h-2 bg-google-green rounded-full animate-bounce" style={{ animationDelay: '450ms' }}></span>
                  </div>
                  <span className="transition-all duration-300">{loadingMessages[loadingMessageIndex]}</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Scroll to top button */}
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-30 p-3 rounded-full bg-white border border-gray-200 shadow-lg text-gray-600 hover:text-gray-900 hover:shadow-xl transition-all"
            title="Retour en haut"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
            </svg>
          </button>
        )}
      </main>

      {/* Barre de saisie fixée en bas (uniquement en mode chat) */}
      {messages.length > 0 && renderInputArea(false)}
    </div>
  );
}

export default Chat;
