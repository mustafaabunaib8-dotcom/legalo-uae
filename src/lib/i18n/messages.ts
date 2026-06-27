/**
 * Client-side message dictionaries for the LanguageProvider.
 *
 * Server components use next-intl (see `messages/*.json`). Client components
 * that need translations outside the server-request boundary — e.g. toast
 * messages rendered imperatively, aria-labels in interactive providers, or
 * the Navbar/Footer before the intl provider has hydrated — can consume the
 * same keys from this file via `useLanguage().t(key)`.
 *
 * Dot-path keys are supported: t('hero.headline') → messages.hero.headline.
 */

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const messages: Record<string, any> = {
  en: {
    common: {
      brand: 'Legalo',
      tagline: 'The trusted UAE legal marketplace',
      signIn: 'Sign in',
      signUp: 'Create account',
      getStarted: 'Get started',
      learnMore: 'Learn more',
      contact: 'Contact us',
      submit: 'Submit',
      cancel: 'Cancel',
      save: 'Save',
      delete: 'Delete',
      edit: 'Edit',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      close: 'Close',
      loading: 'Loading…',
      search: 'Search',
      language: 'Language',
      theme: 'Theme',
      light: 'Light',
      dark: 'Dark',
      system: 'System',
      menu: 'Menu',
      trustLine: 'Trusted by 2,400+ licensed lawyers across the UAE',
      skipToContent: 'Skip to content',
      openMenu: 'Open menu',
      closeMenu: 'Close menu',
    },
    nav: {
      findLawyer: 'Find a lawyer',
      services: 'Legal services',
      business: 'For business',
      pricing: 'Pricing',
      about: 'About Legalo',
      legalResources: 'Legal resources',
    },
    hero: {
      headline: 'Legal help, built for the UAE',
      subheadline:
        'Book regulated lawyers, review fixed-fee services, and get your matter moving — in Arabic or English.',
      ctaPrimary: 'Find a lawyer',
      ctaSecondary: 'See how it works',
    },
    footer: {
      product: 'Product',
      company: 'Company',
      legal: 'Legal',
      connect: 'Connect',
      regulatory:
        'Legalo is a licensed marketplace platform operated in the United Arab Emirates. We do not provide legal advice; all services listed are delivered by independent, RCU-registered legal professionals.',
    },
    forms: {
      email: 'Email address',
      password: 'Password',
      fullName: 'Full name',
      phone: 'Phone number',
      required: 'Required',
    },
    errors: {
      generic: 'Something went wrong. Please try again.',
      network: "We couldn't reach Legalo. Check your connection.",
      notFound: "We couldn't find that page.",
    },
    empty: {
      noResults: 'No results found',
      noResultsDescription: 'Try adjusting your filters or search terms.',
    },
    home: {
      marketplaceLabel: 'LEGAL MARKETPLACE — UAE',
      heroHeadline: 'Find licensed legal professionals you can trust.',
      heroSubtitle:
        'Book regulated lawyers, review fixed-fee services, and get your matter moving — in Arabic or English, across all seven emirates.',
      ctaGetStarted: 'Get Started',
      forProviders: 'For Providers',
      verifiedFirms: 'Verified Firms',
      escrowProtection: 'Escrow Protection',
      instantMatch: 'Instant Match',
      sixLanguages: '6 Languages',
      pillarsLabel: 'OUR SERVICE PILLARS',
      pillarsHeading: 'Everything legal, under one trusted roof.',
      pillarLegalTitle: 'Legal Services',
      pillarLegalDesc:
        'Corporate, family, property, employment and disputes — matched with vetted specialists who know your jurisdiction.',
      pillarGovTitle: 'Government & PRO',
      pillarGovDesc:
        'Trade licences, visas, attestations and every government process, handled by registered PROs with fixed fees.',
      pillarTranslationTitle: 'Legal Translation',
      pillarTranslationDesc:
        'Certified translations, notarisation and attestation — MOJ-approved translators in all six official languages.',
      explore: 'Explore',
      howItWorksLabel: 'HOW IT WORKS',
      howItWorksHeading: 'From brief to brief. In four steps.',
      stepOneTitle: 'Describe Your Situation',
      stepOneDesc: 'Share a few details — confidential, takes under two minutes.',
      stepTwoTitle: 'Get Instant Match',
      stepTwoDesc: 'Our engine shortlists licensed firms who specialise in exactly this.',
      stepThreeTitle: 'Chat & Connect',
      stepThreeDesc: 'In-app messaging, voice notes, file sharing — everything stays on the record.',
      stepFourTitle: 'Secure & Transparent',
      stepFourDesc: 'Escrow-protected fees, fixed quotes, and receipts you can file.',
      featuredFirmsLabel: 'FEATURED FIRMS',
      viewAllFirms: 'View All',
      statFirms: '500+',
      statFirmsLabel: 'Verified Firms',
      statCases: '10,000+',
      statCasesLabel: 'Cases Resolved',
      statRating: '4.8★',
      statRatingLabel: 'Average Rating',
      closingHeading: 'Ready to find your trusted legal partner?',
      closingSubtitle: 'Join thousands who have already moved their legal matters forward with Legalo.',
    },
  },
  ar: {
    common: {
      brand: 'ليجالو',
      tagline: 'السوق القانوني الموثوق في الإمارات',
      signIn: 'تسجيل الدخول',
      signUp: 'إنشاء حساب',
      getStarted: 'ابدأ الآن',
      learnMore: 'اعرف المزيد',
      contact: 'تواصل معنا',
      submit: 'إرسال',
      cancel: 'إلغاء',
      save: 'حفظ',
      delete: 'حذف',
      edit: 'تعديل',
      back: 'رجوع',
      next: 'التالي',
      previous: 'السابق',
      close: 'إغلاق',
      loading: 'جارٍ التحميل…',
      search: 'بحث',
      language: 'اللغة',
      theme: 'المظهر',
      light: 'فاتح',
      dark: 'داكن',
      system: 'النظام',
      menu: 'القائمة',
      trustLine: '+2400 محامٍ موثّق في الإمارات',
      skipToContent: 'انتقل إلى المحتوى',
      openMenu: 'فتح القائمة',
      closeMenu: 'إغلاق القائمة',
    },
    nav: {
      findLawyer: 'ابحث عن محامٍ',
      services: 'الخدمات القانونية',
      business: 'للأعمال',
      pricing: 'الأسعار',
      about: 'عن ليجالو',
      legalResources: 'الموارد القانونية',
    },
    hero: {
      headline: 'مساعدة قانونية مصممة للإمارات',
      subheadline:
        'احجز محامين منظّمين، راجع خدمات برسوم ثابتة، وابدأ قضيتك — بالعربية أو الإنجليزية.',
      ctaPrimary: 'ابحث عن محامٍ',
      ctaSecondary: 'اكتشف كيف يعمل',
    },
    footer: {
      product: 'المنتج',
      company: 'الشركة',
      legal: 'قانوني',
      connect: 'تواصل',
      regulatory:
        'ليجالو منصة سوق مرخصة تعمل في دولة الإمارات العربية المتحدة. لا نقدم استشارات قانونية مباشرة؛ جميع الخدمات المُدرجة يقدمها محامون مستقلون مسجلون.',
    },
    forms: {
      email: 'البريد الإلكتروني',
      password: 'كلمة المرور',
      fullName: 'الاسم الكامل',
      phone: 'رقم الهاتف',
      required: 'مطلوب',
    },
    errors: {
      generic: 'حدث خطأ ما. يرجى المحاولة مرة أخرى.',
      network: 'تعذّر الاتصال بليجالو. تحقق من اتصالك.',
      notFound: 'تعذّر العثور على هذه الصفحة.',
    },
    empty: {
      noResults: 'لا توجد نتائج',
      noResultsDescription: 'جرّب تعديل عوامل التصفية أو مصطلحات البحث.',
    },
    home: {
      marketplaceLabel: 'السوق القانوني — الإمارات',
      heroHeadline: 'ابحث عن محامين مرخّصين يمكنك الوثوق بهم.',
      heroSubtitle:
        'احجز محامين منظّمين، راجع خدمات برسوم ثابتة، وابدأ قضيتك — بالعربية أو الإنجليزية، في جميع الإمارات السبع.',
      ctaGetStarted: 'ابدأ الآن',
      forProviders: 'للمزودين',
      verifiedFirms: 'مكاتب موثّقة',
      escrowProtection: 'حماية الضمان',
      instantMatch: 'مطابقة فورية',
      sixLanguages: '6 لغات',
      pillarsLabel: 'أعمدة خدماتنا',
      pillarsHeading: 'كل ما تحتاجه قانونيًا، تحت سقف واحد موثوق.',
      pillarLegalTitle: 'الخدمات القانونية',
      pillarLegalDesc:
        'الشركات، الأسرة، العقارات، التوظيف والنزاعات — نطابقك مع متخصصين معتمدين يعرفون ولايتك القضائية.',
      pillarGovTitle: 'الحكومية ومندوبو الخدمات',
      pillarGovDesc:
        'الرخص التجارية، التأشيرات، التصديقات وكل العمليات الحكومية، يتولاها مندوبون مسجلون برسوم ثابتة.',
      pillarTranslationTitle: 'الترجمة القانونية',
      pillarTranslationDesc:
        'ترجمات معتمدة، توثيق وتصديق — مترجمون معتمدون من وزارة العدل بجميع اللغات الرسمية الست.',
      explore: 'استكشف',
      howItWorksLabel: 'كيف يعمل',
      howItWorksHeading: 'من الموجز إلى القضية. في أربع خطوات.',
      stepOneTitle: 'صِف حالتك',
      stepOneDesc: 'شارك بعض التفاصيل — سري وتأخذ أقل من دقيقتين.',
      stepTwoTitle: 'احصل على مطابقة فورية',
      stepTwoDesc: 'يُوجّهك محركنا إلى مكاتب مرخّصة متخصصة في حالتك بالتحديد.',
      stepThreeTitle: 'تحدّث وتواصل',
      stepThreeDesc: 'مراسلة داخل التطبيق، ملاحظات صوتية، مشاركة ملفات — كل شيء موثّق.',
      stepFourTitle: 'آمن وشفاف',
      stepFourDesc: 'رسوم محمية بضمان، عروض أسعار ثابتة، وإيصالات يمكنك الاحتفاظ بها.',
      featuredFirmsLabel: 'المكاتب المميزة',
      viewAllFirms: 'عرض الكل',
      statFirms: '+500',
      statFirmsLabel: 'مكتب موثّق',
      statCases: '+10,000',
      statCasesLabel: 'قضية محسومة',
      statRating: '4.8★',
      statRatingLabel: 'متوسط التقييم',
      closingHeading: 'هل أنت مستعد للعثور على شريكك القانوني الموثوق؟',
      closingSubtitle: 'انضم إلى الآلاف الذين دفعوا قضاياهم للأمام مع ليجالو.',
    },
  },
} as const satisfies Record<'en' | 'ar', Dict>;

export type SupportedLanguage = keyof typeof messages;

/** Resolve a dot-path key against a dictionary. Returns the key itself if missing. */
export function resolvePath(root: Dict, path: string): string {
  const segments = path.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cursor: any = root;
  for (const segment of segments) {
    if (cursor == null || typeof cursor !== 'object' || !(segment in cursor)) {
      return path;
    }
    cursor = cursor[segment];
  }
  return typeof cursor === 'string' ? cursor : path;
}
