import { MiddlewareConsumer, Module, NestModule , RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { LoggerMiddleware } from './logger.middleware';
import UserController from './user/user.controller';
import { verifyRequestBody } from './verifier.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      username: "postgres",
      password: "2421994adeADE",
      database: "iostagingdb",
      port: 5432,
      synchronize: true, 
      retryDelay: 5000,
      retryAttempts: 8,
      autoLoadEntities: true, 
     // entities : [User]
    }),
    MongooseModule.forRoot("mongodb://localhost/gentro_test")
  ],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware , verifyRequestBody)
      .exclude("users/(.*)")
      .forRoutes({
        path: "users",
        method: RequestMethod.POST
      }) 
       //.forRoutes(UserController)
  }
}
