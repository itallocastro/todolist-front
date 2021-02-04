import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-modal-tasks',
  templateUrl: './modal-tasks.component.html',
  styleUrls: ['./modal-tasks.component.scss']
})
export class ModalTasksComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<ModalTasksComponent>,
    @Inject(MAT_DIALOG_DATA) public data
  ) { }

  formGroupModal: FormGroup = new FormGroup({
    description: new FormControl(this.data.description),
    value: new FormControl(this.data.value),
    id: new FormControl(this.data.id)
  });
  ngOnInit(): void {
  }

  cancel() {
    this.dialogRef.close();
  }
}
