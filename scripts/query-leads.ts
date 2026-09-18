import { getAllLeads } from "../server/db";

async function main() {
  const allLeads = await getAllLeads();

  console.log("Total leads:", allLeads.length);

  const bySource: Record<string, number> = {};
  const byStatus: Record<string, number> = {};

  allLeads.forEach((l) => {
    bySource[l.source] = (bySource[l.source] || 0) + 1;
    byStatus[l.status] = (byStatus[l.status] || 0) + 1;
  });

  console.log("\nBy source:", JSON.stringify(bySource, null, 2));
  console.log("\nBy status:", JSON.stringify(byStatus, null, 2));

  if (allLeads.length > 0) {
    console.log("\nMost recent 10 leads:");
    allLeads.slice(0, 10).forEach((l) => {
      console.log(`  [${l.createdAt}] ${l.name} | ${l.email} | ${l.source} | ${l.status}`);
    });
    console.log("\nFirst ever lead:");
    const first = allLeads[allLeads.length - 1];
    console.log(`  [${first.createdAt}] ${first.name} | ${first.email} | ${first.source}`);
  }

  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
