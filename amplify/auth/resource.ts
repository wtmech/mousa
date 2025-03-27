import { defineAuth } from '@aws-amplify/backend';

export const auth = defineAuth({
  loginWith: {
    email: true,
    phone: true
  },
  userAttributes: {
    // Add any additional user attributes here
  }
});