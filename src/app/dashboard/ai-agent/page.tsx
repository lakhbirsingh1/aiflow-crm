"use client";

import AIAgentHeader from "@/components/dashboard/ai-agent/AIAgentHeader";
import AIAgentOverview from "@/components/dashboard/ai-agent/AIAgentOverview";
import AgentStatus from "@/components/dashboard/ai-agent/AgentStatus";
import AgentActivity from "@/components/dashboard/ai-agent/AgentActivity";
import AgentTasks from "@/components/dashboard/ai-agent/AgentTasks";
import AgentPerformance from "@/components/dashboard/ai-agent/AgentPerformance";
import AIAgentInsights from "@/components/dashboard/ai-agent/AIAgentInsights";

export default function AIAgentPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-[1800px] space-y-6 p-4 md:p-6 lg:p-8">
        <AIAgentHeader />

        <AIAgentOverview />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          <AgentActivity />
          <AgentStatus />
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(340px,0.8fr)]">
          <AgentTasks />
          <AgentPerformance />
        </div>

        <AIAgentInsights />
      </div>
    </main>
  );
}