import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ContactAgentPage } from './contact-agent.page';

describe('ContactAgentPage', () => {
  let component: ContactAgentPage;
  let fixture: ComponentFixture<ContactAgentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactAgentPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactAgentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
