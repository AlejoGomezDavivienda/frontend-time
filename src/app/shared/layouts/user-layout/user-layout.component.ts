import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/services/auth.service';
import { TokenService } from 'src/app/core/services/token.service';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.scss']
})
export class UserLayoutComponent implements OnInit, AfterViewInit 
{
  panelOpenState = false;
  userImg = 'https://firebasestorage.googleapis.com/v0/b/subasta-inversa-d6e7a.appspot.com/o/User-80_icon-icons.com_57249.png?alt=media&token=283572e2-e8d3-4149-9227-8ae3b795652e';
  userName = '';

  screenWidth: number = 1000;
  @ViewChild('drawer') drawer!: MatSidenav;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private tokenService: TokenService,
    private authService: AuthService
  ) { }

  ngAfterViewInit(): void 
  {
    setTimeout(() => {
      this.screenWidth = window.innerWidth || 1000;
      if(this.screenWidth < 1000)
      {
        this.drawer.close()
        // this.drawer.nativeElement.click();
      }
    }, 400);
  }

  ngOnInit(): void 
  {
    this.verifyAuth();
  }

  verifyAuth()
  {
    const token = this.tokenService.getToken();
    if( token )
    {
      this.authService.getUserLogged( token ).subscribe(
        userData => console.log(':)'),
        error => this.router.navigate(['/auth/login'])
      );
    }
    else
    {
      this.router.navigate(['/auth/login']);
    }
  }
}