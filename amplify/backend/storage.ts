import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'mousa-storage',
  permissions: (auth) => ({
    '/uploads/{userId}/{trackId}/*': {
      allow: auth.authenticated().to(['read', 'write']),
    },
    '/artists/{artistId}/{releaseId}/*': {
      allow: auth.authenticated().to(['read']),
      allow: auth.authenticated().groups(['artists']).to(['write']),
    },
    '/users/{userId}/*': {
      allow: auth.authenticated().to(['read', 'write']),
    },
    '/processing/{userId}/{trackId}/*': {
      allow: auth.authenticated().to(['read', 'write']),
    },
  }),
});