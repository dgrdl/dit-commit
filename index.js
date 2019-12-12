#!/usr/bin/env node

const { encode } = require('./morse');
const { findGitRoot } = require('./git');
const yargs = require('yargs');
const simpleGit = require('simple-git')();
const chalk = require('chalk');
const inquirer = require('inquirer');

// IDEAS:
// - consider adding an 'encode' command that just prints the morse code to your terminal (or wherever)

// TODO: add flag / option to remove hook again
// TODO: add a check to prevent double encoding (to both the hook and the commit commands)

yargs
  .parserConfiguration({
    'camel-case-expansion': false,
    'boolean-negation': false,
    'duplicate-arguments-array': false,
    'strip-aliased': true
  })
  .command({
    command: '$0 <message|m>',
    desc:
      'Does a commit in morse code. Pass in a message and any git-commit flags you want (except -m / --message, -F / --file, -t / --template).',
    builder: {},
    handler: argv => {
      const message = encode(argv.message);

      const args = Object.assign({}, argv);
      delete args['_'];
      delete args['$0'];
      delete args['message'];
      delete args['m'];

      // NOTE: needed for simple-git
      Object.keys(args).map(k => {
        let value = args[k];
        const newKey = k.length === 1 ? `-${k}` : `--${k}`;

        delete args[k];

        if (value === true) {
          value = null;
        }

        args[newKey] = value;
      });

      simpleGit.commit(message, [], args);
    }
  })
  .command({
    command: 'hook',
    desc:
      "Adds a git hook to the nearest repository that automatically converts all commit messages into morse code.\n\nYes, it's a terrible idea.",
    builder: {
      global: {
        alias: 'g',
        describe:
          'Add the hook to your global git settings instead.\n\nPlease never use this flag.'
      }
    },
    handler: argv => {
      inquirer
        .prompt({
          type: 'confirm',
          name: 'confirmation',
          message:
            'This will install a hook which automatically converts your commit messages in this repository into Morse code. Are you sure that you want this?',
          default: false
        })
        .then(({ confirmation }) => {
          if (!confirmation) {
            console.log(chalk.gray('Good choice...'));
            return;
          }

          inquirer
            .prompt({
              type: 'input',
              name: 'morseConfirmation',
              message:
                'WARNING: This is a really bad idea. If you are still sure that you want this to happen, type the word YES in Morse code.'
            })
            .then(({ morseConfirmation }) => {
              // -.-- . ...
              if (encode('yes').trim() !== morseConfirmation.trim()) {
                console.log(
                  chalk.red(
                    'Wrong input! Your commits live to see another day.'
                  )
                );
                return;
              }

              if (argv.global) {
                console.log('omg global...');
              } else {
                const gitRoot = findGitRoot();
                if (!gitRoot) {
                  console.warn(
                    chalk.yellow('Could not create hook: No git project found!')
                  );
                  return;
                }

                // TODO: add hook (symlink?) to git repo
              }

              console.log(
                chalk.green("Git hook created. Don't say we didn't warn you.")
              );
            });
        });
    }
  })
  .help().argv;
