import { defineFunction } from '@aws-amplify/backend';

export const userProfile = defineFunction({
  name: 'user-profile',
  entry: './handler.ts'
});