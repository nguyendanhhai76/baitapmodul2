import { useState, useEffect } from 'react'
import { Button, Input,  Space, Select} from 'antd';

import './App.css'



// const makeid = Math.random()
 

const App = () => {
  
  const [job, setJob] = useState('')  
  const [taskByfilter,setTaskByFilter] = useState([])
  const [filterStatus, setFilterStatus] = useState('All')
  const [dataSource, setdataSource] = useState([
    {
      key : Math.random(),
      title : 'nẫu cơm',
      status : "Done"
    },
    {
      key : Math.random(),
      title : 'ăn',
      status : "Not Done"
    },

  ])

  const handleDone = (item) => {
    console.log(item);
    setdataSource((old) => {
    return old.map(itemOld => {
      if(itemOld.key === item.key && itemOld.status === "Not Done"
      ) {
         itemOld.status = "Done"
      }
      
      
      return itemOld
  })})
  }
  const handleChange = (value) => {
    setFilterStatus(value)
    
    // console.log(filterStatus); 
  }
  useEffect(()=>{
    if( filterStatus.key === 'All'){
      setTaskByFilter(dataSource)
      
     }else if (filterStatus.key === 'Done') {
      setTaskByFilter(dataSource.filter(item => item.status === 'Done'))
      console.log(taskByfilter);
      
     }else if(filterStatus.key === 'Not Done') {
      setTaskByFilter(dataSource.filter(item => item.status === 'Not Done'))
      
     }
   },[filterStatus,dataSource]) 
     
     function handleDelete(item){
      const newsId = item.key;
      console.log(newsId);
      const newDataSource = dataSource.filter(item => item.key !== newsId)
      setdataSource(newDataSource)
      console.log(newDataSource);
    }
       
  return (
    <>
    <h1>My ToDo List</h1>
      <Select
      labelInValue
      defaultValue={{
        value: filterStatus,
        label: filterStatus,
      }}
      style={{
        width: 120,
        margin: 50
      }}
      onChange={handleChange}
      options={[
        {
          value: 'All',
          label: 'All',
        },
        {
          value: 'Done',
          label: 'Done',
        },
        {
          value: 'Not Done',
          label: 'Not Done',
        },
      ]}
    />
      <Space.Compact
        style={{
          width: '100%',
        }}
      >
      <Input value = {job} onChange={e => setJob(e.target.value)}  />
      <Button type="primary" onClick={() => {
        setdataSource((old) => {
          setJob('')
          return [...old, {
            key : Math.random(),
            title : job,
            status : "Not Done"
          }]
          
        })
      }}>Submit</Button>
    </Space.Compact>
    {
    taskByfilter.map((item) => {
        return <li className={`item ${item.status === "Done" ? "classDone" : "" }`}>
         
          {item.title}
          
          <div>
          <Button onClick={() => {
             handleDone(item)
          }}>Complete</Button>
          <Button onClick={() => handleDelete(item)}>Del</Button>
          </div>
        </li>
      })
    }
   
    </>
  );
};
export default App;
    
      
  

 

 

  
 