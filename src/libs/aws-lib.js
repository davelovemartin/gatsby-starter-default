import { CognitoUserPool } from 'amazon-cognito-identity-js'

export async function authUser () {
  const currentUser = getCurrentUser()

  if (currentUser === null) {
    return false
  }

  await getUserToken(currentUser)

  return true
}

function getUserToken (currentUser) {
  return new Promise((resolve, reject) => {
    currentUser.getSession(function (err, session) {
      if (err) {
        reject(err)
        return
      }
      resolve(session.getIdToken().getJWToken())
    })
  })
}

function getCurrentUser () {
  const userPool = new CognitoUserPool({
    UserPoolId: process.env.COGNITO_USER_POOL_ID,
    ClientId: process.env.COGNITO_APP_CLIENT_ID
  })
  return userPool.getCurrentUser()
}

export function signOutUser () {
  const currentUser = getCurrentUser()

  if (currentUser !== null) {
    currentUser.signOut()
  }
}
