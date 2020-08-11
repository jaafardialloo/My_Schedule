import React,{useState} from "react";
import { useFirestore } from "react-redux-firebase";
import {useSelector} from "react-redux";
import Modal from "../Components/Modal";

const AddTodo = () => {
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
      <Modal/>
    </div>
  );
};

export default AddTodo;
