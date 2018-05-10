import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareEntryComponent } from './share-entry.component';

describe('ShareEntryComponent', () => {
  let component: ShareEntryComponent;
  let fixture: ComponentFixture<ShareEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareEntryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
