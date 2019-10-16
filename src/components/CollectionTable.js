import React from 'react'
import { Table } from 'semantic-ui-react'

const CollectionTable = ({ data }) => {
  return (
    <Table celled selectable>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>CollectionIDs</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {data.map(collection => (
          <Table.Row key={collection.toString()}>
            <Table.Cell>{collection}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  )
}

export default CollectionTable
