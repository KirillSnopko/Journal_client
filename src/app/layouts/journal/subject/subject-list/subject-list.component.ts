import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent {
  constructor(private router: Router) { }

  AddSubject() {
    this.router.navigate(['subjects/add']);
  }
}
