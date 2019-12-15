import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Injectable()
export class UploadVideoMicroservice {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.TCP,
            options: {
                host: '127.0.0.1',
                port: 8585,
            },
        });
    }

    public uploadVideo(data: any): Observable<any> {
        return this.client.send<any>('upload', data);
    }
}
