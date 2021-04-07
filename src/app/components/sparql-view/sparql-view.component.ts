import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SparqlService } from 'src/app/services/sparql.service';
import { SparqlResult } from 'src/app/interfaces/sparql';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-sparql-view',
  templateUrl: './sparql-view.component.html',
  styleUrls: ['./sparql-view.component.css']
})
export class SparqlViewComponent implements OnInit {
  txtSparql = new FormControl('PREFIX dbo:  <http://dbpedia.org/ontology/>\nPREFIX dbr:  <http://dbpedia.org/resource/>');
  public sparqlResult: SparqlResult;
  requestedResource: string;

  constructor(private route: ActivatedRoute, private router: Router, private sparqlService: SparqlService) {
    route.url.subscribe(segments => {
      this.requestedResource = segments[0].path;
    });
   }

  ngOnInit(): void {

  }

  generateSparql(): void{
    if (this.requestedResource) {
      this.sparqlService.getResult(this.requestedResource, this.txtSparql.value).subscribe(data => {
        this.sparqlResult = data;
      });
    } else {
      this.sparqlService.executeQuery(this.txtSparql.value).subscribe(data => {
        this.sparqlResult = data;
      });
    }
  }
}
