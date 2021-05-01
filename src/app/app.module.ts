import { NgModule } from '@angular/core';
//import { FormsModule } from '@angular/forms';
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

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    TasksComponent,
    // TodoItemComponent,
    // TodoListItemComponent,
    // TaskComponent,
  ],
  imports: [
    BrowserModule,
    MatTableModule,
    MatSortModule,
    MatSortModule,
    MatPaginatorModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    //FormsModule,
    // MaterialModule,
    HttpClientModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
