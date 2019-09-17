import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'

import Layout from '../components/layout'
import DrapDrop from '../components/drapdrop'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

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
        onChange={singleImageIndex}
      />

      <Button content="List Faces" onClick={listFaces} />

      <Button content="SMS" onClick={sendSMS} />

      <DrapDrop />
    </Layout>
  )
}

const singleImageIndex = async e => {
  let image = e.target.files[0]
  let imageInBase64 = await getBase64Stripped(image)
  let payload = {
    collectionName: 'Students',
    name: 'Mountain',
    image: imageInBase64,
  }

  try {
    let response = await fetch(`${url}/indexFaces`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    console.log(await response.text())
  } catch (error) {
    console.log(error)
  }
}

const listFaces = async () => {
  try {
    let response = await fetch(`${url}/describeCollection/Students`)
    let result = await response.json()

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

const getBase64Stripped = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      let encoded = reader.result.toString().replace(/^data:(.*,)?/, '')
      if (encoded.length % 4 > 0) {
        encoded += '='.repeat(4 - (encoded.length % 4))
      }
      resolve(encoded)
    }
    reader.onerror = error => reject(error)
  })
}

const sendSMS = async () => {
  let payload = {
    message: 'Testing API',
    phoneNumber: '+6596404767',
  }

  try {
    let response = await fetch(`${url}/sendSMS`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    console.log(await response.text())
  } catch (error) {
    console.log(error)
  }
}

export default IndexFacePage
