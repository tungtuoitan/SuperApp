/**
 * Locale Utilities
 */

import { LOCALES, Locale } from '../config/app.config';

/**
 * Get the user's locale language based on browser settings
 */
export const getLocaleLanguage = (): Locale => {
  const defaultLocale: Locale = 'en-us';
  const locales = Object.keys(LOCALES) as Locale[];

  try {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    const localDateString = new Date().toLocaleDateString();

    for (const locale of locales) {
      const formattedDate = new Date().toLocaleDateString(locale, options);
      if (localDateString === formattedDate) {
        return locale;
      }
    }
  } catch (error) {
    console.error('Error detecting locale:', error);
  }

  return defaultLocale;
};
