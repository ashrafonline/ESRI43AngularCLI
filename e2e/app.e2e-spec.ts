import { ESRI43AngularCLIPage } from './app.po';

describe('esri43-angular-cli App', () => {
  let page: ESRI43AngularCLIPage;

  beforeEach(() => {
    page = new ESRI43AngularCLIPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
