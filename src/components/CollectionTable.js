import React, { Component } from 'react'
import { Table } from 'semantic-ui-react'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

export default class CollectionTable extends Component {
  state = {
    data: [],
  }
  componentDidMount() {
    fetch(`${url}/listCollections`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(json => this.setState({ data: json.CollectionIds }))
  }
  render() {
    return (
      <Table celled selectable>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>CollectionIDs</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {this.state.data.map(row => (
            <Table.Row key={row.toString()}>
              <Table.Cell>{row}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    )
  }
}
