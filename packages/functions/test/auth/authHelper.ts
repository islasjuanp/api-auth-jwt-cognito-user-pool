import { Context, PreSignUpTriggerEvent } from 'aws-lambda'

export type TriggerType =
  | 'PreSignUp_SignUp'
  | 'PreSignUp_ExternalProvider'
  | 'PreSignUp_AdminCreateUser'
export const createTestPreSignUpEvent = (
  email: string,
  trigger: TriggerType = 'PreSignUp_SignUp'
): PreSignUpTriggerEvent => {
  return {
    request: {
      userAttributes: {
        email: email,
      },
    },
    response: {
      autoConfirmUser: false,
      autoVerifyEmail: false,
      autoVerifyPhone: false,
    },
    version: '',
    region: '',
    userPoolId: '',
    triggerSource: trigger,
    userName: '',
    callerContext: { awsSdkVersion: '', clientId: '' },
  }
}

export const createTestContext = (): Context => {
  return {
    callbackWaitsForEmptyEventLoop: false,
    functionName: '',
    functionVersion: '1',
    invokedFunctionArn: '',
    memoryLimitInMB: '',
    awsRequestId: '',
    logGroupName: '',
    logStreamName: '',
    getRemainingTimeInMillis: () => 0,
    done: () => {},
    fail: () => {},
    succeed: () => {},
  }
}