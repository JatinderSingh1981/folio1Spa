import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioClassStudentDynamicComponent } from './folio-class-student-dynamic.component';

describe('FolioClassStudentDynamicComponent', () => {
  let component: FolioClassStudentDynamicComponent;
  let fixture: ComponentFixture<FolioClassStudentDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioClassStudentDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioClassStudentDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
