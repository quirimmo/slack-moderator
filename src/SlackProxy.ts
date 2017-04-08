import { Utils } from './Utils';
import { SlackEvents } from './SlackEvents';

declare function require(name: string);

class SlackProxy implements SlackEvents{

    SLACK_CONFIG: any;
    moderators: Array<string>;
    inappropriateWords: Array<string>;
    SLACK_CLIENT: any;
    CLIENT_EVENTS: any;
    RTM_EVENTS: any;
    rtmClient: any;

    constructor() { 
        this.SLACK_CONFIG = Utils.getSlackConfig();
        this.moderators = this.SLACK_CONFIG.MODERATORS;
        this.inappropriateWords = this.SLACK_CONFIG.INAPPROPRIATE_WORDS;
    }

    public initSlack(): void {
        this.SLACK_CLIENT = require('@slack/client');
        this.CLIENT_EVENTS = this.SLACK_CLIENT.CLIENT_EVENTS;
        this.RTM_EVENTS = this.SLACK_CLIENT.RTM_EVENTS;
    }

    public bindActionOnRTMConnectionOpened(fnCallback: Function): void {
        this.rtmClient.on(this.CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, fnCallback);
    }
    
}

export { SlackProxy };