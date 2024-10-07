import { Module } from '@nestjs/common';
import { NotificationModule } from './notification/notification.module';
import { ConfigModule } from '@nestjs/config';
import { EurekaModule } from 'nestjs-eureka';

@Module({
  imports: [
    NotificationModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    //   EurekaModule.forRoot({
    //     eureka: {
    //       host: 'localhost',
    //       port: '8761',
    //       registryFetchInterval: 1000,
    //       servicePath: '/eureka/apps/',
    //       maxRetries: 3,
    //     },
    //     service: {
    //       name: 'PFINANCE-NOTIFICATION',
    //       port: 3000,
    //     },
    //   }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
