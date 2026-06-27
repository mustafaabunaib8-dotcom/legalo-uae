import type { EmirateInfo } from '../types';

export const emirates: EmirateInfo[] = [
  {
    id: 'Dubai',
    name_en: 'Dubai',
    name_ar: 'دبي',
    abbreviation: 'DXB',
    flag: '🇦🇪'
  },
  {
    id: 'Abu Dhabi',
    name_en: 'Abu Dhabi',
    name_ar: 'أبوظبي',
    abbreviation: 'AUH',
    flag: '🇦🇪'
  },
  {
    id: 'Sharjah',
    name_en: 'Sharjah',
    name_ar: 'الشارقة',
    abbreviation: 'SHJ',
    flag: '🇦🇪'
  },
  {
    id: 'Ras Al Khaimah',
    name_en: 'Ras Al Khaimah',
    name_ar: 'رأس الخيمة',
    abbreviation: 'RAK',
    flag: '🇦🇪'
  },
  {
    id: 'Ajman',
    name_en: 'Ajman',
    name_ar: 'عجمان',
    abbreviation: 'AJM',
    flag: '🇦🇪'
  },
  {
    id: 'Fujairah',
    name_en: 'Fujairah',
    name_ar: 'الفجيرة',
    abbreviation: 'FUJ',
    flag: '🇦🇪'
  },
  {
    id: 'Umm Al Quwain',
    name_en: 'Umm Al Quwain',
    name_ar: 'أم القيوين',
    abbreviation: 'UAQ',
    flag: '🇦🇪'
  },
  {
    id: 'DIFC',
    name_en: 'Dubai International Financial Centre',
    name_ar: 'مركز دبي المالي العالمي',
    abbreviation: 'DIFC',
    flag: '🏦'
  },
  {
    id: 'ADGM',
    name_en: 'Abu Dhabi Global Market',
    name_ar: 'سوق أبوظبي العالمي',
    abbreviation: 'ADGM',
    flag: '🏛️'
  }
];

export const onshoreEmirates = emirates.filter(e => e.id !== 'DIFC' && e.id !== 'ADGM');
export const freeZoneEmirates = emirates.filter(e => e.id === 'DIFC' || e.id === 'ADGM');

export const getEmirateById = (id: string): EmirateInfo | undefined => {
  return emirates.find(e => e.id === id);
};
