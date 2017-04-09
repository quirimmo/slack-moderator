import { Utils } from './../utility/Utils';
import { SlackEvents } from './SlackEvents';
declare function require(name: string);

class SlackProxy implements SlackEvents {

    private static instance: SlackProxy = null;
    private SLACK_CONFIG: any;
    private static API_TOKEN: string = 'xoxp-143937138848-144732344213-166490598659-86a16d91b807bec706e7efb158733c2e';
    private static BOT_TOKEN: string = 'xoxb-149511602132-a2yBdlMl1R5895GZJYRuBslC';


    moderators: Array<string>;
    inappropriateWords: Array<string>;
    SLACK_CLIENT: any;
    CLIENT_EVENTS: any;
    RTM_EVENTS: any;
    rtmClient: any;
    webClient: any;
    initRTMPromise: Promise<any>;

    
    
    private constructor() {
        this.SLACK_CONFIG = Utils.getSlackConfig();
        this.moderators = this.SLACK_CONFIG.MODERATORS;
        this.inappropriateWords = this.SLACK_CONFIG.INAPPROPRIATE_WORDS;
        this.initRTMPromise = new Promise<any>((resolve: (data: any) => void, reject: (data: any) => void) => {
            this.initSlack().then((data: any) => {
                console.log('Slack Moderator RTM Fully Connected!');
                resolve('');
            });
        });
    }

    public static getInstance(): SlackProxy {
        if (this.instance === null) {
            this.instance = new SlackProxy();
        }
        return this.instance;
    }


    public initSlack(): Promise<any> {
        this.SLACK_CLIENT = require('@slack/client');
        this.CLIENT_EVENTS = this.SLACK_CLIENT.CLIENT_EVENTS;
        this.RTM_EVENTS = this.SLACK_CLIENT.RTM_EVENTS;
        this.initSlackWebClient();
        return this.initSlackRTMClient();
    }

    /**
     * Init the slack web api
     */
    private initSlackWebClient(): void {
        let WebClient = this.SLACK_CLIENT.WebClient;
        this.webClient = new WebClient(SlackProxy.API_TOKEN);
    }

    /**
     * Init the slack RTM api
     * Return a promise when the RTM has successfully connected
     */
    private initSlackRTMClient(): Promise<any> {
        let RtmClient: any = this.SLACK_CLIENT.RtmClient;
        this.rtmClient = new RtmClient(SlackProxy.BOT_TOKEN);
        this.rtmClient.start();
        let rtmInitPromise: Promise<any> = new Promise<any>((resolve: (data: any) => void, reject: (data: any) => void) => {
            this.bindActionOnRTMConnectionOpened(resolve);
        });
        return rtmInitPromise;
    }


    public bindActionOnRTMConnectionOpened(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, fnCallback);
    }
    public bindActionOnRTMAuthenticated(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.CLIENT_EVENTS.RTM.AUTHENTICATED, fnCallback);
    }
    public bindActionOnUserPresenceChanged(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.RTM_EVENTS.PRESENCE_CHANGE, fnCallback);
    }
    public bindActionOnNewTeamMember(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.RTM_EVENTS.TEAM_JOIN, fnCallback);
    }
    public bindActionOnFileCreated(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.RTM_EVENTS.FILE_CREATED, fnCallback);
    }
    public bindActionOnFileShared(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.RTM_EVENTS.FILE_SHARED, fnCallback);
    }
    public bindActionOnMessageReceived(fnCallback: (data: any) => void): void {
        this.rtmClient.on(this.RTM_EVENTS.MESSAGE, fnCallback);
    }

}

export { SlackProxy };