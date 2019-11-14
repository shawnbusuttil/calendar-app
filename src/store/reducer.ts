import { CALENDAR_ACTION_TYPES } from "./actions";

import { DATE } from "../date.const";

export const initialState = {
    currentYear: DATE.getFullYear(),
    currentDay: DATE.getDate(),
    currentMonth: DATE.getMonth() + 1,
    reminders: {}
}

export const reducer = (state = initialState, action: { type: string; payload?: any }) => {
    switch (action.type) {
        case CALENDAR_ACTION_TYPES.setDate: {
            return {
                ...state,
                currentDay: action.payload.day,
                currentMonth: action.payload.month
            };
        }
        case CALENDAR_ACTION_TYPES.addReminder: {
            let { month, day } = action.payload.reminder.date;
            let remindersByDay = [];

            if (state.reminders[month]) {
                remindersByDay = state.reminders[month][day] || [];
            } else {
                remindersByDay = [];
            }

            const updatedReminders = [...remindersByDay, action.payload.reminder];
            
            updatedReminders.sort((a, b) => a.time < b.time ? -1 : 1);

            return {
                ...state,
                reminders: {
                    ...state.reminders,
                    [month]: {
                        ...state.reminders[month],
                        [day]: updatedReminders
                    }
                }
            };
        }
        // behaves differently depending on whether we are editing in the same day, same month or entirely different
        // we need to check if days or months are empty to initiate garbage collection for edit and delete operations
        case CALENDAR_ACTION_TYPES.editReminder: {
            const prevRem = action.payload.prevReminder;
            const newRem = action.payload.newReminder;

            const prevMonth = prevRem.date.month;
            const newMonth = newRem.date.month;

            const prevDay = prevRem.date.day;
            const newDay = newRem.date.day;

            let oldReminders = state.reminders[prevMonth][prevDay];
            const index = oldReminders.findIndex((r: any) => r.id === prevRem.id);

            oldReminders = [
                ...oldReminders.slice(0, index), 
                ...oldReminders.slice(index + 1, oldReminders.length)
            ];

            let updatedDates = {};
            
            // check if same day and same month - in that case, we remove nothing
            if (prevMonth === newMonth && prevDay === newDay) {
                updatedDates = {
                    [newMonth]: {
                        ...state.reminders[newMonth],
                        [newDay]: [...oldReminders, newRem].sort((a, b) => a.time < b.time ? -1 : 1)
                    }
                }
            } else {
                let newReminders = (state.reminders[newMonth] && state.reminders[newMonth][newDay]) || [];

                newReminders = [...newReminders, newRem];
                newReminders.sort((a, b) => a.time < b.time ? -1 : 1);

                if (prevMonth === newMonth) {
                    updatedDates = {
                        [newMonth]: {
                            ...state.reminders[newMonth],
                            [prevDay]: oldReminders.length > 0 ? oldReminders : undefined,
                            [newDay]: newReminders
                        }
                    }
                } else {
                    updatedDates = {
                        [prevMonth]: {
                            ...state.reminders[prevMonth],
                            [prevDay]: oldReminders.length > 0 ? oldReminders : undefined
                        },
                        [newMonth]: {
                            ...state.reminders[newMonth],
                            [newDay]: newReminders
                        }
                    }
                }
            }
            return {
                ...state,
                reminders: {
                    ...state.reminders,
                    ...updatedDates
                }
            }
        }
        case CALENDAR_ACTION_TYPES.deleteReminder: {
            const { month, day } = action.payload.date;
            const reminders = state.reminders[month][day];

            const index = reminders.findIndex(r => r.id === action.payload.id);

            const updatedReminders = [...reminders.slice(0, index), ...reminders.slice(index + 1, reminders.length)];

            return {
                ...state,
                reminders: {
                    ...state.reminders,
                    [month]: {
                        ...state.reminders[month],
                        [day]: updatedReminders.length > 0 ? updatedReminders : undefined
                    }
                }
            }
        }

        default:
            return state;
    }
}

export default reducer;