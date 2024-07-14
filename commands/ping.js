export default {
    name: 'ping',
    description: "this is a ping command.",
    execute(message, _){
        message.channel.send('pong!');
    }
}