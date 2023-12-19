import { ChangeEvent, FormEvent, useState } from 'react';
import { TaskItem } from '../components/TaskItem';
import { Empty } from '../components/Empty';

import styles from '../styles/CreateTask.module.css';
import { PlusCircle } from '@phosphor-icons/react';

export interface TaskType {
  id: number;
  title: string;  
  done: boolean;
}

export function CreateTask() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const taskCounter = tasks.length;

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.done) {
      return prevValue + 1
    }

    return prevValue
  }, 0)
  
  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    if (!newTaskText) {
      return
    }

    const newTask: TaskType = {
      id: new Date().getTime(),
      title: newTaskText,
      done: false,
    }
    
    setTasks((state) => [...state, newTask]);
    setNewTaskText('');
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');

    setNewTaskText(event.target.value);
  }
  
  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter((task) => task.id !== id)

    if (!confirm('Deseja mesmo apagar essa tarefa?')) {
      return
    }

    setTasks(filteredTasks)
  }

  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, done: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <div>
      <form onSubmit={handleCreateNewTask} className={styles.add}>
        <input 
          value={newTaskText} 
          onChange={handleNewTaskChange}
          placeholder='Adicione uma nova tarefa'
        />
        <button type='submit'>
          Criar
          <PlusCircle size={16} color="#f2f2f2" weight="bold" />
        </button>
      </form>

      <div className={styles.wrapper}>
        <div className={styles.createdWrapper}>
          <strong className={styles.created}>Tarefas Criadas</strong>
          <strong className={styles.count}>{taskCounter}</strong>
        </div>

        <div className={styles.doneWrapper}>
          <strong className={styles.done}>Concluídas</strong>
          <strong className={styles.count}>{taskCounter === 0
            ? taskCounter
            : `${checkedTasksCounter} de ${taskCounter}`}</strong>
        </div>
      </div>

      <div className={styles.taskListWrapper}>
      {taskCounter > 0 ? (
            <div>
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
      </div>
    </div>
  )
}