import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinRecommendationsComponent } from '../skin-recommendations/skin-recommendations.component';

describe('SkinRecommendationsComponent', () => {
  let component: SkinRecommendationsComponent;
  let fixture: ComponentFixture<SkinRecommendationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SkinRecommendationsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SkinRecommendationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});