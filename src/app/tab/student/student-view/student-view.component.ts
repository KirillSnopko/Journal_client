import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-view',
  templateUrl: './student-view.component.html',
  styleUrls: ['./student-view.component.css']
})
export class StudentViewComponent {

  constructor(private router: Router) { }

  AddStudent() {
    this.router.navigate(['students/add']);
  }
}
