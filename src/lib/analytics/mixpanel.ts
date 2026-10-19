import { browser } from '$app/environment';
import { env } from '$env/dynamic/public';

/*
 * mixpanel-browser is loaded lazily and must never be allowed to break the
 * app: an extension, firewall or antivirus can block the module request, and a
 * rejected static import would take the whole client bundle (and therefore
 * hydration and downloads) down with it.
 */
type MixpanelClient = {
  init: (token: string, options?: Record<string, unknown>) => void;
  track: (eventName: string, properties?: Record<string, any>) => void;
};

let clientPromise: Promise<MixpanelClient | null> | undefined;

function getClient(): Promise<MixpanelClient | null> {
  if (!browser) return Promise.resolve(null);

  clientPromise ??= import('mixpanel-browser')
    .then(({ default: mixpanel }) => {
      const token = env.PUBLIC_MIXPANEL_ID;
      if (!token) return null;

      mixpanel.init(token, {
        autocapture: false,
        record_sessions_percent: 0
      });

      return mixpanel;
    })
    .catch((error) => {
      console.warn(
        '[analytics] Mixpanel unavailable, continuing without analytics.',
        error
      );
      return null;
    });

  return clientPromise;
}

function track(eventName: string, properties?: Record<string, any>): void {
  void getClient().then((mixpanel) => mixpanel?.track(eventName, properties));
}

interface TrackDownloadParams {
  title: string;
  artist: string;
  songId: number;
}

export function trackGuitarProDownloaded(props: TrackDownloadParams) {
  track('Guitar Pro Downloaded', props);
}

export function trackMidiDownloaded(props: TrackDownloadParams) {
  track('MIDI Downloaded', props);
}

interface TrackDownloadFailedParams extends TrackDownloadParams {
  downloadType: string;
  errorMessage: string;
  songsterrUrl?: string;
}

export function trackDownloadFailed(props: TrackDownloadFailedParams) {
  track('Download Failed', props);
}

export function trackYouTubeVideoClicked() {
  track('YouTube Video Clicked');
}

export function trackFretwiseAdClicked() {
  track('Fretwise Ad Clicked');
}
