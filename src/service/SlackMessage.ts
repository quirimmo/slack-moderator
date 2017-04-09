import { SlackProxy } from './SlackProxy';
import { Utils } from './../utility/Utils';

class SlackMessage {

    private constructor() { }


    public static sendMessageThroughWeb(msg: string, channelID: string): Promise<any> {
        let returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().webClient.chat.postMessage(channelID, msg, (err: any, res: any) => {
                Utils.onMethodResults(err, res, undefined, resolve, reject);
            }); 
        });
        return returnPromise;
    }    


}

export { SlackMessage };