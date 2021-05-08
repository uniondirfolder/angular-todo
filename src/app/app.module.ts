import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CategoriesComponent } from './views-nvv/categories/categories.component';
import { TasksComponent } from './views-nvv/tasks/tasks.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';

// import { TodoItemComponent } from './auditorium/components/todo-item/todo-item.component';
// import { MaterialModule } from './auditorium/material/material.module';
// import { TodoListItemComponent } from './auditorium/components/todo-list-item/todo-list-item/todo-list-item.component';
// import { TaskComponent } from './auditorium/components/task/task.component';
import { HttpClientModule } from '@angular/common/http';
import { EditTaskDialogComponent } from './dialog/edit-task-dialog/edit-task-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { ConfirmDialogComponent } from './dialog/confirm-dialog/confirm-dialog.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TaskDatePipe } from './pipe/task-date.pipe';

import { registerLocaleData } from '@angular/common';
import localeUk from '@angular/common/locales/uk';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { EditCategoryDialogComponent } from './dialog/edit-category-dialog/edit-category-dialog.component';
import { FooterComponent } from './views-nvv/footer/footer.component';
import { AboutDialogComponent } from './dialog/about-dialog/about-dialog.component';
import { HeaderComponent } from './views-nvv/header/header.component';
import { StatComponent } from './views-nvv/stat/stat.component';
import { StatCardComponent } from './views-nvv/stat/stat-card/stat-card.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { PrioritiesComponent } from './views-nvv/priorities/priorities.component';
import { EditPriorityDialogComponent } from './dialog/edit-priority-dialog/edit-priority-dialog.component';
import { SettingsDialogComponent } from './dialog/settings-dialog/settings-dialog.component';
import { SidebarModule } from 'ng-sidebar';
import { TASK_URL_TOKEN } from './data-nvv/dao/impl/task.service';
import { CATEGORY_URL_TOKEN } from './data-nvv/dao/impl/category.service';
import { PRIORITY_URL_TOKEN } from './data-nvv/dao/impl/priority.service';
import { STAT_URL_TOKEN } from './data-nvv/dao/impl/stat.service';


registerLocaleData(localeUk);

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    TaskDatePipe,
    EditCategoryDialogComponent,
    FooterComponent,
    AboutDialogComponent,
    HeaderComponent,
    StatComponent,
    StatCardComponent,
    PrioritiesComponent,
    EditCategoryDialogComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatOptionModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    ColorPickerModule,
    AppRoutingModule,
    SidebarModule.forRoot(),
    HttpClientModule
  ],
  providers: [
    {
      provide: TASK_URL_TOKEN,
      useValue: 'http://localhost:8080/task'
    },

    {
      provide: CATEGORY_URL_TOKEN,
      useValue: 'http://localhost:8080/category'
    },

    {
      provide: PRIORITY_URL_TOKEN,
      useValue: 'http://localhost:8080/priority'
    },
    
    {
      provide: STAT_URL_TOKEN,
      useValue: 'http://localhost:8080/stat'
    },
  ],
  entryComponents: [
    EditTaskDialogComponent,
    ConfirmDialogComponent,
    EditCategoryDialogComponent,
    AboutDialogComponent,
    SettingsDialogComponent,
    EditPriorityDialogComponent

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
