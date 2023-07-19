import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';

import { Topic } from 'src/app/models/topic/topic';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { ApiRoutes } from 'src/app/http/api-routes';
import { TopicCreate } from 'src/app/models/topic/topic-create';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';


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
    description: ["<пусто>"],
  })

  constructor(
    private route: ActivatedRoute,
    private provider: HttpProviderService,
    private toastr: ToastrService,
    private fb: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.provider.setUrl(ApiRoutes.subject.toString());
    this.route.queryParams.subscribe(params => this.subjectId = params['subjectid']);
    this.gradeId = this.route.snapshot.params['gradeid'];
    this.getTopics();
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

  selectTopic(topic: Topic) {
    if (Object.keys(this.topicSelected).length === 0) {
      this.topicSelected = topic;
      this.topicIsEditing = true

      this.formTopic.patchValue({
        description: topic.description,
        title: topic.title
      })
    } else {
      this.toastr.warning("Незавершенное действие");
    }
  }

  addTopic() {
    if (Object.keys(this.topicSelected).length === 0) {
      this.topics.unshift({
        id: 0,
        title: '',
        description: "<пусто>",
      });
      this.topicSelected = this.topics[0];
    } else {
      this.toastr.warning("Незавершенное действие");
    }
  }

  updateTopic() {
    var dto: TopicCreate = new TopicCreate();
    dto.description = this.formTopic.value.description!;
    dto.title = this.formTopic.value.title!;
    dto.gradelevelId = this.gradeId;
    console.log('add1=>' + dto);

    if (!this.topicIsEditing) {
      this.provider.setUrl(ApiRoutes.topic.toString())
        .add(dto)
        .subscribe(async data => {
          if (data.status == 201) {
            this.resetForm();
            this.toastr.success("Добавлено!");
            setTimeout(() => {
              this.getTopics();
            }, 500);
          }
        },
          error => {
            this.toastr.error(error.message);
          });

    }
    else {
      this.provider.setUrl(ApiRoutes.topic.toString())
        .update(dto, this.topicSelected.id)
        .subscribe(async data => {
          if (data.status == 200) {
            this.resetForm();
            this.toastr.success("обновлено!");
            setTimeout(() => {
              this.getTopics();
            }, 500);

          }
        },
          error => {
            this.toastr.error(error.message);
          });
    }
  }

  deleteDialog(topic: Topic) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: topic.id, name: topic.title, route: ApiRoutes.topic.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getTopics();
      this.resetForm();
    });
  }

  cancelTopic() {
    this.topics.splice(0, 1);
    this.resetForm();
  }

  private resetForm() {
    this.topicSelected = {} as Topic;
    this.topicIsEditing = false
    this.formTopic.reset();
  }
}
