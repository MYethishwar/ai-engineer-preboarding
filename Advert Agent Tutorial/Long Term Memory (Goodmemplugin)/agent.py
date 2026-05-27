import os
from google.adk.agents import LlmAgent
from google.adk.apps import App
from goodmem_adk import GoodmemPlugin
from dotenv import load_dotenv

load_dotenv()
                
# Attach persistent memory to the App layer
goodmem_chat_plugin = GoodmemPlugin(
    base_url=os.getenv("GOODMEM_BASE_URL"),
    api_key=os.getenv("GOODMEM_API_KEY"),
    top_k=5
)

# Agent context is automatically hydrated at runtime
root_agent = LlmAgent(
    name="root_agent",
    model="gemini-3.1-pro-preview",
    instruction="You are a Professional chef with persistent memory access."
)

app = App(name="Dietary-chef", root_agent=root_agent, plugins=[goodmem_chat_plugin])