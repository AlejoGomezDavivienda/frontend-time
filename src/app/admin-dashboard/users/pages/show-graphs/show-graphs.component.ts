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
        name: 'Colombia',
        img: ''
      }
    }
  };

  userImg = 'https://firebasestorage.googleapis.com/v0/b/subasta-inversa-d6e7a.appspot.com/o/User-80_icon-icons.com_57249.png?alt=media&token=283572e2-e8d3-4149-9227-8ae3b795652e';


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
