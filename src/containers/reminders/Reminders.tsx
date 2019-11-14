import React, { Fragment, useState } from "react";
import { connect } from "react-redux";

import { MONTHS, DATE } from "../../date.const";

import { State } from "../../models/state";
import { Reminder as R } from "../../models/Reminder";
import { calendarActions } from "../../store/actions";

import Modal from "../../components/modal/Modal";
import Button from "../../components/button/Button";
import Reminder from "../../components/reminder/Reminder";
import ReminderForm from "../../components/reminder/form/ReminderForm";

import "./Reminders.scss";

interface ReminderProps {
    currentDay: number;
    currentMonth: number;
    reminders: R[];
    addReminder: (reminder: R) => void;
    editReminder: (prevReminder: R, newReminder: R) => void;
    deleteReminder: (reminder: R) => void;
}

const Reminders = (props: ReminderProps) => {
    const [newReminder, setNewReminder] = useState(false);
    const [editReminder, setEditReminder] = useState(undefined) as any;

    const headerString = `${props.currentDay} ${MONTHS[props.currentMonth]} ${DATE.getFullYear()}`;

    const addReminder = (reminder) => {
        props.addReminder(reminder);
        setNewReminder(false);
    }

    const updateReminder = (newVal) => {
        props.editReminder(editReminder, newVal);
        setEditReminder(undefined);
    }

    let modalView: any;

    if (newReminder) {
        modalView = <Modal dismiss={() => setNewReminder(false)}>
            <ReminderForm submit={(reminder) => addReminder(reminder)} />
        </Modal>
    }

    if (!!editReminder) {
        modalView = <Modal dismiss={() => setEditReminder(undefined)}>
            <ReminderForm reminder={editReminder}
                submit={(reminder) => updateReminder(reminder)} />
        </Modal>
    }
    
    return <Fragment>
        <div className="reminders">
            <h1>Reminders</h1>
            <h2>{headerString}</h2>
            <div className="reminders-list">
                {props.reminders.map(r => <Reminder key={r.id} title={r.title} time={r.time} text={r.text} 
                    edit={() => setEditReminder(r)} 
                    delete={() => props.deleteReminder(r)} />)
                }
            </div>
            <Button type="button" title="New" handleClick={() => setNewReminder(true)} />
        </div>
        {modalView}
    </Fragment>;
}

const mapStateToProps = (state: State) => {
    let reminders = [];

    let { currentMonth, currentDay } = state;

    if (state.reminders[currentMonth] && state.reminders[currentMonth][currentDay]) {
        reminders = state.reminders[currentMonth][currentDay];
    }

    return { 
        currentMonth,
        currentDay, 
        reminders 
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        addReminder: (reminder: R) => dispatch(calendarActions.addReminder({
            reminder: { id: Date.now(), ...reminder }
        })),
        editReminder: (prevReminder, newReminder) => dispatch(calendarActions.editReminder({
            prevReminder,
            newReminder: { id: prevReminder.id, ...newReminder }
        })),
        deleteReminder: (reminder) => dispatch(calendarActions.deleteReminder(reminder))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Reminders);