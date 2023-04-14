import React, {useEffect, useState} from 'react';
import { Row, Col, Button, ButtonGroup } from 'react-bootstrap';
import s from './TodoList.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTrash, faPenToSquare, faLock, faLockOpen} from '@fortawesome/free-solid-svg-icons';

function TodoList({ todo, setTodo }) {

    const [edit, setEdit] = useState(null)
    const [value, setValue] = useState('')
    const [filtered, setFiltered] = useState(todo)

    useEffect( ()=> {
        setFiltered(todo)
    }, [todo])
    
    function todoFilter (status) {
        if(status === 'all') {
            setFiltered(todo)
        } else {
            let newTodo =[...todo].filter( item => item.status === status)
            setFiltered(newTodo)
        }
    }

    function deleteTodo(id) {
        let newTodo = [...todo].filter(item=> item.id!==id)
        setTodo(newTodo)
    }

    function statusTodo (id){
        let newTodo = [...todo].filter(item => {
            if(item.id === id){
                item.status = !item.status
            }
            return item
        })
        setTodo(newTodo)
    }

    function editTodo (id, title) {
        setEdit(id)
        setValue(title)
    }
    
    function saveTodo(id) {
        let newTodo = [...todo].map(item => {
            if(item.id === id) {
                item.title = value
            }
            return item
        })
        setEdit(null)
    }
    
  return (
    <div>
        <Row>
            <Col className={s.filter}>
                <ButtonGroup className={s.btns} class="btn-group" role="group" aria-label="Basic outlined example">
                    <Button type="button" class="btn btn-outline-primary" onClick={ ()=>todoFilter('all')}>Все</Button>
                    <Button type="button" class="btn btn-outline-primary" onClick={ ()=>todoFilter('true')}>Открытые</Button>
                    <Button type="button" class="btn btn-outline-primary" onClick={ ()=>todoFilter('false')}>Закрытые</Button>
                </ButtonGroup>
            </Col>
        </Row>
       
        {
            filtered.map( item => (
                <div key={item.id} className={s.listItems}>
                    {
                        edit === item.id ?
                            <div>
                                <input  value={value} onChange={(e)=> setValue(e.target.value)} />
                            </div>
                                :
                                <div className={!item.status ? s.close : ''}>{item.title }</div>
                    }
                    {
                        edit === item.id ?
                        <div>
                            <Button onClick={ ()=> saveTodo(item.id)}><FontAwesomeIcon icon= { faSave } /></Button>
                        </div>
                            :
                            <div>
                                <Button size="sm" onClick={ ()=>statusTodo(item.id)}>
                                    {
                                        item.status ? <FontAwesomeIcon icon={faLock} /> : <FontAwesomeIcon icon={faLockOpen} />
                                    }
                                </Button>
                                <Button className={s.btn} size="sm" onClick={ ()=>editTodo(item.id, item.title)}><FontAwesomeIcon icon={faPenToSquare} /></Button>
                                <Button className={s.btn} size="sm" onClick={ ()=>deleteTodo(item.id)}><FontAwesomeIcon icon={faTrash} beat style={{color: "#6795e4",}} /></Button>
                            </div>
                    }
                    
                </div>
            ))
        }
    </div>
  )
}

export default TodoList