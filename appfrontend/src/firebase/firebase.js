import { initializeApp } from 'firebase/app';
import firebaseFile from "./firebaseFile.json";

const app = initializeApp(firebaseFile);

export default app;