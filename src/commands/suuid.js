import { v4 } from 'uuid';
import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse } from '../lib/index.js';

export const config = {
  name: 'suuid',
  description: 'Generated a short user id',
};

export function execute() {
  const generated = v4();
  const createdSuuid = generated.substring(9, 28);
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: createdSuuid,
    },
  });
}
