import React, { useState, useEffect } from 'react'
import { Loader, Button } from 'semantic-ui-react'

import MUIDataTable from 'mui-datatables'

import Layout from '../components/layout'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

//const columns = [ "Course code", "Group id",,"classtype" ,"matriculation No.","status"];
const columns = [
  {
    name: 'course code',
    label: 'Course Code',
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
    name: 'class type',
    label: 'Class Type',
    options: {
      filter: true,
      sort: true,
    },
  },
  {
    name: 'matriculation No.',
    label: 'Matriculation No.',
    options: {
      filter: true,
      sort: true,
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

  //courseID , groupID
  let result3000SSA1 = await fetchAttendanceData('CZ3000', 'SSA1')
  let result3000LEC1 = await fetchAttendanceData('CZ3000', 'LEC1')

  let result2000LEC1 = await fetchAttendanceData('CZ2000', 'LEC1')
  let result2000LEC2 = await fetchAttendanceData('CZ2000', 'LEC2')
  let result2000TSA1 = await fetchAttendanceData('CZ2000', 'TSA1')
  let result2000TSA2 = await fetchAttendanceData('CZ2000', 'TSA2')
  let result2000TSA3 = await fetchAttendanceData('CZ2000', 'TSA3')

  console.log(result3000SSA1)

  //push in this order [ "Course code", "Group id","class type" ,"matriculation No.","status"];
  result3000SSA1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ3000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result3000LEC1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ3000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000LEC1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000LEC2.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA2.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA3.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })
  setData(data)
}

export default ViewAttendancePage
