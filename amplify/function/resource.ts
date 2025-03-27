import { defineFunction } from '@aws-amplify/backend';

export const stripeWebhook = defineFunction({
  entry: './src/functions/stripe-webhook.ts',
  environment: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY || '',
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET || ''
  }
});

export const processAudio = defineFunction({
  entry: './src/functions/process-audio.ts',
  environment: {
    AWS_REGION: process.env.AWS_REGION || 'us-east-2'
  }
});