import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeviceDetectorService } from 'ngx-device-detector';
import { SettingsDialogComponent } from 'src/app/dialog/settings-dialog/settings-dialog.component';
import { IntroService } from 'src/app/service-nvv/intro.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  categoryName: string = '';

  @Input()
  showStat: boolean = false;

  @Output()
  toggleStat = new EventEmitter<boolean>();

  @Output()
  toggleMenu = new EventEmitter();

  isMobile: boolean = false;

  constructor(private dialog: MatDialog, private introService: IntroService, 
    private deviceDetector: DeviceDetectorService ) {
      this.isMobile = deviceDetector.isMobile();
     } // DIj

  ngOnInit(): void {
  }
  onToggleStat(): void {
    this.toggleStat.emit(!this.showStat);
  }

  // окно настроек
  showSettings(): void {
    const dialogRef = this.dialog.open(SettingsDialogComponent,
      {
        autoFocus: false,
        width: '500px'
      });
  }

  showIntroHelp() {
    this.introService.startIntroJS(false)
  }

  
  onToggleMenu(){
    this.toggleMenu.emit();
  }

}
