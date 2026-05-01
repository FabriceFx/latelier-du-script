import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import Chat from './pages/Chat';
import HelpFAQ from './pages/HelpFAQ';
import About from './pages/About';

function App() {
  const [messages, setMessages] = useState([]); // Shared state for chat history
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isKeySaved, setIsKeySaved] = useState(false);
  // Default to open on large screens, closed on mobile
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 1024);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNewChat = () => {
    setMessages([]);
    navigate('/');
  };

  useEffect(() => {
    // Load API key from local storage on startup
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) {
      setApiKey(storedKey);
    }
    
    // Listen to resize to close sidebar on small screens automatically
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleApiKeyChange = (e) => {
    const key = e.target.value;
    setApiKey(key);
    localStorage.setItem('gemini_api_key', key);
    setIsKeySaved(true);
    setTimeout(() => setIsKeySaved(false), 2000);
  };

  // Close sidebar on mobile when navigating
  useEffect(() => {
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex h-screen bg-background text-text-dark font-sans overflow-hidden">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`fixed lg:relative inset-y-0 left-0 z-50 bg-gray-50 border-r border-gray-200 transition-all duration-300 ease-in-out flex flex-col overflow-hidden ${isSidebarOpen ? 'w-64 translate-x-0' : 'w-0 -translate-x-full lg:translate-x-0'}`}
      >
        <div className="w-64 flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="p-4 flex justify-between items-center shrink-0">
            <button 
              className="p-1 -ml-1 text-gray-500 hover:text-gray-900 rounded-md"
              onClick={() => setIsSidebarOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
            <div className="flex-1"></div>
          </div>

          {/* Sidebar Navigation */}
          <nav className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            <button 
              onClick={handleNewChat}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/' && messages.length === 0 ? 'bg-white shadow-sm border border-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-google-blue">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.38-.432 1.628-1.486 2.846-1.543 2.911a.75.75 0 00.835 1.135c1.474-.53 2.871-1.282 3.864-1.84A8.775 8.775 0 0012 20.25z" />
              </svg>
              Nouveau chat
            </button>
            <Link 
              to="/aide" 
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${location.pathname === '/aide' ? 'bg-white shadow-sm border border-gray-200 text-gray-900' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-900'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-google-yellow">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
              </svg>
              Aide et FAQ
            </Link>
          </nav>

          {/* Sidebar Footer (About & Settings) */}
          <div className="p-4 border-t border-gray-200 shrink-0 flex flex-col gap-2">
            <Link 
              to="/about"
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
                </svg>
                À propos
              </div>
            </Link>
            
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              <div className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-500">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854-.107-1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Paramètres
              </div>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform ${showSettings ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
              </svg>
            </button>
            
            {/* Settings Panel Expansion */}
            {showSettings && (
              <div className="mt-3 bg-white p-3 rounded-xl border border-gray-200 shadow-inner">
                <label className="block text-xs font-semibold text-gray-700 mb-1">Clé API Gemini</label>
                <div className="relative">
                  <input 
                    type="password"
                    value={apiKey}
                    onChange={handleApiKeyChange}
                    placeholder="AIza..."
                    className="w-full border border-gray-300 rounded-md py-1.5 px-2 text-xs focus:outline-none focus:ring-2 focus:ring-google-blue bg-gray-50"
                  />
                  {isKeySaved && (
                    <span className="absolute right-2 top-1.5 text-green-600">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                        <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" clipRule="evenodd" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-background overflow-hidden relative">
        
        {/* Main Header (Visible everywhere) */}
        <header className="flex items-center p-4 bg-white border-b border-gray-200 shrink-0 h-[60px]">
          {!isSidebarOpen && (
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-1 -ml-1 mr-3 text-gray-500 hover:text-gray-900 rounded-md transition-colors"
              title="Ouvrir le menu latéral"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          )}
          <div className="font-bold text-gray-900 text-lg">
            L'atelier du script
          </div>
        </header>

        {/* Content Router */}
        <div className="flex-1 overflow-hidden relative">
          <Routes>
            <Route 
              path="/" 
              element={
                <Chat 
                  messages={messages} 
                  setMessages={setMessages} 
                  apiKey={apiKey} 
                  setShowSettings={setShowSettings}
                />
              } 
            />
            <Route path="/aide" element={<HelpFAQ />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>

      </div>
    </div>
  );
}

export default App;
