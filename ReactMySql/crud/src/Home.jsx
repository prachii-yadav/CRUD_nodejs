import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function Home() {
  const [data,setData] = useState([])
  const [students, setStudents] = useState(false);

    useEffect(()=> {
        axios.get('http://localhost:3001/')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    },[students])

    
    const handleDelete = (id) => {
      axios.delete('http://localhost:3001/delete/'+id)
      // .then(res =>  {
      //  location.reload();
      // })
      .then(res => {
        setStudents(!students)
      })
      .catch(err => console.log(err));
    }

  return (
   <div className='d-flex vh-100 bg-primary justify-content-center align-items-center'>
    <div className='w-50 bg-white rounded p-3'>
      <h2>Student List</h2>
        <div className='d-flex justify-content-end'>
          <Link to="/create" className='btn btn-success'>Create +</Link>
        </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student,index) =>{
            return <tr key={index}>
              <td>{student.ID}</td>
              <td>{student.Name}</td>
              <td>{student.Email}</td>
              <td>
                <Link to={`/read/${student.ID}`} className='btn btn-sm btn-info'>Read</Link>
                <Link to={`/edit/${student.ID}`} className='btn btn-sm btn-primary mx-2'>Edit</Link>
                <button onClick={() => handleDelete(student.ID)} className='btn btn-sm btn-danger'>Delete</button>
              </td>

            </tr>

          })}
        </tbody>

      </table>
    </div>
   </div>
  )
}

export default Home