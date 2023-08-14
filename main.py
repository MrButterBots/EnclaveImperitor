from discord.ext import commands
import os
from dotenv import load_dotenv

load_dotenv()
bot = commands.Bot()
bot.load_extension("cogs.listeners")
bot.load_extension("cogs.commands")
bot.run(os.getenv("TOKEN"))
