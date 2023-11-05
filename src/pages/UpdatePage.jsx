import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import useRequest from "../hooks/useRequest";
import ToDoForm from "../Components/ToDoForm";

const UpdatePage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const { response, loading, error } = useFetch({
    url: `/api/v1/tasksToDo/${taskId}`,
    method: "GET",
  });

  const { sendRequest } = useRequest({
    url: `/api/v1/tasksToDo/${taskId}`,
    method: "PUT",
  });
  const onSubmit = (taskName, userName, deadline) => {
    sendRequest({ taskName, userName, deadline })
      .then(() => navigate("/"))
      .catch((err) => console.log({ err }));
  };

  //loading spinner
  if (loading && !response) {
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
  if (error || !response) return <p>{error}</p>;

  return (
    <ToDoForm
      onFormSubmit={onSubmit}
      taskName={response.taskName}
      userName={response.userName}
      deadline={response.deadline}
    />
  );
};

export default UpdatePage;
