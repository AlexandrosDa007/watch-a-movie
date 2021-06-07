import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { ServerConfig } from '../models/server-config';
import { SettingsService, SubtitleFontSize } from '../services/settings.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  serverConfig: ServerConfig;
  constructor(
    private settingsService: SettingsService,
  ) { }

  destroy$ = new EventEmitter();

  ngOnInit(): void {
    this.settingsService.getServerConfig().pipe(takeUntil(this.destroy$))
      .subscribe(serverConfig => {
        this.serverConfig = serverConfig;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.emit();
  }

  changeSubtitleSize(size: SubtitleFontSize): void {
    this.settingsService.setSubtitleSize(size);
  }

  changeSettings(): void {
    this.settingsService.setServerConfig(this.serverConfig);
  }
}
