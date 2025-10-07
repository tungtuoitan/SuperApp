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

export interface GetNotesParams {
  getAll?: boolean;
  searchText?: string;
  types?: string;
  tags?: string;
  createdBy?: string;
}