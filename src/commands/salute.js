import { JsonResponse } from '../lib/index.js';
import { InteractionResponseType } from 'discord-interactions';

export const config = {
  name: 'salute',
  description: 'Gives a salute',
};

const SALUTES = [
  '"Just who is the Enclave? Why, that\'s simple. The Enclave is you, America. The Enclave is your sister, your aunt, your friend, your neighbor." - Eden',
  'One Enclave. One America. Now... and forever.',
  '"We will rebuild the American family, as it was, as it was meant to be!" - Eden',
  '"The Enclave will restore peace, order, and prosperity to this great nation. And those who oppose us will be… removed. Forever." - Eden',
  'The values of our past... shall be the foundation of our future.',
  '"These power-armored boy scouts are nothing more than common criminals with access to some antiquated technology." - Eden',
  'The price of freedom is eternal vigilance.',
  '"The government should not be guided by Temporary Excitement, but by Sober Second Thought." - Eden',
  '"May our country be always successful, but whether successful or otherwise, always right." - Eden',
];

export function getSalute() {
  return SALUTES[Math.floor(Math.random() * SALUTES.length)];
}

export function execute() {
  return new JsonResponse({
    type: InteractionResponseType.CHANNEL_MESSAGE_WITH_SOURCE,
    data: {
      content: getSalute(),
    },
  });
}
