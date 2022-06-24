import React from 'react';
import { useTranslation } from 'react-i18next';
import { Navbar, Tooltip, Typography } from '@material-tailwind/react';
import packageJson from '../../../package.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faAt, faBug } from '@fortawesome/free-solid-svg-icons';
import { appInfo } from '../app-info';

const Footer = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Navbar fullWidth className="flex flex-row bg-green-100 border-green-100 fixed bottom-0">
      <div className="flex flex-grow justify-between items-center text-green-900">
        <div className="flex flex-col">
          <Typography
            className="font-sans text-sm"
            as="a"
            href={`${appInfo.app.source}${appInfo.app.releasesUri}/${packageJson.version}`}
            target="_blank"
            rel="noreferrer"
          >
            {t('common:app-version', { version: appInfo.app.version })}
          </Typography>
          <div className="flex flex-row items-center justify-evenly mt-1">
            <Tooltip content={t('common:app-source')}>
              <Typography
                as="a"
                className="font-sans text-sm flex"
                href={appInfo.app.source}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="flex text-xl text-black mr-2" icon={faGithub} />
              </Typography>
            </Tooltip>
            <Tooltip content={t('common:app-issues')}>
              <Typography
                as="a"
                className="font-sans text-sm flex"
                href={`${appInfo.app.source}${appInfo.app.issuesUri}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="flex text-xl text-black mr-2" icon={faBug} />
              </Typography>
            </Tooltip>
          </div>
        </div>
        <div className="flex flex-col">
          <Typography className="font-sans text-sm">
            {t('common:app-creator', { name: appInfo.author.name })}
          </Typography>
          <div className="flex flex-row items-center justify-evenly mt-1">
            <Tooltip content={t('common:author.github-profile')}>
              <Typography
                as="a"
                className="font-sans text-sm flex"
                href={appInfo.author.profile}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="flex text-xl text-black mr-2" icon={faGithub} />
              </Typography>
            </Tooltip>
            <Tooltip content={t('common:author.twitter', { handle: appInfo.author.twitter.name })}>
              <Typography
                as="a"
                className="font-sans text-sm flex"
                href={appInfo.author.twitter.link}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="flex text-xl text-black mr-2" icon={faTwitter} />
              </Typography>
            </Tooltip>
            <Tooltip content={t('common:author.send-email')}>
              <Typography
                as="a"
                className="font-sans text-sm flex"
                href={`mailto:${appInfo.author.email}`}
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon className="flex text-xl text-black mr-2" icon={faAt} />
              </Typography>
            </Tooltip>
          </div>
        </div>
      </div>
    </Navbar>
  );
};

export default Footer;
