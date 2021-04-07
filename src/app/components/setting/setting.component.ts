import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Settings } from 'src/app/interfaces/settings';
import { SettingService } from 'src/app/services/setting.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  availableExtractors = ['PageIdExtractor', 'LabelExtractor', 'PageLinksExtractor', 'InfoboxExtractor', 'MappingExtractor'];
  extractors: FormGroup;
  txtBacklinksCount = new FormControl();
  txtCacheSize = new FormControl();
  txtExtractionFrameworkFolder = new FormControl();
  txtWikiDumpFolder = new FormControl();
  settings: Settings;

  constructor(private settingService: SettingService, private formBuilder: FormBuilder) {
    this.extractors = formBuilder.group({});
  }

  ngOnInit(): void {
    this.availableExtractors.forEach((availableExtractor) => {
      const control = new FormControl(false);
      this.extractors.addControl(availableExtractor, control);
    });
    this.settingService.getSettings().subscribe((settings) => {
      this.settings = settings;
      this.txtBacklinksCount.setValue(settings.backlinksCount);
      this.txtExtractionFrameworkFolder.setValue(settings.extractionFrameworkDir);
      this.txtWikiDumpFolder.setValue(settings.extractionFrameworkBaseDir);
      this.txtCacheSize.setValue(settings.cacheSize);
      settings.extractors.split(',').forEach((extractor) => {
        if (extractor.charAt(0) === '.') {
          extractor = extractor.substring(1);
        }
        console.log(extractor);
        this.extractors.get(extractor).patchValue(true);
      });
    });
  }

  save(): void {
    this.settings.backlinksCount = this.txtBacklinksCount.value;
    this.settings.extractionFrameworkDir = this.txtExtractionFrameworkFolder.value;
    this.settings.extractionFrameworkBaseDir = this.txtWikiDumpFolder.value;
    this.settings.cacheSize = this.txtCacheSize.value;

    this.settings.extractors = '';
    this.availableExtractors.forEach((availableExtractor) => {
      if (this.extractors.get(availableExtractor).value === true) {
        this.settings.extractors = this.settings.extractors.concat('.' + availableExtractor + ',');
      }
    });
    this.settings.extractors = this.settings.extractors.substring(0, this.settings.extractors.length - 1);

    this.settingService.updateSettings(this.settings).subscribe(() => {

    });
  }

}
