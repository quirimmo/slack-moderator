import { SlackProxy } from './SlackProxy';
import { SlackChannel } from './SlackChannel';
import { SlackUser } from './SlackUser';
import { Utils } from './../utility/Utils';
import { Message } from './../model/Message';
import { File } from './../model/File';
import { Channel } from './../model/Channel';
import { User } from './../model/User';

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
                SlackMessage.sendMessageThroughWeb(msg, moderator).then((data: any) => {
                    resolve();
                });
            });
            promises.push(returnPromise);
        });
        return Promise.all(promises);
    }


    public static analyseMessagesForInappropriateWords(msg: any): void {
        if (msg.type === 'message' && !msg.subtype) {
            let message: Message = new Message(msg.id, msg.text, msg.channel, msg.user, msg.type, msg.subtype, msg.ts, msg.file);
            let regexp;
            SlackProxy.getInstance().inappropriateWords.forEach((word: string) => {
                regexp = new RegExp(word, 'i');
                if (msg.text.match(regexp)) {
                    SlackMessage.reportInappropriateWordUse(word, message);
                }
            });
        }
    }


    public static analyseMessagesForFileSharing(msg: any): void {
        if (msg.subtype && msg.subtype === 'file_share') {
            let file: File = new File(msg.file.id, msg.file.name, msg.file.title, msg.file.filetype, msg.file.permalink);
            let message: Message = new Message(msg.id, msg.text, msg.channel, msg.user, msg.type, msg.subtype, msg.ts, file);
            let channelPromise = SlackChannel.getChannelByID(msg.channel);
            let userPromise = SlackUser.getUserById(msg.user);
            Promise.all([
                channelPromise,
                userPromise
            ]).then((data: any) => {
                let channel: Channel = new Channel(data[0].id, data[0].name);
                let user: User = new User(data[1].id, data[1].name, data[1].real_name);
                SlackMessage.sendMessageToAllModerators(Utils.getFileSharingMsgText(user, channel, message));
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
            let channel: Channel = new Channel(data[0].id, data[0].name);
            let user: User = new User(data[1].id, data[1].name, data[1].real_name);
            SlackMessage.sendMessageToAllModerators(Utils.getInappropriateMsgText(user, channel, msg, word));
        });
    }


}

export { SlackMessage };