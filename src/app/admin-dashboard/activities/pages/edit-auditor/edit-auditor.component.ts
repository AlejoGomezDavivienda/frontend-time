import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AssignActivity } from 'src/app/admin-dashboard/users/interfaces/AssignActivity';


@Component({
  selector: 'app-edit-auditor',
  templateUrl: './edit-auditor.component.html',
  styleUrls: ['./edit-auditor.component.scss']
})
export class EditAuditorComponent implements OnInit {

  public range = new FormGroup({
    start: new FormControl('', Validators.required),
    end: new FormControl('', Validators.required),
  });

  constructor
    (
      public dialogRef: MatDialogRef<EditAuditorComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
