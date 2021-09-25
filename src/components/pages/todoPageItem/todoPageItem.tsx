import React, { FC } from 'react';
import { Todo } from '../../types/types';
import { useHistory } from 'react-router-dom';
import './todoPageItem.css';


interface TodoPageItemProps {
    todo: Todo | undefined;
    changeTodo: (id: number) => void;
    changeDoing: (id: number) => void;
    changeDone: (id: number) => void;
    sendId: (id: number) => void;
    setShowModal: () => void;
}

const TodoPageItem: FC<TodoPageItemProps> = ({ todo, changeTodo, changeDoing, changeDone, sendId, setShowModal }) => {

    const history = useHistory()

    if (todo == null) {
        return <div style={{ textAlign: "center" }}>Add some tasks</div>
    }

    const ChangeTodoStatus = (event: React.MouseEvent<HTMLSpanElement>, id: number) => {
        changeTodo(id)
    }
    const ChangeDoingStatus = (event: React.MouseEvent<HTMLSpanElement>, id: number) => {
        changeDoing(id)
    }
    const ChangeDoneStatus = (event: React.MouseEvent<HTMLSpanElement>, id: number) => {
        changeDone(id)
    }

    const ChangeDate = (event: React.MouseEvent<HTMLSpanElement>, id: number) => {
        event.preventDefault();
        sendId(id);
        setShowModal();
    }

    return (
        <React.Fragment>
            <div className='todoPageItem'>
                <h2>{todo.name}</h2>
                <div className='todoPageItem__desc'>{todo.description}</div>
                <div className='marginTop'>
                    <span

                        style={{ background: todo.todo ? 'red' : 'white' }}
                        onClick={event => ChangeTodoStatus(event, todo.id)}
                    >To do</span>
                    <span

                        style={{ background: todo.doing ? '#00AF64' : 'white' }}
                        onClick={event => ChangeDoingStatus(event, todo.id)}
                    >Doing</span>
                    <span
                        style={{ background: todo.done ? '#66A3D2' : 'white' }}
                        onClick={event => ChangeDoneStatus(event, todo.id)}
                    >Done</span>
                    {
                        todo.deadLineData ? <span className='deadLine'
                            onClick={event => ChangeDate(event, todo.id)}
                            data-title="click to change date"
                        >{todo.deadLineData}</span> : null
                    }
                    {
                        todo.deadLineTime ? <span className='deadLine'
                            onClick={event => ChangeDate(event, todo.id)}
                            data-title="click to change time"
                        >{todo.deadLineTime}</span> : null
                    }
                    <span className='back'
                        style={{ cursor: "pointer" }}
                        onClick={() => history.push('/')}
                    > Back</span>
                </div>
            </div>


        </React.Fragment>
    )
}

export default TodoPageItem;
