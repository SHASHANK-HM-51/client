import React, { useEffect, useState } from 'react'
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill } from 'react-icons/bs'
import Create from './Create'
import axios from 'axios'

const Home = () => {

    const [todos, setTodos] = useState([])
    useEffect(() => {
        axios.get("http://localhost:4001/get")
            .then(result => setTodos(result.data))
            .catch(err => console.log(err))
    }, [])

    const handleEdit = (id) => {
        axios.put("http://localhost:4001/update/" + id)
            .then(result => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    const handleDelete = (id) => {
        axios.delete("http://localhost:4001/delete/" + id)
            .then(result => {
                window.location.reload()
            })
            .catch(err => console.log(err))
    }

    console.log(todos);
    return (
        <div>
            <h2>TODO Lisi</h2>
            <Create />
            {
                todos.length === 0
                    ?
                    <div><h2>No Record found</h2></div>
                    :
                    todos.map(todo => (
                        <div className='task'>
                            <div className='checkbox' onClick={() => handleEdit(todo._id)}>
                                {
                                    todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill>
                                        : <BsCircleFill className="icon" />
                                }
                               <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                            </div>
                            <div>
                                <span><BsFillTrashFill className='icon' onClick={() => handleDelete(todo._id)} /></span>
                            </div>

                        </div>

                    ))
            }
        </div>
    )
}

export default Home
