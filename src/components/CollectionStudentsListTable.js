import React from 'react'
import { Table, Header } from 'semantic-ui-react'

const CollectionStudentListTable = props => {
  const { data } = props
  const totalNumberOfStudents = data.length

  return (
    <>
      <Header as="h3">Total : {totalNumberOfStudents}</Header>
      <Table basic="very">
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Matric No.</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data.map((each, index) => (
            <Table.Row key={index}>
              <Table.Cell>{each.ExternalImageId}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </>
  )
}

export default CollectionStudentListTable
