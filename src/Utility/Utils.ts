import { User } from "./../model/User";
import { Channel } from "./../model/Channel";
import { Message } from "./../model/Message";
declare function require(name: string);
let dns: any = require('dns');
let slackConfigPath: string = './../../config/slack.json';

class Utils {

    private constructor() { }

    /**
     * Get the text separator used inside the messages
     */
    public static getTextSeparator(): string {
        return `======================================================================================\n`;
    }


    /**
     * Compose and return the text to be sent when an inappropriate message has been detected
     * @param user 
     * @param channel 
     * @param msg 
     * @param word 
     */
    public static getInappropriateMsgText(user: User, channel: Channel, msg: Message, word: string): string {
        let text: string = ``;
        text += Utils.getTextSeparator();
        text += `Hi, an innapropriate message has been sent in the following channel: *${channel.name}*\n`;
        text += `Not allowed word: *${word}*\n`;
        text += `Date of the message:\n>*${new Date(msg.timestamp*1000)}*\n`;
        text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.realName}*\n`;
        text += `Message content:\n>${msg.text}\n`;
        text += Utils.getTextSeparator();
        return text;
    }


    /**
     * Compose and return the text to be sent when a file sharing has been detected
     * @param user 
     * @param channel 
     * @param msg 
     */
    public static getFileSharingMsgText(user: User, channel: Channel, msg: Message): string {
        let text: string = ``;
        text += Utils.getTextSeparator();
        text += `Hi, a file sharing has been detected in the following channel: *${channel.name}*\n`;
        text += `Date of the message:\n>*${new Date(msg.timestamp*1000)}*\n`;
        text += `Sender:\n>ID: *${user.id}*\n>Nickname: *${user.name}*\n>Full Name: *${user.realName}*\n`;
        text += `File Info:\n>Name: *${msg.file.name}*\n>Title: *${msg.file.title}*\n>Type: *${msg.file.filetype}*\n>Link: ${msg.file.permalink}\n`;
        text += Utils.getTextSeparator();
        return text;
    }


    /**
     * Get the list of DNS hostnames corresponding to the DNS servers. It refers to the DNS servers associated to the host which executes the node.js application
     */
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


    /**
     * Return the slack configuration JSON file
     */
    public static getSlackConfig(): any {
        return require(slackConfigPath);
    }


    /**
     * Generic method used for resolving all the promises returned by the slack services methods 
     * @param err 
     * @param res 
     * @param property 
     * @param resolve 
     * @param reject 
     */
    public static onMethodResults(err: any, res: any, property: any, resolve: (data: any) => void, reject: (data: any) => void): void {
        if (err) {
            reject(err);
            throw err;
        }
        property ? resolve(res[property]) : resolve(res);
    }
    
}

export { Utils };