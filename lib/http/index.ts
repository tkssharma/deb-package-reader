import axios from 'axios';
import { DownloadError } from '../error-handling';
import { API } from '../utils/constants';

export class DebianPackageService {

  public async downloadDebianPackages() {
    try {
      const { data } = await axios.get(API);
      return data;
    } catch (error) {
      throw new DownloadError(`unable to download file from - ${API}`);
    }
  }
  public async downloadDebianPackageTar() {
    const { data } = await axios.get(API);
    // TBD change URL
    return data;
  }
}
