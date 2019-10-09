import React from 'react'
import { Header, Image, Table } from 'semantic-ui-react'

const FileThumbnailRow = ({ file }) => {
  return (
    <Table.Row>
      <Table.Cell>
        <Header as="h4" image>
          <Image src={file.preview} rounded size="medium" />
        </Header>
      </Table.Cell>
      {/* file.name has the value "Okkar Min-U1700000A.jpp" */}
      <Table.Cell>{file.name.split('-')[0]}</Table.Cell>
      <Table.Cell>{file.name.split('-')[1].split('.')[0]}</Table.Cell>
    </Table.Row>
  )
}

export default FileThumbnailRow
