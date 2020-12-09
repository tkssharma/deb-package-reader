export class DownloadError extends Error {
    constructor(message: string = 'http download error') {
        super(message);
    }
}
