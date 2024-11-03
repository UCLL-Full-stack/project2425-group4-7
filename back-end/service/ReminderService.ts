import { Reminder } from "../model/Reminders";
import { ReminderRepository } from "../repository/ReminderRepository";

export class ReminderService {
    private reminderRepository: ReminderRepository

    constructor() {
        this.reminderRepository = new ReminderRepository();
    }

    async addReminder(reminder: Reminder): Promise<Reminder> {
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