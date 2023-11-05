import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";

const MainPage = () => {
  const navigate = useNavigate();
  const { error, loading, response, resendRequest } = useFetch({
    url: "/api/v1/tasksToDo",
    method: "GET",
  });
  const { sendRequest: updateRequest } = useRequest({ method: "PUT" });
  const { sendRequest } = useRequest({ method: "DELETE" });

  const toDoList =
    response?.items.map((task) => {
      return {
        taskName: task.taskName,
        userName: task.userName,
        deadline: task.deadline,
        isCompleted: task.isCompleted,
        id: task._uuid,
      };
    }) || [];

  const onDelete = (taskId) => {
    sendRequest(null, `api/v1/tasksToDo/${taskId}`).then(() => resendRequest());
  };

  const handleTaskCompletion = (taskId) => {
    updateRequest(
      {
        isCompleted: true,
      },
      `api/v1/tasksToDo/${taskId}`
    ).then(() => resendRequest());
  };

  //loading spinner
  if (loading) {
    return (
      <div className="App">
        <header className="App-header">
          <h1>ToDo App</h1>
          <button onClick={() => navigate("/create")}>Create Task</button>
        </header>
        <main className="App-main">
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        </main>
      </div>
    );
  }

  //error
  if (error) return <p>{error}</p>;

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo App</h1>
        <button onClick={() => navigate("/create")}>Create Task</button>
      </header>

      <main className="App-main">
        <div className="task-list">
          {toDoList.map((tasksToDo) => (
            <div className="task-item" key={tasksToDo.id}>
              <h3>Task: {tasksToDo.taskName}</h3>
              <h3>Task for: {tasksToDo.userName}</h3>
              {tasksToDo.deadline && <h3>deadline: {tasksToDo.deadline}</h3>}
              <Link to={`/update/${tasksToDo.id}`}>Edit</Link>
              <p
                style={{
                  color: tasksToDo.isCompleted ? "green" : "red"
                }}
              >
                Status: {tasksToDo.isCompleted ? "Completed" : "Yet To Complete"}
              </p>

              <button onClick={() => handleTaskCompletion(tasksToDo.id)}>
                Complete Task
              </button>
              <button onClick={() => onDelete(tasksToDo.id)}>Delete</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default MainPage;
