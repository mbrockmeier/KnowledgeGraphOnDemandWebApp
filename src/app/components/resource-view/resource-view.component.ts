import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { JSONResource } from 'src/app/interfaces/jsonresource';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  private requestedResource: string;
  viewingOntology = false;
  rdfResource: JSONResource;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService, private router: Router) {
    route.url.subscribe(segments => {
      const currentUrl = this.router.url;
      if (currentUrl.match('.*ontology.*')) {
        this.viewingOntology = true;
      }
      this.requestedResource = segments[0].path;
    });
  }

  ngOnInit(): void {
    if (!this.viewingOntology) {
      this.resourceService.getResource(this.requestedResource).subscribe(data => {
        this.rdfResource = data;
      });
    } else {
      this.resourceService.getOntology(this.requestedResource).subscribe(data => {
        this.rdfResource = data;
      });
    }
  }

  navigate(uri: string): void {
    let destination = '';

    if (uri.match('.*resource.*')) {
      destination = uri.replace('http://dbpedia.org/resource/', '');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl('/resource/' + this.transformUriComponent(destination));
      });
    } else if (uri.match('.*ontology.*')) {
      destination = uri.replace('http://dbpedia.org/ontology/', '');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigateByUrl('/ontology/' + this.transformUriComponent(destination));
      });
    } else {
      destination = uri;
    }
  }

  transformUriComponent(uriComponent: string): string {
    return encodeURIComponent(uriComponent).replace(/[!'()*]/g, (c) => {
      // Also encode !, ', (, ), and *
      return '%' + c.charCodeAt(0).toString(16);
    });
  }
}
