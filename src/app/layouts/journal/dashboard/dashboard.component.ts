import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import * as moment from 'moment';
import { ApiRoutes } from 'src/app/http/api-routes';

import { HttpProviderService } from 'src/app/http/provider/http-provider.service';
import { LessonMonthlyStat } from 'src/app/models/lesson/lesson-monthly-stat';
import { LessonStat } from 'src/app/models/lesson/lesson-stat';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  studentCount: number = 0;
  lessonsStat: LessonStat = {} as LessonStat;
  lessonsMonthlyStat: LessonMonthlyStat = {} as LessonMonthlyStat;

  constructor(private provider: HttpProviderService) { }

  startAnimationForLineChart(chart: any) {
    let seq: any, delays: any, durations: any;
    seq = 0;
    delays = 80;
    durations = 500;

    chart.on('draw', function (data: any) {
      if (data.type === 'line' || data.type === 'area') {
        data.element.animate({
          d: {
            begin: 600,
            dur: 700,
            from: data.path.clone().scale(1, 0).translate(0, data.chartRect.height()).stringify(),
            to: data.path.clone().stringify(),
            easing: Chartist.Svg.Easing.easeOutQuint
          }
        });
      } else if (data.type === 'point') {
        seq++;
        data.element.animate({
          opacity: {
            begin: seq * delays,
            dur: durations,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq = 0;
  };

  startAnimationForBarChart(chart: any) {
    let seq2: any, delays2: any, durations2: any;

    seq2 = 0;
    delays2 = 80;
    durations2 = 500;
    chart.on('draw', function (data: any) {
      if (data.type === 'bar') {
        seq2++;
        data.element.animate({
          opacity: {
            begin: seq2 * delays2,
            dur: durations2,
            from: 0,
            to: 1,
            easing: 'ease'
          }
        });
      }
    });

    seq2 = 0;
  };

  ngOnInit() {
    this.getStudentCount();
    this.getLessonsStat();
    this.getLessonsMonthlyStat();
  }

  getLessonsStat() {
    this.provider.setUrl(ApiRoutes.lesson.toString() + ApiRoutes.stat.toString())
      .getData().subscribe((data: any) => {
        this.lessonsStat = data.body;
      },
        (error: any) => {
          if (error) {
          }
        });
  }

  getStudentCount() {
    this.provider.setUrl(ApiRoutes.student.toString() + ApiRoutes.count.toString())
      .getData().subscribe((data: any) => {
        this.studentCount = data.body;
      },
        (error: any) => {
          if (error) {
          }
        });
  }

  getLessonsMonthlyStat() {
    this.provider.setUrl(ApiRoutes.lesson.toString() + ApiRoutes.monthlyStat.toString())
      .getData().subscribe((data: any) => {
        this.lessonsMonthlyStat = data.body;
        this.generateLessonMonthlyStatCount();
        this.generateLessonMonthlyStatMoney();
      },
        (error: any) => {
          if (error) {
          }
        });
  }

  generateLessonMonthlyStatCount() {
    const lessonsMonthlyStat: any = {
      labels: this.lessonsMonthlyStat.stat.map(i => moment(i.date).format("MM.yy")),
      series: [
        this.lessonsMonthlyStat.stat.map(i => i.totalCount),
      ]
    };

    const optionsLessonsMonthlyStat: any = {
      lineSmooth: Chartist.Interpolation.cardinal({
        tension: 0
      }),
      low: 0,
      high: 50,
      chartPadding: { top: 0, right: 0, bottom: 0, left: 0 },
    }

    var lessonsMonthlyStatChart = new Chartist.LineChart('#lessonsMonthlyStat', lessonsMonthlyStat, optionsLessonsMonthlyStat);

    this.startAnimationForLineChart(lessonsMonthlyStatChart);
  }

  generateLessonMonthlyStatMoney() {
    var datawebsiteViewsChart = {
      labels: this.lessonsMonthlyStat.stat.map(i => moment(i.date).format("MM.yy")),
      series: [
        this.lessonsMonthlyStat.stat.map(i => i.totalMoney),
      ]
    };
    var optionswebsiteViewsChart = {
      axisX: {
        showGrid: false
      },
      low: 0,
      high: 1000,
      chartPadding: { top: 0, right: 5, bottom: 0, left: 0 }
    };
    var responsiveOptions: any[] = [
      ['screen and (max-width: 640px)', {
        seriesBarDistance: 5,
        axisX: {
          labelInterpolationFnc: function (value: any) {
            return value[0];
          }
        }
      }]
    ];
    var websiteViewsChart = new Chartist.BarChart('#websiteViewsChart', datawebsiteViewsChart, optionswebsiteViewsChart, responsiveOptions);

    //start animation for the Emails Subscription Chart
    this.startAnimationForBarChart(websiteViewsChart);
  }
}
