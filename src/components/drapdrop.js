import React from 'react'
import Dropzone from 'react-dropzone'
import { Message } from 'semantic-ui-react'

const DrapDrop = ({ onFilesDrop }) => {
  return (
    <>
      <Dropzone onDrop={acceptedFiles => onFilesDrop(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <Message>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </Message>
        )}
      </Dropzone>
    </>
  )
}

export default DrapDrop
