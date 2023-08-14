import discord
import random
import uuid
from discord.ext import commands
from datetime import datetime
import urllib.request
import json


class Commands(commands.Cog):
    main_guild_id = "1131372079061667993"

    def __init__(self, bot):
        self.bot = bot

    @discord.slash_command(name="salute", description="Gives a salute", guild_ids=[main_guild_id])
    async def salute(self, ctx):
        salutes = [
            '"Just who is the Enclave? Why, that\'s simple. The Enclave is you, America. The Enclave is your sister, '
            'your aunt, your friend, your neighbor." - Eden',
            "One Enclave. One America. Now... and forever.",
            '"We will rebuild the American family, as it was, as it was meant to be!" - Eden',
            '"The Enclave will restore peace, order, and prosperity to this great nation. And those who oppose us will '
            'be… removed. Forever." - Eden',
            "The values of our past... shall be the foundation of our future.",
            '"These power-armored boy scouts are nothing more than common criminals with access to some antiquated '
            'technology." - Eden',
            "The price of freedom is eternal vigilance.",
            '"The government should not be guided by Temporary Excitement, but by Sober Second Thought." - Eden',
            '"May our country be always successful, but whether successful or otherwise, always right." - Eden'
        ]
        await ctx.respond(random.choice(salutes))

    @discord.slash_command(name="suuid", description="Generated a short user id", guild_ids=[main_guild_id])
    async def suuid(self, ctx):
        generated = str(uuid.uuid4())
        created_suuid = generated[9:28]
        await ctx.respond(created_suuid)

    @discord.slash_command(name="roll", description="Roll a D20 dice.", guild_ids=[main_guild_id])
    async def roll(self, ctx):
        result = random.randint(1, 20)
        embed = discord.Embed(
            title="Roll",
            description=f"You rolled a {result}",
            color=discord.Colour.blue()
        )
        await ctx.respond(embed=embed)

    @discord.slash_command(name="meme", description="Show a random meme", guild_ids=[main_guild_id])
    async def meme(self, ctx):
        def allowed_meme(meme_data):
            return not meme_data["over_18"] and not meme_data["is_video"]

        subreddits = [
            "ProgrammerHumor",
            "softwaregore",
            "memes",
            "AdviceAnimals",
            "MemeEconomy",
            "ComedyCemetery",
            "dankmemes",
            "PrequelMemes",
            "terriblefacebookmemes",
            "bonehurtingjuice"
        ]
        chosen = random.choice(subreddits)
        url = f"https://reddit.com/r/{chosen}/.json"
        response = urllib.request.urlopen(url).read()
        responseJson = json.loads(response)
        memes = responseJson["data"]["children"]
        memes_data = [None] * len(memes)
        for i in range(len(memes)):
            memes_data[i] = memes[i]["data"]
        filteredMemes = list(filter(allowed_meme, memes_data))
        chosenMeme = random.choice(filteredMemes)
        permalink = chosenMeme["permalink"]
        author = chosenMeme["author"]
        subreddit = chosenMeme["subreddit_name_prefixed"]
        ups = chosenMeme["ups"]
        downs = chosenMeme["downs"]
        created = chosenMeme["created"]

        embed = discord.Embed(
            title=chosenMeme["title"],
            description=f"From {subreddit}",
            color=discord.Colour.blue(),
            url=f"https://reddit.com{permalink}",
            timestamp=datetime.fromtimestamp(created)
        )

        embed.set_image(url=chosenMeme["url"])
        embed.set_author(name=f"u/{author}")
        embed.set_footer(text=f"⬆️ {ups} ⬇️ {downs}")

        await ctx.respond(embed=embed)


def setup(bot):
    bot.add_cog(Commands(bot))
