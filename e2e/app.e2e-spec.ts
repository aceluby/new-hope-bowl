import { NewHopeBowlPage } from './app.po';

describe('new-hope-bowl App', () => {
  let page: NewHopeBowlPage;

  beforeEach(() => {
    page = new NewHopeBowlPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
