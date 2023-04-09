import { Tasks } from '../components/task/styles';
import { TTasks } from '../types';

const returnedSubTasksConcluded = (task: TTasks) => {
  const allSubTaskConcluded = task.subTasks.filter((total) => {
    return total.concluded == true;
  });

  return allSubTaskConcluded.length;
};

const returnTasksByStatus = (tasks: TTasks[]) => {
  const tasksConcluidedFilter = tasks.filter((task) => {
    return task.status == 'concluded';
  });

  const tasksPendingFilter = tasks.filter((task) => {
    return task.status == 'pending';
  });

  const tasksProgressFilter = tasks.filter((task) => {
    return task.status == 'progress';
  });

  return { tasksConcluidedFilter, tasksPendingFilter, tasksProgressFilter };
};

export { returnedSubTasksConcluded, returnTasksByStatus };
