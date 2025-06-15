import '../../styles/politica-privacidad.css';
import { useTranslation } from 'react-i18next';

export default function PoliticaPrivacidad() {
  const { t } = useTranslation();

  return (
    <div className="politica-privacidad">
      <h1>{t("privacy_title")}</h1>

      <h2>{t("responsable")}</h2>
      <p>{t("responsable_text")}</p>

      <h2>{t("purpose")}</h2>
      <p>{t("purpose_text")}</p>
      <ul>
        {t("purpose_list", { returnObjects: true }).map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>
      <p>{t("purpose_extra")}</p>

      <h2>{t("legitimation")}</h2>
      <p>{t("legitimation_text")}</p>

      <h2>{t("data_sharing")}</h2>
      <p>{t("data_sharing_text")}</p>

      <h2>{t("user_rights")}</h2>
      <p>{t("user_rights_text")}</p>

      <h2>{t("data_retention")}</h2>
      <p>{t("data_retention_text")}</p>

      <h2>{t("security")}</h2>
      <p>{t("security_text")}</p>
    </div>
  );
}
