import { MiddlewareConsumer, Module, NestModule , RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './logger.middleware';
import UserController from './user/user.controller';
import { verifyRequestBody } from './verifier.middleware';

@Module({
  imports: [UserModule],
  controllers: [AppController],
  providers: [AppService ],
})
export class AppModule implements NestModule{
  async configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware , verifyRequestBody)
      .exclude("users/(.*)")
      // .forRoutes({
      //   path: "users",
      //   method: RequestMethod.POST
      // }) 
       .forRoutes(UserController)
  }
}
