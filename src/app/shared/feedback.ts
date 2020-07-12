export class Feedback {

    firstname: string;
    lastname: string;
    tel: number;
    email: string;
    agree: boolean;
    contacttype: string;
    message: string
}

export const ContactType = ['None', 'tel', 'Email'];