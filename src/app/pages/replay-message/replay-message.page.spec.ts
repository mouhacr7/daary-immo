import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReplayMessagePage } from './replay-message.page';

describe('ReplayMessagePage', () => {
  let component: ReplayMessagePage;
  let fixture: ComponentFixture<ReplayMessagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReplayMessagePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReplayMessagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
