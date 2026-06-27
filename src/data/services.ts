import type { ServiceCatalog } from '../types';

export const services: ServiceCatalog = {
  personal: [
    {
      id: 'family',
      name_en: 'Family & Personal Status',
      name_ar: 'الأحوال الشخصية',
      icon: 'Users'
    },
    {
      id: 'wills',
      name_en: 'Wills & Inheritance',
      name_ar: 'الوصايا والمواريث',
      icon: 'ScrollText'
    },
    {
      id: 'injury',
      name_en: 'Injury & Compensation',
      name_ar: 'الإصابات والتعويضات',
      icon: 'HeartPulse'
    },
    {
      id: 'property',
      name_en: 'Property & Tenant Disputes',
      name_ar: 'النزاعات العقارية والإيجارية',
      icon: 'Home'
    },
    {
      id: 'employment-issues',
      name_en: 'Employment Issues',
      name_ar: 'قضايا العمل',
      icon: 'Briefcase'
    },
    {
      id: 'criminal',
      name_en: 'Criminal Defense',
      name_ar: 'الدفاع الجنائي',
      icon: 'Shield'
    },
    {
      id: 'harassment',
      name_en: 'Online Harassment',
      name_ar: 'التحرش الإلكتروني',
      icon: 'AlertTriangle'
    },
    {
      id: 'rental',
      name_en: 'Rental/Ejari',
      name_ar: 'الإيجار/إيجاري',
      icon: 'FileText'
    },
    {
      id: 'translation',
      name_en: 'Certified Legal Translation',
      name_ar: 'الترجمة القانونية المعتمدة',
      icon: 'Languages'
    },
    {
      id: 'attestation',
      name_en: 'Attestation Services',
      name_ar: 'خدمات التصديق',
      icon: 'Stamp'
    },
    {
      id: 'notary',
      name_en: 'Private Notary',
      name_ar: ' كاتب عدل خاص',
      icon: 'PenTool'
    }
  ],
  business: [
    {
      id: 'business-setup',
      name_en: 'Business Setup & Strategy',
      name_ar: 'تأسيس الأعمال والاستراتيجية',
      icon: 'Building2'
    },
    {
      id: 'corporate',
      name_en: 'Corporate Advisory',
      name_ar: 'الاستشارات المؤسسية',
      icon: 'Building'
    },
    {
      id: 'contracts',
      name_en: 'Contracts & Drafting',
      name_ar: 'العقود والصياغة',
      icon: 'FileSignature'
    },
    {
      id: 'employment-hr',
      name_en: 'Employment & HR Legal',
      name_ar: 'قانون العمل والموارد البشرية',
      icon: 'UserCog'
    },
    {
      id: 'disputes',
      name_en: 'Disputes & Recovery/Arbitration',
      name_ar: 'النزاعات والتحصيل/التحكيم',
      icon: 'Scale'
    },
    {
      id: 'banking',
      name_en: 'Banking & Finance',
      name_ar: 'الخدمات المصرفية والمالية',
      icon: 'Landmark'
    },
    {
      id: 'construction',
      name_en: 'Construction & Real Estate Law',
      name_ar: 'قانون البناء والعقارات',
      icon: 'HardHat'
    },
    {
      id: 'insurance',
      name_en: 'Insurance Disputes',
      name_ar: 'النزاعات التأمينية',
      icon: 'ShieldCheck'
    },
    {
      id: 'ip',
      name_en: 'Intellectual Property',
      name_ar: 'الملكية الفكرية',
      icon: 'Lightbulb'
    },
    {
      id: 'white-collar',
      name_en: 'Criminal/White-Collar Defense',
      name_ar: 'الدفاع الجنائي/الجرائم المالية',
      icon: 'Gavel'
    }
  ]
};

export const allServices = [...services.personal, ...services.business];

export const getServiceById = (id: string) => {
  return allServices.find(s => s.id === id);
};
