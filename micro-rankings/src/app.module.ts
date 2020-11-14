import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { RankingsModule } from './rankings/rankings.module';
import { ClientProxyModule } from './shared/modules/client-proxy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }),
    ClientProxyModule,
    RankingsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
