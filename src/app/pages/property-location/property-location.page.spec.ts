import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PropertyLocationPage } from './property-location.page';

describe('PropertyLocationPage', () => {
  let component: PropertyLocationPage;
  let fixture: ComponentFixture<PropertyLocationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyLocationPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PropertyLocationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
