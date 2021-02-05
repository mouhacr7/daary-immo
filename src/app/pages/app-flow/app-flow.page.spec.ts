import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AppFlowPage } from './app-flow.page';

describe('AppFlowPage', () => {
  let component: AppFlowPage;
  let fixture: ComponentFixture<AppFlowPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFlowPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AppFlowPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
