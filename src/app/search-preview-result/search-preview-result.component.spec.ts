import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPreviewResultComponent } from './search-preview-result.component';

describe('SearchPreviewResultComponent', () => {
  let component: SearchPreviewResultComponent;
  let fixture: ComponentFixture<SearchPreviewResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchPreviewResultComponent]
    });
    fixture = TestBed.createComponent(SearchPreviewResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
