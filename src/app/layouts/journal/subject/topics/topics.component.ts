import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Topic } from 'src/app/models/topic/topic';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})


export class TopicsComponent implements OnInit {
  gradeId: any;
  subjectId: any;

  topics: Topic[] = [{ "id": 1, "description": "description", "title": "Разложение многочленов на множители, сокращение дробей" }];
  topicSelected: Topic = {} as Topic;
  topicIsEditing: boolean = false;
  formTopic = this.fb.group({
    title: ["", [Validators.required]],
    description: [''],
  })

  constructor(private route: ActivatedRoute, private provider: HttpProviderService, private toastr: ToastrService, private router: Router, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.provider.setUrl(ApiRoutes.subject.toString());
    this.route.queryParams.subscribe(params => this.subjectId = params['subjectid']);
    this.gradeId = this.route.snapshot.params['gradeid'];
  }

  selectTopic(topic: Topic) {
    if (Object.keys(this.topicSelected).length === 0) {
      this.topicSelected = topic;
      this.topicIsEditing = true

      this.formTopic.patchValue({
        description: topic.description,
        title: topic.title
      })
    }
  }

  deleteTopic(index: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.topics.splice(index, 1);
      this.toastr.success("Удален");
    }
  }

  updateTopic() {
    if (!this.topicIsEditing) {
      this.topics[0] = {
        id: 25,
        title: this.formTopic.value.title!,
        description: this.formTopic.value.description!,
      }
    }
    else {
      let index = this.topics.map(u => u.id).indexOf(this.topicSelected.id);

      this.topics[index] = {
        id: this.topicSelected.id,
        title: this.formTopic.value.title!,
        description: this.formTopic.value.description!,
      };
    }

    // clean up
    this.topicSelected = {} as Topic;
    this.topicIsEditing = false
    this.formTopic.reset();
  }

  cancelTopic() {
    if (!this.topicIsEditing && confirm('All unsaved changes will be removed. Are you sure you want to cancel?')) {
      this.topics.splice(0, 1);
    }

    this.topicSelected = {} as Topic;
    this.topicIsEditing = false
    this.formTopic.reset();
  }

  addTopic() {
    this.topics.unshift({
      id: 0,
      title: '',
      description: '',
    })

    this.topicSelected = this.topics[0];
  }

  isEmpty(obj: any) {
    return Object.keys(obj).length === 0;
  }
}
