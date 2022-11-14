import { User } from "./user.entity"; 
import { InsertEvent , EventSubscriber, DataSource , EntitySubscriberInterface } from "typeorm"; 

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User>{
    constructor(dataSource: DataSource) {
        dataSource.subscribers.push(this)
    }
    
    listenTo(): string | Function {
        return User
    }

    beforeInsert(event: InsertEvent<User>): void | Promise<any> {
        console.log(`Before User inserted  : ${event.entity}`)
    }
}