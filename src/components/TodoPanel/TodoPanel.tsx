import React from 'react';
import { Button } from '../Button/Button';
import styles from '../../blocks/todoPanel/TodoPanel.module.css';

interface AddTodoPanelProps {
  mode: 'add';
  addTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}
interface EditTodoPanelProps {
  mode: 'edit';
  editTodo: Omit<Todo, 'id' | 'checked'>;
  changeTodo: ({ name, description }: Omit<Todo, 'id' | 'checked'>) => void;
}
type TodoPanelProps = AddTodoPanelProps | EditTodoPanelProps;

const DEFAULT_TODO = { name: '', description: '' };
export const TodoPanel: React.FC<TodoPanelProps> = (props) => {
  const isEdit = props.mode === 'edit';
  const [todo, setTodo] = React.useState(isEdit ? props.editTodo : DEFAULT_TODO);
  
  const onClick = () => {
    if (isEdit) {
      return props.changeTodo(todo);
    }
    props.addTodo(todo);
    setTodo(DEFAULT_TODO);
  };

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    setTodo({ ...todo, [name]: value });
  };

  return (
    <div className={styles.todo_panel_container}>
      <div className={styles.fields_container}>
        <div className={styles.field_container}>
          <label htmlFor='name'>
            <div>Название</div>
            <input autoComplete='off' id='name' value={todo.name} onChange={onChange} name='name' />
          </label>
        </div>
        <div className={styles.field_container}>
          <label htmlFor='description'>
            <div>Описание</div>
            <input
              autoComplete='off'
              id='description'
              value={todo.description}
              onChange={onChange}
              name='description'
            />
          </label>
        </div>
      </div>
      <div className={styles.button_container}>
        {!isEdit && (
          <Button color='blue' onClick={onClick}>
            Добавить
          </Button>
        )}
        {isEdit && (
          <Button color='orange' onClick={onClick}>
            EDIT
          </Button>
        )}
      </div>
    </div>
  );
};
