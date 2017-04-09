interface SlackEvents {

    CLIENT_EVENTS: any;
    RTM_EVENTS: any;

    bindActionOnRTMConnectionOpened(fnCallback: Function): void ;
    bindActionOnRTMAuthenticated(fnCallback: Function): void;

    bindActionOnUserPresenceChanged(fnCallback: Function): void;
    bindActionOnNewTeamMember(fnCallback: Function): void;

    bindActionOnFileCreated(fnCallback: Function): void;
    bindActionOnFileShared(fnCallback: Function): void;
    bindActionOnMessageReceived(fnCallback: Function): void;

}

export { SlackEvents };