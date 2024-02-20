import { InteractionResponseType } from 'discord-interactions';
import { JsonResponse, getMeme, Colors } from '../lib/index.js';

export const config = {
  name: 'meme',
  description: 'Generated a short user id',
};

export async function execute() {
  const meme = await getMeme();
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      embeds: [
        {
          title: meme.title,
          description: `From ${meme.subreddit}`,
          color: Colors.Blue,
          url: meme.permalink,
          timestamp: new Date(meme.created * 1000).toISOString(),
          image: {
            url: meme.url,
          },
          author: {
            name: meme.author,
          },
          footer: {
            text: `⬆️ ${meme.ups} ⬇️ ${meme.downs}`,
          },
        },
      ],
    },
  });
}
