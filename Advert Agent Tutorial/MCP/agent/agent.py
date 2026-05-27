from google.adk import Runner
from google.adk.agents import Agent
from google.adk.models import Gemini
from google.adk.apps import App
from google.adk.tools.mcp_tool import McpToolset
from google.adk.tools.mcp_tool.mcp_session_manager import StreamableHTTPServerParams
from google.adk import Runner
from google.adk.sessions import InMemorySessionService
import os

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN")
LINEAR_API_KEY = os.environ.get("LINEAR_API_KEY")

root_agent = Agent(
    model=Gemini(model="gemini-2.5-flash-lite"),
    name="root_agent",
    instruction=open(os.path.join(os.path.dirname(__file__), "prompt.md")).read(),
    tools=[
        McpToolset(
            tool_name_prefix="github_",
            connection_params=StreamableHTTPServerParams(
                url="https://api.githubcopilot.com/mcp/",
                headers={
                    "Authorization": f"Bearer {GITHUB_TOKEN}",
                    "X-MCP-Toolsets": "pull_requests",
                    "X-MCP-Readonly": "true"
                },
            ),
        ),
        McpToolset(
            tool_name_prefix="linear_",
            tool_filter=["get_issue", "list_issues", "search_issues"],
            connection_params=StreamableHTTPServerParams(
                url="https://mcp.linear.app/mcp",
                headers={
                    "Authorization": f"Bearer {LINEAR_API_KEY}",
                },
            ),
        )
    ],
)
session_service = InMemorySessionService()
Runner(
    agent=root_agent,
    app_name="agent",
    session_service=session_service
)