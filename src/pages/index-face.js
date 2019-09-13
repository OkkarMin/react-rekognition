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
        onChange={fileChange}
      />

      <Button content="List Faces" onClick={listFaces} />

      <DrapDrop />
    </Layout>
  )
}

const fileChange = async e => {
  let form = new FormData()
  let image = e.target.files[0]
  let imageInBase64 = await getBase64Stripped(image)

  console.log(imageInBase64)
}

const listFaces = async () => {
  let response = await fetch(`${url}/listFaces/CZ3002Yr2019Sem1`)

  let result = await response.json()
  console.log(result)
  // let { Faces } = result
  // Faces.map(face => console.log(face.ExternalImageId))
}

const getBase64 = file => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = error => reject(error)
  })
}

function getBase64Stripped(file) {
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

export default IndexFacePage
