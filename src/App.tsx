import { useState } from "react";

import { Container } from "./components/Container";
import { CreateToDoForm } from "./components/CreateToDoForm";
import { Header } from "./components/Header";
import { ToDoList } from "./components/ToDoList";
import { Resume } from "./components/Resume";

interface IToDo {
  id: string;
  title: string;
  isCompleted: boolean;
}

const toDosInitialState: IToDo[] = [
  {
    id: crypto.randomUUID(),
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: false,
  },
  {
    id: crypto.randomUUID(),
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: true,
  },
  {
    id: crypto.randomUUID(),
    title:
      "Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.",
    isCompleted: true,
  },
];

export function App() {
  const [toDos, setToDos] = useState<IToDo[]>(toDosInitialState);

  const amountToDos = toDos.length;
  const completedToDosAmount = toDos.filter((toDo) => toDo.isCompleted).length;

  return (
    <>
      <Header />
      <Container>
        <CreateToDoForm
          onCreateToDo={(newToDo) =>
            setToDos((current) => [...current, newToDo])
          }
        />

        <main style={{ width: "100%" }}>
          <Resume
            amount={amountToDos}
            completedAmount={completedToDosAmount}
            withDivider={amountToDos === 0}
          />
          <ToDoList toDos={toDos} onChangeToDo={setToDos} />
        </main>
      </Container>
    </>
  );
}
