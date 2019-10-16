import React from 'react'
import { Table } from 'semantic-ui-react'

const CollectionTable = props => {
  const { data, style, onClick } = props

  return (
    <div style={style}>
      <Table striped celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CollectionIDs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map((collection, index) => (
            <Table.Row
              key={index}
              onClick={() => onClick(collection.toString())}
            >
              <Table.Cell>{collection}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  )
}

export default CollectionTable
