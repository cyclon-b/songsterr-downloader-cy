import { describe, expect, it } from 'vitest';
import { isUrlFromSongsterr } from './input-validation';

describe('isUrlFromSongsterr', () => {
  it.each([
    'https://www.songsterr.com/a/wsa/chon-fluffy-tab-s399673',
    'https://songsterr.com/a/wsa/chon-fluffy-tab-s399673',
    'http://www.songsterr.com/a/wsa/chon-fluffy-tab-s399673',
    'https://www.songsterr.com/a/wsa/chon-fluffy-tab-s399673?ref=share'
  ])('accepts %s', (url) => {
    expect(isUrlFromSongsterr(url)).toBe(true);
  });

  it.each([
    '',
    'https://example.com/a/wsa/chon-fluffy-tab-s399673',
    'https://www.songsterr.com/a/wsa',
    'https://www.songsterr.com/artist/chon'
  ])('rejects %s', (url) => {
    expect(isUrlFromSongsterr(url)).toBe(false);
  });

  it('ignores surrounding whitespace', () => {
    expect(
      isUrlFromSongsterr(
        '  https://www.songsterr.com/a/wsa/chon-fluffy-tab-s399673\n'
      )
    ).toBe(true);
  });
});
