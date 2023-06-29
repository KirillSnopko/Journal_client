import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Topic } from 'src/app/models/topic/topic';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';
import { TopicCreate } from 'src/app/models/topic/topic-create';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.css']
})


export class TopicsComponent implements OnInit {
  gradeId: any;
  subjectId: any;

  topics: Topic[] = [];
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
    this.getTopics();
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
    if (confirm('Вы уверены, что хотети удалить программу с темами?')) {

      this.provider.setUrl(ApiRoutes.topic.toString())
        .delete(index).subscribe(async data => {
          if (data.status == 204) {
            this.toastr.success("Удалено!");
            setTimeout(() => {
              this.getTopics();
            }, 500);
          }
        },
          async error => {
            this.toastr.error(error.message);
          });
    }

    this.topicSelected = {} as Topic;
    this.topicIsEditing = false
    this.formTopic.reset();
  }

  updateTopic() {
    var dto: TopicCreate = new TopicCreate();
    dto.description = this.formTopic.value.description!;
    dto.title = this.formTopic.value.title!;
    dto.gradelevelId = this.gradeId;


    if (!this.topicIsEditing) {
      this.provider.setUrl(ApiRoutes.topic.toString())
        .add(dto)
        .subscribe(async data => {
          if (data.status == 201) {
            this.toastr.success("Добавлено!");
            setTimeout(() => {

              this.getTopics();

            }, 500);
          }
        },
          async error => {
            this.toastr.error(error.message);
          });

    }
    else {
      this.provider.setUrl(ApiRoutes.topic.toString())
        .update(dto, this.topicSelected.id)
        .subscribe(async data => {
          if (data.status == 200) {
            setTimeout(() => {
              this.getTopics();
            }, 500);
            this.toastr.success("обновлено!");
          }
        },
          async error => {
            this.toastr.error(error.message);
          });
    }

    this.topicSelected = {} as Topic;
    this.topicIsEditing = false
    this.formTopic.reset();
  }

  cancelTopic() {
    if (!this.topicIsEditing && confirm('Изменения не будут сохранены. Вы уверены что хотите отменить?')) {
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

  async getTopics() {
    this.provider.setUrl(ApiRoutes.gradelevel.toString() + this.gradeId + ApiRoutes.topics.toString())
      .getList().subscribe((data: any) => {
        this.topics = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.topics = [];
              }
            }
          }
        });
  }
}
