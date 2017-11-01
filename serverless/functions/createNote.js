import uuid from 'uuid'
import * as dynamoDbLib from '../libs/dynamodb-lib';
import { success, failure } from '../libs/response-lib'

export async function main (event, context, callback) {
  // Request body is passed in as a JSON encoded string in 'event.body'
  const data = JSON.parse(event.body)

  const params = {
    TableName: 'notes',
    // 'Item' contains the attributes of the item to be created
    // - 'userId': user identities are federated through the
    //             Cognito Identity Pool, we will use the identity id
    //             as the user id of the authenticated user
    // - 'noteId': a unique uuid
    // - 'content': parsed from request body
    // - 'attachment': parsed from request body
    // - 'createdAt': current Unix timestamp
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: uuid.v1(),
      content: data.content,
      attachment: data.attachment,
      createdAt: new Date().getTime()
    }
  }
  try {
    const result = await dynamoDbLib.call('put', params)
    callback(null, success(params.Item))
  } catch (e) {
    console.log(e)
    callback(null, failure({status: false}))
  }
}
