import TodoList from "./components/todoList";

export default function Home() {
  return (
    <div className="font-sans flex justify-center items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 ">
      <TodoList />
    </div>
  );
}
