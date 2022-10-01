import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FirebaseApp, initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';


interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
}

@Injectable()
export class FirebaseService {
    public app: FirebaseApp;
    public auth: Auth

    constructor(private configService: ConfigService<FirebaseConfig>) {
        const firebaseConfig =  {
            apiKey: this.configService.get<string>("apiKey"),
            authDomain: this.configService.get<string>("authDomain"),
            projectId: this.configService.get<string>("projectId"),
            storageBucket: this.configService.get<string>("storageBucket"),
            messagingSenderId: this.configService.get<string>("messagingSenderId"),
            appId: this.configService.get<string>("appId"),
        }

        this.app = initializeApp(firebaseConfig)        
        this.auth = getAuth(this.app);
    }
}
