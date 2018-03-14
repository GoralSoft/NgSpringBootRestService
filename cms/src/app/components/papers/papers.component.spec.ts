import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PapersDataComponent } from './papers-data.component';

describe('PapersDataComponent', () => {
  let component: PapersDataComponent;
  let fixture: ComponentFixture<PapersDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PapersDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PapersDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
