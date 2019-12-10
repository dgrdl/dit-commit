#!/usr/bin/env node

const encode = require('./morse').encode;
const yargs = require('yargs');
const simpleGit = require('simple-git')();

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

      Object.keys(args).map(k => {
        let value = args[k];
        const newKey = k.length === 1 ? `-${k}` : `--${k}`;

        delete args[k];

        if (value === true) {
          // NOTE: needed for simple-git
          value = null;
        }

        args[newKey] = value;
      });

      simpleGit.commit(message, [], args);
    }
  })
  .help().argv;
