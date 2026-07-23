import { NextRequest, NextResponse } from "next/server";
import { projectRepository } from "@/repositories";
import { projectSchema } from "@/validators";
import { createRouteHandlerClient } from "@/repositories/client";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const params = {
      page: Number(searchParams.get("page")) || 1,
      pageSize: Math.min(Number(searchParams.get("pageSize")) || 20, 100),
      search: searchParams.get("search") || undefined,
      status: searchParams.get("status") || undefined,
      category: searchParams.get("category") || undefined,
      featured: searchParams.get("featured") === "true" ? true : undefined,
      sort: searchParams.get("sort") || "created_at",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
    };
    const projects = await projectRepository.findPublished({
      limit: params.pageSize,
      categoryId: params.category,
      isFeatured: params.featured,
    });
    return NextResponse.json(projects);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);
    const project = await projectRepository.create(validated);
    return NextResponse.json(project, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: JSON.parse(err.message) }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
