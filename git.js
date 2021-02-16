// taken from: https://github.com/ghooks-org/ghooks/blob/master/lib/install.js

const fs = require('fs');
const resolve = require('path').resolve;
const findup = require('findup');

function findGitRoot() {
  try {
    return getGitRoot();
  } catch (e) {
    return null;
  }
}

function getGitRoot() {
  const gitRoot = findup.sync(process.cwd(), '.git');
  const gitPath = resolve(gitRoot, '.git');
  const fileStat = fs.statSync(gitPath);
  return (
    gitPathDir(gitPath, fileStat) || gitPathFile(gitPath, fileStat, gitRoot)
  );
}

function gitPathDir(gitPath, fileStat) {
  return fileStat.isDirectory() ? gitPath : null;
}

function gitPathFile(gitPath, fileStat, gitRoot) {
  return fileStat.isFile() ? parseGitFile(fileStat, gitPath, gitRoot) : null;
}

function parseGitFile(fileStat, gitPath, gitRoot) {
  const gitDirRegex = /[^]{0,}gitdir: ([^\n]{1,})[^]{0,}/;
  const gitFileContents = fs.readFileSync(gitPath, 'utf8');
  if (gitDirRegex.test(gitFileContents)) {
    return resolve(gitRoot, gitFileContents.replace(gitDirRegex, '$1'));
  }
  return null;
}

module.exports = { findGitRoot };
