import type { Handler } from 'aws-lambda';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

export const handler: Handler = async (event, context) => {
  try {
    const { operation, userId, data } = JSON.parse(event.body || '{}');

    switch (operation) {
      case 'createProfile':
        return await createProfile(userId, data);
      case 'getProfile':
        return await getProfile(userId);
      case 'updateProfile':
        return await updateProfile(userId, data);
      default:
        return {
          statusCode: 400,
          body: JSON.stringify({ error: 'Invalid operation' })
        };
    }
  } catch (err) {
    console.error('Error:', err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' })
    };
  }
};

async function createProfile(userId: string, data: any) {
  const command = new PutCommand({
    TableName: process.env.USER_PROFILE_TABLE || 'UserProfile',
    Item: {
      id: userId,
      owner: userId,
      userType: data.userType || 'user',
      displayName: data.displayName,
      email: data.email,
      profileImage: data.profileImage,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  });

  await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Profile created successfully' })
  };
}

async function getProfile(userId: string) {
  const command = new GetCommand({
    TableName: process.env.USER_PROFILE_TABLE || 'UserProfile',
    Key: { id: userId }
  });

  const { Item } = await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify(Item || { error: 'Profile not found' })
  };
}

async function updateProfile(userId: string, data: any) {
  const updateExpressions: string[] = [];
  const expressionAttributeNames: Record<string, string> = {};
  const expressionAttributeValues: Record<string, any> = {};

  if (data.displayName) {
    updateExpressions.push('#displayName = :displayName');
    expressionAttributeNames['#displayName'] = 'displayName';
    expressionAttributeValues[':displayName'] = data.displayName;
  }

  if (data.profileImage) {
    updateExpressions.push('#profileImage = :profileImage');
    expressionAttributeNames['#profileImage'] = 'profileImage';
    expressionAttributeValues[':profileImage'] = data.profileImage;
  }

  if (updateExpressions.length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'No fields to update' })
    };
  }

  updateExpressions.push('#updatedAt = :updatedAt');
  expressionAttributeNames['#updatedAt'] = 'updatedAt';
  expressionAttributeValues[':updatedAt'] = new Date().toISOString();

  const command = new UpdateCommand({
    TableName: process.env.USER_PROFILE_TABLE || 'UserProfile',
    Key: { id: userId },
    UpdateExpression: `SET ${updateExpressions.join(', ')}`,
    ExpressionAttributeNames: expressionAttributeNames,
    ExpressionAttributeValues: expressionAttributeValues
  });

  await docClient.send(command);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Profile updated successfully' })
  };
}