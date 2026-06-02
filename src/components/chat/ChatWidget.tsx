'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { X, Send, User } from 'lucide-react';
import { useFocusTrap } from '@/lib/useFocusTrap';

interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT =
  'You are Bowler, the virtual assistant for Mark Systems. Mark Systems is a Quebec-based digital agency that designs websites, business automations, AI systems, and cloud infrastructure. Be helpful, professional, and concise. Answer in the same language the user writes in.';

const API_URL = 'http://localhost:11434/v1/chat/completions';
const MODEL = 'qwen2.5:32b';
const API_TIMEOUT = 5000;

function detectFrench(text: string): boolean {
  const frenchIndicators = [
    'bonjour', 'salut', 'merci', 'comment', 'je', 'nous', 'vous', 'est-ce',
    'qu\'', 'que ', 'quel', 'une', 'des', 'les', 'sur', 'pour', 'avec',
    'dans', 'mon', 'votre', 'notre', 'sont', 'fait', 'avoir', 'être',
    'prix', 'coût', 'tarif', 'combien', 'appel', 'site web', 'automatisation',
    'ça', 'cela', 'aussi', 'mais', 'donc', 'très', 'bien', 'oui', 'non',
    'puis-je', 'pouvez', 'aimeriez', 'vouloir', 'besoin', 'aide',
  ];
  const lower = text.toLowerCase();
  let score = 0;
  for (const word of frenchIndicators) {
    if (lower.includes(word)) score++;
  }
  return score >= 1;
}

function getFallbackResponse(userMessage: string): string {
  const lower = userMessage.toLowerCase();
  const isFr = detectFrench(lower);

  // Salutation
  if (/\b(bonjour|hello|hi|salut|hey|bonsoir|all[oô]|coucou|yo)\b/i.test(lower)) {
    return isFr
      ? 'Bonjour ! 👋 Je suis Bowler, l\'assistant de Mark Systems. Posez-moi une question sur nos services, nos tarifs, nos réalisations ou comment nous joindre.'
      : 'Hello! 👋 I\'m Bowler, the Mark Systems assistant. Ask me about our services, pricing, portfolio, or how to reach us.';
  }

  // Tarifs / estimation
  if (/(prix|co[uû]ts?|tarif|devis|combien|estimat|budget|price|cost|pricing|quote|how much)/i.test(lower)) {
    return isFr
      ? 'Chaque projet est unique. Le mieux : notre estimateur en ligne (menu « Estimateur ») vous donne une fourchette en 2 minutes selon votre secteur et vos besoins. Pour une soumission précise et gratuite : info@marksystems.ca.'
      : 'Every project is unique. Best bet: our online estimator (“Estimateur” in the menu) gives you a range in 2 minutes based on your sector and needs. For a precise free quote: info@marksystems.ca.';
  }

  // Réalisations / portfolio
  if (/(r[eé]alisation|portfolio|exemple|projets?|travaux|case|work|example|demo|d[eé]mo)/i.test(lower)) {
    return isFr
      ? 'Voyez la page « Projets » : sites clients, outils, concepts et 8 logiciels (dont 5 démos en ligne : OSIRIS, GENESIS, AINOVA, GENCORE, Hermes). De quoi juger concrètement ce qu\'on construit.'
      : 'Check the “Projects” page: client sites, tools, concepts and 8 software products (5 live demos: OSIRIS, GENESIS, AINOVA, GENCORE, Hermes). A concrete look at what we build.';
  }

  // Délais
  if (/(d[eé]lai|combien de temps|dur[eé]e|[eé]ch[eé]anc|quand|timeline|how long|deadline|delivery)/i.test(lower)) {
    return isFr
      ? 'Les délais varient selon la portée : un site vitrine prend quelques semaines, une application ou un système IA quelques mois. On peut prioriser les urgences. Parlons-en : info@marksystems.ca.'
      : 'Timelines depend on scope: a brochure site takes a few weeks, an app or AI system a few months. We can fast-track urgent work. Let’s talk: info@marksystems.ca.';
  }

  // Services
  if (/(services?|web|site|automat|design|d[eé]veloppement|development|cloud|\bia\b|\bai\b|intelligence|infrastructure|que faites|what do you do|aide|help)/i.test(lower)) {
    return isFr
      ? 'Mark Systems couvre :\n\n🌐 Sites web (conception + développement)\n⚙️ Automatisations d\'affaires\n🤖 Systèmes d\'intelligence artificielle\n☁️ Infrastructure cloud\n\nSur quel volet souhaitez-vous des détails ?'
      : 'Mark Systems covers:\n\n🌐 Websites (design + development)\n⚙️ Business automations\n🤖 AI systems\n☁️ Cloud infrastructure\n\nWhich one would you like details on?';
  }

  // Contact
  if (/(contact|courriel|email|t[eé]l[eé]phone|appel|call|joindre|rejoindre|parler|talk|message|reach|rendez|meeting)/i.test(lower)) {
    return isFr
      ? 'On vous répond vite :\n\n📧 info@marksystems.ca\n📞 +1 581-986-4267\n\nOu remplissez le formulaire de la page « Contact ».'
      : 'We reply fast:\n\n📧 info@marksystems.ca\n📞 +1 581-986-4267\n\nOr use the form on the “Contact” page.';
  }

  // À propos
  if (/(qui [eê]tes|propos|about|who are|votre [eé]quipe|company|entreprise)/i.test(lower)) {
    return isFr
      ? 'Mark Systems est une micro-agence numérique québécoise : web, automatisation, IA et cloud. Conformité Loi 25 par défaut, code propre, livraisons concrètes. Voir la page « À propos ».'
      : 'Mark Systems is a Quebec-based digital micro-agency: web, automation, AI and cloud. Law 25 compliant by default, clean code, real deliverables. See the “About” page.';
  }

  // Défaut — guide au lieu de répéter
  return isFr
    ? 'Bonne question ! Je peux vous orienter sur nos services, nos tarifs (essayez l\'estimateur), nos réalisations ou nos coordonnées. Pour une réponse détaillée à votre cas précis : info@marksystems.ca ou +1 581-986-4267.'
    : 'Good question! I can point you to our services, pricing (try the estimator), portfolio, or contact details. For a detailed answer to your specific case: info@marksystems.ca or +1 581-986-4267.';
}

export function ChatWidget() {
  const t = useTranslations('chatbot');
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeChat = useCallback(() => setIsOpen(false), []);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  // Confine le focus dans le panneau, focus initial sur le champ, Échap ferme,
  // focus restauré sur le lanceur à la fermeture. (a11y)
  useFocusTrap(isOpen, panelRef, {
    initialFocusRef: inputRef,
    onEscape: closeChat,
  });

  const sendMessage = useCallback(async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', content: trimmed };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    let assistantContent: string;

    // L'API LLM locale (Ollama) n'est joignable qu'en dev local. En production,
    // on n'appelle PAS localhost (bloqué par la CSP) — on sert directement le
    // fallback déterministe. Évite les erreurs CSP en console à chaque message.
    const isLocal =
      typeof window !== 'undefined' &&
      /^(localhost|127\.0\.0\.1|\[::1\])$/.test(window.location.hostname);

    if (isLocal) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT);

        const apiMessages = [
          { role: 'system' as const, content: SYSTEM_PROMPT },
          ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
        ];

        const response = await fetch(API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: MODEL,
            messages: apiMessages,
            temperature: 0.7,
            max_tokens: 512,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        assistantContent =
          data?.choices?.[0]?.message?.content ?? getFallbackResponse(trimmed);
      } catch {
        // Deterministic fallback - chat never appears broken
        assistantContent = getFallbackResponse(trimmed);
      }
    } else {
      // Production : pas de LLM local accessible → fallback déterministe direct.
      assistantContent = getFallbackResponse(trimmed);
    }

    const assistantMessage: ChatMessage = {
      role: 'assistant',
      content: assistantContent,
    };
    setMessages((prev) => [...prev, assistantMessage]);
    setIsLoading(false);
  }, [input, isLoading, messages]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );

  return (
    <>
      {/* Floating Chat Bubble */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full border border-accent/30 bg-surface/80 shadow-glow-accent backdrop-blur-md transition-shadow duration-300 hover:shadow-glow-accent-lg"
            aria-label={t('openChat')}
          >
            {/* Bowler, le petit robot — lanceur du chat */}
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="flex h-14 w-14 items-center justify-center"
            >
              <Image src="/bowler.jpg" alt="Bowler" width={56} height={56} className="h-14 w-14 rounded-full object-cover" />
            </motion.span>
            {/* Pulse indicator (en ligne) */}
            <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex h-4 w-4 rounded-full bg-green-500 ring-2 ring-background" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('title')}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 z-50 flex flex-col overflow-hidden rounded-2xl border border-white/20 shadow-2xl"
            style={{
              width: '400px',
              height: '500px',
              background: 'rgba(15, 23, 42, 0.85)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 bg-white/5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full ring-2 ring-accent/30 bg-gradient-to-br from-accent/40 to-accent/10">
                  <Image src="/bowler.jpg" alt="Bowler" width={48} height={48} className="h-full w-full rounded-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-white">Bowler</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <span className="text-xs text-green-400">{t('online')}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label={t('closeChat')}
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages Area — région live pour annonce des réponses (a11y) */}
            <div
              role="log"
              aria-live="polite"
              aria-atomic="false"
              className="flex-1 overflow-y-auto px-4 py-3 space-y-4 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent"
            >
              {messages.length === 0 && (
                <div className="flex flex-col items-center justify-center h-full text-center px-4 gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full ring-2 ring-accent/20 bg-gradient-to-br from-accent/40 to-accent/10">
                    <Image src="/bowler.jpg" alt="Bowler" width={48} height={48} className="h-full w-full rounded-full object-cover" />
                  </div>
                  <p className="text-sm text-gray-400">{t('welcomeMessage')}</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
                >
                  <div
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full overflow-hidden ${
                      msg.role === 'user'
                        ? 'bg-blue-600'
                        : ''
                    }`}
                  >
                    {msg.role === 'user' ? (
                      <User className="h-4 w-4 text-white" />
                    ) : (
                      <Image src="/bowler.jpg" alt="Bowler" width={48} height={48} className="h-full w-full rounded-full object-cover" />
                    )}
                  </div>
                  <div
                    className={`max-w-[75%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-white/10 text-gray-200 rounded-bl-md border border-white/5'
                    }`}
                  >
                    {msg.content.split('\n').map((line, i) => (
                      <span key={i}>
                        {line}
                        {i < msg.content.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-accent/40 to-accent/10">
                    <Image src="/bowler.jpg" alt="Bowler" width={48} height={48} className="h-full w-full rounded-full object-cover" />
                  </div>
                  <div className="rounded-2xl rounded-bl-md bg-white/10 border border-white/5 px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
                      <span className="h-2 w-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="border-t border-white/10 bg-white/5 px-3 py-3">
              <div className="flex items-center gap-2 rounded-xl bg-white/10 border border-white/10 px-3 py-1.5 focus-within:border-blue-500/50 transition-colors">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={t('inputPlaceholder')}
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-sm text-white placeholder-gray-500 outline-none disabled:opacity-50"
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || isLoading}
                  className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white transition-all hover:opacity-90 disabled:opacity-30 disabled:cursor-not-allowed"
                  aria-label={t('send')}
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-1.5 text-center text-[10px] text-gray-600">
                {t('poweredBy')}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
