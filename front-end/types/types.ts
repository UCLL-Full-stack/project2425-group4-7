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

  export type User = {
    username: string;
    password: string;
    email?: string;
    profile?: Profile;
};

export type Profile = {
    firstName?: string;
    lastName?: string;
    phoneNumber?: string;
    user: User;
}