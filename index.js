#!/usr/bin/env node

const exec = require('child_process').exec;
const encode = require('./morse').encode;

const message = encode(process.argv[2]);

// TODO: pass on other args
exec(`git commit -m "${message}"`);
