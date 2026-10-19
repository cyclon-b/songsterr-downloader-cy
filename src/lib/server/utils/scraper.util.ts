import Fetcher from '$lib/server/utils/fetcher.util';
import { DOMParser } from '@xmldom/xmldom';

class Scraper {
  async getDocumentFromUrl(url: string, websiteType: 'xml' | 'html') {
    const fetcher = new Fetcher({ withRotatingUserAgent: false });
    const response = await fetcher.fetch(url, {
      headers: fetcher.browserLikeDocumentHeaders
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} (${response.status})`);
    }

    const text = await response.text();
    /*
     * Songsterr serves HTML, but xmldom is an XML parser. Its diagnostics about
     * HTML-only syntax (for example a bare `async` attribute) are expected and
     * benign; the caller validates that the required payload was parsed.
     */
    return new DOMParser({
      errorHandler: {
        warning: () => {},
        error: () => {},
        fatalError: () => {}
      }
    }).parseFromString(text, `text/${websiteType}`);
  }
}

export const scraper = new Scraper();
