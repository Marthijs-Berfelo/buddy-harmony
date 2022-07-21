import React from 'react';
import { IconButton, Menu, MenuHandler, MenuList, Typography } from '@material-tailwind/react';
import { Pages } from '../routing/pages';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './components/LanguageSelector';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Header = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <div className="flex flex-row w-full p-4 bg-opacity-80 backdrop-saturate-200 backdrop-blur bg-green-100 border-green-100 z-50 fixed">
      <div className="flex flex-grow justify-between items-center text-green-900">
        <Menu placement="bottom-end">
          <MenuHandler>
            <IconButton className="bg-green-600 border-green-600">
              <FontAwesomeIcon className="text-xl" icon={faBars} />
            </IconButton>
          </MenuHandler>
          <MenuList>
            {Object.entries(Pages).map((name) => (
              <Typography
                key={`link-to-${name[0]}`}
                as="li"
                variant="lead"
                className="p-1 font-normal"
              >
                <NavLink to={name[1]}>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full hover:bg-green-50 font-sans text-sm bg-white items-center ${
                        isActive
                          ? 'text-blue-grey-600 hover:bg-blue-grey-100 active-link'
                          : 'text-green-700'
                      }`}
                    >
                      {t('common:routing.page', { context: name[0] })}
                    </div>
                  )}
                </NavLink>
              </Typography>
            ))}
          </MenuList>
        </Menu>
        <Typography
          className="py-1.5 mx-4 font-sans font-medium text-green-800 text-2xl"
          textGradient
          color="green"
        >
          {t('common:title')}
        </Typography>
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
