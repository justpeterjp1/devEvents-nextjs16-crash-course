import mongoose, { Schema, Document, Model } from 'mongoose';

// TypeScript interface for Event document
interface IEvent extends Document {
    title: string;
    slug: string;
    description: string;
    overview: string;
    image: string;
    venue: string;
    location: string;
    date: string;
    time: string;
    mode: 'online' | 'offline' | 'hybrid';
    audience: string;
    agenda: string[];
    organizer: string;
    tags: string[];
    createdAt: Date;
    updatedAt: Date;
}

// Define the Event schema
const eventSchema = new Schema<IEvent>(
    {
        title: {
            type: String,
            required: [true, 'Event title is required'],
            trim: true,
            minlength: [3, 'Title must be at least 3 characters'],
        },
        slug: {
            type: String,
            unique: true,
            lowercase: true,
            sparse: true,
        },
        description: {
            type: String,
            required: [true, 'Event description is required'],
            trim: true,
        },
        overview: {
            type: String,
            required: [true, 'Event overview is required'],
            trim: true,
        },
        image: {
            type: String,
            required: [true, 'Event image is required'],
        },
        venue: {
            type: String,
            required: [true, 'Event venue is required'],
            trim: true,
        },
        location: {
            type: String,
            required: [true, 'Event location is required'],
            trim: true,
        },
        date: {
            type: String,
            required: [true, 'Event date is required'],
        },
        time: {
            type: String,
            required: [true, 'Event time is required'],
        },
        mode: {
            type: String,
            enum: ['online', 'offline', 'hybrid'],
            required: [true, 'Event mode is required'],
        },
        audience: {
            type: String,
            required: [true, 'Audience description is required'],
            trim: true,
        },
        agenda: {
            type: [String],
            required: [true, 'Agenda is required'],
            validate: {
                validator: (v: string[]) => Array.isArray(v) && v.length > 0,
                message: 'Agenda must contain at least one item',
            },
        },
        organizer: {
            type: String,
            required: [true, 'Organizer name is required'],
            trim: true,
        },
        tags: {
            type: [String],
            required: [true, 'Tags are required'],
            validate: {
                validator: (v: string[]) => Array.isArray(v) && v.length > 0,
                message: 'At least one tag is required',
            },
        },
    },
    { timestamps: true }
);

// Pre-save hook: Generate slug from title, normalize date and time, validate fields
eventSchema.pre<IEvent>('save', async function () {
    // Generate slug only if title is new or modified
    if (this.isModified('title')) {
        this.slug = generateSlug(this.title);
    }

    // Validate and normalize date to ISO string (YYYY-MM-DD)
    try {
        const dateObj = new Date(this.date);
        if (isNaN(dateObj.getTime())) {
            throw new Error('Invalid date format');
        }
        this.date = dateObj.toISOString().split('T')[0];
    } catch {
        throw new Error('Date must be a valid date string (YYYY-MM-DD)');
    }

    // Validate time format (HH:mm or HH:mm:ss)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9](:[0-5][0-9])?$/;
    if (!timeRegex.test(this.time)) {
        throw new Error('Time must be in HH:mm or HH:mm:ss format');
    }

    // Trim array fields to remove empty strings
    this.agenda = (this.agenda || []).filter((item: string) => item.trim());
    this.tags = (this.tags || []).filter((item: string) => item.trim());
});

// Add index on slug for faster queries
eventSchema.index({ slug: 1 }, { unique: true, sparse: true });

/**
 * Generate a URL-friendly slug from title.
 * Converts to lowercase, removes special characters, replaces spaces with hyphens.
 */
function generateSlug(title: string): string {
    return title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Create or retrieve the Event model
const Event: Model<IEvent> =
    mongoose.models.Event || mongoose.model<IEvent>('Event', eventSchema);

export type { IEvent };
export { Event };
