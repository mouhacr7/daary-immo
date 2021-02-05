import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsrDashboardPage } from './usr-dashboard.page';

describe('UsrDashboardPage', () => {
  let component: UsrDashboardPage;
  let fixture: ComponentFixture<UsrDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsrDashboardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsrDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
