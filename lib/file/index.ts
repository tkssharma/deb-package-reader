import fs, { PathLike, read } from 'fs';
import tmp from 'tmp';
import { Parser } from '../parser';
import Logger from '../utils/logger';
const parser = new Parser();
const readline = require('readline');

export class FileWriterService {
  private filePath!: PathLike;
  public async writeDebianPkgFile(data: any) {
    // tslint:disable-next-line: no-try-promise
    try {
      return new Promise(async (resolve, reject) => {
        const filepath = await this.creatTemp();
        this.setFileName(filepath);
        const writeStream = fs.createWriteStream(filepath);
        writeStream.write(data);
        writeStream.on('finish', () => {
          Logger.success(`file has been written with filePath ${filepath}`);
          resolve(filepath);
        });
        // close the stream
        writeStream.end();
      });
    } catch (err) {
      console.log(err);
      throw new Error('writedebianPkgFile : write file operation failed..');
    }
  }
  public async readDebianPkgFile() {
    try {
      const readStream = fs.createReadStream(this.filePath);
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });
      for await (const line of rl) {
        parser.parseChunk(line);
      }
      const data = parser.getStore();
      if (data && data.length > 0) {
        console.log(data.length);
        const payload = JSON.stringify(data);
        await this.writeDebianPkgFile(payload);
      } else {
        throw new Error('readDebianPkgFile : store is empty after reading file..');
      }
      return;
    } catch (err) {
      console.log(err);
      throw new Error('readDebianPkgFile : read file operation failed..');
    }
  }
  private setFileName(path: PathLike) {
    this.filePath = path;
  }
  private async creatTemp(): Promise<PathLike> {
    return new Promise((resolve, reject) => {
      tmp.file({ prefix: 'packages', postfix: '.txt', keep: true }, (err, path) => {
        if (err) { reject(err); }
        resolve(path);
      });
    });
  }
}
