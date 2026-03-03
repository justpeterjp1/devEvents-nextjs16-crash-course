import mongoose, { Schema, Document, Model, Types } from 'mongoose';
import { Event } from './event.model';

// TypeScript interface for Booking document
interface IBooking extends Document {
    eventId: Types.ObjectId;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

// Define the Booking schema
const bookingSchema = new Schema<IBooking>(
    {
        eventId: {
            type: Schema.Types.ObjectId,
            ref: 'Event',
            required: [true, 'Event ID is required'],
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            lowercase: true,
            trim: true,
            validate: {
                validator: (email: string) => isValidEmail(email),
                message: 'Please provide a valid email address',
            },
        },
    },
    { timestamps: true }
);

// Pre-save hook: Verify that the referenced event exists
bookingSchema.pre<IBooking>('save', async function () {
    if (this.isNew || this.isModified('eventId')) {
        try {
            const eventExists = await Event.findById(this.eventId);

            if (!eventExists) {
                throw new Error('Referenced event does not exist');
            }
        } catch (error) {
            throw new Error(
                `Error validating event reference: ${error instanceof Error ? error.message : 'Unknown error'}`
            );
        }
    }
});

// Add index on eventId for faster queries and better performance
bookingSchema.index({ eventId: 1 });

/**
 * Validate email format using regex pattern.
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Create or retrieve the Booking model
const Booking: Model<IBooking> =
    mongoose.models.Booking || mongoose.model<IBooking>('Booking', bookingSchema);

export type { IBooking };
export { Booking };
