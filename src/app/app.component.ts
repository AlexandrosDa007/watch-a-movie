import { Component, OnInit } from '@angular/core';
import { ElectronService } from './core/services';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  movies = [
    {
      id: 'movie_1',
      name: 'movieName',
      description: 'mlsajfalsf',
      airDate: '24/02/2016',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 'movie_2',
      name: 'movieName2',
      description: 'mlsajfalsf',
      airDate: '24/02/2016',
      image: 'https://via.placeholder.com/150',
    }
  ];

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
  ) {
    this.movies.push(...this.movies);
    this.movies.push(...this.movies);
    this.movies.push(...this.movies);
    this.movies.push(...this.movies);
    this.movies.push(...this.movies);
    this.translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron) {
      console.log(process.env);
      console.log('Run in electron');
      console.log('Electron ipcRenderer', this.electronService.ipcRenderer);
      console.log('NodeJS childProcess', this.electronService.childProcess);
    } else {
      console.log('Run in browser');
    }
  }

}
