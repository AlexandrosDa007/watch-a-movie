import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ServerConfig } from '../models/server-config';

export type SubtitleFontSize = 'small' | 'medium' | 'large';

@Injectable({
    providedIn: 'root'
})
export class SettingsService {

    private serverConfig$: BehaviorSubject<ServerConfig> = new BehaviorSubject<ServerConfig>({
        port: 3100,
        host: 'http://localhost',
    });

    private subtitleSize$: BehaviorSubject<SubtitleFontSize> = new BehaviorSubject<SubtitleFontSize>('medium');

    constructor() {
        const host = localStorage.getItem('host');
        const port = localStorage.getItem('port');
        if (!host || !port) {
            this.setServerConfig({
                port: 3100,
                host: 'http://localhost',
            })
        } else {
            const serverConfig: ServerConfig = {
                port: Number.parseInt(port),
                host,
            };
            this.serverConfig$.next(serverConfig);
        }
    }


    getServerConfigOnce(): ServerConfig {
        return this.serverConfig$.value;
    }

    getServerConfig(): Observable<ServerConfig> {
        return this.serverConfig$;
    }

    setServerConfig(serverConfig: ServerConfig): void {
        localStorage.setItem('host', serverConfig.host);
        localStorage.setItem('port', serverConfig.port+'');
        this.serverConfig$.next(serverConfig);
    }

    setSubtitleSize(size: SubtitleFontSize): void {
        localStorage.setItem('subtitleSize', size);
        this.subtitleSize$.next(size);
    }

    getSubtitleSize(): Observable<SubtitleFontSize> {
        return this.subtitleSize$;
    }
}
