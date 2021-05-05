import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AboutDialogComponent } from 'src/app/dialog/about-dialog/about-dialog.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    year: Date = new Date();
    site = 'https://nvv.org';
    blog = 'https://nvv.org/blog/tag/angular/';
    siteName = 'NVV Angular';
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog(): void {
    this.dialog.open(AboutDialogComponent,
        {
            autoFocus: false,
            data: {
                dialogTitle: 'About:',
                message: 'This test version'
            },
            width: '400px'
        });

}

}
