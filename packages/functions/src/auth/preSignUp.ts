import { Context, PreSignUpTriggerEvent } from 'aws-lambda'

const handler = async (event: PreSignUpTriggerEvent, context: Context) => {
  const ALLOWED_DOMAINS = ['gmail.com', 'outlook.com']
  const userEmailDomain = event.request.userAttributes.email.split('@')[1]
  const triggerSource = event.triggerSource

  // Allow user created by an admin 
  if (triggerSource === 'PreSignUp_AdminCreateUser') {
    return event
  }

  // Allow users created with allowed domains 
  if (
    triggerSource === 'PreSignUp_ExternalProvider' ||
    ALLOWED_DOMAINS.includes(userEmailDomain)
  ) {
    const response = Object.assign({}, event.response, {
      autoConfirmUser: true,
    })
    return { ...event, response }
  }

  // Deny user creation when using Sign Up trigger
  throw new Error('Unauthorized to create account')
}

export { handler }