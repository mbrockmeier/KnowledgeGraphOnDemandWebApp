import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { WikipediaService } from 'src/app/services/wikipedia.service';
import { debounceTime, map } from 'rxjs/operators';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  txtResource = new FormControl('');
  queriedWiki = new FormControl('Wikipedia');
  txtCustomWikiUrl = new FormControl('');
  forceModelRefresh = new FormControl(false);
  resourceOptions = [];

  constructor(private router: Router, private wikipediaService: WikipediaService) { }

  ngOnInit(): void {
    this.txtResource.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      if (value !== '') {
        this.wikipediaService.getSearchSuggestions(value).subscribe((suggestions) => {
          this.resourceOptions = suggestions;
        });
      } else {
        this.resourceOptions = [];
      }
    });
  }

  generateKnowledgeGraph(): void {
    const resource = (this.txtResource.value as string).replace(' ', '_');
    const url = '/resource/' + resource;
    let wikiBaseUrl;

    if (this.queriedWiki.value !== 'Wikipedia' && this.txtCustomWikiUrl.value !== '') {
      wikiBaseUrl = this.txtCustomWikiUrl.value;
    }

    const queryParams = {
      refreshModel: this.forceModelRefresh.value,
      wikiBaseUrl
    };
    this.router.navigate([url], {queryParams});
  }

}
