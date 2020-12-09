import { FileWriterService } from '../file';

import { DebianPackageService } from '../http';

import Logger from '../utils/logger';
const writerService = async () => {
  try {
    Logger.startSpinner('----processing started------');
    const fileWriter = new FileWriterService();
    const debPakcage = new DebianPackageService();

    Logger.startSpinner('----downloading started------');
    const data = await debPakcage.downloadDebianPackageTar();
    // write to a file
    Logger.startSpinner('----file write started------');
    await fileWriter.writeDebianPkgFile(data);
    await fileWriter.readDebianPkgFile();
    Logger.stopSpinner();
    process.exit(0);
  } catch (err) {
    // TBD
    console.log(err);
    // check err instance being thrown from differnt helpers
  }
};
export default writerService;
