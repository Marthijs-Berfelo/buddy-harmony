import type { JSX } from 'react';
import { lazy, Suspense } from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Pages } from 'routing/pages';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { faBars, faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { HelpSection } from '@/help/content-types';
import { useHelpDrawer } from '@/help/hooks/help-drawer-provider';

const LanguageSelector = lazy(() =>
  import('./components/language-selector').then((module) => ({
    default: module.LanguageSelector,
  }))
);

const PAGE_HELP_SECTIONS: Partial<Record<Pages, HelpSection>> = {
  [Pages.CHORD]: HelpSection.CHORD,
  [Pages.SCALE]: HelpSection.SCALE,
  [Pages.CAGED]: HelpSection.CAGED,
};

export const Header = (): JSX.Element => {
  const { t } = useTranslation('common');
  const location = useLocation();
  const { open } = useHelpDrawer();
  const helpSection = PAGE_HELP_SECTIONS[location.pathname as Pages];

  return (
    <div className="flex flex-row w-full p-4 bg-opacity-80 backdrop-saturate-200 backdrop-blur bg-green-100 border-green-100 z-50 fixed">
      <div className="flex grow justify-between items-center text-green-900">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="bg-green-600 border-green-600 hover:bg-green-700 text-white"
              aria-label={t('menu')}
            >
              <FontAwesomeIcon className="text-xl" icon={faBars} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {Object.entries(Pages).map((name) => (
              <DropdownMenuItem
                key={`link-to-${name[0]}`}
                asChild
                className="p-1 font-normal text-xl leading-relaxed"
              >
                <NavLink to={name[1]}>
                  {({ isActive }) => (
                    <div
                      className={`flex w-full hover:bg-green-50 font-sans text-sm items-center ${
                        isActive
                          ? 'text-slate-600 hover:bg-slate-100 active-link'
                          : 'text-green-700'
                      }`}
                    >
                      {t('routing.page', { context: name[0] })}
                    </div>
                  )}
                </NavLink>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <p className="py-1.5 mx-4 font-sans font-bold text-2xl bg-clip-text text-transparent bg-linear-to-tr from-green-600 to-green-400">
          {t('title')}
        </p>
        <div className="flex items-center gap-2">
          {helpSection !== undefined && (
            <Button
              variant="ghost"
              size="icon"
              className="bg-green-600 border-green-600 hover:bg-green-700 text-white"
              aria-label={t('help')}
              onClick={() => open(helpSection)}
            >
              <FontAwesomeIcon className="text-xl" icon={faCircleQuestion} />
            </Button>
          )}
          <Suspense fallback={undefined}>
            <LanguageSelector />
          </Suspense>
        </div>
      </div>
    </div>
  );
};
