/**
 * Domain Models
 * Core data types used throughout the application
 */

export interface Note {
  noteId: number;
  name: string;
  description?: string;
  tags?: string;
  type?: string;
  createdBy?: string;
  createdAt: Date;
  updatedAt?: Date;
  isArchived: boolean;
}

export interface User {
  userName: string;
  password: string;
  userToken: string;
}

export interface NavigationModule {
  id: string;
  name: string;
  code: string;
  link: string;
  hide: boolean;
  open: boolean | null | undefined;
  active: boolean;
  hover: boolean;
}

export interface AutoCompleteOption {
  id: number;
  code: string;
  desc: string;
  active?: boolean;
  type?: string;
  longDesc?: string;
  level?: number;
}
