import { cn } from '@/utils/classname';
import Head from 'next/head';
import { Fragment } from 'react';
import Header from './Header';
import { useTheme } from '@/context/ThemeContext';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { isDarkMode, setIsDarkMode } = useTheme();

  return (
    <Fragment>
      <Head>
        <title>BLOG Narsys</title>
      </Head>
      <Header isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <div className={cn(['pt-16 pb-8 px-4'])}>{children}</div>
    </Fragment>
  );
}
