export const SONGSTERR_URL_REGEX_PATTERN =
  /^https?:\/\/(?:www\.)?songsterr\.com\/a\/wsa\/.*/;

export function setValidationMessage(event: Event): void {
  const input = event.target as HTMLInputElement;
  if (input.value === '') {
    input.setCustomValidity('Please enter a valid tab URL.');
  } else {
    input.setCustomValidity('Please enter a valid Songsterr URL.');
  }
}

export function clearValidationMessage(event: Event): void {
  const input = event.target as HTMLInputElement;
  input.setCustomValidity('');
}

export function isUrlFromSongsterr(url: unknown): boolean {
  return SONGSTERR_URL_REGEX_PATTERN.test(String(url ?? '').trim());
}
