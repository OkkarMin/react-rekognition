import React from 'react'
import { Message } from 'semantic-ui-react'

const LoginErrorMessage = props => {
  if (!props.loginError) {
    return null
  }

  return (
    <Message negative>
      <Message.Header>We are sorry we can't find that account</Message.Header>
      <p>Check with CITS</p>
    </Message>
  )
}

export default LoginErrorMessage
