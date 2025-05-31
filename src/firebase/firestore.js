import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

/**
 * Subscribe a user to updates if they haven't already subscribed
 * @param {string} email - The email to subscribe
 * @returns {Promise<{success: boolean, message: string}>} - Result of subscription attempt
 */
export const subscribeToUpdates = async (email) => {
  try {
    // Normalize email to lowercase
    const normalizedEmail = email.toLowerCase().trim();
    
    // Create a safe document ID from the email (replace characters not allowed in document IDs)
    const safeEmailId = normalizedEmail.replace(/[.#$\/\[\]]/g, '_');
    
    // Reference to the specific document using the email as ID
    const docRef = doc(db, 'subscribers', safeEmailId);
    
    // Check if this email is already subscribed
    const docSnap = await getDoc(docRef);
    
    // If email already exists, return early
    if (docSnap.exists()) {
      return {
        success: true,
        message: "You're already subscribed! Thank you for your continued support."
      };
    }
    
    // Add new subscriber document with email as the document ID
    await setDoc(docRef, {
      email: normalizedEmail,
      timestamp: serverTimestamp()
    });
    
    return {
      success: true,
      message: "Thank you for subscribing! You'll receive updates about water resources in your community."
    };
  } catch (error) {
    console.error('Error subscribing to updates:', error);
    return {
      success: false, 
      message: "Subscription failed. Please try again later. " + error.message
    };
  }
};