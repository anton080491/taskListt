import React, { FC } from 'react';
import { Todo } from '../../types/types';
import { useHistory } from 'react-router-dom';
import './todoPageItem.css';

declare var confirm: (question: string) => boolean;

interface TodoPageItemProps {
    todo: Todo;
    changeTodo: (id: number) => void;
    changeDoing: (id: number) => void;
    changeDone: (id: number) => void;
    changeShowingModal: () => void;
}

const TodoPageItem: FC<TodoPageItemProps> = ({ todo, changeTodo, changeDoing, changeDone, changeShowingModal }) => {

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

    const changeShowingDate = (event: React.MouseEvent<HTMLSpanElement>, changeShowingModal) => {
        event.preventDefault();
        const shoudChange = confirm('Are you sure you want to change Date?');
        if (shoudChange) {
            changeShowingModal()
        }
    }

    const changeShowingTime = (event: React.MouseEvent<HTMLSpanElement>, changeShowingModal) => {
        event.preventDefault();
        const shoudChange = confirm('Are you sure you want to change Time?');
        if (shoudChange) {
            changeShowingModal()
        }
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
                    >Todo</span>
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
                            onClick={event => changeShowingDate(event, changeShowingModal)}>{todo.deadLineData}</span> : null
                    }
                    {
                        todo.deadLineTime ? <span className='deadLine'
                            onClick={event => changeShowingTime(event, changeShowingModal)}>{todo.deadLineTime}</span> : null
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