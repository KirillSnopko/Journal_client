import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/tab/dashboard/dashboard.component';
import { StudentViewComponent } from 'src/app/tab/student/student-view/student-view.component';
import { StudentAddComponent } from 'src/app/tab/student/student-add/student-add.component';
/*
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
*/
export const AdminLayoutRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'students', component: StudentViewComponent },
  { path: 'students/add', component: StudentAddComponent }
  /* { path: 'user-profile',   component: UserProfileComponent },
   { path: 'table-list',     component: TableListComponent },
   { path: 'typography',     component: TypographyComponent },
   { path: 'icons',          component: IconsComponent },
   { path: 'maps',           component: MapsComponent },
   { path: 'notifications',  component: NotificationsComponent },
   { path: 'upgrade',        component: UpgradeComponent },*/
];

