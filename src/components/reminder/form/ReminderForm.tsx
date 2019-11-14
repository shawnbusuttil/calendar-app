import React, { useReducer } from "react";

import Button from "../../button/Button";
import InputField from "../../input/Input";

import { Reminder } from "../../../models/Reminder";

import { DATE } from "../../../date.const";
import { parseDate, formatDate } from "../../../date.utils";

interface ReminderFormProps {
    submit: (reminder: Reminder) => void;
    reminder?: Reminder;
}

const ReminderForm = (props: ReminderFormProps) => {
    const date = props.reminder && props.reminder.date ? 
        `${DATE.getFullYear()}-${formatDate(props.reminder.date.month)}-${formatDate(props.reminder.date.day)}` 
        : new Date().toISOString().slice(0, 10);
        
    const title = (props.reminder && props.reminder.title) || "";
    const time = (props.reminder && props.reminder.time) || "";
    const text = (props.reminder && props.reminder.text) || "";

    const min = `${DATE.getFullYear()}-01-01`;
    const max = `${DATE.getFullYear()}-12-31`;

    const [state, dispatch] = useReducer(reducer, { title, date, time, text });
    
    const onChange = (e) => {
        dispatch({ field: e.target.name, value: e.target.value })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        const date = state.date.split("-");
        const reminder = {
            id: (props.reminder && props.reminder.id) || Date.now(),
            title: state.title,
            date: {
                month: parseDate(date[1]),
                day: parseDate(date[2])
            },
            time: state.time,
            text: state.text
        }
        props.submit(reminder); 
    }

    return <form data-testid="form" onSubmit={onSubmit}>
        <InputField title="Title" name="title" type="text" value={state.title} handleChange={onChange} isRequired />
        <div className="form-group">
            <InputField title="Date" name="date" type="date" value={state.date} min={min} max={max} handleChange={onChange} isRequired />
            <InputField title="Time" name="time" type="time" value={state.time} handleChange={onChange} isRequired />
        </div>

        <textarea name="text" value={state.text} onChange={onChange} />

        <Button title="Set Reminder" />
    </form>
}

function reducer(state, { field, value }) {
    return {
        ...state,
        [field]: value
    };
}

export default ReminderForm;