import React from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://oussemaamri.com';
const DEFAULT_TITLE_SUFFIX = ' | Oussema Amri';

// Only manages tags Google's JS-executing crawler reads per route (title,
// description, canonical). OG/Twitter tags stay static in index.html —
// social scrapers don't run JS, so they'd never see per-route values here
// anyway; a consistent homepage preview card for any shared URL is the
// better default than an inconsistent, half-updated one.
const PageMeta = ({ title, description, path = '', noindex = false }) => {
  const url = `${SITE_URL}${path}`;
  const fullTitle = title.includes('Oussema Amri') ? title : `${title}${DEFAULT_TITLE_SUFFIX}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? <meta name="robots" content="noindex, nofollow" /> : <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default PageMeta;
