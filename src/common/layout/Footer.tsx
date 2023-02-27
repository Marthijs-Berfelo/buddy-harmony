import React, { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';
import { Tooltip, Typography } from '@material-tailwind/react';
import packageJson from '../../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBug } from '@fortawesome/free-solid-svg-icons';
import { appInfo } from '../app-info';
import { IconDefinition } from "@fortawesome/fontawesome-common-types";

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row items-center md:justify-between w-full p-1.5 md:p-3 text-green-900 bg-opacity-80 backdrop-saturate-200 backdrop-blur bg-green-100 border-green-100 fixed bottom-0">
      <div className="flex flex-row items-center">
        <FooterText link={`${appInfo.app.source}${appInfo.app.releasesUri}/${packageJson.version}`}>
          {t('common:app-version', { version: appInfo.app.version })}
        </FooterText>
        <FooterIcon content={t('common:app-source')} link={appInfo.app.source} icon={faGithub} />
        <FooterIcon
          content={t('common:app-issues')}
          link={`${appInfo.app.source}${appInfo.app.issuesUri}`}
          icon={faBug}
        />
      </div>
      <div className="flex flex-row items-center">
        <FooterText>{t('common:app-creator', { name: appInfo.author.name })}</FooterText>
        <FooterIcon
          content={t('common:author.github-profile')}
          link={appInfo.author.profile}
          icon={faGithub}
        />
        <FooterIcon
          content={t('common:author.twitter', { handle: appInfo.author.twitter.name })}
          link={appInfo.author.twitter.link}
          icon={faTwitter}
          color={'blue-700'}
        />
        <FooterIcon
          content={t('common:author.send-email')}
          link={`mailto:${appInfo.author.email}`}
          icon={faAt}
        />
      </div>
    </div>
  );
};

export default Footer;

interface FooterTextProps {
  link?: string;
}

const FooterText = ({ link, children }: PropsWithChildren<FooterTextProps>): JSX.Element => (
  <Typography
    className="flex font-sans text-sm mx-1.5"
    as={!!link ? 'a' : undefined}
    href={link}
    target={!!link ? '_blank' : undefined}
    rel={!!link ? 'noreferrer' : undefined}
  >
    {children}
  </Typography>
);

interface FooterIconProps extends FooterTextProps {
  content: string;
  link: string;
  icon: IconDefinition;
  color?: string;
}

const FooterIcon = ({ content, link, icon, color }: FooterIconProps): JSX.Element => (
  <FooterText link={link}>
    <Tooltip content={content}>
      <FontAwesomeIcon className={`text-xl text-${color || 'black'}`} icon={icon} />
    </Tooltip>
  </FooterText>
);
