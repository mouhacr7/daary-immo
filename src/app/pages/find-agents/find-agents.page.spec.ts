import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FindAgentsPage } from './find-agents.page';

describe('FindAgentsPage', () => {
  let component: FindAgentsPage;
  let fixture: ComponentFixture<FindAgentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FindAgentsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FindAgentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
