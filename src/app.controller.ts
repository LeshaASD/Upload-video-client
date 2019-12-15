import { Controller, HttpException, HttpStatus, Logger, Post, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UploadVideoMicroservice } from './upload-video.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { FILE_MAX_SIZE } from './constants';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
    constructor(private readonly uploadVideoMicroservice: UploadVideoMicroservice,
                private readonly authService: AuthService) {
    }

    private logger: Logger = new Logger();

    @UseGuards(AuthGuard('local'))
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('add')
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file): Observable<any> {
        if (file.size > FILE_MAX_SIZE) {
            throw new HttpException('File size too large', HttpStatus.PAYLOAD_TOO_LARGE);
        }
        this.logger.log(`Adding new file ${file.originalname}`);

        return this.uploadVideoMicroservice.uploadVideo(file).pipe(
          map(res => {
              this.logger.log(res);
              return res;
          }),
          catchError((err) => {
              this.logger.error(err);
              return err;
          }),
        );
    }
}
