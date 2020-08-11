import React from "react";
import { useSelector } from "react-redux";
import AddTodo from "../Components/AddTodo";
import { useFirestoreConnect } from "react-redux-firebase";
import ToDoItem from "../Components/TodoItem";
import { ListGroup, ListGroupItem } from 'reactstrap';


const Todos = () => {
  const { displayName, uid } = useSelector((state) => state.firebase.auth);
  useFirestoreConnect({
    collection: `users/${uid}/todos`,
    storeAs: "todos",
  });
  const todos = useSelector((state) => state.firestore.data.todos);
  console.log(todos);
  return (
    <div>
      <h3>Hello {displayName}</h3>
      <AddTodo />
      <br></br>
<div style={{display: "grid", grid: "150px / auto auto auto",marginLeft:"75px",marginTop:"80px"}}>
<div style={{backgroundColor:"green"}}>
      <h3>Todo</h3>
    <ListGroup>
    {todos &&
          Object.values(todos).filter((todof)=>todof.isDone==false).map((todo) => (
            <ListGroupItem>
              <ToDoItem
                title={todo.title}
                isDone={todo.isDone}
                todoID={todo.todoID}
              />
            </ListGroupItem>
          ))}
    </ListGroup>
      </div>

<div style={{
  backgroundColor:"green",padding:"50"}}>
        <h3>Done</h3>
    <ListGroup>
          {todos &&
                Object.values(todos).filter((todof)=>todof.isDone==true).map((todo) => (
                  <ListGroupItem>
                    <ToDoItem
                      title={todo.title}
                      isDone={todo.isDone}
                      todoID={todo.todoID}
                    />
                  </ListGroupItem>
                ))}
    </ListGroup>
      </div>



      <div style={{
  backgroundColor:"green",padding:"50"}}>
        <h3>Doing</h3>
    <ListGroup>
          {todos &&
                Object.values(todos).filter((todof)=>todof.isDone==true).map((todo) => (
                  <ListGroupItem>
                    <ToDoItem
                      title={todo.title}
                      isDone={todo.isDone}
                      todoID={todo.todoID}
                    />
                  </ListGroupItem>
                ))}
    </ListGroup>
      </div>

      </div>

    </div>
  );
};

export default Todos;
