# Mousa - Music Platform Backend

This is the backend implementation for Mousa, a music platform built with AWS Amplify Gen 2. The platform supports direct music purchases, artist subscriptions, and personal cloud storage.

## Project Structure

```
amplify/
  ├── backend/
  │   ├── backend.ts    # Main backend configuration
  │   ├── auth.ts       # Authentication configuration
  │   ├── data.ts       # Data models and schema
  │   └── storage.ts    # Storage configuration
  └── schema.graphql    # GraphQL schema
```

## Features

- User Authentication with Cognito
- Artist and Listener Profiles
- Music Release Management
- Track Processing Pipeline
- Subscription Management
- Purchase Processing
- Personal Cloud Storage

## Getting Started

1. Install dependencies:

   ```bash
   npm install
   ```

2. Configure AWS credentials:

   ```bash
   aws configure
   ```

3. Deploy the backend:
   ```bash
   amplify push
   ```

## Data Models

### UserProfile

- Basic user information
- User type (Artist/Listener)
- Profile image

### ArtistProfile

- Artist-specific information
- Subscription tiers
- Releases

### Release

- Album/EP/Single information
- Cover art
- Tracks
- Pricing

### Track

- Audio file information
- Processing status
- Streaming and preview versions

### SubscriptionTier

- Tier name and price
- Benefits
- Active status

### ArtistSubscription

- Subscription status
- Payment information
- Period tracking

### Purchase

- Purchase details
- Payment split
- Transaction information

## Storage Structure

- `/uploads/` - Raw user uploads
- `/artists/` - Processed artist content
- `/users/` - User-specific content
- `/processing/` - Temporary processing storage

## Development

1. Make changes to the schema in `schema.graphql`
2. Update TypeScript models in `data.ts`
3. Modify storage permissions in `storage.ts`
4. Update authentication rules in `auth.ts`
5. Deploy changes with `amplify push`

## Security

- Authentication through Cognito
- Fine-grained access control
- Secure file storage
- Payment processing through Stripe

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
