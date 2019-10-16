import React from 'react'
import { Table } from 'semantic-ui-react'

import FileThumbnailRow from '../components/FileThumbnailRow'

const FileThumbnails = ({ files }) => {
  return (
    <Table basic="very" celled collapsing>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>Thumbnail</Table.HeaderCell>
          <Table.HeaderCell>Name</Table.HeaderCell>
          <Table.HeaderCell>Admin #</Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {files.map((file, index) => (
          <FileThumbnailRow file={file} key={index} />
        ))}
      </Table.Body>
    </Table>
  )
}

export default FileThumbnails
