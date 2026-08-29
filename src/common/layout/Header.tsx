import type { JSX } from 'react';
import { Button } from '../../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../../components/ui/dropdown-menu';
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size="icon" className="bg-green-600 border-green-600">
              <FontAwesomeIcon className="text-xl" icon={faBars} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {Object.entries(Pages).map((name) => (
              <li key={`link-to-${name[0]}`} className="p-1 font-normal text-xl leading-relaxed">
                <NavLink to={name[1]}>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full hover:bg-green-50 font-sans text-sm bg-white items-center ${
                        isActive
                          ? 'text-slate-600 hover:bg-slate-100 active-link'
                          : 'text-green-700'
                      }`}
                    >
                      {t('common:routing.page', { context: name[0] })}
                    </div>
                  )}
                </NavLink>
              </li>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="py-1.5 mx-4 font-sans font-bold text-2xl bg-clip-text text-transparent bg-gradient-to-tr from-green-600 to-green-400">
          {t('common:title')}
        </p>
        <LanguageSelector />
      </div>
    </div>
  );
};

export default Header;
