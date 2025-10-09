/**
 * Hooks Index
 * Exports new pattern: Helper hooks (business logic) work with Store pattern (state management)
 */

// New Helper Hooks - Provide functions only, use Store for state
export * from './useAuthHelpers';
export * from './useDialogHelpers';
export * from './useApiHelpers';
export * from './useNoteHelpers';

// Old hooks renamed to *.old.ts for reference
// export * from './useAuth.old';
// export * from './useDialog.old';
// export * from './useApi.old';
