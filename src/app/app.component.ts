import { AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

import { filter } from 'rxjs/operators';

declare const gtag: any

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'frontend-time';

  constructor(private router: Router) { }

  ngAfterViewInit(): void {

  }

  googleAnalytics() {

    const navEndEvents$ = this.router.events.pipe(filter((event) => event instanceof NavigationEnd));

    navEndEvents$.subscribe((event: any) => {
      gtag('config', 'G-MCFCGQJTF7', {
        'page_path': event.urlAfterRedirects
      });
    }, (error) => console.log(error));
  }
}
