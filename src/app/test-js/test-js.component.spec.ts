import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestJsComponent } from './test-js.component';

describe('TestJsComponent', () => {
  let component: TestJsComponent;
  let fixture: ComponentFixture<TestJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
