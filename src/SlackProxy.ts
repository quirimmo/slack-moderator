import { Utils } from './Utils';
import { SlackEvents } from './SlackEvents';

declare function require(name: string);

class SlackProxy implements SlackEvents {

    SLACK_CONFIG: any;
    moderators: Array<string>;
    inappropriateWords: Array<string>;
    SLACK_CLIENT: any;
    CLIENT_EVENTS: any;
    RTM_EVENTS: any;
    rtmClient: any;
    webClient: any;

    constructor() {
        this.SLACK_CONFIG = Utils.getSlackConfig();
        this.moderators = this.SLACK_CONFIG.MODERATORS;
        this.inappropriateWords = this.SLACK_CONFIG.INAPPROPRIATE_WORDS;
    }

    public initSlack(): Promise<any> {
        this.SLACK_CLIENT = require('@slack/client');
        this.CLIENT_EVENTS = this.SLACK_CLIENT.CLIENT_EVENTS;
        this.RTM_EVENTS = this.SLACK_CLIENT.RTM_EVENTS;
        this.initSlackWebClient();
        return this.initSlackRTMClient();
    }

    private initSlackWebClient(): void {
        let WebClient = this.SLACK_CLIENT.WebClient;
        this.webClient = new WebClient(this.SLACK_CONFIG.TOKENS.API);
    }

    private initSlackRTMClient(): Promise<any> {
        let RtmClient: any = this.SLACK_CLIENT.RtmClient;
        this.rtmClient = new RtmClient(this.SLACK_CONFIG.TOKENS.BOT);
        this.rtmClient.start();
        let rtmInitPromise: Promise<any> = new Promise<any>((resolve, reject) => {
            this.bindActionOnRTMConnectionOpened(resolve);
        });
        return rtmInitPromise;
    }

    public bindActionOnRTMConnectionOpened(fnCallback: any): void {
        fnCallback();
        // this.rtmClient.on(this.CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, fnCallback);
    }

}

export { SlackProxy };