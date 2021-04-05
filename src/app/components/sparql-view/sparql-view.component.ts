import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {SparqlService} from 'src/app/services/sparql.service';
import {SparqlResult} from 'src/app/interfaces/sparql'

@Component({
  selector: 'app-sparql-view',
  templateUrl: './sparql-view.component.html',
  styleUrls: ['./sparql-view.component.css']
})
export class SparqlViewComponent implements OnInit {
  txtSparql:string;
  public sparqlResult: SparqlResult;
  private requestedResource: string;

  constructor(private route: ActivatedRoute, private router: Router,private sparqlService:SparqlService) {
    route.url.subscribe(segments => {
      this.requestedResource = segments[0].path;
    });
   }

  ngOnInit(): void {

  }

  generateSparql():void{
    this.sparqlService.getResult(this.requestedResource,this.txtSparql).subscribe(data => {
      this.sparqlResult = data;
    });
  }
}
