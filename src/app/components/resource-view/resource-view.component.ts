import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { JSONResource } from 'src/app/interfaces/jsonresource';
import { DownloadService } from 'src/app/services/download.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  private requestedResource: string;
  viewingOntology = false;
  rdfResource: JSONResource;
  refreshModel = false;
  wikiBaseUrl: string;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService, private router: Router,
              private downloadService: DownloadService) {
    route.url.subscribe(segments => {
      const currentUrl = this.router.url;
      if (currentUrl.match('.*ontology.*')) {
        this.viewingOntology = true;
      }
      this.requestedResource = segments[0].path;
    });
    route.queryParams.subscribe((params: Params) => {
      this.refreshModel = params.refreshModel;
      if (params.wikiBaseUrl !== undefined) {
        this.wikiBaseUrl = params.wikiBaseUrl;
      }
    });
  }

  ngOnInit(): void {
    if (!this.viewingOntology) {
      this.resourceService.getResource(this.requestedResource, this.refreshModel, this.wikiBaseUrl).subscribe(data => {
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

  downloadXML(): void {
    this.downloadService.getResourceXml(this.requestedResource)
    .subscribe(blob => saveAs(blob, this.requestedResource + '.rdf'));
  }

  downloadNTriples(): void {
    this.downloadService.getResourceNTriples(this.requestedResource)
    .subscribe(blob => saveAs(blob, this.requestedResource + '.nt'));
  }

  downloadTurtle(): void {
    this.downloadService.getResourceTurtle(this.requestedResource)
    .subscribe(blob => saveAs(blob, this.requestedResource + '.ttl'));
  }

  runSparql(): void {
    alert('you will query: ' + this.rdfResource.subject);
    this.router.navigateByUrl('/sparql/' + this.rdfResource.subject);
  }
}
