import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'

import Layout from '../components/layout'

const IndexFacePage = () => {
  const [fileInputRef, setFileInputRef] = useState()

  return (
    <Layout>
      <Header as="h2">Hello From Index Face</Header>
      <Button
        primary
        content="Choose File"
        labelPosition="left"
        icon="file"
        onClick={() => fileInputRef.click()}
      />
      <input
        ref={ref => setFileInputRef(ref)}
        type="file"
        hidden
        onChange={fileChange}
      />

      <Button content="listFaces" onClick={listFaces} />
    </Layout>
  )
}

const fileChange = async e => {
  let data = new FormData()
  let image = e.target.files[0]
  data.append('body', { collectionName: 'Students', name: 'reactTest1' })
  data.append('file', image)

  let response = await fetch(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api/indexFaces',
    {
      method: 'POST',
      body: data,
    }
  )

  console.log(response)
}

const listFaces = async () => {
  let response = await fetch(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api/listFaces/Students',
    {
      method: 'GET',
    }
  )

  let result = await response.json()

  console.log(result)
}

export default IndexFacePage
