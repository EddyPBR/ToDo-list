import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

import { getTodos, IToDoDTO } from "./api/toDo";

import { Container } from "./components/Container";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import { Resume } from "./components/Resume";

export function App() {
  const [toDos, setToDos] = useState<IToDoDTO[]>([]);
  const [isLoadingToDos, setIsLoadingToDos] = useState(false);

  const amountToDos = toDos.length;
  const completedToDosAmount = toDos.filter((toDo) => toDo.isCompleted).length;

  async function loadTodos() {
    try {
      setIsLoadingToDos(true);
      const response = await getTodos();
      const toDos = response.data.toDos;
      setToDos(toDos);
    } catch (error: any) {
      toast.success(error.message);
    } finally {
      setIsLoadingToDos(false);
    }
  }

  useEffect(() => {
    return () => {
      loadTodos();
    };
  }, []);

  return (
    <SkeletonTheme baseColor="#262626" highlightColor="#333333">
      <Header />
      <Container>
        <CreateToDoForm
          onCreateSuccess={(newToDo) =>
            setToDos((current) => [...current, newToDo])
          }
        />

        <main style={{ width: "100%" }}>
          <Resume
            amount={amountToDos}
            completedAmount={completedToDosAmount}
            withDivider={!isLoadingToDos && amountToDos === 0}
          />

          {isLoadingToDos ? (
            <Skeleton
              count={3}
              height={58}
              borderRadius={8}
              style={{ marginBottom: "0.7rem" }}
            />
          ) : (
            <ToDoList toDos={toDos} onChangeToDo={setToDos} />
          )}
        </main>
      </Container>

      <Toaster />
    </SkeletonTheme>
  );
}
