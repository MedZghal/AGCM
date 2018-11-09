import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PageOfflineComponent } from './page-offline.component';

describe('PageOfflineComponent', () => {
  let component: PageOfflineComponent;
  let fixture: ComponentFixture<PageOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PageOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PageOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
