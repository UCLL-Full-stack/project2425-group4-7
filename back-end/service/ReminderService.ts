import { Reminder } from "../model/Reminders";
import { ReminderRepository } from "../repository/ReminderRepository";

export class ReminderService {
    private reminderRepository: ReminderRepository

    constructor() {
        this.reminderRepository = new ReminderRepository();
    }

    async addReminder(reminder: Reminder): Promise<Reminder> {
        if (!reminder.email || reminder.plantId <= 0 || reminder.gsmNumber <= 0) {
            throw new Error("Invalid reminder data. Please provide a valid email, GSM number, and plant ID.");
        }
        return await this.reminderRepository.add(reminder);
    }

    async getReminder(reminderId: number): Promise<Reminder | undefined> {
        return await this.reminderRepository.getById(reminderId);
    }

    async getAllReminders(): Promise<Reminder[]> {
        return await this.reminderRepository.getAll();
    }

    async updateReminder(reminderId: number, data: any): Promise<Reminder | undefined> {
        const existingReminder = await this.getReminder(reminderId);
        if (existingReminder) {
            if (data.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
                throw new Error("Invalid email format.");
            }
            if (data.gsmNumber && data.gsmNumber <= 0) {
                throw new Error("GSM number must be a positive number.");
            }
            if (data.plantId && data.plantId <= 0) {
                throw new Error("Plant ID must be a positive number.");
            }

            existingReminder.email = data.email || existingReminder.email;
            existingReminder.gsmNumber = data.gsmNumber || existingReminder.gsmNumber;
            existingReminder.plantId = data.plantId || existingReminder.plantId;

            return await this.reminderRepository.update(existingReminder);
        }
        return undefined;
    }

    async deleteReminder(reminderId: number): Promise<void> {
        return await this.reminderRepository.delete(reminderId);
    }
}