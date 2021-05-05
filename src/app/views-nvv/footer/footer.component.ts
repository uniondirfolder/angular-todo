import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material';
import { AboutDialogComponent } from 'src/app/dialog/about-dialog/about-dialog.component';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

    private year: Date= new Date();
    private site = 'https://nvv.org';
    private blog = 'https://nvv.org/blog/tag/angular/';
    private siteName = 'NVV Angular';
  constructor(private dialog: MatDialog) { 
    
  }

  ngOnInit(): void {
    this.year = new Date();
  }

  openAboutDialog() {
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
