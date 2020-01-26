import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { VisualisationsLandingComponent } from './visualisations-landing.component';
import { LocalCityVisualisationComponent } from '../local-city-visualisation/local-city-visualisation.component';
import { MatCardModule, MatGridListModule, MatDividerModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('VisualisationsLandingComponent', () => {
  let component: VisualisationsLandingComponent;
  let fixture: ComponentFixture<VisualisationsLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        MatGridListModule,
        MatDividerModule,
        HttpClientTestingModule
      ],
      declarations: [
        VisualisationsLandingComponent,
        LocalCityVisualisationComponent
      ],
      providers: [
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualisationsLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
