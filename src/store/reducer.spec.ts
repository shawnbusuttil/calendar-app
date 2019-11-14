import reducer from "./reducer";
import { CALENDAR_ACTION_TYPES } from "./actions";

const initialState = {
	currentYear: 2019,
	currentMonth: 11,
	currentDay: 8,
	reminders: {}
};

describe("reducer", () => {
	it("should set the date correctly", () => {
		const state = reducer(initialState, {
			type: CALENDAR_ACTION_TYPES.setDate,
			payload: {
				month: 12,
				day: 9
			}
		});
		expect(state).toEqual({ ...initialState, currentMonth: 12, currentDay: 9 });
	});

	it("should add a reminder", () => {
		const state = reducer(initialState, {
			type: CALENDAR_ACTION_TYPES.addReminder,
			payload: {
				reminder: { id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" }
			}
		});
		expect(state).toEqual({ ...initialState, reminders: {
			[11]: {
				[8]: [{
					id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" 
				}]
			}
		}});
	});

	it("should edit reminders for the same date", () => {
		const state = reducer({
			...initialState,
			reminders: {
				[11]: {
					[8]: [{
						id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" 
					}]
				}
			}
		}, {
			type: CALENDAR_ACTION_TYPES.editReminder,
			payload: {
				prevReminder: { id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" },
				newReminder: { id: 1, title: "Foo Bar", date: { month: 11, day: 8 }, time: "12:00" }
			}
		});
		expect(state).toEqual({ ...initialState, reminders: {
			[11]: {
				[8]: [{
					id: 1, title: "Foo Bar", date: { month: 11, day: 8 }, time: "12:00" 
				}]
			}
		}});
	});

	it("should edit reminders for different days", () => {
		const state = reducer({
			...initialState,
			reminders: {
				[11]: {
					[8]: [{
						id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" 
					}]
				}
			}
		}, {
			type: CALENDAR_ACTION_TYPES.editReminder,
			payload: {
				prevReminder: { id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" },
				newReminder: { id: 1, title: "Foo Bar", date: { month: 11, day: 9 }, time: "12:00" }
			}
		});
		expect(state).toEqual({ ...initialState, reminders: {
			[11]: {
				[9]: [{
					id: 1, title: "Foo Bar", date: { month: 11, day: 9 }, time: "12:00" 
				}]
			}
		}});
	});

	it("should edit reminders for different months", () => {
		const state = reducer({
			...initialState,
			reminders: {
				[11]: {
					[8]: [{
						id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" 
					}]
				}
			}
		}, {
			type: CALENDAR_ACTION_TYPES.editReminder,
			payload: {
				prevReminder: { id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" },
				newReminder: { id: 1, title: "Foo Bar", date: { month: 12, day: 8 }, time: "12:00" }
			}
		});
		expect(state).toEqual({ ...initialState, reminders: {
			[11]: {},
			[12]: {
				[8]: [{
					id: 1, title: "Foo Bar", date: { month: 12, day: 8 }, time: "12:00" 
				}]
			}
		}});
	});

	it("should delete reminders", () => {
		const state = reducer({
			...initialState,
			reminders: {
				[11]: {
					[8]: [{
						id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" 
					}]
				}
			}
		}, {
			type: CALENDAR_ACTION_TYPES.deleteReminder,
			payload: {
				id: 1, title: "Foo", date: { month: 11, day: 8 }, time: "12:00" }
			}
		);
		expect(state).toEqual({ ...initialState, reminders: {
			[11]: {
				[8]: undefined
			}
		}});
	});
});