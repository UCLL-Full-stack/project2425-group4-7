import { Reminder } from "../model/Reminders";

export class ReminderRepository {
    private reminders: Reminder[]= [];

    async add(reminder: Reminder): Promise<Reminder> {
        this.reminders.push(reminder);
        return reminder;
    }

    async getById(reminderId: number): Promise<Reminder | undefined> {
        return this.reminders.find(r => r.reminderId === reminderId);
    }

    async getAll(): Promise<Reminder[]> {
        return this.reminders;
    }

    async update(reminder: Reminder): Promise<Reminder> {
        return reminder
    }

    async delete(reminderId: number): Promise<void> {
        this.reminders = this.reminders.filter(r => r.reminderId !== reminderId);
    }

}