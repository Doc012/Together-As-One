import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

// Mock implementation for development purposes
export const subscribeToUpdates = async (email) => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  console.log('Email subscription received:', email);
  
  // Simulate success (90% of the time) or failure
  const random = Math.random();
  if (random < 0.9) {
    return true;
  } else {
    throw new Error('Subscription failed (mock error)');
  }
};