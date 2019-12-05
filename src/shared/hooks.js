import { useMemo } from 'react';

import utils from './localeUtils';
import getLanguageText from './localeLanguages';

const useLocaleUtils = locale => useMemo(() => utils(locale), [locale]);

const useLocaleLanguage = locale => useMemo(() => getLanguageText(locale), [locale]);

export { useLocaleUtils, useLocaleLanguage };
