import React, { useState } from 'react'
import { Button } from 'semantic-ui-react'

import MUIDataTable from "mui-datatables";

import Layout from '../components/layout';

const url = 'http://ec2-3-15-165-103.us-east-2.compute.amazonaws.com/api'

//const columns = [ "Status", "Matriculation No."];
const columns = [
  {
    name: "status",
    label: "Status",
    options: {
      filter: true,
      sort: true,
    }
  },
  {
    name: "matriculation No.",
    label: "Matriculation No.",
    options: {
      filter: false,
      sort: false,
    }
  },
];

// const data = [
//   ["Joe James", "Test Corp", "Yonkers"],
//   ["John Walsh", "Test Corp", "Hartford"],
//   ["Bob Herm", "no", "Tampa"],
//   ["James Houston", "no", "Dallas"],
// ];

// const data = async(matricNo) => {
//   try {
//     let response = await fetch(`${url}/getStudentAttendance/CZ3002/2019/1/${matricNo}`)
//     let result = await response.json()
//     
//     console.log(result)
//     const resultData = [["asdasd","sadasd"],["asdasd","hello"]]
//     // // const resultData = ["sad"]
//     // // resultData.push("sad")
//     // return resultData
//     // resultData.push(String(result[1].status))
//     // resultData.push(String(result[1].matricNo))
//     console.log(resultData)
//   } catch (error) {
//     console.log(error)
//   }
// }

const options = {
  filterType: 'checkbox',
};

const ViewAttendancePage = () => {
  const [data, setData] = useState([])

  return (
    <Layout>
      <Button
        content="Get Data"
        primary
        fluid
        onClick={() => onButtonClick('U1721870L', setData)}
      />

      <MUIDataTable
        title={"Attendance List"}
        data={data}
        columns={columns}
        options={options}
      />

    </Layout>
  )
}

const onButtonClick = async (matricNo, setData) => {
  try {
    let data = []
    let response1 = await fetch(`${url}/getStudentAttendance/CZ3002/2019/1/${matricNo}`)
    let result1 = await response1.json()
    
    result1.map(each => {
      let eachStudentData = []
      eachStudentData.push(each.status)
      eachStudentData.push(each.matricNo)
      
      data.push(eachStudentData)
    })

    setData(data)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default ViewAttendancePage
