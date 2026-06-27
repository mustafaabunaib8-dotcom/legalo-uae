import { Language } from '@/types';

// Translation dictionaries (English and Arabic)
// In production, load from JSON files or API

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    'app.name': 'Legalo',
    'app.tagline': 'Find licensed legal professionals you can trust',
    
    // Navigation
    'nav.home': 'Home',
    'nav.find-lawyer': 'Find a Lawyer',
    'nav.for-providers': 'For Providers',
    'nav.dashboard': 'Dashboard',
    'nav.admin': 'Admin',
    'nav.login': 'Sign In',
    'nav.logout': 'Sign Out',
    
    // Hero
    'hero.title': 'Find licensed legal professionals you can trust',
    'hero.subtitle': 'Connect with verified lawyers, legal consultants, notaries and translators across the UAE. Transparent pricing. Structured services. Clear outcomes.',
    'hero.cta.get-started': 'Get Started',
    'hero.cta.for-providers': 'For Providers',
    
    // Trust Bar
    'trust.verified': '✓ Verified Firms',
    'trust.escrow': '✓ Escrow Protection',
    'trust.match': '✓ Instant Match',
    'trust.languages': '✓ 6 Languages',
    
    // Services
    'services.title': 'Our Service Pillars',
    'services.legal': 'Legal Services',
    'services.legal.desc': 'Family, business, employment, disputes, criminal, IP, banking, real estate',
    'services.gov': 'Government & PRO Services',
    'services.gov.desc': 'Ejari, attestation, notary services',
    'services.translation': 'Legal Translation',
    'services.translation.desc': 'Certified translation services',
    
    // How it works
    'how-it-works.title': 'How It Works',
    'how-it-works.step1.title': 'Describe Your Situation',
    'how-it-works.step1.desc': 'Tell us about your legal matter using our AI-powered intake',
    'how-it-works.step2.title': 'Get Instant Match',
    'how-it-works.step2.desc': 'We instantly match you with up to 3 verified firms',
    'how-it-works.step3.title': 'Chat & Connect',
    'how-it-works.step3.desc': 'Start real-time chat with your matched firms',
    'how-it-works.step4.title': 'Secure & Transparent',
    'how-it-works.step4.desc': 'Payments protected with escrow throughout',
    
    // Footer
    'footer.neutral-broker': 'Legalo is a neutral marketplace, not a law firm, and does not provide legal advice.',
    'footer.rights': '© 2026 Legalo. All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
    
    // Auth
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.name': 'Full Name',
    'auth.login': 'Sign In',
    'auth.signup': 'Create Account',
    'auth.forgot': 'Forgot Password?',
    'auth.or': 'or continue with',
    'auth.google': 'Google',
    
    // Dashboard
    'dashboard.welcome': 'Welcome back',
    'dashboard.stats.active-cases': 'Active Cases',
    'dashboard.stats.messages': 'Messages',
    'dashboard.stats.documents': 'Documents',
    'dashboard.stats.earnings': 'Total Earned',
    'dashboard.recent-cases': 'Recent Cases',
    'dashboard.no-cases': 'No cases yet',
    
    // Cases
    'case.status.open': 'Open',
    'case.status.matched': 'Matched',
    'case.status.quoted': 'Quoted',
    'case.status.active': 'Active',
    'case.status.completed': 'Completed',
    'case.status.cancelled': 'Cancelled',
    
    // Firms
    'firm.verified': 'Verified',
    'firm.responds-in': 'Responds in',
    'firm.years-exp': 'years experience',
    'firm.request-match': 'Request Match',
    'firm.view-profile': 'View Profile',
    
    // Chat
    'chat.placeholder': 'Type your message...',
    'chat.send': 'Send',
    'chat.matched-firms': 'Matched Firms',
    'chat.match-score': 'Match Score',
    'chat.typing': 'typing...',
    
    // Reviews
    'reviews.title': 'Reviews',
    'reviews.no-reviews': 'No reviews yet',
    'reviews.verified': 'Verified Review',
    'reviews.helpful': 'Helpful',
    
    // Errors
    'error.generic': 'Something went wrong',
    'error.not-found': 'Page not found',
    'error.unauthorized': 'Unauthorized access',
    'error.required-field': 'This field is required',
    
    // Loading
    'loading': 'Loading...',
    'loading.matching': 'Finding the best firms for you...',
  },
  
  ar: {
    // Common
    'app.name': 'ليغالو',
    'app.tagline': 'اعثر على محامين مرخّصين تثق بهم',
    
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.find-lawyer': 'ابحث عن محامٍ',
    'nav.for-providers': 'للشركات القانونية',
    'nav.dashboard': 'لوحة التحكم',
    'nav.admin': 'المشرف',
    'nav.login': 'تسجيل الدخول',
    'nav.logout': 'تسجيل الخروج',
    
    // Hero
    'hero.title': 'اعثر على محامين مرخّصين تثق بهم',
    'hero.subtitle': 'تواصل مع محامين ومستشارين قانونيين وموثّقين ومترجمين قانونيين معتمدين في الإمارات. أسعار واضحة. خدمات منظّمة. نتائج محددة.',
    'hero.cta.get-started': 'ابدأ الآن',
    'hero.cta.for-providers': 'للشركات القانونية',
    
    // Trust Bar
    'trust.verified': '✓ مكاتب موثّقة',
    'trust.escrow': '✓ حماية الضمان',
    'trust.match': '✓ مطابقة فورية',
    'trust.languages': '✓ 6 لغات',
    
    // Services
    'services.title': 'أعمدة خدماتنا',
    'services.legal': 'الخدمات القانونية',
    'services.legal.desc': 'الأحوال الشخصية، الأعمال، التوظيف، النزاعات، الجنائية، الملكية الفكرية، البنوك، العقارات',
    'services.gov': 'خدمات الحكومة وإتمام المعاملات',
    'services.gov.desc': 'الإيجار، التصديقات، خدمات التوثيق',
    'services.translation': 'الترجمة القانونية',
    'services.translation.desc': 'خدمات الترجمة المعتمدة',
    
    // How it works
    'how-it-works.title': 'كيف يعمل',
    'how-it-works.step1.title': 'صف وضعك القانوني',
    'how-it-works.step1.desc': 'أخبرنا عن موضوعك القانوني باستخدام نظامنا الذكي',
    'how-it-works.step2.title': 'احصل على مطابقة فورية',
    'how-it-works.step2.desc': 'نطابقك فوراً مع حتى 3 مكاتب موثّقة',
    'how-it-works.step3.title': 'تواصل عبر المحادثة',
    'how-it-works.step3.desc': 'ابدأ محادثة فورية مع المكاتب المطابقة',
    'how-it-works.step4.title': 'آمن وشفاف',
    'how-it-works.step4.desc': 'المدفوعات محمية بالضمان طوال العملية',
    
    // Footer
    'footer.neutral-broker': 'ليغالو منصة محايدة وليست مكتب محاماة، ولا تقدم استشارات قانونية.',
    'footer.rights': '© 2026 ليغالو. جميع الحقوق محفوظة.',
    'footer.terms': 'شروط الخدمة',
    'footer.privacy': 'سياسة الخصوصية',
    
    // Auth
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.name': 'الاسم الكامل',
    'auth.login': 'تسجيل الدخول',
    'auth.signup': 'إنشاء حساب',
    'auth.forgot': 'نسيت كلمة المرور؟',
    'auth.or': 'أو تابع مع',
    'auth.google': 'جوجل',
    
    // Dashboard
    'dashboard.welcome': 'مرحباً بعودتك',
    'dashboard.stats.active-cases': 'القضايا النشطة',
    'dashboard.stats.messages': 'الرسائل',
    'dashboard.stats.documents': 'المستندات',
    'dashboard.stats.earnings': 'إجمالي الأرباح',
    'dashboard.recent-cases': 'القضايا الحديثة',
    'dashboard.no-cases': 'لا توجد قضايا بعد',
    
    // Cases
    'case.status.open': 'مفتوحة',
    'case.status.matched': 'مطابقة',
    'case.status.quoted': 'عرض سعر',
    'case.status.active': 'نشطة',
    'case.status.completed': 'مكتملة',
    'case.status.cancelled': 'ملغاة',
    
    // Firms
    'firm.verified': 'موثّق',
    'firm.responds-in': 'يستجيب خلال',
    'firm.years-exp': 'سنوات خبرة',
    'firm.request-match': 'طلب مطابقة',
    'firm.view-profile': 'عرض الملف',
    
    // Chat
    'chat.placeholder': 'اكتب رسالتك...',
    'chat.send': 'إرسال',
    'chat.matched-firms': 'المكاتب المطابقة',
    'chat.match-score': 'نتيجة المطابقة',
    'chat.typing': 'يكتب...',
    
    // Reviews
    'reviews.title': 'التقييمات',
    'reviews.no-reviews': 'لا توجد تقييمات بعد',
    'reviews.verified': 'تقييم موثّق',
    'reviews.helpful': 'مفيد',
    
    // Errors
    'error.generic': 'حدث خطأ ما',
    'error.not-found': 'الصفحة غير موجودة',
    'error.unauthorized': 'وصول غير مصرّح',
    'error.required-field': 'هذا الحقل مطلوب',
    
    // Loading
    'loading': 'جاري التحميل...',
    'loading.matching': 'نبحث عن أفضل المكاتب لك...',
  },
  
  // Additional languages - minimal translations for now
  ru: {},
  hi: {},
  fil: {},
  zh: {},
};

// Current language (mock - in real app, use context/localStorage)
let currentLanguage: Language = 'en';

// Set current language
export function setLanguage(lang: Language): void {
  currentLanguage = lang;
}

// Get current language
export function getLanguage(): Language {
  return currentLanguage;
}

// Translate function
export function t(key: string, lang?: Language): string {
  const language = lang || currentLanguage;
  
  // Try exact match
  if (translations[language]?.[key]) {
    return translations[language][key];
  }
  
  // Fallback to English
  if (language !== 'en' && translations.en[key]) {
    return translations.en[key];
  }
  
  // Return key if no translation found
  return key;
}

// Get all translations for a language
export function getAllTranslations(lang: Language): Record<string, string> {
  return translations[lang] || {};
}

// Check if translation exists
export function hasTranslation(key: string, lang?: Language): boolean {
  const language = lang || currentLanguage;
  return !!translations[language]?.[key] || !!translations.en[key];
}

// Get available languages
export function getAvailableLanguages(): Language[] {
  return ['en', 'ar', 'ru', 'hi', 'fil', 'zh'];
}

export default {
  t,
  setLanguage,
  getLanguage,
  getAllTranslations,
  hasTranslation,
  getAvailableLanguages,
};
