import { NR1_BASE_URL, NR1_BASE_URL_LOCAL } from '../data/constants';

const NERDLET_PATH = `launcher/nr1-core.explorer/`;

/**
 * @param {string} packId The ID for an observability pack.
 * @param {boolean} [debug] If set to true, this will add `packages=local`.
 * @returns {string} The URL for the pack details within the platform.
 */
const getPackNr1Url = (quickstartId, nerdletId, debug = false) => {
  const pane = JSON.stringify({
    nerdletId,
    quickstartId,
  });

  // Note: this works differently depending on whether or not we have access
  // to the window object (and the btoa function).
  const hash =
    window && window.btoa
      ? btoa(pane)
      : Buffer.from(pane, 'utf-8').toString('base64');

  const local = debug ? 'packages=local&' : '';
  const NR1_URL = debug ? NR1_BASE_URL_LOCAL : NR1_BASE_URL;

  const url = new URL(`${NERDLET_PATH}?${local}pane=${hash}`, NR1_URL);

  return url.href;
};

export default getPackNr1Url;