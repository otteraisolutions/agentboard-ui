import { redirect } from "next/navigation";

export default async function AgentOverviewPage({ params }: { params: Promise<{ agentKey: string }> }) {
  const { agentKey } = await params;
  redirect(`/${agentKey}/conversations`);
}
