import { DebPackage } from './package';

export class Parser {
  public packageData: any = {};
  public pkgCount = 0;
  public store: DebPackage[] = [];
  private buildChukData() {
    return {} as DebPackage;
  }
  public parseChunk(chunkLine: string) {
    if (chunkLine.indexOf('Package') !== -1 || chunkLine.indexOf('Version') !== -1 || chunkLine.indexOf('Depends') !== -1) {
      const [key, value] = chunkLine.split(':');
      this.setPackageData(key, value);
    }
  }
  public getStore() {
    return this.store;
  }
  public setPackageData(key: string, value: string) {
    if (key === 'Package') {
      const length = Object.keys(this.packageData).length;
      if (length && length !== 0) {
        this.store.push(this.packageData);
        this.packageData = {};
        this.packageData[key] = value;
        return;
      }
    } else {
      this.packageData[key] = value;
    }
  }
}
