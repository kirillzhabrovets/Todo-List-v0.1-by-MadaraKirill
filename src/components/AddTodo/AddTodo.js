import React, { useState } from 'react';
import {v4 as uuid} from'uuid';
import { Row, Col, Button, FormControl, Container } from 'react-bootstrap';
import s from './AddTodo.module.css';




function AddTodo({todo, setTodo}) {

  const [value, setValue] = useState('')

    function saveTodo() {
      if(value){
      setTodo(
        [...todo, {
          id: uuid(),
          title: value,
          status: true
        }]
      )
      setValue('')
      }
}

    return (
      <Container>
        <Row>
          <Col className={s.AddTodoForm}>
            <FormControl className="form-control" type="text" aria-label="default input example" placeholder='Введите новую задачу' value={value} onChange={ (e) =>setValue(e.target.value) }/>
            <Button className='btn btn-success s.btn'  onClick={saveTodo}>Добавить</Button>
          </Col>
        </Row>
      </Container>
    )
  }

export default AddTodo