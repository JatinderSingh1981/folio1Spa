import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioStudentDynamicComponent } from './folio-student-dynamic.component';

describe('FolioStudentDynamicComponent', () => {
  let component: FolioStudentDynamicComponent;
  let fixture: ComponentFixture<FolioStudentDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioStudentDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioStudentDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
