import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UploadPropertyPage } from './upload-property.page';

describe('UploadPropertyPage', () => {
  let component: UploadPropertyPage;
  let fixture: ComponentFixture<UploadPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UploadPropertyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UploadPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
