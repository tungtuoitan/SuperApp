/**
 * Application Configuration
 * App-wide settings and constants
 */

export const APP_CONFIG = {
  name: 'SuperApp',
  version: '0.1.0',
  environment: process.env.REACT_APP_ENVIRONMENT || process.env.NODE_ENV || 'development',
  enableLogging: process.env.REACT_APP_ENABLE_LOGGING === 'true',
  enableDarkMode: process.env.REACT_APP_ENABLE_DARK_MODE === 'true',
} as const;

export const ACCESS_RIGHTS = {
  finShark: 'finShark',
  learnCSharp: 'learnCSharp',
  nothing: 'nothing',
} as const;

export const LOCALES = {
  'en-au': 'en-au',
  'en-ca': 'en-ca',
  'en-gb': 'en-gb',
  'en-ie': 'en-ie',
  'en-nz': 'en-nz',
  'en-us': 'en-us',
  'nl-be': 'nl-be',
  'nl': 'nl',
  'sk': 'sk',
  'cs': 'cs',
  'zh-cn': 'zh-cn',
  'zh-hk': 'zh-hk',
  'zh-tw': 'zh-tw',
  'ja': 'ja',
  'fr-ca': 'fa-ca',
  'fr-ch': 'fa-ch',
  'fr': 'fr',
  'vi-vn': 'vi-vn',
} as const;

export type Locale = keyof typeof LOCALES;
