import React, { useState } from 'react'
import { navigate } from 'gatsby'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'

const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="primary" textAlign="center">
          {/* <Image src='/logo.png' />  */}
          Log-in to Rekognition
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
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
              color="primary"
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

        {error && (
          <Message negative>
            <Message.Header>
              We're sorry we can't find that account
            </Message.Header>
            <p>Check with CITS</p>
          </Message>
        )}
      </Grid.Column>
    </Grid>
  )
}

export default LoginPage
