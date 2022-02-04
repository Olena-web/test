export class AbstractView {
  constructor() {}

  setTitle(title: string) {
    document.title = title;
  }

  async getHtml():Promise<string> {
    return '';
  }
}