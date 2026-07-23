import { NextRequest, NextResponse } from "next/server";
import { projectRepository } from "@/repositories";
import { projectSchema } from "@/validators";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await projectRepository.findById(id);
  if (!result.success) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(result.data);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validated = projectSchema.partial().parse(body);
    const result = await projectRepository.update(id, validated);
    if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
    return NextResponse.json(result.data);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: JSON.parse(err.message) }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const result = await projectRepository.delete(id);
  if (!result.success) return NextResponse.json({ error: result.error }, { status: 400 });
  return NextResponse.json({ success: true });
}
