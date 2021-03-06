import React from 'react';
import { useTranslation } from 'react-i18next';

import styled from 'styled-components';

const Selector = styled.select`
  padding: 3px 8px 3px 8px;
  font-size: 12px;
  background-color: #fff;
`;

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (e) => {
    window.location.href = `${window.location.origin}${window.location.pathname}?lang=${e.target.value}`;
  };

  return (
    <Selector value={i18n.language} onChange={changeLanguage}>
      {Object.keys(i18n.services.resourceStore.data).map((lang) => (
        <option key={lang} value={lang}>
          {i18n.services.resourceStore.data[lang].name}
        </option>
      ))}
    </Selector>
  );
};

export default LanguageSelector;
