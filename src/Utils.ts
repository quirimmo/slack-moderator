import { User } from "./User";
import { Channel } from "./Channel";
import { Message } from "./Message";

declare function require(name: string);
let dns: any = require('dns');

class Utils {

    private constructor() { }

    public static getTextSeparator(): string {
        return `======================================================================================\n`;
    }

    public static getInappropriateMsgText(user: User, channel: Channel, msg: Message, word: string): string {
        let text: string = ``;
        text += Utils.getTextSeparator();
        text += `Hi, an innapropriate message has been sent in the following channel: *${channel.name}*\n`;
        text += `Not allowed word: *${word}*\n`;
        // text += `Date of the message:\n>*${new Date(msg.ts*1000)}*\n`;
        text += `Date of the message:\n>*${new Date(msg.timestamp*1000)}*\n`;
        // text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.real_name}*\n`;
        text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.realName}*\n`;
        text += `Message content:\n>${msg.text}\n`;
        text += Utils.getTextSeparator();
        return text;
    }

    public static getFileSharingMsgText(user: User, channel: Channel, msg: Message): string {
        let text: string = ``;
        text += Utils.getTextSeparator();
        text += `Hi, a file sharing has been detected in the following channel: *${channel.name}*\n`;
        // text += `Date of the message:\n>*${new Date(msg.ts*1000)}*\n`;
        text += `Date of the message:\n>*${new Date(msg.timestamp*1000)}*\n`;
        // text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.real_name}*\n`;
        text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.realName}*\n`;
        // text += `File Info:\n>Name: *${msg.file.name}*\n>Title: *${msg.file.title}*\n>Type: *${msg.file.filetype}*\n>Link: ${msg.file.permalink}\n`;
        text += `File Info:\n>Name: *${msg.file.name}*\n>Title: *${msg.file.title}*\n>Type: *${msg.file.filetype}*\n>Link: ${msg.file.permalink}\n`;
        text += Utils.getTextSeparator();
        return text;
    }

    public static getDNSHosts(): Promise<any> {
        let returnPromises: Array<Promise<any>> = [];
        let promise: Promise<any>;
        dns.getServers().forEach((val, ind) => {
            promise = new Promise<any>((resolve, reject) => {
                dns.reverse(val, (err, hostname) => {
                    resolve(hostname);
                });
            });
            returnPromises.push(promise);
        });
        return Promise.all<any>(returnPromises);
    }

    public static getSlackConfig(): any {
        return require('./../config/slack.json');
    }

    public static onMethodResults(err: any, res: any, property: any, resolve: (data: any) => void, reject: (data: any) => void): void {
        if (err) {
            reject(err);
            throw err;
        }
        property ? resolve(res[property]) : resolve(res);
    }
    
}

export { Utils,require };