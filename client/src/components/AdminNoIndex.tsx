import HelmetAsyncDefault from 'react-helmet-async';
const { Helmet } = HelmetAsyncDefault;

export default function AdminNoIndex() {
  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
      <meta name="googlebot" content="noindex, nofollow" />
    </Helmet>
  );
}
