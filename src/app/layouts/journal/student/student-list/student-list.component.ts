import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent {
  constructor(private router: Router) { }

  AddStudent() {
    this.router.navigate(['students/add']);
  }
}
