export type Plant = {
    plantType: string;
    family: string;
    wateringFreq: string;
    sunlight: string;
    reminders: {
        email: boolean;
        sms: boolean;
    };
};