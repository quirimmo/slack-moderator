interface SlackEvents {

    CLIENT_EVENTS: any;
    RTM_EVENTS: any;

    bindActionOnRTMConnectionOpened(fnCallback: Function): void ;

}

export { SlackEvents };