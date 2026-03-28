import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

declare global {
  interface Window {
    aistudio: {
      hasSelectedApiKey: () => Promise<boolean>;
      openSelectKey: () => Promise<void>;
    };
  }
}

const getApiKey = () => {
  try {
    return process.env.GEMINI_API_KEY || '';
  } catch (e) {
    return '';
  }
};

const SYSTEM_INSTRUCTION = `
You are the AI assistant for HIZOU Agency, a premier digital marketing agency based in Algiers, Algeria.
Your goal is to help potential clients understand HIZOU's services and encourage them to contact the agency for a consultation.

Agency Information:
- Name: HIZOU Agency
- Location: Said Hamdine, Algiers, Algeria.
- Contact: 0775 64 34 33 | 0549 27 84 11
- Email: centre_daffaires_hizou@gmail.com
- Instagram: @hizou_agency (29.8K followers)
- Badge: ✦ Digital Creator موثوق (Verified Digital Creator)

Core Services:
1. تعليق صوتي احترافي (Professional Voiceover): أصوات مميزة تمنح مشروعك هوية مسموعة قوية ومؤثرة.
2. تصوير احترافي (Professional Filming/Photography): توثيق بصري عالي الجودة يبرز أدق تفاصيل منتجاتك وخدماتك.
3. مونتاج فيديو (Video Editing): تحويل اللقطات الخام إلى قصص بصرية مبهرة تجذب المشاهدين.
4. محتوى UGC (User Generated Content): محتوى واقعي من صنع المستخدمين يبني الثقة والمصداقية لعلامتك.
5. إنشاء المواقع (Website Creation): تصميم وبرمجة مواقع عصرية تضمن أفضل تجربة مستخدم وأداء.
6. سبونسر Ads (Sponsored Ads): إدارة حملات إعلانية ممولة للوصول لجمهورك المستهدف بفعالية.

Key Success Stories:
- E-commerce: +300% sales growth for a clothing brand using TikTok & Instagram ads.
- Food App: 50k downloads through a nationwide influencer and social media campaign.
- Real Estate: 500+ high-quality leads generated via Google Ads and SEO.

Tone & Style:
- Professional yet creative and approachable.
- Helpful and results-oriented.
- You can speak in Arabic (preferred for local clients) or English.
- Keep responses concise and focused on how HIZOU can help the user's business grow.

If a user asks for a price, explain that every project is unique and suggest they book a free consultation via the website or WhatsApp (+213 775 64 34 33).
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatbotProps {
  lang?: 'ar' | 'fr';
}

export const Chatbot: React.FC<ChatbotProps> = ({ lang = 'ar' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'model', 
      text: lang === 'ar' 
        ? 'مرحباً بك في وكالة HIZOU! كيف يمكنني مساعدتك في تطوير مشروعك اليوم؟' 
        : 'Bienvenue chez HIZOU Agency ! Comment puis-je vous aider à développer votre projet aujourd\'hui ?' 
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    title: lang === 'ar' ? 'مساعد HIZOU الذكي' : 'Assistant IA HIZOU',
    online: lang === 'ar' ? 'متصل الآن' : 'En ligne',
    placeholder: lang === 'ar' ? 'اكتب رسالتك هنا...' : 'Écrivez votre message ici...',
    apiKeyError: lang === 'ar' ? 'يبدو أن هناك مشكلة في مفتاح API. يرجى إعادة اختياره.' : 'Il semble y avoir un problème avec la clé API. Veuillez la sélectionner à nouveau.',
    missingKey: lang === 'ar' ? 'يرجى إعداد مفتاح API الخاص بـ Gemini في الإعدادات للمتابعة.' : 'Veuillez configurer votre clé API Gemini dans les paramètres pour continuer.',
    generalError: lang === 'ar' ? 'عذراً، حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.' : 'Désolé, une erreur est survenue. Veuillez réessayer plus tard.'
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Update initial message when language changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{ 
        role: 'model', 
        text: lang === 'ar' 
          ? 'مرحباً بك في وكالة HIZOU! كيف يمكنني مساعدتك في تطوير مشروعك اليوم؟' 
          : 'Bienvenue chez HIZOU Agency ! Comment puis-je vous aider à développer votre projet aujourd\'hui ?' 
      }]);
    }
  }, [lang]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      // Check for API key selection if in AI Studio environment
      if (window.aistudio) {
        try {
          const hasKey = await window.aistudio.hasSelectedApiKey();
          if (!hasKey) {
            await window.aistudio.openSelectKey();
          }
        } catch (e) {
          console.warn('AI Studio API key selection failed:', e);
        }
      }

      const apiKey = getApiKey();
      if (!apiKey || apiKey === 'undefined') {
        throw new Error("Missing API Key. Please configure GEMINI_API_KEY.");
      }

      // Create a new GoogleGenAI instance right before making an API call
      const ai = new GoogleGenAI({ apiKey });

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        config: {
          systemInstruction: SYSTEM_INSTRUCTION + `\n\nPlease respond in ${lang === 'ar' ? 'Arabic' : 'French'}.`,
        },
        history: messages.filter(m => m.text).map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }))
      });

      const result = await chat.sendMessage({ message: userMessage });
      
      const responseText = result.text;

      if (!responseText) {
        throw new Error("Empty response from AI");
      }

      setMessages(prev => [...prev, { role: 'model', text: responseText }]);
    } catch (error: any) {
      console.error("Chatbot Error:", error);
      
      // Handle "Requested entity was not found" by prompting for key again
      if (error.message?.includes("Requested entity was not found") && window.aistudio) {
        setMessages(prev => [...prev, { role: 'model', text: t.apiKeyError }]);
        await window.aistudio.openSelectKey();
      } else if (error.message?.includes("Missing API Key")) {
        setMessages(prev => [...prev, { role: 'model', text: t.missingKey }]);
      } else {
        setMessages(prev => [...prev, { role: 'model', text: t.generalError }]);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`fixed bottom-8 ${lang === 'ar' ? 'left-8' : 'right-8'} z-50 flex flex-col items-start`}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="mb-4 w-[350px] md:w-[400px] h-[500px] bg-bg-surface border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden"
            dir={lang === 'ar' ? 'rtl' : 'ltr'}
          >
            {/* Header */}
            <div className="p-4 bg-brand flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Bot className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">{t.title}</h3>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-white/70 text-[10px]">{t.online}</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/80 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div 
                  key={i} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-brand text-white rounded-tr-none' 
                      : 'bg-bg-deep text-white/90 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-bg-deep p-3 rounded-2xl rounded-tl-none border border-white/5">
                    <Loader2 className="text-brand animate-spin" size={16} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 border-t border-white/5 bg-bg-deep/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t.placeholder}
                  className={`w-full bg-bg-surface border border-white/10 rounded-xl py-3 px-4 ${lang === 'ar' ? 'pl-12' : 'pr-12'} text-sm text-white outline-none focus:border-brand transition-colors`}
                />
                <button 
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className={`absolute ${lang === 'ar' ? 'left-2' : 'right-2'} top-1/2 -translate-y-1/2 w-8 h-8 bg-brand text-white rounded-lg flex items-center justify-center hover:brightness-110 transition-all disabled:opacity-50`}
                >
                  <Send size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 ${
          isOpen ? 'bg-bg-surface text-brand rotate-90' : 'bg-brand text-white hover:scale-110'
        }`}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </button>
    </div>
  );
};
