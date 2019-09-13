import React from 'react'
import { useDropzone } from 'react-dropzone'
import { Message } from 'semantic-ui-react'

const DrapDrop = props => {
  const { acceptedFiles, getRootProps, getInputProps } = useDropzone()

  const files = acceptedFiles.map(file => (
    <li key={file.path}>
      {console.log(file.path)}
      {file.path} - {file.size} bytes
    </li>
  ))

  return (
    <>
      <Message>
        <input {...getInputProps()} />
        <div {...getRootProps({ className: 'dropzone' })}>
          <Message.Header>
            Drop Folder Containing Face Images Here
          </Message.Header>
          <Message.List>
            <Message.Item>Folder Name => Container Name</Message.Item>
            <Message.Item>Image Name => Student's Matric Number</Message.Item>
          </Message.List>
        </div>
      </Message>
    </>
  )
}

export default DrapDrop
