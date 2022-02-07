import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/core/interfaces/User';
import { SweetAlertService } from 'src/app/shared/services/sweet-alert.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-show-graphs',
  templateUrl: './show-graphs.component.html',
  styleUrls: ['./show-graphs.component.scss']
})
export class ShowGraphsComponent implements OnInit {

  idUser: string;

  public user: User = {
    id: '',
    email: '',
    name: '',
    role: {
      code: 'AUDITOR_ROLE',
      name: 'AUDITOR'
    },
    img: '',
    area: {
      code: 1,
      name: 'Ciberseguirdad y TI',
      country: {
        code: 'CO',
        name: 'Colombia'
      }
    },
    supervised_by: ''
  };

  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private sweetAlert: SweetAlertService,
    private router: Router
  ) {
    this.idUser = '';
  }

  ngOnInit(): void {

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      this.getUserById(id)
      this.idUser = id;
    }
    else {
      this.sweetAlert.presentError('Error');
      this.router.navigate(['/']);
    }
  }

  getUserById(id: string) {
    this.userService.getUserById(id)
      .subscribe(
        (user) => this.user = user.user,
        (error) => console.error(error)
      );
  }

}
