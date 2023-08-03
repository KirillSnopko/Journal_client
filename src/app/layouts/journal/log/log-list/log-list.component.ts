import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiRoutes } from 'src/app/http/api-routes';
import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { Log } from 'src/app/models/log/log';
import { DeleteDialogComponent } from 'src/app/layouts/common/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.css']
})
export class LogListComponent implements OnInit {
  logs: Log[] = [];

  constructor(
    private provider: HttpProviderService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getLogs();
  }

  getLogs() {
    this.provider.setUrl(ApiRoutes.log.toString())
      .getList().subscribe((data: any) => {
        this.logs = data.body;
      },
        (error: any) => {
          if (error) {
            if (error.status == 404) {
              if (error.error && error.error.message) {
                this.logs = [];
              }
            }
          }
        });
  }

  deleteDialog(log: Log) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, { data: { id: log.id, name: log.message + "[" + log.dateTime + "]", route: ApiRoutes.log.toString() } });
    dialogRef.afterClosed().subscribe(result => {
      this.getLogs();
    });
  }
}
