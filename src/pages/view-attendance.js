import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'

import MUIDataTable from 'mui-datatables'

import Layout from '../components/layout'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

// const courseOptions = [
//   { key: 'TSA1', text: 'TSA1', value: 'TSA1' },
//   { key: 'f', text: 'Female', value: 'female' },
// ]
// const groupOptions = [
//   { key: 'a', text: 'A', value: 'a' },
//   { key: 'b', text: 'B', value: 'b' },
// ]
//const columns = [ "Status", "Matriculation No.","GroupID","Course Code"];
const columns = [
  {
    name: 'matriculation No.',
    label: 'Matriculation No.',
    options: {
      filter: false,
      sort: false,
    },
  },
  {
    name: 'status',
    label: 'Status',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'group ID',
    label: 'Group ID',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'course code',
    label: 'Course Code',
    options: {
      filter: true,
      sort: true,
    },
  },
]

const options = {
  filterType: 'checkbox',
}

const ViewAttendancePage = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    getAttendanceData(setData)
  }, [])

  return (
    <Layout>
      {data ? (
        <MUIDataTable
          title={'Attendance List'}
          data={data}
          columns={columns}
          options={options}
        />
      ) : (
        <Loader active />
      )}
    </Layout>
  )
}

const fetchAttendanceData = async (courseID, groupID) => {
  try {
    let response = await fetch(
      `${url}/getGroupAttendance/${courseID}/2019/1/${groupID}`
    )
    let result = await response.json()

    return result
  } catch (error) {
    console.log(error)
  }
}

const getAttendanceData = async setData => {
  let data = []

  let result1 = await fetchAttendanceData('CZ3000', 'SSA1')
  let result2 = await fetchAttendanceData('CZ3002', 'TSA1')

  console.log(result1)

  result1.map(each => {
    let eachStudentData = []
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push('CZ3000')

    data.push(eachStudentData)
  })

  result2.map(each => {
    let eachStudentData = []
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)
    eachStudentData.push(each.groupID)
    eachStudentData.push('CZ3002')

    data.push(eachStudentData)
  })

  setData(data)
}

export default ViewAttendancePage
