import { Note, GetNotesParams } from './NoteTypes';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://localhost:5000'; // Adjust this to your API URL

export const notesApi = {
  /**
   * Get notes from the API
   */
  async getNotes(params: GetNotesParams = {}): Promise<Note[]> {
    try {
      const searchParams = new URLSearchParams();
      
      if (params.getAll !== undefined) {
        searchParams.append('getAll', params.getAll.toString());
      }
      if (params.searchText) {
        searchParams.append('searchText', params.searchText);
      }
      if (params.types) {
        searchParams.append('types', params.types);
      }
      if (params.tags) {
        searchParams.append('tags', params.tags);
      }
      if (params.createdBy) {
        searchParams.append('createdBy', params.createdBy);
      }

      const url = `${API_BASE_URL}/Notes/GetNotes?${searchParams.toString()}`;
      
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add authorization header if needed
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      // Convert date strings to Date objects
      return data.map((note: any) => ({
        ...note,
        createdAt: new Date(note.createdAt),
        updatedAt: note.updatedAt ? new Date(note.updatedAt) : undefined,
      }));
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  },

  /**
   * Insert or Update a note
   */
  async iuNote(note: Note): Promise<any> {
    try {
      const formData = new FormData();

      // Append all note fields to FormData
      formData.append('noteId', note.noteId?.toString() || '0');
      formData.append('name', note.name || '');
      formData.append('type', note.type || '');
      formData.append('description', note.description || '');
      formData.append('tags', note.tags || '');
      formData.append('createdBy', note.createdBy || '');
      formData.append('isArchived', note.isArchived?.toString() || 'false');

      const url = `${API_BASE_URL}/Notes/IuNote`;

      const response = await fetch(url, {
        method: 'POST',
        body: formData,
        headers: {
          // Don't set Content-Type for FormData - browser will set it with boundary
          // 'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  },
};

export default notesApi;