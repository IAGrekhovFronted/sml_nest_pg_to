import { Injectable } from "@nestjs/common";

@Injectable()
export class Notification {
    async sendMail(subject:string, message: string, userEmail: string) {
        console.log(`${subject} - ${message}`)
    }
}