import { IBrowserOptions } from '../../..';

export abstract class BaseBrowser<B, P> {
  protected pages: P[] = [];
  protected currentPage!: P;
  protected browser!: B;
  private initialized = false;

  public async init(opt?: IBrowserOptions) {
    if (this.initialized) return;

    await this._init(opt);
    this.setPage(await this.newPage());
    this.initialized = true;
  }

  public async newPage() {
    return this.pages.push(await this._newPage()) - 1;
  }

  public setPage(i: number) {
    this.currentPage = this.pages[i];
  }

  public async finish() {
    await Promise.all(this.pages.map((_, i) => this.closePage(i)));
    await this._closeBrowser();
  }

  public abstract async goto(url: string): Promise<void>;
  public abstract async wait(time: number): Promise<void>;
  public abstract async click(e: string): Promise<void>;
  public abstract async closePage(i: number): Promise<void>;

  protected abstract async _init(opt?: IBrowserOptions): Promise<void>;
  protected abstract async _newPage(): Promise<P>;
  protected abstract async _closeBrowser(): Promise<void>;
}
