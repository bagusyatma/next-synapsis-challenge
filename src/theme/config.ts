import { ThemeConfig, theme as antTheme } from 'antd';
import { DM_Sans } from 'next/font/google';

const dmSans = DM_Sans({ subsets: ['latin'], weight: ['100', '300', '400', '700', '900'] });

export const lightTheme: ThemeConfig = {
  algorithm: antTheme.defaultAlgorithm,
  token: {
    colorPrimary: '#0074FF',
    colorInfo: '#0074FF',
    fontFamily: dmSans.style.fontFamily,
  },
};

export const darkTheme: ThemeConfig = {
  algorithm: antTheme.darkAlgorithm,
  token: {
    colorPrimary: '#0074FF',
    colorInfo: '#0074FF',
    fontFamily: dmSans.style.fontFamily,
  },
};
