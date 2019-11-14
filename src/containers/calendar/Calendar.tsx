import React, { Fragment } from "react";
import { connect } from "react-redux";

import { MONTHS } from "../../date.const";
import { daysInMonth, hasReminders } from "../../date.utils";

import { State } from "../../models/state";
import { calendarActions } from "../../store/actions";

import "./Calendar.scss";

interface CalendarProps {
    currentYear: number;
    currentMonth: number;
    currentDay: number;
    reminders: {};
    setDate: (month: number, day: number) => void;
}

const Calendar = (props: CalendarProps) => {
    const days = daysInMonth(props.currentMonth, props.currentYear);

    const dates = Array.from({ length: days }, (_i, k) => k + 1)
        .map((day) => 
            <div key={day} data-testid="calendar-date" 
                className={["calendar-date", day === props.currentDay ? "current" : null].join(" ")}
                onClick={() => props.setDate(props.currentMonth, day)}>
                {day}{hasReminders(props.reminders, props.currentMonth, day) ? "⏰" : null}
            </div>
        );
    
    return <Fragment>
        <div className="calendar-navigation">
            <button data-testid="prev-month" className="button" onClick={() => props.setDate(props.currentMonth - 1, 1)}>Prev</button>
            <h1 data-testid="current-month">{MONTHS[props.currentMonth]}</h1>
            <button data-testid="next-month" className="button" onClick={() => props.setDate(props.currentMonth + 1, 1)}>Next</button>
        </div>
        <div className="calendar">
            {dates}
        </div>
    </Fragment>
}

const mapStateToProps = (state: State) => {
    return {
        currentYear: state.currentYear,
        currentMonth: state.currentMonth,
        currentDay: state.currentDay,
        reminders: state.reminders
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return { 
        setDate: (month: number, day: number) => {
            if (month < 1 || month > 12) {
                return;
            }
            return dispatch(calendarActions.setDate({ month, day }))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);