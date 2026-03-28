import React, { useState, useEffect, useRef } from 'react';
import { 
  motion, 
  AnimatePresence, 
  useScroll, 
  useTransform, 
  useInView
} from 'motion/react';
import { 
  Menu, 
  X, 
  Mic, 
  Video, 
  Clapperboard, 
  Smartphone, 
  Code2, 
  Megaphone,
  Instagram, 
  Twitter, 
  Linkedin, 
  Play,
  Globe,
  Zap,
  Shield,
  Layers,
  Sparkles,
  ArrowUpRight,
  Plus,
  ChevronRight,
  ArrowLeft,
  Camera,
  Scissors,
  User,
  MessageCircle,
  MapPin,
  Phone,
  Mail,
  Send,
  Languages,
  Star
} from 'lucide-react';
import { Chatbot } from './components/Chatbot';

// --- Types ---
type Language = 'ar' | 'fr';

const translations = {
  ar: {
    home: 'الرئيسية',
    services: 'خدماتنا',
    testimonials: 'آراء العملاء',
    contact: 'تواصل',
    bookConsultation: 'احجز جلسة تصوير',
    heroTexts: ["نصنع مشاهد تبقى في الذاكرة", "نحوّل أفكارك إلى واقع", "محتوى بصري يأسر الجمهور"],
    heroSub: 'من التصوير الاحترافي إلى المونتاج الإبداعي — نحوّل أفكارك إلى محتوى بصري يأسر الجمهور',
    discoverServices: 'شاهد أعمالنا',
    bookPhotoshoot: 'احجز جلسة تصوير',
    scrollDown: 'اسحب للأسفل',
    aboutText: 'وكالة HIZOU شريكك الإبداعي للتميز البصري، <br /> نوثّق لحظاتك ونحوّل رؤيتك إلى محتوى احترافي يأسر القلوب والعقول.',
    projectsDelivered: 'فيديو منتج',
    experienceText: 'خبرتنا في صناعة المحتوى البصري مكنتنا من بناء قصص نجاح حقيقية مع كبرى العلامات التجارية.',
    happyClients: 'عميل راضٍ',
    followers: 'متابع',
    yearsExperience: 'سنوات خبرة',
    support: 'دعم فني متواصل',
    whatsappText: 'مرحباً HIZOU، أريد الاستفسار عن خدمات التصوير والمونتاج',
    contactNow: 'تواصل الآن',
    ourTeam: 'فريقنا',
    teamDesc: 'خبراء في صناعة المحتوى والتصوير الاحترافي',
    servicesTitle: 'رؤية متكاملة للتميز البصري',
    integrated: 'متكاملة',
    servicesSub: 'نقدم حلولاً بصرية مبتكرة من التصوير إلى المونتاج لتمكين علامتك من الوصول إلى أقصى إمكانياتها.',
    testimonialsTitle: 'ثقة عملائنا هي سر نجاحنا',
    testimonialsSub: 'سر نجاحنا',
    whatTheySay: 'قالوا عنا',
    readyToGrow: 'جاهز للتألق؟',
    growth: 'للتألق؟',
    ctaSub: 'انضم إلى قائمة عملائنا الناجحين وابدأ رحلة التميز البصري لعلامتك التجارية اليوم.',
    startProject: 'ابدأ مشروعك الآن',
    startJourney: 'لنبدأ رحلتك',
    journey: 'رحلتك',
    fullName: 'الاسم الكامل',
    email: 'البريد الإلكتروني',
    namePlaceholder: 'محمد علي',
    servicesList: [
      { id: 'filming', title: 'التصوير الاحترافي', description: 'نوثّق لحظاتك بعدسة احترافية تعكس هوية علامتك التجارية بدقة.', number: '(1)', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' },
      { id: 'editing', title: 'مونتاج الفيديو', description: 'نحوّل اللقطات الخام إلى قصص بصرية مؤثرة تجذب الجمهور.', number: '(2)', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800' },
      { id: 'ugc', title: 'محتوى UGC', description: 'محتوى واقعي وأصيل يبني ثقة جمهورك ويعزز مصداقية علامتك.', number: '(3)', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
      { id: 'voiceover', title: 'تعليق صوتي احترافي', description: 'أصوات تضيف روحاً وتأثيراً لكل محتوى بصري ننتجه.', number: '(4)', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800' },
      { id: 'creative-ads', title: 'كرياتيف Ads', description: 'إعلانات إبداعية تجذب الانتباه وتحقق أفضل النتائج التسويقية.', number: '(5)', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
      { id: 'sponsored-ads', title: 'سبونسر Ads', description: 'حملات مدفوعة موجهة تضاعف وصولك وتزيد من مبيعاتك.', number: '(6)', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    ]
  },
  fr: {
    home: 'Accueil',
    services: 'Services',
    testimonials: 'Témoignages',
    contact: 'Contact',
    bookConsultation: 'Réserver un tournage',
    heroTexts: ["Nous créons des scènes mémorables", "Nous transformons vos idées", "Un contenu visuel captivant"],
    heroSub: 'Du tournage professionnel au montage créatif — nous transformons vos idées en contenu visuel captivant',
    discoverServices: 'Voir nos travaux',
    bookPhotoshoot: 'Réserver un tournage',
    scrollDown: 'Défiler',
    aboutText: "L'agence HIZOU est votre partenaire créatif pour l'excellence visuelle. <br /> Nous documentons vos moments et transformons votre vision en contenu professionnel.",
    projectsDelivered: 'Vidéos produites',
    experienceText: 'Notre expérience dans la création de contenu visuel nous a permis de bâtir de véritables success stories.',
    happyClients: 'Clients satisfaits',
    followers: 'Abonnés',
    yearsExperience: 'Années d\'expérience',
    support: 'Support technique continu',
    whatsappText: 'Bonjour HIZOU, je souhaite me renseigner sur vos services de tournage et montage',
    contactNow: 'Contactez-nous',
    ourTeam: 'Notre Équipe',
    teamDesc: 'Experts en création de contenu et tournage professionnel',
    servicesTitle: 'Une vision intégrée pour l\'excellence visuelle',
    integrated: 'intégrée',
    servicesSub: 'Nous proposons des solutions visuelles innovantes du tournage au montage pour propulser votre marque.',
    testimonialsTitle: 'La confiance de nos clients est le secret de notre succès',
    testimonialsSub: 'notre succès',
    whatTheySay: 'Témoignages',
    readyToGrow: 'Prêt à briller ?',
    growth: 'briller ?',
    ctaSub: 'Rejoignez nos clients satisfaits et commencez dès aujourd\'hui votre voyage vers l\'excellence visuelle.',
    startProject: 'Commencez votre projet',
    startJourney: 'Commençons votre voyage',
    journey: 'voyage',
    fullName: 'Nom Complet',
    email: 'E-mail',
    namePlaceholder: 'Mohamed Ali',
    servicesList: [
      { id: 'filming', title: 'Tournage Professionnel', description: 'Nous documentons vos moments avec une lentille professionnelle qui reflète votre identité.', number: '(1)', image: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=800' },
      { id: 'editing', title: 'Montage Vidéo', description: 'Nous transformons les séquences brutes en histoires visuelles percutantes.', number: '(2)', image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800' },
      { id: 'ugc', title: 'Contenu UGC', description: 'Un contenu réaliste et authentique qui renforce la confiance de votre audience.', number: '(3)', image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=800' },
      { id: 'voiceover', title: 'Voice-over Professionnel', description: 'Des voix qui ajoutent de l\'âme et de l\'impact à chaque contenu visuel.', number: '(4)', image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=800' },
      { id: 'creative-ads', title: 'Creative Ads', description: 'Des publicités créatives qui attirent l\'attention et génèrent des résultats.', number: '(5)', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=800' },
      { id: 'sponsored-ads', title: 'Sponsored Ads', description: 'Campagnes payantes ciblées qui doublent votre portée et vos ventes.', number: '(6)', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800' },
    ]
  }
};

interface Service {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  number: string;
  image: string;
}

interface Project {
  id: string;
  title: string;
  category: string;
  image: string;
  year: string;
  results: string;
}

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  rating: number;
  caseStudyUrl?: string;
}

// --- Components ---

const TypingText = ({ texts }: { texts: string[] }) => {
  const [index, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [speed, setSpeed] = useState(150);

  useEffect(() => {
    const handleTyping = () => {
      const currentText = texts[index];
      if (isDeleting) {
        setDisplayText(currentText.substring(0, displayText.length - 1));
        setSpeed(50);
      } else {
        setDisplayText(currentText.substring(0, displayText.length + 1));
        setSpeed(150);
      }

      if (!isDeleting && displayText === currentText) {
        setTimeout(() => setIsDeleting(true), 1500);
      } else if (isDeleting && displayText === "") {
        setIsDeleting(false);
        setIndex((prev) => (prev + 1) % texts.length);
      }
    };

    const timer = setTimeout(handleTyping, speed);
    return () => clearTimeout(timer);
  }, [displayText, isDeleting, index, texts, speed]);

  return (
    <span className="relative">
      {displayText}
      <span className="w-2 h-12 md:h-20 bg-brand absolute -right-4 animate-pulse" />
    </span>
  );
};

const Particles = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2
          }}
          animate={{ 
            x: [
              Math.random() * 100 + "%", 
              Math.random() * 100 + "%", 
              Math.random() * 100 + "%"
            ],
            y: [
              Math.random() * 100 + "%", 
              Math.random() * 100 + "%", 
              Math.random() * 100 + "%"
            ]
          }}
          transition={{ 
            duration: Math.random() * 20 + 10, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`absolute rounded-full blur-[1px] ${
            i % 3 === 0 ? 'w-1 h-1 bg-white/40' : 
            i % 3 === 1 ? 'w-3 h-3 bg-brand/30' : 
            'w-2 h-2 bg-brand'
          }`}
        />
      ))}
    </div>
  );
};

const Confetti = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(30)].map((_, i) => (
        <div
          key={i}
          className="confetti"
          style={{
            left: Math.random() * 100 + "%",
            animationDelay: Math.random() * 5 + "s",
            backgroundColor: i % 3 === 0 ? "#F07020" : i % 3 === 1 ? "#FFFFFF" : "#d4601a",
            width: Math.random() * 8 + 4 + "px",
            height: Math.random() * 8 + 4 + "px",
            borderRadius: Math.random() > 0.5 ? "50%" : "0%"
          }}
        />
      ))}
    </div>
  );
};

const NetworkParticles = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    const particleCount = 30;

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;

      constructor(width: number, height: number) {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
      }

      update(width: number, height: number) {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx *= -1;
        if (this.y < 0 || this.y > height) this.vy *= -1;
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(240, 112, 32, 0.6)';
        ctx.fill();
      }
    }

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(240, 112, 32, ${0.2 * (1 - dist / 150)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />;
};

const DashboardWidget = () => {
  const [followers, setFollowers] = useState(2400);
  const [data, setData] = useState([30, 40, 35, 50, 45, 60, 55]);

  useEffect(() => {
    const interval = setInterval(() => {
      setFollowers(prev => prev + Math.floor(Math.random() * 10));
      setData(prev => [...prev.slice(1), prev[prev.length - 1] + (Math.random() - 0.5) * 20]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      className="absolute top-24 right-6 md:right-12 z-20 bg-bg-surface/80 backdrop-blur-md border border-white/10 p-4 rounded-xl shadow-2xl w-48 hidden lg:block"
    >
      <div className="flex justify-between items-center mb-3">
        <div className="w-2 h-2 rounded-full bg-brand animate-pulse" />
        <span className="text-[10px] uppercase tracking-widest text-white/40">Live Dashboard</span>
      </div>
      <div className="mb-4">
        <div className="text-xl font-black text-white">+{followers.toLocaleString()}</div>
        <div className="text-[9px] text-brand/80">Followers today</div>
      </div>
      <div className="h-12 flex items-end gap-1">
        {data.map((val, i) => (
          <motion.div 
            key={i}
            animate={{ height: `${Math.max(10, Math.min(100, val))}%` }}
            className="flex-1 bg-brand/40 rounded-t-sm"
          />
        ))}
      </div>
    </motion.div>
  );
};

const FloatingDigitalIcons = () => {
  const icons = [
    { icon: <Layers size={24} />, delay: 0, x: '10%', y: '20%' },
    { icon: <Smartphone size={24} />, delay: 2, x: '80%', y: '15%' },
    { icon: <Zap size={24} />, delay: 1, x: '15%', y: '70%' },
    { icon: <Play size={24} />, delay: 3, x: '75%', y: '75%' },
    { icon: <Sparkles size={24} />, delay: 1.5, x: '85%', y: '40%' },
    { icon: <MessageCircle size={24} />, delay: 2.5, x: '5%', y: '45%' },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {icons.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: item.x, y: item.y }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            y: ['-20px', '20px', '-20px'],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 5 + Math.random() * 5, 
            repeat: Infinity, 
            delay: item.delay,
            ease: "easeInOut" 
          }}
          className="absolute text-brand/30"
          style={{ left: item.x, top: item.y }}
        >
          {item.icon}
        </motion.div>
      ))}
    </div>
  );
};

const DigitalGrid = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute inset-0 bg-[#0A0A0A]" />
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(240,112,32,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(240,112,32,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          animation: 'grid-move 20s linear infinite'
        }}
      />
      <div 
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(240,112,32,0.4) 2px, transparent 2px),
            linear-gradient(to bottom, rgba(240,112,32,0.4) 2px, transparent 2px)
          `,
          backgroundSize: '300px 300px',
          animation: 'grid-move 15s linear infinite'
        }}
      />
    </div>
  );
};

const Reveal = ({ children, width = "fit-content", delay = 0 }: { children: React.ReactNode, width?: "fit-content" | "100%", delay?: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div ref={ref} style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
};

const Counter = ({ value, duration = 2, suffix = "" }: { value: number, duration?: number, suffix?: string }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const totalMiliseconds = duration * 1000;
      const incrementTime = totalMiliseconds / end;

      const timer = setInterval(() => {
        start += 1;
        setCount(start);
        if (start === end) clearInterval(timer);
      }, Math.max(incrementTime, 10));

      return () => clearInterval(timer);
    }
  }, [isInView, value, duration]);

  return <span ref={ref} className="drop-shadow-[0_0_10px_rgba(240,112,32,0.3)]">{count}{suffix}</span>;
};

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest('button, a, .hover-target')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleHover);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleHover);
    };
  }, []);

  return (
    <>
      <div 
        className="custom-cursor" 
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
      <div 
        className={`cursor-follower ${isHovering ? 'scale-150 bg-white/10 border-transparent' : ''}`}
        style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
      />
    </>
  );
};

const LanguageSwitcher = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  return (
    <div 
      onClick={() => setLang(lang === 'ar' ? 'fr' : 'ar')}
      className="relative w-14 h-7 bg-white/5 border border-white/10 rounded-full cursor-pointer p-1 flex items-center transition-all duration-300 hover:border-brand/50 group"
    >
      <motion.div 
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`w-5 h-5 bg-brand rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-[0_0_10px_rgba(240,112,32,0.5)] ${lang === 'ar' ? 'ml-0' : 'ml-7'}`}
      >
        <Languages size={10} />
      </motion.div>
      <div className="absolute inset-0 flex justify-between px-2.5 items-center pointer-events-none">
        <span className={`text-[8px] font-black transition-opacity duration-300 ${lang === 'ar' ? 'opacity-0' : 'opacity-40'}`}>AR</span>
        <span className={`text-[8px] font-black transition-opacity duration-300 ${lang === 'fr' ? 'opacity-0' : 'opacity-40'}`}>FR</span>
      </div>
    </div>
  );
};

const Navbar = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t.home, href: '#' },
    { name: t.services, href: '#services' },
    { name: t.testimonials, href: '#testimonials' },
    { name: t.contact, href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      <nav 
        className={`transition-all duration-500 ${
          isScrolled 
            ? 'bg-bg-deep/80 backdrop-blur-xl border-b border-white/10' 
            : 'bg-transparent'
        }`}
        style={{ padding: '12px 24px' }}
      >
      <div className="container mx-auto px-6 flex flex-row-reverse justify-between items-center">
        <div className="hidden md:flex items-center gap-8 flex-row-reverse">
          <div className="flex items-center gap-12 flex-row-reverse">
            {navLinks.map((item, i) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="text-sm font-medium tracking-widest hover:text-brand transition-colors"
              >
                {item.name}
              </motion.a>
            ))}
          </div>
          
          <div className="flex items-center gap-4">
            <LanguageSwitcher lang={lang} setLang={setLang} />
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="px-8 py-3 bg-white text-bg-deep text-xs font-bold uppercase tracking-widest rounded-full hover:bg-brand hover:text-white transition-all duration-300 shadow-lg shadow-white/10"
            >
              {t.bookConsultation}
            </motion.button>
          </div>
        </div>

        <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="logo flex items-center"
          style={{ display: 'flex', alignItems: 'center' }}
        >
          <div style={{
            background: '#F07020',
            borderRadius: '10px',
            padding: '4px 10px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <img 
              src="https://i.imgur.com/QZigE0P.png" 
              alt="HIZOU Agency"
              style={{
                height: '32px',
                width: 'auto',
                display: 'block',
                filter: 'brightness(0) invert(1)',
              }}
            />
          </div>
        </motion.div>
      </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-bg-surface border-b border-white/5 overflow-hidden"
          >
            <div className={`flex flex-col p-6 gap-6 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              {navLinks.map((item) => (
                <a key={item.name} href={item.href} className="text-lg" onClick={() => setIsMenuOpen(false)}>
                  {item.name}
                </a>
              ))}
              <div className="pt-4 border-t border-white/5">
                <LanguageSwitcher lang={lang} setLang={setLang} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

const BottomNav = ({ lang, setLang }: { lang: Language, setLang: (l: Language) => void }) => {
  const t = translations[lang];
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 md:hidden w-[95%] bg-bg-surface/80 backdrop-blur-xl border border-white/10 rounded-full p-2 flex justify-around items-center shadow-2xl">
      {[
        { icon: <Globe size={20} />, label: t.home, href: '#' },
        { icon: <Layers size={20} />, label: t.services, href: '#services' },
        { icon: <Sparkles size={20} />, label: t.testimonials, href: '#testimonials' },
        { icon: <Phone size={20} />, label: t.contact, href: '#contact' },
      ].map((item, i) => (
        <a key={i} href={item.href} className="flex flex-col items-center gap-1 p-2 text-white/60 hover:text-brand transition-colors">
          {item.icon}
          <span className="text-[8px] font-bold uppercase tracking-widest">{item.label}</span>
        </a>
      ))}
      <div className="h-8 w-[1px] bg-white/10 mx-1" />
      <LanguageSwitcher lang={lang} setLang={setLang} />
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [lang, setLang] = useState<Language>('ar');

  useEffect(() => {
    if (lang === 'fr') {
      document.documentElement.classList.add('lang-fr');
    } else {
      document.documentElement.classList.remove('lang-fr');
    }
  }, [lang]);

  const t = translations[lang];
  const { scrollYProgress } = useScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const services: Service[] = t.servicesList.map(s => ({
    ...s,
    icon: s.id === 'voiceover' ? <Mic /> : 
          s.id === 'filming' ? <Video /> : 
          s.id === 'editing' ? <Clapperboard /> : 
          s.id === 'ugc' ? <Smartphone /> : 
          s.id === 'web' ? <Code2 /> : <Megaphone />
  }));

  const projects: Project[] = [
    { id: 'ecommerce', title: lang === 'ar' ? 'متجر إلكتروني للملابس' : 'E-commerce de vêtements', category: lang === 'ar' ? 'تجارة إلكترونية' : 'E-commerce', image: '', year: '2024', results: '+300% مبيعات' },
    { id: 'food-app', title: lang === 'ar' ? 'تطبيق توصيل طعام' : 'App de livraison de nourriture', category: lang === 'ar' ? 'تطبيقات جوال' : 'Apps Mobiles', image: '', year: '2023', results: '50k تحميل' },
    { id: 'real-estate', title: lang === 'ar' ? 'شركة خدمات عقارية' : 'Agence immobilière', category: lang === 'ar' ? 'عقارات' : 'Immobilier', image: '', year: '2024', results: '500+ عميل محتمل' },
  ];

  const testimonials: Testimonial[] = lang === 'ar' ? [
    {
      id: '1',
      quote: "شغل تصوير احترافي جداً، اللقطات طلعت فوق التوقعات. ننصح بهم بدون تردد",
      author: "كريم بوعلام",
      company: "صاحب متجر ملابس — الجزائر العاصمة",
      rating: 5
    },
    {
      id: '2',
      quote: "المونتاج كان رائع، الفيديو الترويجي ضاعف طلباتنا في أول أسبوع من نشره",
      author: "أمينة حداد",
      company: "مديرة مطعم — وهران",
      rating: 5
    },
    {
      id: '3',
      quote: "فريق جدي ومحترف، سلّموا في الوقت وبجودة عالية. سنتعامل معهم مستقبلاً",
      author: "يوسف مرابط",
      company: "مدير وكالة عقارية — قسنطينة",
      rating: 5
    }
  ] : [
    {
      id: '1',
      quote: "Travail de tournage très professionnel, les prises de vue ont dépassé les attentes. Je les recommande sans hésitation",
      author: "Karim Boualam",
      company: "Propriétaire d'un magasin de vêtements — Alger",
      rating: 5
    },
    {
      id: '2',
      quote: "Le montage était superbe, la vidéo promotionnelle a doublé nos commandes dès la première semaine de sa publication",
      author: "Amina Haddad",
      company: "Directrice de restaurant — Oran",
      rating: 5
    },
    {
      id: '3',
      quote: "Une équipe sérieuse et professionnelle, ils ont livré à temps et avec une grande qualité. Nous traiterons avec eux à l'avenir",
      author: "Youssef Merabet",
      company: "Directeur d'agence immobilière — Constantine",
      rating: 5
    }
  ];

  return (
    <div className="relative min-h-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <CustomCursor />
      <Navbar lang={lang} setLang={setLang} />
      <BottomNav lang={lang} setLang={setLang} />

      {/* Floating WhatsApp Button */}
      <motion.a
        href={`https://wa.me/213775643433?text=${encodeURIComponent(t.whatsappText)}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        className={`fixed bottom-8 ${lang === 'ar' ? 'right-8' : 'left-8'} z-[60] w-16 h-16 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-2xl`}
      >
        <MessageCircle size={32} fill="currentColor" />
        <span className={`absolute -top-2 ${lang === 'ar' ? '-left-2' : '-right-2'} bg-brand text-[8px] font-bold px-2 py-1 rounded-full animate-pulse shadow-lg shadow-brand/50`}>{t.contactNow}</span>
      </motion.a>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-bg-deep">
        <DigitalGrid />
        <NetworkParticles />
        <FloatingDigitalIcons />
        <DashboardWidget />

        <div className="container mx-auto px-6 z-10 text-center">
          <div className="flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Huge Glow Effect */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] bg-brand/15 blur-[120px] rounded-full animate-pulse-glow" />

              <h1 className="text-[14vw] md:text-[12vw] font-black leading-none tracking-tighter uppercase relative drop-shadow-[0_0_30px_rgba(240,112,32,0.3)]">
                HIZOU
              </h1>
              
              <div className="mt-4 text-4xl md:text-7xl font-black text-white flex flex-col items-center gap-4">
                <TypingText texts={t.heroTexts} />
              </div>

            </motion.div>
            
            <div className="mt-16 flex flex-col items-center gap-12">
              <Reveal delay={0.8}>
                <p className="max-w-md text-sm md:text-base uppercase tracking-[0.3em] font-medium text-white/80 drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]">
                  {t.heroSub}
                </p>
              </Reveal>
              
              <div className={`flex flex-col ${lang === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8 md:gap-12`}>
                <Reveal delay={1}>
                  <motion.a
                    href="#services"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    animate={{ 
                      boxShadow: ["0 0 0 0px rgba(240, 112, 32, 0.4)", "0 0 0 20px rgba(240, 112, 32, 0)", "0 0 0 0px rgba(240, 112, 32, 0)"]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    className="relative px-12 py-6 bg-brand text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-bg-deep transition-all duration-500 flex items-center gap-4 group overflow-hidden shadow-2xl shadow-brand/40"
                  >
                    <motion.span 
                      animate={{ 
                        scale: [1, 1.5, 1],
                        opacity: [0.3, 0, 0.3] 
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        ease: "easeInOut" 
                      }}
                      className="absolute inset-0 bg-white/20 rounded-full"
                    />
                    <span className="relative z-10">{t.discoverServices}</span>
                    {lang === 'ar' ? (
                      <ArrowLeft size={16} className="relative z-10 group-hover:-translate-x-2 transition-transform" />
                    ) : (
                      <ChevronRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                    )}
                  </motion.a>
                </Reveal>

                <Reveal delay={1.2}>
                  <motion.a
                    href="#contact"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 py-6 border border-white/20 text-white text-xs font-black uppercase tracking-[0.2em] rounded-full hover:bg-white hover:text-bg-deep transition-all duration-500 flex items-center gap-4 group"
                  >
                    <span className="relative z-10">{t.bookPhotoshoot}</span>
                    <Camera size={16} className="relative z-10 group-hover:rotate-12 transition-transform" />
                  </motion.a>
                </Reveal>
              </div>
            </div>
          </div>
        </div>

        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
        >
          <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/40">{t.scrollDown}</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-brand to-transparent" />
        </motion.div>
      </section>

      {/* About Section (Shortened) */}
      <section className="py-12 bg-bg-deep relative overflow-hidden text-center">
        <div className="container mx-auto px-6">
          <Reveal>
            <p 
              className="text-xl md:text-2xl text-white/80 font-medium leading-relaxed max-w-3xl mx-auto"
              dangerouslySetInnerHTML={{ __html: t.aboutText }}
            />
          </Reveal>
        </div>
      </section>

      <div className="h-2 w-full bg-brand" />

      {/* Stats Section (Bento Grid) */}
      <section className="py-32 bg-bg-deep relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 h-auto md:h-[600px]">
            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 md:row-span-2 bg-brand p-12 rounded-[40px] flex flex-col justify-between relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:rotate-12 transition-transform">
                <Sparkles size={120} />
              </div>
              <div className="relative z-10">
                <div className="text-8xl md:text-12xl font-black text-white tracking-tighter mb-4">+200</div>
                <div className="text-xl font-black text-bg-deep uppercase tracking-widest">{t.projectsDelivered}</div>
              </div>
              <div className="text-sm font-medium text-white/60 max-w-xs">
                {t.experienceText}
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-bg-surface p-8 rounded-[40px] border border-white/5 flex flex-col justify-center items-center text-center group"
            >
              <div className="text-5xl font-black text-brand mb-2">+50</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.happyClients}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-bg-surface p-8 rounded-[40px] border border-white/5 flex flex-col justify-center items-center text-center group"
            >
              <div className="text-5xl font-black text-brand mb-2">29.8K</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.followers}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="bg-bg-surface p-8 rounded-[40px] border border-white/5 flex flex-col justify-center items-center text-center group"
            >
              <div className="text-5xl font-black text-brand mb-2">3+</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-white/40">{t.yearsExperience}</div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 0.98 }}
              className="md:col-span-2 bg-white p-12 rounded-[40px] flex items-center justify-between group overflow-hidden relative"
            >
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="text-4xl font-black text-bg-deep mb-2">{t.ourTeam}</div>
                <div className="text-sm font-medium text-bg-deep/60">{t.teamDesc}</div>
              </div>
              <div className={`relative z-10 w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white ${lang === 'fr' ? 'rotate-180' : ''}`}>
                <ArrowUpRight size={32} />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-32 relative bg-bg-surface text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-lines" />
        <div className="container mx-auto px-6">
          <div className={`flex flex-col md:flex-row-reverse justify-between items-end mb-24 gap-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
            <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
              <Reveal>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand mb-4 block">({t.services})</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-6xl md:text-8xl font-black leading-tight">
                  {lang === 'ar' ? (
                    <>رؤية <span className="text-stroke-orange">متكاملة</span> <br /> للنمو الرقمي</>
                  ) : (
                    <>Une vision <span className="text-stroke-orange">intégrée</span> <br /> pour la croissance</>
                  )}
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.4}>
              <p className="max-w-xs text-sm text-text-muted font-medium leading-relaxed">
                {t.servicesSub}
              </p>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`bg-bg-deep p-12 group hover:bg-brand/10 transition-all duration-500 relative overflow-hidden ${lang === 'ar' ? 'text-right' : 'text-left'} rounded-[40px] border border-bg-border shadow-2xl ${
                  i === 0 ? 'md:col-span-8' : 
                  i === 1 ? 'md:col-span-4' : 
                  i === 2 ? 'md:col-span-4' : 
                  i === 3 ? 'md:col-span-8' : 
                  'md:col-span-6'
                }`}
              >
                <div className="absolute inset-0 z-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-bg-deep via-bg-deep/80 to-transparent" />
                </div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand/5 blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-brand/10 transition-colors duration-500" />
                <div className={`relative z-10 flex justify-between items-start mb-12 ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'}`}>
                  <div className="text-brand drop-shadow-[0_0_15px_rgba(240,112,32,0.5)] group-hover:scale-110 transition-transform duration-500">
                    {React.cloneElement(service.icon as React.ReactElement, { size: 48 })}
                  </div>
                  <span className="text-[12px] font-black text-white/20 group-hover:text-brand/40 transition-colors">{service.number}</span>
                </div>
                <h3 className={`relative z-10 text-3xl font-black mb-4 group-hover:${lang === 'ar' ? 'translate-x-[-10px]' : 'translate-x-[10px]'} transition-transform duration-500`}>{service.title}</h3>
                <p className="relative z-10 text-sm text-text-muted font-medium leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-32 bg-bg-deep border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 grid-lines" />
        <div className="container mx-auto px-6">
          <div className="text-center mb-24">
            <Reveal width="100%">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-brand mb-4 block">({t.whatTheySay})</span>
            </Reveal>
            <Reveal width="100%" delay={0.2}>
              <h2 className="text-5xl md:text-7xl font-black">
                {lang === 'ar' ? (
                  <>ثقة عملائنا هي <br /> <span className="italic text-brand text-stroke-orange">سر نجاحنا</span></>
                ) : (
                  <>La confiance de nos clients est <br /> <span className="italic text-brand text-stroke-orange">notre succès</span></>
                )}
              </h2>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, i) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`p-10 bg-[#1A1A1A] border border-[#2A2A2A] rounded-2xl flex flex-col justify-between ${lang === 'ar' ? 'text-right' : 'text-left'}`}
              >
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <div className={`mb-8 flex gap-1 ${lang === 'ar' ? 'justify-start' : 'justify-start'}`}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F07020" color="#F07020" />
                    ))}
                  </div>
                  <p className="text-xl font-[400] leading-relaxed mb-8 text-white">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div>
                  <div className="font-[700] text-lg mb-1 text-white">{testimonial.author}</div>
                  <div className="text-sm font-[400] text-[#A0A0A0] mb-2">{testimonial.company}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="h-2 w-full bg-brand" />

      {/* Final CTA Section */}
      <section className="py-32 bg-brand relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 grid-lines" />
        <div className="container mx-auto px-6 relative z-10 text-center">
          <Reveal width="100%">
            <h2 className="text-6xl md:text-9xl font-black text-white mb-12 leading-tight">
              {lang === 'ar' ? (
                <>هل أنت مستعد <br /> <span className="text-bg-deep">للنمو؟</span></>
              ) : (
                <>Prêt pour la <br /> <span className="text-bg-deep">croissance ?</span></>
              )}
            </h2>
          </Reveal>
          <Reveal width="100%" delay={0.2}>
            <p className="text-xl md:text-2xl text-white/80 font-medium mb-16 max-w-2xl mx-auto">
              {t.ctaSub}
            </p>
          </Reveal>
          <Reveal width="100%" delay={0.4}>
            <button className="px-16 py-8 bg-bg-deep text-white text-xl font-black uppercase tracking-widest rounded-full hover:bg-white hover:text-bg-deep transition-all duration-500 shadow-2xl">
              {t.startProject}
            </button>
          </Reveal>
        </div>
      </section>

      {/* Footer / Contact Section */}
      <footer id="contact" className="py-32 bg-bg-deep text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 grid-lines" />
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
            {/* Contact Form */}
            <div className="bg-bg-surface p-12 rounded-[40px] shadow-2xl border border-bg-border">
              <Reveal>
                <h2 className={`text-5xl md:text-7xl font-black mb-12 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                  {lang === 'ar' ? (
                    <>لنبدأ <span className="text-brand">رحلتك</span></>
                  ) : (
                    <>Commençons votre <span className="text-brand">voyage</span></>
                  )}
                </h2>
              </Reveal>
              
              <form className={`space-y-8 ${lang === 'ar' ? 'text-right' : 'text-left'}`} onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">{t.fullName}</label>
                  <input 
                    type="text" 
                    placeholder={t.namePlaceholder}
                    className={`w-full bg-bg-deep border border-bg-border p-6 rounded-2xl focus:ring-2 focus:ring-brand transition-all ${lang === 'ar' ? 'text-right' : 'text-left'} outline-none`}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">{t.email}</label>
                  <input 
                    type="email" 
                    placeholder="example@gmail.com"
                    className="w-full bg-bg-deep border border-bg-border p-6 rounded-2xl focus:ring-2 focus:ring-brand transition-all text-right outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-text-muted">رسالتك</label>
                  <textarea 
                    rows={4}
                    placeholder="كيف يمكننا مساعدتك؟"
                    className="w-full bg-bg-deep border border-bg-border p-6 rounded-2xl focus:ring-2 focus:ring-brand transition-all text-right resize-none outline-none"
                  ></textarea>
                </div>
                <button className="w-full bg-brand text-white py-6 rounded-2xl font-black text-xl hover:bg-brand/90 transition-all flex items-center justify-center gap-4 group">
                  <span>إرسال الرسالة</span>
                  <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="flex flex-col justify-center text-right">
              <Reveal>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-brand mb-6 block">(تواصل معنا)</span>
              </Reveal>
              <Reveal delay={0.2}>
                <h2 className="text-6xl md:text-8xl font-black mb-12 leading-tight">
                  جاهز <span className="text-stroke-orange">للتألق؟</span>
                </h2>
              </Reveal>
              
              <div className="space-y-12">
                <a href="tel:0775643433" className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8 group`}>
                  <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white shadow-xl shadow-brand/20 group-hover:rotate-12 transition-transform">
                    <Phone size={32} />
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-2">{lang === 'ar' ? 'اتصل بنا' : 'Appelez-nous'}</p>
                    <p className="text-2xl md:text-3xl font-black">0775 64 34 33</p>
                    <p className="text-2xl md:text-3xl font-black">0549 27 84 11</p>
                  </div>
                </a>

                <a href="https://wa.me/213775643433" target="_blank" rel="noopener noreferrer" className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8 group`}>
                  <div className="w-20 h-20 bg-[#25D366] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-[#25D366]/20 group-hover:rotate-12 transition-transform">
                    <MessageCircle size={32} fill="currentColor" />
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-2">{lang === 'ar' ? 'واتساب' : 'WhatsApp'}</p>
                    <p className="text-2xl md:text-3xl font-black">0775 64 34 33</p>
                  </div>
                </a>

                <a href="https://instagram.com/hizou_agency" target="_blank" rel="noopener noreferrer" className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8 group`}>
                  <div className="w-20 h-20 bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] rounded-3xl flex items-center justify-center text-white shadow-xl shadow-purple-500/20 group-hover:rotate-12 transition-transform">
                    <Instagram size={32} />
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-2">{lang === 'ar' ? 'إنستغرام' : 'Instagram'}</p>
                    <p className="text-2xl md:text-3xl font-black">@hizou_agency</p>
                  </div>
                </a>

                <a href="https://maps.app.goo.gl/HmBKHNzwatxShhjQ8" target="_blank" rel="noopener noreferrer" className={`flex ${lang === 'ar' ? 'flex-row-reverse' : 'flex-row'} items-center gap-8 group`}>
                  <div className="w-20 h-20 bg-brand rounded-3xl flex items-center justify-center text-white shadow-xl shadow-brand/20 group-hover:rotate-12 transition-transform">
                    <MapPin size={32} />
                  </div>
                  <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                    <p className="text-xs font-black text-text-muted uppercase tracking-widest mb-2">{lang === 'ar' ? 'موقعنا' : 'Notre emplacement'}</p>
                    <p className="text-2xl md:text-3xl font-black">Said Hamdine, Algiers</p>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className={`pt-12 border-t border-white/10 flex flex-col ${lang === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'} justify-between items-center gap-8 mt-24`}>
            <div className="flex items-center">
              <div style={{
                background: 'white',
                borderRadius: '12px',
                padding: '4px 10px',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}>
                <img 
                  src="https://i.imgur.com/QZigE0P.png" 
                  alt="HIZOU Agency"
                  style={{
                    height: '30px',
                    width: 'auto',
                    display: 'block',
                  }}
                />
              </div>
            </div>
            <p className="text-[10px] uppercase tracking-widest font-black text-text-muted">
              {lang === 'ar' ? '© 2025 وكالة HIZOU — الجزائر. جميع الحقوق محفوظة.' : '© 2025 Agence HIZOU — Algérie. Tous droits réservés.'}
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-[10px] uppercase tracking-widest font-black text-text-muted hover:text-brand">{lang === 'ar' ? 'سياسة الخصوصية' : 'Politique de confidentialité'}</a>
              <a href="#" className="text-[10px] uppercase tracking-widest font-black text-text-muted hover:text-brand">{lang === 'ar' ? 'الشروط والأحكام' : 'Termes et conditions'}</a>
            </div>
          </div>
        </div>
      </footer>

      <Chatbot lang={lang} />
    </div>
  );
}
