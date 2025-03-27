import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'mousaStorage',
  access: (allow) => ({
    'private/{entity_id}/*': [
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'public/*': [
      allow.authenticated.to(['read', 'write']),
      allow.guest.to(['read'])
    ]
  })
});