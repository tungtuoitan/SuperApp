/**
 * API Configuration
 * Centralized API endpoints and base URL configuration
 *
 * Phase 7: Security improved - no hardcoded production IPs
 * Use .env.local for production URLs (gitignored)
 */

const getBaseUrl = (): string => {
  // Always use environment variable
  // For production, set REACT_APP_API_URL in .env.local (gitignored)
  if (process.env.REACT_APP_API_URL) {
    return process.env.REACT_APP_API_URL;
  }

  // Safe development fallback
  if (window.location.hostname === 'localhost') {
    return 'https://localhost:5000';
  }

  // Default to HTTPS for security
  console.warn('REACT_APP_API_URL not set. Using default HTTPS endpoint.');
  return 'https://localhost:5000';
};

export const API_CONFIG = {
  baseURL: getBaseUrl(),
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
} as const;

export const API_ENDPOINTS = {
  auth: {
    login: '/auth/login',
    exchangeToken: '/auth/exchangeAuthorizationCodeForToken',
  },
  notes: {
    getAll: '/Notes/GetNotes',
    createOrUpdate: '/Notes/IuNote',
  },
  events: {
    getAll: '/Ev/GetEvs',
    createOrUpdate: '/Ev/IuEv',
  },
  srs: {
    getAll: '/SRs/GetSRs',
  },
  prs: {
    getAll: '/Pr/GetPrs',
    createOrUpdate: '/Pr/IuPr',
  },
  folders: {
    getAll: '/Fo/GetFos',
    createOrUpdate: '/Fo/IuFos',
  },
  userProfile: {
    get: '/UserProfile/GetUserProfileJson',
    createOrUpdate: '/UserProfile/IuUserProfile',
  },
  filters: {
    getPrParentIds: '/PrFilter/GetPrParentIds',
  },
} as const;
