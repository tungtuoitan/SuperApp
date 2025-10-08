/**
 * Notes API Service
 */

import { apiClient } from './apiClient';
import { API_ENDPOINTS } from '../../config/api.config';
import { Note, GetNotesParams, NoteCreateUpdateResponse } from '../../types';

export const notesApi = {
  /**
   * Get notes from the API
   */
  async getNotes(params: GetNotesParams = {}): Promise<Note[]> {
    const searchParams: Record<string, string | boolean> = {};

    if (params.getAll !== undefined) {
      searchParams.getAll = params.getAll;
    }
    if (params.searchText) {
      searchParams.searchText = params.searchText;
    }
    if (params.types) {
      searchParams.types = params.types;
    }
    if (params.tags) {
      searchParams.tags = params.tags;
    }
    if (params.createdBy) {
      searchParams.createdBy = params.createdBy;
    }

    const data = await apiClient.get<Note[]>(API_ENDPOINTS.notes.getAll, searchParams);

    // Convert date strings to Date objects
    return data.map((note) => ({
      ...note,
      createdAt: new Date(note.createdAt),
      updatedAt: note.updatedAt ? new Date(note.updatedAt) : undefined,
    }));
  },

  /**
   * Insert or Update a note
   */
  async createOrUpdateNote(note: Note): Promise<NoteCreateUpdateResponse> {
    const formData = new FormData();

    formData.append('noteId', note.noteId?.toString() || '0');
    formData.append('name', note.name || '');
    formData.append('type', note.type || '');
    formData.append('description', note.description || '');
    formData.append('tags', note.tags || '');
    formData.append('createdBy', note.createdBy || '');
    formData.append('isArchived', note.isArchived?.toString() || 'false');

    const response = await apiClient.post<NoteCreateUpdateResponse>(
      API_ENDPOINTS.notes.createOrUpdate,
      formData
    );

    return response;
  },
};
