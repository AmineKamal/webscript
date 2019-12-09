import { BaseBrowser } from './base.browser';
import * as puppeteer from 'puppeteer';
import { IBrowserOptions } from '../../..';

export class Chrome extends BaseBrowser<puppeteer.Browser, puppeteer.Page> {
  public async goto(url: string) {
    await this.currentPage.goto(url);
  }

  public async wait(time: number) {
    await this.currentPage.waitFor(time);
  }

  public async click(e: string) {
    await this.currentPage.click(e);
  }

  public async closePage(i: number) {
    await this.pages[i].close();
  }

  protected async _init(opt?: IBrowserOptions) {
    this.browser = await puppeteer.launch(opt);
  }

  protected async _newPage() {
    return this.browser.newPage();
  }

  protected async _closeBrowser() {
    await this.browser.close();
  }
}
