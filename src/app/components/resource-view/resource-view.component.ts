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
  rdfResource: JSONResource;

  constructor(private route: ActivatedRoute, private resourceService: ResourceService,private router:Router) {
    route.url.subscribe(segments => {
      this.requestedResource = segments[0].path;
    });
  }

  ngOnInit(): void {
    this.resourceService.getResource(this.requestedResource).subscribe(data => {
      this.rdfResource = data;
    });
  }

  runSparql(): void{
    alert('you will query: '+ this.rdfResource.subject);
    this.router.navigateByUrl('/sparql/' + this.rdfResource.subject);
  }
}
