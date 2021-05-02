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

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    EditTaskDialogComponent,
    // TodoItemComponent,
    // TodoListItemComponent,
    // TaskComponent,
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
    // MaterialModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  entryComponents:[
    EditTaskDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
