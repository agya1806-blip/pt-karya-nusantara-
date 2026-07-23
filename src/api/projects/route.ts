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
      status: searchParams.get("status") as never || undefined,
      category: searchParams.get("category") || undefined,
      featured: searchParams.get("featured") === "true" ? true : undefined,
      sort: searchParams.get("sort") || "created_at",
      order: (searchParams.get("order") as "asc" | "desc") || "desc",
    };
    const result = await projectRepository.list(params);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 500 });
    return NextResponse.json(result.data);
  } catch {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validated = projectSchema.parse(body);
    const result = await projectRepository.create(validated);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json(result.data, { status: 201 });
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: JSON.parse(err.message) }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
