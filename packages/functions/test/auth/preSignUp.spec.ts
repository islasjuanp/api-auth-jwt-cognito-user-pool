import { handler } from '@api-auth-jwt-cognito-user-pool/functions/src/auth/preSignUp'
import { Context, PreSignUpTriggerEvent } from 'aws-lambda'
import { expect, test, describe } from 'vitest'
import { createTestContext, createTestPreSignUpEvent } from './authHelper'

describe('Pre Sign Up function', () => {
  test('Should allow users when using admin provider trigger', async () => {
    const event: PreSignUpTriggerEvent = createTestPreSignUpEvent(
      'user@gmail.com',
      'PreSignUp_AdminCreateUser'
    )
    const context: Context = createTestContext()

    const response = await handler(event, context)

    expect(response).toEqual(
      expect.objectContaining({
        response: {
          autoConfirmUser: false,
          autoVerifyEmail: false,
          autoVerifyPhone: false,
        },
      })
    )
  })

  test.each([
    { email: 'user@gmail.com', provider: 'Google'},
    { email: 'user@outlook.com', provider: 'Outlook'},
  ])('Should allow users when using external provider trigger ($provider)', async ({email, provider}) => {
    const event: PreSignUpTriggerEvent = createTestPreSignUpEvent(
      email,
      'PreSignUp_ExternalProvider'
    )
    const context: Context = createTestContext()

    const response = await handler(event, context)

    expect(response).toEqual(
      expect.objectContaining({
        request: event.request,
        response: {
          autoConfirmUser: true,
          autoVerifyEmail: false,
          autoVerifyPhone: false,
        },
      })
    )
  })

  test('Should allow external user when using admin provider trigger ', async () => {
    const event: PreSignUpTriggerEvent = createTestPreSignUpEvent(
      'user@external.com',
      'PreSignUp_AdminCreateUser'
    )
    const context: Context = createTestContext()

    const response = await handler(event, context)

    expect(response).toEqual(
      expect.objectContaining({
        response: {
          autoConfirmUser: false,
          autoVerifyEmail: false,
          autoVerifyPhone: false,
        },
      })
    )
  })

  test.each(['user@gmail.com', 'user@outlook.com'])(
    'Should deny user creation when using Sign Up trigger (%s)',
    (email) => {
      const event: PreSignUpTriggerEvent = createTestPreSignUpEvent(
        email,
        'PreSignUp_SignUp'
      )
      const context: Context = createTestContext()

      expect(handler(event, context)).rejects.toEqual(
        new Error('Unauthorized to create account')
      )
    }
  )
})