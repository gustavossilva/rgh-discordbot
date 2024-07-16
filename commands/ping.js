export default {
    name: 'ping',
    description: "this is a ping command.",
    execute(message, _){
        try {
            message.channel.send({ content:'pong! pub' });
        } catch (e) {
            console.error(e);
        }
    }
}