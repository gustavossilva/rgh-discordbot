const lalaMessage = "Ah, Lalafells! Small in stature but oh-so-mighty in heart. They may be pint-sized, but their courage puts even the bravest of us to shame. I once stumbled upon a group of Lalafells having a dance-off with Tonberries—now that’s a sight to behold! Their laughter rings through the realms like a cheerful echo, though I must admit, their mischievous smiles sometimes make me wonder what tricks they have up their tiny sleeves. To the Lalafells, who bring both joy and a hint of wonder, I offer my respect and a cautious nod of admiration."

export default {
    name: 'lalafells',
    description: "this a joke command",
    execute(message, _){
        try {
            message.channel.send({ content: lalaMessage });
        } catch (e) {
            console.error(e);
        }
    }
}