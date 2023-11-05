import { useNavigate } from "react-router-dom";
import ToDoForm from "../Components/ToDoForm";
import useRequest from "../hooks/useRequest";

const CreatePage = () => {
  const { sendRequest } = useRequest({
    url: "/api/v1/tasksToDo",
    method: "POST",
  });
  const navigate = useNavigate();

  const onSubmit = (taskName, userName, deadline) => {
    sendRequest([{ taskName, userName, deadline, isCompleted: false }])
      .then(() => navigate("/"))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <ToDoForm onFormSubmit={onSubmit} />
    </div>
  );
};

export default CreatePage;
