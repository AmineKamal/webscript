import { Chrome } from './chrome.browser';
import { BaseBrowser } from './base.browser';
import { IBrowserOptions } from '../../..';

export type BrowserType = 'CHROME';
const DEFAULT_BROWSER = 'CHROME';

export class Browser {
  public static async _(opts?: IBrowserOptions): Promise<BaseBrowser<any, any>> {
    let browser: BaseBrowser<any, any>;
    const type = opts && opts.browser ? opts.browser : DEFAULT_BROWSER;

    switch (type) {
      case 'CHROME':
        browser = new Chrome();
        break;

      default:
        browser = new Chrome();
    }

    await browser.init(opts);

    return browser;
  }
}
