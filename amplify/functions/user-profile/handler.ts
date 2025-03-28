import { type Schema } from '../../data/resource';
import { generateClient } from 'aws-amplify/data';
import { Amplify } from 'aws-amplify';
import { getAmplifyDataClientConfig } from '@aws-amplify/backend/function/runtime';
import { env } from '$amplify/env/user-profile';

interface UserProfileData {
  id?: string;
  owner: string;
  userType: string;
  displayName: string;
  email: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

interface UserProfileUpdateData extends Omit<UserProfileData, 'id'> {
  id: string;
}

interface UserProfileEvent {
  operation: 'create' | 'get' | 'update' | 'delete';
  data?: UserProfileData | UserProfileUpdateData;
  id?: string;
}

interface UserProfileResponse {
  statusCode: number;
  body: string;
}

export const handler = async (event: UserProfileEvent): Promise<UserProfileResponse> => {
  try {
    // Configure Amplify with the data client config
    const { resourceConfig, libraryOptions } = await getAmplifyDataClientConfig({
      ...env,
      AMPLIFY_DATA_DEFAULT_NAME: 'default'
    });
    Amplify.configure(resourceConfig, libraryOptions);

    // Generate the client
    const client = generateClient<Schema>();

    // Validate required fields for create and update operations
    if ((event.operation === 'create' || event.operation === 'update') && event.data) {
      const { userType, displayName, email } = event.data;
      if (!userType || !displayName || !email) {
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Missing required fields: userType, displayName, and email are required' })
        };
      }
    }

    // Handle the operations
    switch (event.operation) {
      case 'create': {
        if (!event.data) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'No data provided for create operation' })
          };
        }
        const result = await client.models.UserProfile.create(event.data);
        return {
          statusCode: 201,
          body: JSON.stringify(result.data)
        };
      }

      case 'get': {
        if (!event.id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID is required for get operation' })
          };
        }
        const result = await client.models.UserProfile.get({ id: event.id });
        if (!result.data) {
          return {
            statusCode: 404,
            body: JSON.stringify({ message: 'User profile not found' })
          };
        }
        return {
          statusCode: 200,
          body: JSON.stringify(result.data)
        };
      }

      case 'update': {
        if (!event.data || !('id' in event.data)) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID and data are required for update operation' })
          };
        }
        const updateData = event.data as UserProfileUpdateData;
        const result = await client.models.UserProfile.update(updateData);
        return {
          statusCode: 200,
          body: JSON.stringify(result.data)
        };
      }

      case 'delete': {
        if (!event.id) {
          return {
            statusCode: 400,
            body: JSON.stringify({ message: 'ID is required for delete operation' })
          };
        }
        const result = await client.models.UserProfile.delete({ id: event.id });
        return {
          statusCode: 200,
          body: JSON.stringify(result.data)
        };
      }

      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ message: 'Invalid operation' })
        };
    }
  } catch (error: unknown) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: 'Internal server error',
        error: error instanceof Error ? error.message : String(error)
      })
    };
  }
};