
import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import AddTodo from './AddTodo';
import { useFirestore } from "react-redux-firebase";
import {useSelector} from "react-redux";

const ModalExample = (props) => {
  const {
    buttonLabel,
    className
  } = props;

  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  const [presentToDo, setPresentToDo] = useState("");
  const firestore = useFirestore();
  const { uid } = useSelector((state) => state.firebase.auth);
  console.log(useSelector((state) => state.firebase.auth));
  const handleChange = ({ currentTarget: { name, value } }) => {
    if (name === "addTodo") {
      setPresentToDo(value);
    }
  };

  const addNewTodo = (todo) => {
    firestore
      .collection("users")
      .doc(uid)
      .collection("todos")
      .add({
        title: todo,
        isDone: false,
      })
      .then((docRef) => {
        docRef.update(
            {
                todoID: docRef.id
            }
        );
      });

     setPresentToDo("");
  };

  return (
    <div>
      <Button color="success" onClick={toggle} width="50">Add Todo </Button>
      <Modal isOpen={modal} toggle={toggle} className={className}>
        <ModalHeader toggle={toggle}>Add Todo</ModalHeader>
        <ModalBody>
        <form action="">
        <input
          type="text"
          name="addTodo"
          value={presentToDo}
          onChange={handleChange}
        />
       {/* <button
          onClick={(event) => {
            event.preventDefault();
            addNewTodo(presentToDo);
          }}
        >
          Add Todo
        </button>*/}
      </form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={(event) => {
            event.preventDefault();
            addNewTodo(presentToDo);
          }}>Add</Button>{' '}
          <Button color="secondary" onClick={toggle}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default ModalExample;