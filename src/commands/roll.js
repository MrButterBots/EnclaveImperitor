import { JsonResponse, Colors } from '../lib/index.js';
import { InteractionResponseType } from 'discord-interactions';

export const config = {
  name: 'roll',
  description: 'Roll a D20 dice.',
};

export function execute() {
  const result = Math.ceil(Math.random() * 20);
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: 'Roll',
          description: `You rolled a ${result}`,
          color: Colors.Blue,
        },
      ],
    },
  });
}
