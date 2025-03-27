import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth';
import { data } from './data';
import { storage } from './storage';

export const backend = defineBackend({
  auth,
  data,
  storage,
});