import React, { useState } from 'react'
import { navigate } from 'gatsby'
import {
  Button,
  Container,
  Form,
  Grid,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'

import LoginErrorMessage from '../components/LoginErrorMessage'

const logo = require('../assets/face-recognition.svg')

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  return (
    <Grid
      centered
      textAlign="center"
      verticalAlign="middle"
      style={{ height: '100vh' }}
    >
      <Grid.Column style={{ maxWidth: 450 }}>
        <Image src={logo} centered size="small" />
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="NTU E-mail address"
              onChange={event => setUsername(event.target.value)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={event => setPassword(event.target.value)}
            />

            <Button
              primary
              fluid
              size="large"
              onClick={() => {
                if (username === 'okkarmin' && password === 'iljy') {
                  navigate('/')
                } else {
                  setError(true)
                }
              }}
            >
              Login
            </Button>
          </Segment>
        </Form>

        <LoginErrorMessage loginError={error} />
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage
