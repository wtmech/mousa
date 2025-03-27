import { a, defineData, type ClientSchema } from '@aws-amplify/backend';

const schema = a.schema({
  UserProfile: a.model({
    id: a.id().required(),
    owner: a.string().required().authorization(allow => [allow.owner()]),
    userType: a.string().required(),
    displayName: a.string().required(),
    email: a.string().required(),
    profileImage: a.string(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  ArtistProfile: a.model({
    id: a.id().required(),
    owner: a.string().required().authorization(allow => [allow.owner()]),
    userProfileId: a.id().required(),
    artistName: a.string().required(),
    bio: a.string(),
    genres: a.string().array(),
    socialLinks: a.json(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  Release: a.model({
    id: a.id().required(),
    artistProfileId: a.id().required(),
    title: a.string().required(),
    type: a.string().required(),
    coverArtKey: a.string().required(),
    coverArtUrl: a.string().required(),
    price: a.float().required(),
    releaseDate: a.datetime().required(),
    status: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  Track: a.model({
    id: a.id().required(),
    releaseId: a.id().required(),
    title: a.string().required(),
    trackNumber: a.integer().required(),
    originalFileKey: a.string().required(),
    streamingFileKey: a.string(),
    previewFileKey: a.string(),
    waveformData: a.string(),
    duration: a.integer(),
    status: a.string().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  SubscriptionTier: a.model({
    id: a.id().required(),
    artistProfileId: a.id().required(),
    name: a.string().required(),
    price: a.float().required(),
    description: a.string().required(),
    benefits: a.string().array().required(),
    isActive: a.boolean().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  ArtistSubscription: a.model({
    id: a.id().required(),
    userProfileId: a.id().required(),
    artistProfileId: a.id().required(),
    subscriptionTierId: a.id().required(),
    status: a.string().required(),
    stripeSubscriptionId: a.string().required(),
    currentPeriodEnd: a.datetime().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()]),

  Purchase: a.model({
    id: a.id().required(),
    userProfileId: a.id().required(),
    releaseId: a.id().required(),
    amount: a.float().required(),
    artistAmount: a.float().required(),
    platformAmount: a.float().required(),
    currency: a.string().required(),
    stripePaymentIntentId: a.string().required(),
    purchasedAt: a.datetime().required(),
    createdAt: a.datetime().required(),
    updatedAt: a.datetime().required()
  }).authorization(allow => [allow.owner()])
});

// Used for code completion / highlighting when making requests from frontend
export type Schema = ClientSchema<typeof schema>;

// defines the data resource to be deployed
export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool'
  }
});