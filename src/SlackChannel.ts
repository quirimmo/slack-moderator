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

    public static getPrivateChannelsList(): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: (data: any) => void, reject: (data: any) => void) => {
            SlackProxy.getInstance().webClient.groups.list(function(err, res) {
                Utils.onMethodResults(err, res, 'groups', resolve, reject);
            });
        });
        return returnPromise;
    }

    public static getChannelsList(): Promise<any> {
        let promises: Array<Promise<any>> = [
            this.getPrivateChannelsList(),
            this.getPublicChannelsList()
        ];
        return Promise.all(promises).then((data: any) => {
            let channels: Array<any> = [];
            return channels.concat(data[0], data[1]);
        });
    }
    
}

export { SlackChannel };