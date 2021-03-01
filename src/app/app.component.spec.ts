import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  let originalSplashScreen: any;
let originalStatusBar: any;

    beforeEach(async(() => {
      originalStatusBar = Plugins.StatusBar;
      originalSplashScreen = Plugins.SplashScreen;
      Plugins.StatusBar = jasmine.createSpyObj('StatusBar', ['setStyle']);
      Plugins.SplashScreen = jasmine.createSpyObj('SplashScreen', ['hide']);
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        schemas: [CUSTOM_ELEMENTS_SCHEMA],
        providers: [
          {
            provide: Platform,
            useFactory: () => jasmine.createSpyObj('Platform', { is: false })
          }
        ]
      }).compileComponents();
    }));

    afterEach(() => {
      Plugins.StatusBar = originalStatusBar;
      Plugins.SplashScreen = originalSplashScreen;
    });

  it('should create the app', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  describe('initialization', () => {
    let platform: Platform;
  
    beforeEach(() => {
      platform = TestBed.inject(Platform);
    });
  
    describe('in a hybrid mobile context', () => {
      beforeEach(() => {
        (platform.is as any).withArgs('hybrid').and.returnValue(true);
      });
  
      it('styles the status bar', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.StatusBar.setStyle).toHaveBeenCalledTimes(1);
        expect(Plugins.StatusBar.setStyle).toHaveBeenCalledWith({ style: StatusBarStyle.Light });
      });
  
      it('hides the splash screen', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.SplashScreen.hide).toHaveBeenCalledTimes(1);
      });
    });
  
    describe('in a web context', () => {
      beforeEach(() => {
        (platform.is as any).withArgs('hybrid').and.returnValue(false);
      });
  
      it('does not style the status bar', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.StatusBar.setStyle).not.toHaveBeenCalled();
      });
  
      it('does not hide the splash screen', () => {
        TestBed.createComponent(AppComponent);
        expect(Plugins.SplashScreen.hide).not.toHaveBeenCalled();
      });
    });
  });

  it('should have menu labels', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-label');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].textContent).toContain('Inbox');
    expect(menuItems[1].textContent).toContain('Outbox');
  });

  it('should have urls', async () => {
    const fixture = await TestBed.createComponent(AppComponent);
    await fixture.detectChanges();
    const app = fixture.nativeElement;
    const menuItems = app.querySelectorAll('ion-item');
    expect(menuItems.length).toEqual(12);
    expect(menuItems[0].getAttribute('ng-reflect-router-link')).toEqual('/folder/Inbox');
    expect(menuItems[1].getAttribute('ng-reflect-router-link')).toEqual('/folder/Outbox');
  });

});
