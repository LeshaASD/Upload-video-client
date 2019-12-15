import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UploadVideoMicroservice } from './upload-video.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
    imports: [AuthModule, UsersModule],
    controllers: [AppController],
    providers: [UploadVideoMicroservice],
})
export class AppModule {
}
