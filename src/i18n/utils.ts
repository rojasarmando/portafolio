import { en } from './en';
import { es } from './es';

export type Lang = 'en' | 'es';
export const languages = ['en', 'es'] as const;
export const defaultLang: Lang = 'en';
export type Dictionary = typeof en;

export function t(lang: Lang): Dictionary {
  return (lang === 'es' ? es : en) as Dictionary;
}

export function otherLang(lang: Lang): Lang {
  return lang === 'en' ? 'es' : 'en';
}

export function langPath(lang: Lang): string {
  return lang === 'en' ? '/' : '/es/';
}
