import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { SocialAuthService } from 'angularx-social-login';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-leader-cam',
  templateUrl: './leader-cam.component.html',
  styleUrls: ['./leader-cam.component.scss']
})
export class LeaderCamLayoutComponent implements OnInit {

  panelOpenState = false;
  userImg = 'https://firebasestorage.googleapis.com/v0/b/subasta-inversa-d6e7a.appspot.com/o/User-80_icon-icons.com_57249.png?alt=media&token=283572e2-e8d3-4149-9227-8ae3b795652e';
  userName = '';
  userRol = localStorage.getItem('role_name');
  userId = localStorage.getItem('idUser');

  logoDayToDay = environment.LOGO_DAY_TO_DAY;

  screenWidth: number = 1000;
  @ViewChild('drawer') drawer!: MatSidenav;

  // sidenav: any;

  // drawer: any;

  // @ViewChild('sidenav') public sidenav!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService,
    private socialAuthService: SocialAuthService
  ) { }

  // ngAfterViewInit(): void {
  //   setTimeout(() => {
  //     this.screenWidth = window.innerWidth || 1000;
  //     if (this.screenWidth < 1000) {
  //       this.drawer.close();
  //     }
  //   }, 400);
  // }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.drawer.open();
    }, 200);
  }

  ngOnInit(): void {
    this.verifyAuth();
  }

  verifyAuth() {
    const token = this.tokenService.getToken();
    if (token) {
      this.authService.getUserLogged().subscribe(
        (userData) => {
          
          let nombre = userData.user.name.split(' ');

          this.userName = `${nombre[0]} ${nombre[1]}`;

          if (userData.user.img !== '')
            this.userImg = userData.user.img;

        },
        (error) => this.router.navigate(['/auth/google'])
      );
    }
    else {
      this.router.navigate(['/auth/google']);
    }
  }

  goToMyReportPage() {
    this.router.navigate(['/leader-cam/users/performance/' + this.userId]);
  }

  logout() {
    this.authService.logout();
    this.socialAuthService.signOut();
    this.router.navigate(['/']);
  }


}
