import { Injectable } from "@nestjs/common";

@Injectable()
export class CategoryManager {
    logName() {
        console.log("I have a name")
    }
}