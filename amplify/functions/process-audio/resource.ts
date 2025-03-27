import { defineFunction } from '@aws-amplify/backend';

export const processAudio = defineFunction({
  name: 'process-audio',
  entry: './handler.ts'
});