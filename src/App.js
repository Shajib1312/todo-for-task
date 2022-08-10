import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Todo from "./Components/Todo";
import { db } from "./firebase";
const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center p-2 text-gray-800`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-zinc-300 text-zinc-800`,
  count: `text-center p-2`,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  // create todo

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please Enter A Task to Todo");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
    });
    setInput("");
  };

  // read todo from firebase
  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todoArr = [];
      querySnapshot.forEach((doc) => {
        todoArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArr);
    });
    return () => unsubscribe;
  }, []);

  // update todo from firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };
  // delete todo
  const deleteTodo = async (id) =>{
    await deleteDoc(doc(db,'todos',id))
  }

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={style.input}
            type="text"
            placeholder="Add Todo"
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete} deleteTodo={deleteTodo} />
          ))}
        </ul>
        {todos.length < 1 ? null : (
          <p className={style.count}>{`You Have ${todos.length} Tasks`}</p>
        )}
      </div>
    </div>
  );
}

export default App;
