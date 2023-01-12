export interface IToDoModel {
  id: string; // uuid
  title: string;
  isCompleted: boolean;
}

export interface IToDoBody {
  title: string;
}

export interface IToDoFactory extends IToDoModel {}
