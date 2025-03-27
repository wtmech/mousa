import { defineBackend } from '@aws-amplify/backend';
import { auth } from './auth/resource';
import { data } from './data/resource';
import { storage } from './storage/resource';
import { stripeWebhook } from './functions/stripe-webhook/resource';
import { processAudio } from './functions/process-audio/resource';
import { userProfile } from './functions/user-profile/resource';

export const backend = defineBackend({
  auth,
  data,
  storage,
  stripeWebhook,
  processAudio,
  userProfile
});