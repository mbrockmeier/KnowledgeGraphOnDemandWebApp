import { Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-sparql-results',
  templateUrl: './sparql-results.component.html',
  styleUrls: ['./sparql-results.component.css']
})
export class SparqlResultsComponent implements OnInit {
  @Input() sparqlResult:any;
  constructor() { }

  ngOnInit(): void {
  }

}
