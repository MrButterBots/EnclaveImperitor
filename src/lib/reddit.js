/**
 * Reach out to the reddit API, and get the first page of results from
 * r/aww. Filter out posts without readily available images or videos,
 * and return a random result.
 * @returns The url of an image or video which is cute.
 */
async function getRandomPost(url) {
  const response = await fetch(url, {
    headers: {
      'User-Agent': 'jaronline:enclaveimperitor:v1.0.0 (by @jaronline)',
    },
  });
  if (!response.ok) {
    let errorText = `Error fetching ${response.url}: ${response.status} ${response.statusText}`;
    try {
      const error = await response.text();
      if (error) {
        errorText = `${errorText} \n\n ${error}`;
      }
    } catch {
      // ignore
    }
    throw new Error(errorText);
  }
  const data = await response.json();
  const posts = data.data.children
    .filter((post) => {
      return !(post.data?.over_18 || post.data?.is_video);
    })
    .map((post) => {
      if (post.is_gallery) {
        return '';
      }
      return {
        title: post.data.title,
        subreddit: post.data.subreddit_name_prefixed,
        created: post.data.created,
        author: post.data.author,
        ups: post.data.ups,
        downs: post.data.downs,
        permalink: `${redditUrlPrefix}${post.data.permalink}`,
        url:
          post.data?.media?.reddit_video?.fallback_url ||
          post.data?.secure_media?.reddit_video?.fallback_url ||
          post.data?.url,
      };
    })
    .filter((post) => !!post);
  const randomIndex = Math.floor(Math.random() * posts.length);
  const randomPost = posts[randomIndex];
  return randomPost;
}

function getRandomURL() {
  return redditUrls[Math.floor(Math.random() * redditUrls.length)];
}

export function getMeme() {
  return getRandomPost(redditUrlPrefix + getRandomURL());
}

export const redditUrlPrefix = 'https://www.reddit.com';
export const redditUrls = [
  '/r/ProgrammerHumor/.json',
  '/r/softwaregore/.json',
  '/r/memes/.json',
  '/r/AdviceAnimals/.json',
  '/r/MemeEconomy/.json',
  '/r/ComedyCemetery/.json',
  '/r/dankmemes/.json',
  '/r/PrequelMemes/.json',
  '/r/terriblefacebookmemes/.json',
  '/r/bonehurtingjuice/.json',
];
