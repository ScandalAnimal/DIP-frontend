import { useParams } from 'react-router-dom';
import React from 'react';

const FormattedNumber = ({ number }) => {
  const { langId } = useParams();
  const langCode = langId === 'en' ? 'en-US' : 'cs-CZ';

  return <>{number.toLocaleString(langCode)}</>;
};

export default FormattedNumber;
