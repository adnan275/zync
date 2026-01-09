// Quick script to mark a user as onboarded
// Run this in the backend directory with: node scripts/markOnboarded.js <email>

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../src/models/User.js';

dotenv.config();

const markUserAsOnboarded = async (email) => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        const user = await User.findOne({ email });

        if (!user) {
            console.log('User not found with email:', email);
            process.exit(1);
        }

        // Update user to be onboarded with default values if needed
        user.isOnboarded = true;
        if (!user.bio) user.bio = 'Language enthusiast';
        if (!user.nativeLanguage) user.nativeLanguage = 'english';
        if (!user.location) user.location = 'Global';

        await user.save();

        console.log('✅ User marked as onboarded:', user.email);
        console.log('User details:', {
            fullName: user.fullName,
            email: user.email,
            isOnboarded: user.isOnboarded,
            bio: user.bio,
            nativeLanguage: user.nativeLanguage,
            location: user.location
        });

        process.exit(0);
    } catch (error) {
        console.error('Error:', error);
        process.exit(1);
    }
};

const email = process.argv[2];

if (!email) {
    console.log('Usage: node scripts/markOnboarded.js <email>');
    process.exit(1);
}

markUserAsOnboarded(email);
