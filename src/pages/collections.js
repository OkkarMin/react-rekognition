import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'

import Layout from '../components/layout'
import CollectionTable from '../components/CollectionTable'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

const CollectionsPage = () => {
  const [data, setData] = useState(null)

  const fetchData = async () => {
    try {
      let response = await fetch(`${url}/listCollections`)
      let result = await response.json()

      setData(result.CollectionIds)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Layout>
      {data ? <CollectionTable data={data} /> : <Loader active />}
    </Layout>
  )
}

export default CollectionsPage
