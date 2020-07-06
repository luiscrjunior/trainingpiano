import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const LanguageSelector = styled.select`
  margin-top: 20px;
  padding: 3px 8px 3px 8px;
  font-size: 12px;
  background-color: #fff;
`;

export default () => {

  const { t, i18n } = useTranslation();

  const changeLanguage = (e) => {
    window.location.href = `/?lang=${e.target.value}`;
  };

  return <LanguageSelector value={i18n.language} onChange={changeLanguage}>
    { Object.keys(i18n.services.resourceStore.data).map(lang => <option key={lang} value={lang}>{i18n.services.resourceStore.data[lang].name}</option>) }
  </LanguageSelector>;

};

