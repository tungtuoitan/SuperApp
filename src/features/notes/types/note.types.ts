/**
 * Notes Feature Types
 * Domain models and DTOs for the notes feature
 */

// Domain Model (what we use in the app)
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

// API DTOs (what backend sends/receives)
export interface NoteDTO {
    noteId: number;
    name: string;
    description?: string;
    tags?: string;
    type?: string;
    createdBy?: string;
    createdAt: string; // ISO string
    updatedAt?: string; // ISO string
    isArchived: boolean;
}

// Request DTOs
export interface CreateNoteDTO {
    name: string;
    description?: string;
    tags?: string;
    type?: string;
}

export interface UpdateNoteDTO {
    name?: string;
    description?: string;
    tags?: string;
    type?: string;
    isArchived?: boolean;
}

// Query parameters
export interface GetNotesParams {
    page?: number;
    pageSize?: number;
    searchText?: string;
    getAll?: boolean;
    type?: string;
    isArchived?: boolean;
}

// API Response wrapper
export interface NotesResponse {
    data: NoteDTO[];
    success: boolean;
    message?: string;
}

export interface NoteResponse {
    data: NoteDTO;
    success: boolean;
    message?: string;
}