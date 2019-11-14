import { Reminder } from "../models/Reminder";

export const CALENDAR_ACTION_TYPES = {
    setDate: "[Calendar] Set Date",
    addReminder: "[Calendar] Add Reminder",
    editReminder: "[Calendar] Edit Reminder",
    deleteReminder: "[Calendar] Delete Reminder"
}

export const calendarActions = {
    setDate(payload: { month: number, day: number }) {
        return {
            type: CALENDAR_ACTION_TYPES.setDate,
            payload
        }
    },
    addReminder(payload: { reminder: Reminder }) {
        return {
            type: CALENDAR_ACTION_TYPES.addReminder,
            payload
        }
    },
    editReminder(payload: { prevReminder: Reminder, newReminder: Reminder }) {
        return {
            type: CALENDAR_ACTION_TYPES.editReminder,
            payload
        }
    },
    deleteReminder(payload: Reminder) {
        return {
            type: CALENDAR_ACTION_TYPES.deleteReminder,
            payload
        }
    }
}