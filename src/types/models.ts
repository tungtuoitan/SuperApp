/**
 * Domain Models
 * Core data types used throughout the application
 */

/**
 * Note interface representing a user's note/memo entry
 * Used for note management, creation, editing, and display
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

/**
 * User interface representing authenticated user data
 * Contains user credentials and authentication token
 */
export interface User {
    userName: string;
    password: string;
    userToken: string;
}

/**
 * NavigationModule interface for sidebar navigation menu items
 * Defines structure for navigation modules with state and behavior properties
 */
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

/**
 * AutoCompleteOption interface for dropdown/autocomplete components
 * Generic option structure used across various form controls
 */
export interface AutoCompleteOption {
    id: number;
    code: string;
    desc: string;
    active?: boolean;
    type?: string;
    longDesc?: string;
    level?: number;
}
