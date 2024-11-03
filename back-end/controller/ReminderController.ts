import { Reminder } from "../model/Reminders";
import { ReminderService } from "../service/ReminderService";

export class ReminderController {
    private reminderService: ReminderService;

    constructor() {
        this.reminderService = new ReminderService();
    }

    async addReminder(data: any): Promise<Reminder> {
        const { reminderId, email, gsmNumber, plantId } = data;
        const newReminder = new Reminder(reminderId, email, gsmNumber, plantId);
        return await this.reminderService.addReminder(newReminder);
    }

    async getReminder(reminderId: number): Promise<Reminder | undefined> {
        return await this.reminderService.getReminder(reminderId);
    }

    async getAllReminders(): Promise<Reminder[]> {
        return await this.reminderService.getAllReminders();
    }

    async updateReminder(reminderId: number, data: any): Promise<Reminder | undefined > {
        return await this.reminderService.updateReminder(reminderId, data);
    }

    async deleteReminder(reminderId: number): Promise<void> {
        return await this.reminderService.deleteReminder(reminderId);
    }

}