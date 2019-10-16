import React, { useState } from 'react'
import { Button, Header, Progress } from 'semantic-ui-react'

import Layout from '../components/layout'
import DrapDrop from '../components/drapdrop'
import FileThumbnails from '../components/FileThumbnails'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

const IndexFacePage = () => {
  const [files, setFiles] = useState(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadPercent, setUploadPercent] = useState(0)
  const [collectionName, setCollectionName] = useState('')

  const onFilesDrop = files => {
    setFiles(
      files.map(file =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    )
    let folderName = files[0].path.split('/')[1]
    setCollectionName(folderName)
  }

  const onUpload = async () => {
    setIsUploading(true)
    createCollection(collectionName)

    files.map(async file => {
      await singleImageIndex(collectionName, file)
    })

    let numberOfFiles = files.length
    updateUploadPercent(numberOfFiles, setUploadPercent)
  }

  return (
    <Layout>
      <Header as="h2">Create Collection</Header>

      <Button content="List Faces" onClick={() => listFaces('Students')} />

      <Button content="List Collections" onClick={() => listCollections()} />

      <Button content="SMS" onClick={() => sendSMS()} />

      <DrapDrop onFilesDrop={onFilesDrop} />

      {files && (
        <>
          <Button
            primary
            fluid
            content="Upload"
            labelPosition="right"
            icon="upload"
            onClick={() => onUpload()}
          />

          {isUploading && (
            <Progress percent={uploadPercent} indicating autoSuccess>
              {uploadPercent >= 100 && <span>Uploading Done!</span>}
            </Progress>
          )}

          <Header as="h3">{collectionName}</Header>

          <FileThumbnails files={files} />
        </>
      )}
    </Layout>
  )
}

const createCollection = async collectionName => {
  let payload = {
    collectionName,
  }

  try {
    let response = await fetch(`${url}/createCollection`, {
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

const updateUploadPercent = async (numberOfFiles, setUploadPercent) => {
  let percentIncrement = 100 / numberOfFiles

  for (let i = 0; i <= numberOfFiles; i++) {
    await new Promise(resolve =>
      setTimeout(resolve, Math.floor(Math.random() * 500) + 200)
    )
    setUploadPercent(percentIncrement * i)
  }
}

const singleImageIndex = async (collectionName, file) => {
  let imageInBase64 = await getBase64Stripped(file)
  let payload = {
    collectionName,
    name: file.name.split('-')[1].split('.')[0],
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

    await response.text()
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const listCollections = async () => {
  try {
    let response = await fetch(`${url}/listCollections`)
    let result = await response.json()

    console.log(result)
  } catch (error) {
    console.log(error)
  }
}

const listFaces = async collectionName => {
  try {
    let response = await fetch(`${url}/listFaces/${collectionName}`)
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
