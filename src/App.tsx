/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';

// --- Icons (Inline SVGs) ---
const Icons = {
  Menu: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
  ),
  Close: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
  ),
  Social: {
    Instagram: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
    ),
    Facebook: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
    ),
    TikTok: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>
    ),
    LinkedIn: () => (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
    ),
    WhatsApp: () => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-11.7 8.38 8.38 0 0 1 3.8.9L21 3z"></path></svg>
    )
  },
  Services: {
    SocialMedia: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
    ),
    Ads: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
    ),
    Design: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg>
    ),
    Content: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
    ),
    SEO: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
    ),
    Web: () => (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
    )
  },
  Chevron: () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
  ),
  Star: () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#F07020" stroke="#F07020" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
  )
};

// --- Components ---

const Counter = ({ end, suffix = "", duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const elementRef = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) observer.observe(elementRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [hasStarted, end, duration]);

  return <span ref={elementRef}>{count}{suffix}</span>;
};

const Reveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsActive(true), delay);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${isActive ? 'active' : ''}`}>
      {children}
    </div>
  );
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [formStatus, setFormStatus] = useState(null); // 'submitting', 'success'

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setTimeout(() => {
      setFormStatus('success');
    }, 1500);
  };

  const navLinks = [
    { name: 'الرئيسية', href: '#' },
    { name: 'خدماتنا', href: '#services' },
    { name: 'أعمالنا', href: '#case-study' },
    { name: 'من نحن', href: '#why-hizou' },
    { name: 'تواصل', href: '#contact' },
  ];

  return (
    <div className="min-h-screen selection:bg-brand selection:text-white">
      {/* --- Navbar --- */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'glass-nav py-3' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tighter flex items-center gap-1">
            <span className="text-white">H</span>
            <span className="text-brand">✦</span>
            <span className="text-white">IZOU</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.name} href={link.href} className="text-sm font-medium text-white/80 hover:text-brand transition-colors">
                {link.name}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <button className="bg-brand hover:bg-brand/90 text-white px-6 py-2.5 rounded-full text-sm font-bold transition-all transform hover:scale-105">
              استشارة مجانية
            </button>
          </div>

          {/* Mobile Toggle */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <Icons.Close /> : <Icons.Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-bg-deep border-b border-white/5 p-6 md:hidden"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="text-lg font-medium text-white/80 hover:text-brand"
                  >
                    {link.name}
                  </a>
                ))}
                <button className="bg-brand text-white w-full py-4 rounded-xl font-bold mt-4">
                  استشارة مجانية
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* --- Hero --- */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 grid-lines -z-10"></div>
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-brand/10 blur-[120px] rounded-full"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <Reveal>
            <div className="relative">
              {/* Decorative Wing SVG */}
              <div className="absolute -right-12 -top-12 text-brand/20 animate-pulse hidden lg:block">
                <svg width="120" height="120" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M0 0 L100 50 L0 100 L20 50 Z" />
                </svg>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-black leading-[1.1] mb-6">
                نُحرّك علامتك التجارية <br />
                <span className="text-brand">بسرعة الضوء</span>
              </h1>
              <p className="text-xl text-white/60 mb-10 max-w-lg leading-relaxed">
                وكالة HIZOU للتسويق الرقمي — نتائج حقيقية، استراتيجية ذكية، ونمو لا يتوقف لعملك في الفضاء الرقمي.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="bg-brand hover:brightness-110 text-white px-8 py-4 rounded-full font-bold text-lg transition-all shadow-lg shadow-brand/20">
                  ابدأ الآن
                </button>
                <button className="border-2 border-brand text-brand hover:bg-brand/5 px-8 py-4 rounded-full font-bold text-lg transition-all">
                  شاهد أعمالنا
                </button>
              </div>

              <div className="mt-16 grid grid-cols-3 gap-8 border-r-4 border-brand pr-6">
                <div>
                  <div className="text-3xl font-black text-white"><Counter end={120} suffix="+" /></div>
                  <div className="text-sm text-white/40">حملة إعلانية</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-white"><Counter end={50} suffix="+" /></div>
                  <div className="text-sm text-white/40">عميل سعيد</div>
                </div>
                <div>
                  <div className="text-3xl font-black text-brand"><Counter end={300} suffix="%" /></div>
                  <div className="text-sm text-white/40">متوسط نمو</div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="relative group">
              <div className="absolute inset-0 bg-brand/20 blur-3xl group-hover:bg-brand/30 transition-all rounded-full"></div>
              <div className="relative bg-bg-surface border border-white/10 rounded-3xl p-4 overflow-hidden shadow-2xl">
                <img 
                  src="https://picsum.photos/seed/marketing/800/800" 
                  alt="Marketing Strategy" 
                  className="rounded-2xl w-full h-auto object-cover aspect-square grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Social Proof Bar --- */}
      <div className="bg-bg-surface py-10 overflow-hidden border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 mb-6 text-center">
          <p className="text-white/40 text-sm font-medium">وثق بنا أكثر من 50 مشروع في الجزائر والمنطقة العربية</p>
        </div>
        <div className="flex whitespace-nowrap animate-marquee">
          {[1, 2, 3, 4, 5, 1, 2, 3, 4, 5].map((i, idx) => (
            <div key={idx} className="mx-12 text-2xl font-black text-white/10 uppercase tracking-widest">
              Company Placeholder {i}
            </div>
          ))}
        </div>
      </div>

      {/* --- Services --- */}
      <section id="services" className="py-24 bg-bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="mb-16">
              <h2 className="text-4xl font-black mb-4">ماذا نفعل لك؟</h2>
              <div className="w-24 h-1.5 bg-brand rounded-full"></div>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'إدارة السوشيال ميديا', icon: <Icons.Services.SocialMedia />, desc: 'بناء مجتمع متفاعل ومحتوى يخطف الأنظار.' },
              { title: 'إعلانات Meta & Google', icon: <Icons.Services.Ads />, desc: 'حملات ممولة مدروسة للوصول لجمهورك المثالي.' },
              { title: 'تصميم الهوية البصرية', icon: <Icons.Services.Design />, desc: 'خلق انطباع أول لا يُنسى لعلامتك التجارية.' },
              { title: 'إنتاج محتوى إبداعي', icon: <Icons.Services.Content />, desc: 'فيديوهات وتصاميم تحكي قصة نجاحك.' },
              { title: 'تحسين محركات البحث SEO', icon: <Icons.Services.SEO />, desc: 'تصدر نتائج البحث العضوية وزيادة الزيارات.' },
              { title: 'بناء المواقع والمتاجر', icon: <Icons.Services.Web />, desc: 'تجربة مستخدم سلسة تحول الزوار لعملاء.' }
            ].map((service, idx) => (
              <Reveal key={idx} delay={idx * 100}>
                <div className="bg-bg-surface border border-white/5 p-8 rounded-3xl hover:border-brand/50 transition-all group hover:-translate-y-2 duration-300">
                  <div className="text-brand mb-6 transform group-hover:scale-110 transition-transform">{service.icon}</div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/50 leading-relaxed">{service.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Why HIZOU --- */}
      <section id="why-hizou" className="py-24 bg-gradient-to-b from-bg-deep to-bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-20">
              <h2 className="text-4xl font-black mb-4">لماذا HIZOU؟</h2>
              <p className="text-white/40">نحن لا نبيع وعوداً، بل نصنع واقعاً رقمياً جديداً</p>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { title: 'نتائج مضمونة بالأرقام', desc: 'نعتمد على البيانات والتحليلات لقياس كل خطوة وتحقيق أهدافك البيعية.' },
              { title: 'فريق متخصص لكل قطاع', desc: 'خبراء في كل مجال يعملون معاً لتقديم حلول متكاملة ومبتكرة.' },
              { title: 'تواصل مباشر ومستمر', desc: 'نحن شركاؤك في النجاح، تواصل شفاف وتقارير دورية تبقيك في الصورة.' }
            ].map((item, idx) => (
              <Reveal key={idx} delay={idx * 150}>
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand/10 text-brand rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icons.Chevron />
                  </div>
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="text-white/50 leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Case Study --- */}
      <section id="case-study" className="py-24 bg-bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="bg-bg-surface rounded-[40px] overflow-hidden border border-white/5 flex flex-col lg:flex-row">
              <div className="lg:w-1/2 p-12 flex flex-col justify-center">
                <div className="inline-block bg-brand/10 text-brand px-4 py-1 rounded-full text-xs font-bold mb-6 uppercase tracking-widest">
                  دراسة حالة ناجحة
                </div>
                <h2 className="text-3xl md:text-4xl font-black mb-6">متجر إلكتروني في الجزائر</h2>
                <p className="text-white/60 mb-10 leading-relaxed">
                  قمنا بإعادة هيكلة الاستراتيجية الإعلانية وتحسين تجربة المستخدم، مما أدى لنتائج غير مسبوقة في وقت قياسي.
                </p>
                
                <div className="grid grid-cols-3 gap-6 mb-10">
                  <div className="bg-bg-deep/50 p-4 rounded-2xl border border-white/5">
                    <div className="text-2xl font-black text-brand">+280%</div>
                    <div className="text-xs text-white/40">نمو المبيعات</div>
                  </div>
                  <div className="bg-bg-deep/50 p-4 rounded-2xl border border-white/5">
                    <div className="text-2xl font-black text-brand">×4</div>
                    <div className="text-xs text-white/40">عائد الإعلانات</div>
                  </div>
                  <div className="bg-bg-deep/50 p-4 rounded-2xl border border-white/5">
                    <div className="text-2xl font-black text-brand">3</div>
                    <div className="text-xs text-white/40">أشهر فقط</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 border-t border-white/5 pt-8">
                  <img src="https://picsum.photos/seed/avatar1/100/100" alt="Client" className="w-12 h-12 rounded-full grayscale" referrerPolicy="no-referrer" />
                  <div>
                    <div className="text-sm font-bold">"هيزو غيروا مفهومنا عن التسويق، النتائج كانت أسرع مما توقعنا."</div>
                    <div className="text-xs text-white/40 mt-1">مدير المتجر</div>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/2 relative min-h-[400px]">
                <img 
                  src="https://picsum.photos/seed/case/1200/800" 
                  alt="Case Study" 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-50"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-bg-surface via-transparent to-transparent lg:block hidden"></div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Testimonials --- */}
      <section className="py-24 bg-bg-deep">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-4xl font-black mb-4">ماذا يقول عملاؤنا؟</h2>
            </div>
          </Reveal>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="bg-bg-surface p-8 rounded-3xl border border-white/5 relative">
                  <div className="flex gap-1 mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Icons.Star key={s} />)}
                  </div>
                  <p className="text-white/70 mb-8 leading-relaxed italic">
                    "تجربة استثنائية مع فريق هيزو. الاحترافية في التعامل والدقة في المواعيد كانت أهم ما يميزهم، بالإضافة للنتائج المبهرة."
                  </p>
                  <div className="flex items-center gap-4">
                    <img src={`https://picsum.photos/seed/user${i}/100/100`} alt="User" className="w-12 h-12 rounded-full" referrerPolicy="no-referrer" />
                    <div>
                      <div className="font-bold">أحمد محمد</div>
                      <div className="text-xs text-white/40">رائد أعمال</div>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- Final CTA --- */}
      <section id="contact" className="py-24 bg-brand relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
             <path d="M0 100 L100 0 L100 100 Z" fill="white" />
           </svg>
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <Reveal>
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-7xl font-black text-white mb-6">جاهز تنطلق؟ نحن هنا</h2>
              <p className="text-white/80 text-lg">اترك لنا تفاصيل مشروعك وسنتواصل معك خلال 24 ساعة</p>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl">
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icons.Chevron />
                  </div>
                  <h3 className="text-2xl font-bold text-bg-deep mb-2">شكراً لتواصلك!</h3>
                  <p className="text-gray-500">تم استلام طلبك بنجاح، فريقنا سيتواصل معك قريباً جداً.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-bg-deep">الاسم الكامل</label>
                      <input required type="text" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand outline-none text-bg-deep" placeholder="مثال: محمد علي" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold text-bg-deep">البريد الإلكتروني</label>
                      <input required type="email" className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand outline-none text-bg-deep" placeholder="name@company.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-bg-deep">نوع المشروع</label>
                    <select className="w-full px-6 py-4 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-brand outline-none text-bg-deep appearance-none">
                      <option>إدارة سوشيال ميديا</option>
                      <option>إعلانات ممولة</option>
                      <option>هوية بصرية</option>
                      <option>تطوير موقع إلكتروني</option>
                      <option>أخرى</option>
                    </select>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full bg-brand text-white py-5 rounded-2xl font-black text-xl hover:brightness-110 transition-all disabled:opacity-50"
                  >
                    {formStatus === 'submitting' ? 'جاري الإرسال...' : 'أرسل الطلب الآن'}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </section>

      {/* --- Footer --- */}
      <footer className="bg-[#111] pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2">
              <div className="text-3xl font-bold tracking-tighter flex items-center gap-1 mb-6">
                <span className="text-white">H</span>
                <span className="text-brand">✦</span>
                <span className="text-white">IZOU</span>
              </div>
              <p className="text-white/40 max-w-sm leading-relaxed">
                وكالة HIZOU هي شريكك الاستراتيجي للنمو في العصر الرقمي. نحن نجمع بين الإبداع والبيانات لتحقيق نتائج ملموسة.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6">روابط سريعة</h4>
              <ul className="space-y-4 text-white/40 text-sm">
                <li><a href="#" className="hover:text-brand transition-colors">الرئيسية</a></li>
                <li><a href="#services" className="hover:text-brand transition-colors">خدماتنا</a></li>
                <li><a href="#case-study" className="hover:text-brand transition-colors">أعمالنا</a></li>
                <li><a href="#contact" className="hover:text-brand transition-colors">تواصل معنا</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6">تابعنا</h4>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Icons.Social.Instagram /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Icons.Social.Facebook /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Icons.Social.TikTok /></a>
                <a href="#" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand hover:text-white transition-all"><Icons.Social.LinkedIn /></a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/5 pt-10 text-center text-white/20 text-xs">
            © 2025 HIZOU agency — جميع الحقوق محفوظة
          </div>
        </div>
      </footer>

      {/* --- Floating Elements --- */}
      <a 
        href="https://wa.me/yournumber" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform"
      >
        <Icons.Social.WhatsApp />
      </a>

      {showBackToTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-28 right-8 z-50 bg-bg-surface text-white p-4 rounded-full border border-white/10 shadow-2xl hover:bg-brand transition-colors"
        >
          <Icons.Chevron />
        </button>
      )}
    </div>
  );
}
