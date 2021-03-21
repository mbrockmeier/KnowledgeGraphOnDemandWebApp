import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ResourceService } from 'src/app/services/resource.service';
import { JSONResource } from 'src/app/interfaces/jsonresource';

declare const DownloadJSON: any;
declare const DownloadRDFXML: any;

@Component({
  selector: 'app-resource-view',
  templateUrl: './resource-view.component.html',
  styleUrls: ['./resource-view.component.css']
})
export class ResourceViewComponent implements OnInit {
  private requestedResource: string;
  rdfResource: JSONResource;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService) {
    route.url.subscribe(segments => {
      this.requestedResource = segments[0].path;
    });
  }

  ngOnInit(): void {
    this.resourceService.getResource(this.requestedResource).subscribe(data => {
      this.rdfResource = data;
    });
  }

  downloadJSON() {
    DownloadJSON(this.rdfResource, this.requestedResource, "json");
  }

  downloadRDFXML() {
    DownloadRDFXML(this.rdfResource, this.requestedResource, "xml");
  }
}
