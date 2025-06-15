import React from 'react';
import { useTranslation } from 'react-i18next';

export default function PoliticaCookies() {
  const { t } = useTranslation();

  return (
    <div className="politica-cookies" style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{t('cookies_title')}</h1>

      <p>{t('cookies_intro')}</p>

      <h2>{t('cookies_what')}</h2>
      <p>{t('cookies_what_text')}</p>

      <h2>{t('cookies_types')}</h2>
      <ul>
        <li><strong>{t('cookies_functional_title')}</strong> {t('cookies_functional_text')}</li>
      </ul>

      <h2>{t('cookies_manage')}</h2>
      <p>{t('cookies_manage_text')}</p>

      <h2>{t('cookies_mod')}</h2>
      <p>{t('cookies_mod_text')}</p>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        {t('cookies_updated')}
      </p>
    </div>
  );
}
