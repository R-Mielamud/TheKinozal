import React from 'react';
import { Flag, FlagNameValues, Select } from 'semantic-ui-react';
import { Languages, specificLngCodes } from '../../config/i18next.config';
import { getLanguage, setLanguage } from '../../helpers/language.helper';

const LanguageSelect: React.FC = () => {
	const getLangCode = (lng: string) => {
		const spec = specificLngCodes[lng];

		if (spec) {
			return spec;
		}

		return lng;
	};

	return (
		<Select
			defaultValue={getLanguage()}
			onChange={(event, data) => setLanguage(data.value as string)}
			options={Object.keys(Languages).map((lang, i) => ({
				name: i,
				value: lang,
				text: (
					<div>
						<Flag name={getLangCode(lang) as FlagNameValues} />
						{Languages[lang]}
					</div>
				),
			}))}
		/>
	);
};

export default LanguageSelect;
