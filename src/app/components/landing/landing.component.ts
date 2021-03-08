import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { WikipediaService } from 'src/app/services/wikipedia.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  txtResource = new FormControl();
  txtWiki = new FormControl('Wikipedia');
  resourceOptions = [];

  constructor(private router: Router, private wikipediaService: WikipediaService) { }

  ngOnInit(): void {
    this.txtResource.valueChanges.subscribe((value) => {
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
    this.router.navigateByUrl('/resource/' + resource);
  }

}
