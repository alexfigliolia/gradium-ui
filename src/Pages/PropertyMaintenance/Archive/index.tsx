import { DataViewer } from "Components/DataViewer";
import { archive, TasksArchive, useTasksArchive } from "State/TasksArchive";
import { Search } from "./Search";
import { TaskList } from "./TaskList";
import "./styles.scss";

export const Archive = () => {
  const open = useTasksArchive(archive);
  return (
    <DataViewer
      open={open}
      className="archive"
      close={TasksArchive.archive.close}>
      <h2>Task Archive</h2>
      <p>
        Here you&apos;ll find tasks that have been completed beyond a 30 day
        window
      </p>
      <Search />
      <TaskList />
    </DataViewer>
  );
};
