import React, { useState } from 'react'
import { Button, Header } from 'semantic-ui-react'

import Layout from '../components/layout'
import DrapDrop from '../components/drapdrop'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

const RekognizePage = () => {
  const [files, setFiles] = useState(null)

  const onFilesDrop = files => {
    setFiles(
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
  }

  const onRekognize = () => {
    files.map(async file => await rekognize(file))
  }

  return (
    <Layout>
      <Header as="h2">Rekognize</Header>

      <DrapDrop onFilesDrop={onFilesDrop} />

      {files && (
        <Button
          content="Rekognize"
          floated="right"
          onClick={() => onRekognize()}
        />
      )}
    </Layout>
  )
}

const rekognize = async file => {
  let imageInBase64 = await getBase64Stripped(file)
  let payload = {
    collectionName: 'Students',
    image: imageInBase64,
  }

  try {
    let response = await fetch(`${url}/recognize`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    response = await response.text()
    console.log(response)
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

export default RekognizePage
