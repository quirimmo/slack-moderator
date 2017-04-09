# slack-moderator

## Dependencies

`npm install -g typescript ts-node @types/es6-promise`

## Execute the module

`ts-node slack-moderator.ts`

## Main

The main file is the ***slack-moderator.ts*** which contains the main code of the slack plugin.

It detects the receiving of messages and it parses the messages looking for inappropriate words or file sharing.

The last functionality is commented out at the moment because it needs the paid version of slack in order to work.

## Model Subfolder

It contains the models of the application which are the main entities used from slack. Only the properties currently used are inserted inside the models.

## Service Subfolder

It contains the services of the application.

The ***SlackProxy.ts*** is a singleton class which represents a proxy to Slack. It is used inside all the other services in order to get the connection to the slack web api and slack RTM.

The ***SlackEvents.ts*** is an interface which represents all the implemented events you can bind through Slack at the moment. The interface has been implemented within the *SlackProxy*.

The ***SlackChannel.ts SlackMessage.ts SlackUser.ts*** are the services used in order to interact with Slack with all the respectively functionalities. All the methods have been commented inside the fild in order to supply a good description of what they do.

## Example on how to use the library

All the methods which return values, they return promises that you have to implement in order to access the returned data. We can take as example how to retrieve the list of all the public channels related to the web api token of the user's team.

The following code will print the list of all the public channels:

```typescript
SlackChannel.getPublicChannelsList().then((channels: any) => {
    console.log(channels);
});
```