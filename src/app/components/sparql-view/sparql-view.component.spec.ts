import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SparqlViewComponent } from './sparql-view.component';

describe('SparqlViewComponent', () => {
  let component: SparqlViewComponent;
  let fixture: ComponentFixture<SparqlViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SparqlViewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SparqlViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
