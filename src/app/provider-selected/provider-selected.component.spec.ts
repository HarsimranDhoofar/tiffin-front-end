import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSelectedComponent } from './provider-selected.component';

describe('ProviderSelectedComponent', () => {
  let component: ProviderSelectedComponent;
  let fixture: ComponentFixture<ProviderSelectedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSelectedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSelectedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
