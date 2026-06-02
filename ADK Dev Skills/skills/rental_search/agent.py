import os
from google.adk.agents import Agent
from google.adk.apps import App
from google.adk.models import Gemini
from .tools import check_order_status, process_refund

# Sub-agents generated via ADK Dev Skills guidance
def create_status_agent() -> Agent:
    return Agent(
        name="status_agent",
        model=Gemini(model="gemini-3.1-flash"),
        instruction="Look up orders using the check_order_status tool.",
        tools=[check_order_status],
    )

def create_refund_agent() -> Agent:
    return Agent(
        name="refund_agent",
        model=Gemini(model="gemini-3.1-flash"),
        instruction="Verify order status is 'delivered' before using process_refund.",
        tools=[check_order_status, process_refund],
    )

# Parent triage agent routing logic
root_agent = Agent(
    name="triage_agent",
    model=Gemini(model="gemini-3.1-flash"),
    instruction="Route user requests to either the status_agent or refund_agent.",
    sub_agents=[create_status_agent(), create_refund_agent()],
)

app = App(name="retail_returns_app", root_agent=root_agent)