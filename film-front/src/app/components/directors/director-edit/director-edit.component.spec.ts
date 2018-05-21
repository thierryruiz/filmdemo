import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorEditComponent } from './director-edit.component';

describe('DirectorEditComponent', () => {
  let component: DirectorEditComponent;
  let fixture: ComponentFixture<DirectorEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
