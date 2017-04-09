import { SlackProxy } from './SlackProxy';
import { SlackChannel } from './SlackChannel';
import { SlackUser } from './SlackUser';
import { Utils } from './../utility/Utils';
import { Message } from './../model/Message';

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

    public static sendMessageThroughRTM(msg: string, channelID: string): Promise<any> {
        var returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().initRTMPromise.then((data: any) => {
                SlackProxy.getInstance().rtmClient.sendMessage(msg, channelID).then((res: any) => {
                    resolve(res);
                });
            });
        });
        return returnPromise;
    }

    public static deleteMessage(message: Message): Promise<any> {
        var returnPromise: Promise<any> = new Promise((resolve: any, reject: any) => {
            SlackProxy.getInstance().webClient.chat.delete(message.timestamp, message.channel, "as_user=true", (err: any, res: any) => {
                Utils.onMethodResults(err, res, undefined, resolve, reject);
            });
        });
        return returnPromise;
    }

    public static sendMessageToAllModerators(msg: string): Promise<any> {
        let promises: Array<Promise<any>> = [];
        let returnPromise: Promise<any>;
        SlackProxy.getInstance().moderators.forEach((moderator: string) => {
            returnPromise= new Promise((resolve: any, reject: any) => {
                this.sendMessageThroughWeb(msg, moderator).then((data: any) => {
                    resolve();
                });
            });
            promises.push(returnPromise);
        });
        return Promise.all(promises);
    }


    public static analyseMessagesForInappropriateWords(msg: Message): void {
        if (msg.type === 'message' && !msg.subtype) {
            let regexp;
            SlackProxy.getInstance().inappropriateWords.forEach((word) => {
                regexp = new RegExp(word, 'i');
                if (msg.text.match(regexp)) {
                    this.reportInappropriateWordUse(word, msg);
                }
            });
        }
    }


    public static analyseMessagesForFileSharing(msg: Message): void {
        if (msg.subtype && msg.subtype === 'file_share') {
            let channelPromise = SlackChannel.getChannelByID(msg.channel);
            let userPromise = SlackUser.getUserById(msg.user);
            Promise.all([
                channelPromise,
                userPromise
            ]).then((data: any) => {
                let channel = data[0];
                let user = data[1];
                SlackMessage.sendMessageToAllModerators(Utils.getFileSharingMsgText(user, channel, msg));
            });
        }
    }

    
    public static reportInappropriateWordUse(word: string, msg: Message): void {
        let channelPromise = SlackChannel.getChannelByID(msg.channel);
        let userPromise = SlackUser.getUserById(msg.user);
        Promise.all([
            channelPromise,
            userPromise
        ]).then((data: any) => {
            let channel = data[0];
            let user = data[1];
            SlackMessage.sendMessageToAllModerators(Utils.getInappropriateMsgText(user, channel, msg, word));
        });
    }


}

export { SlackMessage };