export interface Plant {
    _plantId: string;
    _plantType: string;
    _family: string;
    _wateringFreq: string;
    _sunlight: {
      email: boolean;
      sms: boolean;
    };
    _reminders: number;
  }