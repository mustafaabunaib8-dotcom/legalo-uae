import { useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Providers } from '../providers';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  return (
    <Providers locale={locale} messages={messages}>
      {children}
    </Providers>
  );
}
