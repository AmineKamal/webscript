import { Scraper } from '../src/index';

jest.setTimeout(100000);

test('Scraper', async () => {
  const scraper = new Scraper({ maxScroll: 10 });
  const res = await scraper.get('https://www.google.com/search?tbm=isch&q=banane');
  expect(res.content).toBeDefined();
  expect(res.images.length).toBeGreaterThan(0);
});
