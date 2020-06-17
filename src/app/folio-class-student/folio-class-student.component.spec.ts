import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioClassStudentComponent } from './folio-class-student.component';

describe('FolioClassStudentComponent', () => {
  let component: FolioClassStudentComponent;
  let fixture: ComponentFixture<FolioClassStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioClassStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioClassStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
