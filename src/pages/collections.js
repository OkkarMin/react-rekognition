import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'

import Layout from '../components/layout'
import CollectionTable from '../components/CollectionTable'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

const CollectionsPage = () => {
  const [collections, setCollections] = useState(null)
  const [facesData, setFacesData] = useState(null)
  const [isCollectionClicked, setIsCollectionClicked] = useState(false)

  const fetchData = async (url, endPoint) => {
    try {
      console.log(endPoint)
      let response = await fetch(`${url}${endPoint}`)
      let result = await response.json()

      return result

      // setCollections(result.CollectionIds)
    } catch (error) {
      console.log(error)
    }
  }

  const onRowClick = async collectionName => {
    setIsCollectionClicked(true)
    fetchData(url, `/listFaces/${collectionName}`).then(result =>
      setFacesData(result.Faces)
    )
  }

  useEffect(() => {
    fetchData(url, '/listCollections').then(result =>
      setCollections(result.CollectionIds)
    )
  }, [])

  return (
    <Layout>
      {collections ? (
        <CollectionTable
          style={isCollectionClicked ? { display: 'none' } : {}}
          data={collections}
          onClick={onRowClick}
        />
      ) : (
        <Loader active />
      )}

      {facesData &&
        facesData.map(eachFace => <div>{eachFace.ExternalImageId}</div>)}
    </Layout>
  )
}

export default CollectionsPage
