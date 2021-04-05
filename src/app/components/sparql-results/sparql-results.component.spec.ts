import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlResultsComponent } from './sparql-results.component';

describe('SparqlResultsComponent', () => {
  let component: SparqlResultsComponent;
  let fixture: ComponentFixture<SparqlResultsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparqlResultsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
