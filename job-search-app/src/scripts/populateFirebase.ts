import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { collection, addDoc } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { sampleJobs } from '../data/sampleJobs.js';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../../.env') });

// Initialize Firebase
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const populateFirebase = async () => {
  try {
    const jobsCollection = collection(db, 'jobs');
    
    for (const job of sampleJobs) {
      const { id, ...jobData } = job;
      // Convert dates to Firestore Timestamp
      const formattedJob = {
        ...jobData,
        postedAt: new Date(jobData.postedAt),
        salary: {
          ...jobData.salary,
          min: Number(jobData.salary.min),
          max: Number(jobData.salary.max)
        },
        experience: {
          ...jobData.experience,
          min: Number(jobData.experience.min),
          max: Number(jobData.experience.max)
        }
      };
      
      await addDoc(jobsCollection, formattedJob);
      console.log(`Added job: ${job.title}`);
    }
    
    console.log('Successfully populated Firebase with sample jobs');
  } catch (error) {
    console.error('Error populating Firebase:', error);
  }
};

populateFirebase(); 