#!/usr/bin/env node

import cp from 'child_process';
import fs from 'fs';
import inquirer from 'inquirer';

const homeDir = process.env['HOME'];
const ssoSessionRegex = /\[sso-session .*]/g;
const bracketsRemovalRegx = /(\[sso-session )|(\])/g;

const promptProfileChoice = data => {
  const matches = data.match(ssoSessionRegex);

  if (!matches) {
    console.log('❌ No SSO session profile found.');
    console.log('Refer to this guide for help on setting up AWS IAM Identity Center / SSO authentication:');
    console.log('https://docs.aws.amazon.com/cli/latest/userguide/sso-configure-profile-token.html');
    return;
  }

  const ssoSessions = matches.map(match => {
    return match.replace(bracketsRemovalRegx, '');
  });

  const ssoSessionChoice = [
    {
      type: 'list',
      name: 'session',
      message: 'Choose a AWS SSO session',
      choices: ssoSessions,
    },
  ];

  return inquirer.prompt(ssoSessionChoice);
};

const readAwsConfig = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(`${homeDir}/.aws/config`, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      } else {
        resolve(data);
      }
    });
  });
};

const writeToConfig = answers => {
  const profileChoice = answers.session;

  return new Promise((resolve, reject) => {
    cp.exec(`aws sso login --sso-session ${profileChoice}`, error => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
};

readAwsConfig()
  .then(promptProfileChoice)
  .then(writeToConfig)
  .catch(error => {
    console.log('Error:', error);
    process.exit(1);
  });
