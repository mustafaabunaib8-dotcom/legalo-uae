import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'ar'] as const;

export async function getMessages(locale: string) {
  try {
    const messages = await import(`../../messages/${locale}.json`);
    return messages.default;
  } catch (error) {
    console.warn(`Failed to load messages for locale: ${locale}`);
    return {};
  }
}

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale || 'en';
  
  if (!locales.includes(locale as any)) {
    notFound();
  }

  return {
    locale,
    messages: await getMessages(locale),
  };
});
