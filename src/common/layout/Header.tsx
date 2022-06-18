import React from 'react';
import { Button, Navbar, Typography } from '@material-tailwind/react';
import { Pages } from '../routing/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <Navbar fullWidth className="flex flex-row bg-green-100 border-green-100 z-50 fixed">
      <div className="flex flex-grow justify-between items-center text-green-900">
        <Typography
          className="py-1.5 mr-4 font-sans font-bold text-green-800 text-2xl"
          textGradient
          color="green"
        >
          {t('common:title')}
        </Typography>
        <ul className="flex items-center gap-6">
          {Object.entries(Pages).map((name) => (
            <Typography
              key={`link-to-${name[0]}`}
              as="li"
              variant="lead"
              className="p-1 font-normal"
            >
              <NavLink to={name[1]}>
                {({ isActive }) => (
                  <Button
                    className={`flex items-center border-green-600 ${
                      isActive ? 'bg-green-600' : 'text-green-600'
                    }`}
                    variant={isActive ? 'filled' : 'outlined'}
                  >
                    {t('common:routing.page', { context: name[0] })}
                  </Button>
                )}
              </NavLink>
            </Typography>
          ))}
        </ul>
        <LanguageSelector />
      </div>
    </Navbar>
  );
};

export default Header;
