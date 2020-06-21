import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FolioClassDynamicComponent } from './folio-class-dynamic.component';

describe('FolioClassDynamicComponent', () => {
  let component: FolioClassDynamicComponent;
  let fixture: ComponentFixture<FolioClassDynamicComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FolioClassDynamicComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FolioClassDynamicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
