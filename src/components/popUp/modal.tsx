import React, { FC } from 'react';
import { useState } from 'react';
import './modal.css';

declare var confirm: (question: string) => boolean

interface ModalProps {
    showModal: boolean;
    setShowModal: () => void;
    setNewTimeAndDate: (date: string, time: string) => void;
}

const Modal: FC<ModalProps> = ({ showModal, setShowModal, setNewTimeAndDate }) => {

    const [date, setDate] = useState<string>('');
    const [time, setTime] = useState<string>('');

    const changeDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDate(event.target.value)
    }

    const changeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTime(event.target.value)
    }

    const changeData = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const shoudChange = confirm('Are you sure you want to change date and time?');
        if (shoudChange) {
            if (date !== '' || time !== '') {
                setNewTimeAndDate(date, time);
                setDate('');
                setTime('');
                setShowModal();
            } else {
                setShowModal();
            }
        } else {
            setShowModal();
        }

    }

    return (
        <React.Fragment>
            <div className={showModal ? "showModal active" : "showModal"}>
                <div className="modal__content"
                    onClick={(e) => e.stopPropagation()}>
                    <div className="modal__inputs">
                        <label htmlFor="setDeadlineData">
                            Dead Line Data:&nbsp;
                            <input
                                type="date"
                                name="setDeadlineData"
                                id="setDeadlineData"
                                placeholder="Enter deadline .."
                                className='modal__input'
                                onChange={changeDate}
                                value={date}
                            />
                        </label>

                        <label htmlFor="setDeadlineTime">
                            Dead Line Time:&nbsp;
                            <input
                                type="time"
                                name="setDeadlineTime"
                                id="setDeadlineTime"
                                placeholder="Enter deadline .."
                                className='modal__input'
                                onChange={changeTime}
                                value={time}
                            />
                        </label>
                    </div>
                    <div className="modal__btns">
                        <button onClick={changeData}>Save changes</button>
                        <button onClick={setShowModal}>Back</button>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )

}


export default Modal;
