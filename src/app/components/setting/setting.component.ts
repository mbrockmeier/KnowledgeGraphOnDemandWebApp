import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  txtBacklinksCount = new FormControl();
  txtExtractionFrameworkFolder = new FormControl();
  txtWikiDumpFolder = new FormControl();
  settings: Settings;

  constructor(private settingService: SettingService) { }

  ngOnInit(): void {
    this.settingService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.txtBacklinksCount.setValue(settings.backlinksCount);
      this.txtExtractionFrameworkFolder.setValue(settings.extractionFrameworkDir);
      this.txtWikiDumpFolder.setValue(settings.extractionFrameworkBaseDir);
    });
  }

  save(): void {
    this.settings.backlinksCount = this.txtBacklinksCount.value;
    this.settings.extractionFrameworkDir = this.txtExtractionFrameworkFolder.value;
    this.settings.extractionFrameworkBaseDir = this.txtWikiDumpFolder.value;
    this.settingService.updateSettings(this.settings).subscribe(() => {

    });
  }

}
