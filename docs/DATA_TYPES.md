# 🔄 DATA TYPES - Cross-Stack Type Consistency

> **Philosophy**: Data flows through many layers. Keep types consistent to avoid bugs.

---

## 🎯 The Data Flow Journey

```
Database (SQL)
    ↓ (Serialization)
Backend API (C#/.NET)
    ↓ (JSON over HTTP)
Frontend DTO (TypeScript)
    ↓ (Transformation)
Frontend Domain Model (TypeScript)
    ↓ (Display)
UI Components
```

---

## 📅 Date/Time Handling

### The Problem

```typescript
// ❌ INCONSISTENT: Date handling chaos

// Database: datetime
// 2024-01-15 14:30:00

// Backend: DateTime
// DateTime.Parse("2024-01-15T14:30:00")

// API Response: string
// "2024-01-15T14:30:00Z"

// Frontend DTO: string
// createdAt: "2024-01-15T14:30:00Z"

// Frontend Domain: Date?  string? number?
// createdAt: ??? // CONFUSION!
```

### ✅ The Solution: ISO 8601 String Everywhere

#### Database Level (SQL Server)

```sql
-- Use datetime2 for precision
CREATE TABLE Notes (
    NoteId INT PRIMARY KEY,
    Name NVARCHAR(200),
    CreatedAt DATETIME2 NOT NULL DEFAULT GETUTCDATE(),
    UpdatedAt DATETIME2
)

-- Always store in UTC
INSERT INTO Notes (Name, CreatedAt, UpdatedAt)
VALUES ('My Note', GETUTCDATE(), GETUTCDATE())

-- Query always returns datetime2
SELECT CreatedAt FROM Notes
-- Returns: 2024-01-15 14:30:00.0000000
```

#### Backend Level (.NET/C#)

```csharp
// Models/Note.cs
public class Note
{
    public int NoteId { get; set; }
    public string Name { get; set; }
    
    // Store as DateTime in .NET
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

// DTOs/NoteResponse.cs
public class NoteResponse
{
    public int NoteId { get; set; }
    public string Name { get; set; }
    
    // Serialize as ISO 8601 string for API
    [JsonConverter(typeof(IsoDateTimeConverter))]
    public string CreatedAt { get; set; }
    
    [JsonConverter(typeof(IsoDateTimeConverter))]
    public string? UpdatedAt { get; set; }
}

// Service layer transformation
public class NoteService
{
    public async Task<NoteResponse> GetNote(int id)
    {
        var note = await _context.Notes.FindAsync(id);
        
        return new NoteResponse
        {
            NoteId = note.NoteId,
            Name = note.Name,
            // Convert DateTime to ISO 8601 string
            CreatedAt = note.CreatedAt.ToString("o"), // "o" = ISO 8601
            UpdatedAt = note.UpdatedAt?.ToString("o"),
        };
    }
}

// Startup.cs - Configure JSON serialization
services.AddControllers()
    .AddJsonOptions(options =>
    {
        // Always serialize dates as ISO 8601
        options.JsonSerializerOptions.Converters.Add(
            new JsonStringEnumConverter()
        );
        options.JsonSerializerOptions.PropertyNamingPolicy = 
            JsonNamingPolicy.CamelCase;
    });
```

#### Frontend Level (TypeScript)

```typescript
// DTO (what API sends) - Keep as string
export interface NoteDTO {
    noteId: number
    name: string
    createdAt: string // ISO 8601 string from API
    updatedAt: string | null // ISO 8601 string from API
}

// Domain Model (what we use in app) - Convert to Date
export interface Note {
    noteId: number
    name: string
    createdAt: Date // JavaScript Date object
    updatedAt: Date | null // JavaScript Date object
}

// Transformation in service layer
class NoteService {
    private transformNote(dto: NoteDTO): Note {
        return {
            noteId: dto.noteId,
            name: dto.name,
            // Transform ISO string to Date object
            createdAt: new Date(dto.createdAt),
            updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
        }
    }

    async getNotes(): Promise<Note[]> {
        const response = await apiClient.get<{ data: NoteDTO[] }>('/api/notes')
        return response.data.map(this.transformNote)
    }
}

// Display in components
function NoteCard({ note }: { note: Note }) {
    // Format Date object for display
    const formattedDate = new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(note.createdAt)

    return <div>{formattedDate}</div> // "Jan 15, 2024, 02:30 PM"
}
```

### Date Utility Functions

```typescript
// shared/utils/date.ts

/**
 * Format Date to display string
 */
export function formatDate(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(d)
}

/**
 * Format Date to datetime string
 */
export function formatDateTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    }).format(d)
}

/**
 * Format Date to ISO 8601 string (for API requests)
 */
export function toISOString(date: Date): string {
    return date.toISOString()
}

/**
 * Parse ISO string to Date (from API responses)
 */
export function fromISOString(isoString: string): Date {
    return new Date(isoString)
}

/**
 * Get relative time (e.g., "2 hours ago")
 */
export function getRelativeTime(date: Date | string): string {
    const d = typeof date === 'string' ? new Date(date) : date
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000)

    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)} days ago`
    
    return formatDate(d)
}

/**
 * Check if date is valid
 */
export function isValidDate(date: Date | string): boolean {
    const d = typeof date === 'string' ? new Date(date) : date
    return d instanceof Date && !isNaN(d.getTime())
}

/**
 * Convert UTC to local timezone
 */
export function toLocalTime(utcDate: Date): Date {
    return new Date(utcDate.getTime() - utcDate.getTimezoneOffset() * 60000)
}

/**
 * Convert local timezone to UTC
 */
export function toUTC(localDate: Date): Date {
    return new Date(localDate.getTime() + localDate.getTimezoneOffset() * 60000)
}
```

---

## 🔢 Numeric Types

### Integer Handling

```typescript
// Database (SQL)
// INT, BIGINT

// Backend (C#)
public int NoteId { get; set; }        // 32-bit
public long UserId { get; set; }       // 64-bit

// Frontend (TypeScript)
export interface Note {
    noteId: number  // JavaScript number (64-bit float, but safe for integers up to 2^53-1)
    userId: number
}

// ⚠️ Problem: JavaScript number limitations
// Safe integer range: -(2^53 - 1) to (2^53 - 1)
console.log(Number.MAX_SAFE_INTEGER) // 9007199254740991

// ✅ Solution for very large integers (>2^53): Use strings
// Backend
public class NoteResponse 
{
    public int NoteId { get; set; }
    
    [JsonConverter(typeof(JsonStringConverter))]
    public long VeryLargeId { get; set; }  // Serialized as string
}

// Frontend
export interface Note {
    noteId: number
    veryLargeId: string  // Keep as string to preserve precision
}
```

### Decimal/Money Handling

```typescript
// Database (SQL)
// DECIMAL(18,2) for money

// Backend (C#)
public decimal Price { get; set; }
public decimal? Discount { get; set; }

// API Response - Convert to string or number
public class ProductResponse 
{
    // Option 1: Send as string (recommended for exact precision)
    [JsonConverter(typeof(DecimalStringConverter))]
    public string Price { get; set; }  // "123.45"
    
    // Option 2: Send as number (loses some precision)
    public double PriceAsNumber { get; set; }  // 123.45
}

// Frontend (TypeScript)
export interface Product {
    // Option 1: Keep as string for display (recommended)
    price: string  // "123.45"
    
    // Option 2: Convert to number (for calculations)
    priceNumber: number  // 123.45
}

// Display in components
function ProductCard({ product }: { product: Product }) {
    // Parse string to number for calculations
    const price = parseFloat(product.price)
    const tax = price * 0.1
    const total = price + tax

    return (
        <div>
            <p>Price: ${product.price}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <p>Total: ${total.toFixed(2)}</p>
        </div>
    )
}

// Utility for money formatting
export function formatMoney(amount: string | number, currency = 'USD'): string {
    const value = typeof amount === 'string' ? parseFloat(amount) : amount
    
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
    }).format(value)
}
```

---

## 🔤 String & Text Types

### Text Length Consistency

```typescript
// Database (SQL)
NVARCHAR(200)   -- Variable length, max 200 chars
NVARCHAR(MAX)   -- Unlimited
TEXT            -- Large text (deprecated)

// Backend (C#)
[Required]
[MaxLength(200)]
public string Name { get; set; }

[MaxLength(1000)]
public string? Description { get; set; }

// Frontend (TypeScript + Zod)
const noteSchema = z.object({
    name: z.string()
        .min(1, 'Name is required')
        .max(200, 'Name must be less than 200 characters'),
    description: z.string()
        .max(1000, 'Description must be less than 1000 characters')
        .optional(),
})

// Frontend validation
export interface Note {
    name: string        // Max 200 chars
    description?: string // Max 1000 chars
}
```

---

## ✅ Boolean Types

```typescript
// Database (SQL)
BIT  -- 0 or 1

// Backend (C#)
public bool IsArchived { get; set; }
public bool? IsPublished { get; set; }  // Nullable

// API Response
{
    "isArchived": true,    // boolean
    "isPublished": null    // null
}

// Frontend (TypeScript)
export interface Note {
    isArchived: boolean
    isPublished: boolean | null
}

// Component usage
function NoteCard({ note }: { note: Note }) {
    return (
        <div>
            {note.isArchived && <Badge>Archived</Badge>}
            {note.isPublished === true && <Badge>Published</Badge>}
            {note.isPublished === false && <Badge>Draft</Badge>}
            {note.isPublished === null && <Badge>Unknown</Badge>}
        </div>
    )
}
```

---

## 🎨 Enum Types

### Consistent Enum Handling

```typescript
// Database (SQL) - Store as string or int
-- Option 1: String
NoteType NVARCHAR(50) CHECK (NoteType IN ('Meeting', 'Brainstorm', 'Research', 'Bug'))

-- Option 2: Integer with lookup table
NoteTypeId INT FOREIGN KEY REFERENCES NoteTypes(Id)

// Backend (C#)
public enum NoteType
{
    Meeting = 1,
    Brainstorm = 2,
    Research = 3,
    Bug = 4
}

// Serialize as string in API
[JsonConverter(typeof(JsonStringEnumConverter))]
public NoteType Type { get; set; }

// API Response
{
    "type": "Meeting"  // String, not number
}

// Frontend (TypeScript)
export enum NoteType {
    Meeting = 'Meeting',
    Brainstorm = 'Brainstorm',
    Research = 'Research',
    Bug = 'Bug',
}

// Or use union type (preferred)
export type NoteType = 'Meeting' | 'Brainstorm' | 'Research' | 'Bug'

// Const array for iteration
export const NOTE_TYPES = ['Meeting', 'Brainstorm', 'Research', 'Bug'] as const

// Type-safe enum check
function isValidNoteType(value: string): value is NoteType {
    return NOTE_TYPES.includes(value as NoteType)
}

// Usage in component
function NoteTypeSelect() {
    const [type, setType] = useState<NoteType>('Meeting')

    return (
        <Select value={type} onChange={(e) => setType(e.target.value as NoteType)}>
            {NOTE_TYPES.map(t => (
                <MenuItem key={t} value={t}>{t}</MenuItem>
            ))}
        </Select>
    )
}
```

---

## 🆔 ID Types

### Primary Key Consistency

```typescript
// Database (SQL)
-- Auto-increment integer
NoteId INT PRIMARY KEY IDENTITY(1,1)

-- Or UUID/GUID
NoteId UNIQUEIDENTIFIER DEFAULT NEWID()

// Backend (C#)
// Option 1: Integer
public int NoteId { get; set; }

// Option 2: GUID
public Guid NoteId { get; set; }

// API Response
// Integer
{
    "noteId": 123
}

// GUID
{
    "noteId": "550e8400-e29b-41d4-a716-446655440000"
}

// Frontend (TypeScript)
// Integer ID
export interface Note {
    noteId: number
}

// GUID ID
export interface Note {
    noteId: string
}

// Generic ID type
export type ID = number | string

// Type guard
export function isNumericId(id: ID): id is number {
    return typeof id === 'number'
}

export function isGuidId(id: ID): id is string {
    return typeof id === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)
}
```

---

## 📦 Array & Collection Types

```typescript
// Database (SQL) - Normalized
CREATE TABLE NoteTags (
    NoteId INT,
    Tag NVARCHAR(50),
    PRIMARY KEY (NoteId, Tag)
)

// Backend (C#)
public class Note 
{
    public int NoteId { get; set; }
    public List<string> Tags { get; set; } = new();
}

// API Response
{
    "noteId": 1,
    "tags": ["work", "important", "urgent"]  // Array of strings
}

// Frontend (TypeScript)
export interface Note {
    noteId: number
    tags: string[]  // Always array, never null
}

// DTO with null handling
export interface NoteDTO {
    noteId: number
    tags: string[] | null  // Could be null from API
}

// Transform in service
class NoteService {
    private transformNote(dto: NoteDTO): Note {
        return {
            noteId: dto.noteId,
            tags: dto.tags || [],  // Convert null to empty array
        }
    }
}
```

---

## 🔄 Null & Undefined Handling

### Null Safety Strategy

```typescript
// Database (SQL)
-- Use NULL for optional values
Description NVARCHAR(1000) NULL

-- Use NOT NULL for required values
Name NVARCHAR(200) NOT NULL

// Backend (C#)
#nullable enable

public class Note 
{
    // Required - never null
    public string Name { get; set; } = string.Empty;
    
    // Optional - can be null
    public string? Description { get; set; }
    
    // Optional with default
    public bool IsArchived { get; set; } = false;
}

// API Response - null vs undefined
{
    "name": "My Note",           // Required - always present
    "description": null,          // Optional - explicitly null
    // updatedAt is not included    // Optional - undefined (omitted)
}

// Frontend (TypeScript)
export interface Note {
    name: string              // Required - never null/undefined
    description?: string      // Optional - can be undefined
    updatedAt: Date | null    // Nullable - can be null
}

// Null/undefined checks
function NoteCard({ note }: { note: Note }) {
    return (
        <div>
            <h3>{note.name}</h3>
            
            {/* Optional field - use optional chaining */}
            {note.description && <p>{note.description}</p>}
            
            {/* Nullable field - explicit null check */}
            {note.updatedAt !== null && (
                <span>{formatDate(note.updatedAt)}</span>
            )}
        </div>
    )
}

// Utility functions
export function isDefined<T>(value: T | null | undefined): value is T {
    return value !== null && value !== undefined
}

export function isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined
}
```

---

## 🗺️ Type Mapping Reference

### Complete Type Mapping Table

| Database (SQL) | Backend (C#) | API JSON | Frontend DTO | Frontend Domain | Notes |
|----------------|--------------|----------|--------------|-----------------|-------|
| INT | int | number | number | number | Safe up to 2^53-1 |
| BIGINT | long | string/number | string/number | string/number | Use string for >2^53 |
| DECIMAL(18,2) | decimal | string | string | string/number | String for precision |
| NVARCHAR(n) | string | string | string | string | Max length enforced |
| BIT | bool | boolean | boolean | boolean | true/false |
| DATETIME2 | DateTime | string | string | Date | ISO 8601 format |
| UNIQUEIDENTIFIER | Guid | string | string | string | UUID format |
| Enum | enum | string | string | union type | String in JSON |

---

## 🎯 Transformation Layer

### Service Layer Transformation

```typescript
// features/notes/services/noteService.ts
import { apiClient } from '@/lib/api-client'
import type { Note, NoteDTO } from '../types/note.types'

class NoteService {
    /**
     * Transform API DTO to Domain Model
     */
    private transformNote(dto: NoteDTO): Note {
        return {
            // IDs - keep as is
            noteId: dto.noteId,
            
            // Strings - keep as is
            name: dto.name,
            description: dto.description,
            
            // Dates - transform ISO string to Date object
            createdAt: new Date(dto.createdAt),
            updatedAt: dto.updatedAt ? new Date(dto.updatedAt) : null,
            
            // Arrays - handle null
            tags: dto.tags || [],
            
            // Enums - validate
            type: this.validateNoteType(dto.type),
            
            // Booleans - keep as is
            isArchived: dto.isArchived,
        }
    }

    /**
     * Transform Domain Model to DTO for API
     */
    private toDTO(note: Partial<Note>): Partial<NoteDTO> {
        return {
            noteId: note.noteId,
            name: note.name,
            description: note.description,
            
            // Dates - transform Date to ISO string
            createdAt: note.createdAt?.toISOString(),
            updatedAt: note.updatedAt?.toISOString() || null,
            
            // Arrays - keep as is
            tags: note.tags,
            
            // Enums - keep as is
            type: note.type,
            
            // Booleans - keep as is
            isArchived: note.isArchived,
        }
    }

    private validateNoteType(type?: string): NoteType | undefined {
        if (!type) return undefined
        const validTypes: NoteType[] = ['Meeting', 'Brainstorm', 'Research', 'Bug']
        return validTypes.includes(type as NoteType) ? (type as NoteType) : undefined
    }

    async getNotes(): Promise<Note[]> {
        const response = await apiClient.get<{ data: NoteDTO[] }>('/api/notes')
        return response.data.map(dto => this.transformNote(dto))
    }

    async createNote(note: CreateNoteDTO): Promise<Note> {
        const dto = this.toDTO(note)
        const response = await apiClient.post<{ data: NoteDTO }>('/api/notes', dto)
        return this.transformNote(response.data)
    }
}

export const noteService = new NoteService()
```

---

## ✅ Type Validation

### Runtime Type Validation with Zod

```typescript
// features/notes/types/note.validation.ts
import { z } from 'zod'

// DTO validation (from API)
export const noteDTOSchema = z.object({
    noteId: z.number(),
    name: z.string(),
    description: z.string().optional(),
    type: z.enum(['Meeting', 'Brainstorm', 'Research', 'Bug']).optional(),
    tags: z.array(z.string()).nullable(),
    createdAt: z.string().datetime(), // ISO 8601 string
    updatedAt: z.string().datetime().nullable(),
    isArchived: z.boolean(),
})

export type NoteDTO = z.infer<typeof noteDTOSchema>

// Validate API response
function parseNoteDTO(data: unknown): NoteDTO {
    try {
        return noteDTOSchema.parse(data)
    } catch (error) {
        console.error('Invalid note DTO:', error)
        throw new Error('Invalid data received from API')
    }
}

// Use in service
async getNotes(): Promise<Note[]> {
    const response = await apiClient.get('/api/notes')
    
    // Validate each item
    const validatedDTOs = response.data.map(parseNoteDTO)
    
    // Transform to domain models
    return validatedDTOs.map(this.transformNote)
}
```

---

## 📝 Type Consistency Checklist

### For Every Data Type

- [ ] Database column type defined
- [ ] Backend model property typed
- [ ] API serialization configured
- [ ] Frontend DTO type defined
- [ ] Frontend domain type defined
- [ ] Transformation logic implemented
- [ ] Validation rules applied
- [ ] Null handling strategy defined
- [ ] Display formatting considered

### Common Pitfalls to Avoid

❌ Using Date objects in API responses
❌ Sending numbers as strings (except for precision)
❌ Inconsistent enum values across layers
❌ Not handling null/undefined properly
❌ Missing transformation layer
❌ No runtime validation
❌ Hardcoded date formats

---

**Remember**: Consistency across all layers prevents bugs. When in doubt, use ISO 8601 for dates and strings for precision numbers!