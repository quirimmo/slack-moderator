import { SlackProxy } from './SlackProxy';
import { Utils } from './Utils';

class SlackChannel {

    private constructor() { }

    public static getPublicChannelsList(): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: (data: any) => void, reject: (data: any) => void) => {
            SlackProxy.getInstance().webClient.channels.list((err: any, res: any) => {
                Utils.onMethodResults(err, res, 'channels', resolve, reject);
            });
        });
        return returnPromise;
    }
    
}

export { SlackChannel };