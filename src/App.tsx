import { useEffect, useState } from "react";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import toast, { Toaster } from "react-hot-toast";

import {
  getTodos,
  deleteToDo,
  updateToDo,
  createToDo,
  IToDoDTO,
} from "./api/toDo";

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

  async function fetchGetToDos() {
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

  async function fetchDeleteToDo(id: string) {
    try {
      await deleteToDo({ id });

      toast.success("Tarefa removida");

      setToDos((toDos) => toDos.filter((toDo) => toDo.id !== id));
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function fetchCheckToDo(id: string, isCompleted: boolean) {
    try {
      await updateToDo({ id, isCompleted });

      toast.success(
        isCompleted
          ? "Tarefa marcada concluída"
          : "Tarefa marcada como NÃO concluída"
      );

      setToDos((toDos) =>
        toDos.map((toDo) =>
          toDo.id === id ? { ...toDo, isCompleted: isCompleted } : toDo
        )
      );
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function fetchCreateToDo(title: string) {
    try {
      const response = await createToDo({ title });

      toast.success("Tarefa foi criada com sucesso!");

      const toDo = response.data.toDo;

      setToDos((toDos) => [...toDos, toDo]);
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    return () => {
      fetchGetToDos();
    };
  }, []);

  return (
    <SkeletonTheme baseColor="#262626" highlightColor="#333333">
      <Header />
      <Container>
        <CreateToDoForm onCreateToDo={fetchCreateToDo} />

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
            <ToDoList
              toDos={toDos}
              onDeleteToDo={fetchDeleteToDo}
              onCheckToDo={fetchCheckToDo}
            />
          )}
        </main>
      </Container>

      <Toaster />
    </SkeletonTheme>
  );
}
