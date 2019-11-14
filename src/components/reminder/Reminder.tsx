import React from "react";

import "./Reminder.scss";

interface ReminderProps {
    title: string;
    time: string;
    text: string;
    edit: () => void;
    delete: () => void;
}

const Reminder = (props: ReminderProps) => {
    return <div className="reminder" data-testid="reminder">
        <div className="reminder-header">
            <h3 data-testid="title">{props.title}</h3>
            <h3 data-testid="time">{props.time}</h3>
        </div>
        <div className="reminder-content">
            <p data-testid="text">{props.text}</p>
        </div>
        <div className="reminder-footer">
            <button data-testid="edit" className="button" onClick={props.edit}>Edit</button>
            <button data-testid="delete" className="button" onClick={props.delete}>Remove</button>
        </div>
    </div>
}

export default Reminder;