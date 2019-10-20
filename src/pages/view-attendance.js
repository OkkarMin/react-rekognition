import React, { useState, useEffect } from 'react'
import { Loader } from 'semantic-ui-react'

import MUIDataTable from 'mui-datatables'

import Layout from '../components/layout'

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

//const columns = [ "Course code", "Group id", "classtype", "date", "matriculation No.","status"];
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
    name: 'date',
    label: 'Date',
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
  onRowClick: rowData => {
    let data = {}
    data.courseCode = rowData[0]
    data.groupID = rowData[1]
    data.classType = rowData[2]
    data.date = rowData[3]
    data.matricNo = rowData[4]
    data.status = rowData[5]

    updateAttendance(data)
  },
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
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result3000LEC1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ3000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000LEC1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000LEC2.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA1.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA2.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })

  result2000TSA3.map(each => {
    let eachStudentData = []
    eachStudentData.push('CZ2000')
    eachStudentData.push(each.groupID)
    eachStudentData.push(each.classType)
    eachStudentData.push(each.date)
    eachStudentData.push(each.matricNo)
    eachStudentData.push(each.status)

    data.push(eachStudentData)
  })
  setData(data)
}

const putData = async (url, endpoint, payload) => {
  try {
    let response = await fetch(`${url}${endpoint}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    return await response.json()
  } catch (error) {
    console.log(error)
  }
}

const updateAttendance = async data => {
  let endPointURL = `/updateStudentAttendance`
  let payload = {
    courseCode: data.courseCode,
    groupID: data.groupID,
    classType: data.classType,
    date: data.date,
    status: data.status === 'Absent' ? 'Present' : 'Absent',
    acadYear: '2019',
    semester: '1',
    matricNo: data.matricNo,
    remarks: 'nil',
  }

  putData(
    'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api',
    endPointURL,
    payload
  ).then(result => {
    if (
      !alert(
        `Changed ${payload.matricNo}'s ${payload.courseCode} ${payload.groupID} status to ${payload.status}`
      )
    ) {
      window.location.reload()
    }
  })
}

export default ViewAttendancePage
