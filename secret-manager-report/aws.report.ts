import path from 'path';
import * as fs from "fs";
import { saveJsonFile } from './utils';

async function main() {

  const files = fs.readdirSync(path.join(__dirname, 'out'));
  const secrets = files.map(file => JSON.parse(fs.readFileSync(path.join(__dirname, 'out', file), 'utf-8')));


  const allKeys = new Set([...secrets.flatMap(env => Object.keys(env).map(s => s))]);
  const diff: { [key: string]: { [envName: string]: boolean } } = {};

  allKeys.forEach(key => {
    secrets.forEach(secret => {
      if (!diff[key]) {
        diff[key] = {};
      }
      diff[key][secret.ENV] = key in secret;
    });
  });

  console.log(diff);

  const filename = `${Date.now().toString()}-AWS-SECRET-MANAGER-DIFF-REPORT.json`;
  saveJsonFile(path.join(__dirname, "out", filename), diff)
}


main()
