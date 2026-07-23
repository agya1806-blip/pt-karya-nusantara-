import type { ProjectItem } from "@/sections/types";

export interface RelatedProject extends ProjectItem {
  relevanceScore: number;
  matchReasons: string[];
}

export function findRelatedProjects(
  current: ProjectItem,
  allProjects: ProjectItem[],
  maxResults: number = 3
): RelatedProject[] {
  const scored = allProjects
    .filter((p) => p.id !== current.id)
    .map((p) => {
      const score = calculateRelevance(current, p);
      const reasons = getMatchReasons(current, p);
      return { ...p, relevanceScore: score, matchReasons: reasons };
    })
    .filter((p) => p.relevanceScore > 0)
    .sort((a, b) => b.relevanceScore - a.relevanceScore)
    .slice(0, maxResults);

  return scored;
}

function calculateRelevance(current: ProjectItem, candidate: ProjectItem): number {
  let score = 0;

  if (current.category === candidate.category) score += 30;
  if (current.location && candidate.location && current.location === candidate.location) score += 20;
  if (current.year && candidate.year && Math.abs(current.year - candidate.year) <= 2) score += 15;
  if (current.awards && candidate.awards) {
    const sharedAwards = current.awards.filter((a) => candidate.awards?.includes(a));
    score += sharedAwards.length * 10;
  }
  if (current.stats && candidate.stats) {
    const currentArea = current.stats.find((s) => s.label.toLowerCase().includes("area"));
    const candidateArea = candidate.stats.find((s) => s.label.toLowerCase().includes("area"));
    if (currentArea && candidateArea) {
      const ratio = Math.abs(parseInt(currentArea.value) / parseInt(candidateArea.value));
      if (ratio >= 0.5 && ratio <= 2) score += 10;
    }
  }

  return score;
}

function getMatchReasons(current: ProjectItem, candidate: ProjectItem): string[] {
  const reasons: string[] = [];
  if (current.category === candidate.category) reasons.push(`Same category: ${current.category}`);
  if (current.location && candidate.location && current.location === candidate.location) reasons.push(`Same location: ${current.location}`);
  if (current.year && candidate.year && Math.abs(current.year - candidate.year) <= 2) reasons.push("Similar timeline");
  return reasons;
}
