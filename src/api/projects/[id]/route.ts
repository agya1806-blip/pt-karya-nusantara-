import { NextRequest, NextResponse } from "next/server";
import { projectRepository } from "@/repositories";
import { projectSchema } from "@/validators";

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const project = await projectRepository.findById(id);
  if (!project) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(project);
}

export async function PATCH(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  try {
    const body = await request.json();
    const validated = projectSchema.partial().parse(body);
    const updatedProject = await projectRepository.update(id, validated);
    return NextResponse.json(updatedProject);
  } catch (err) {
    if (err instanceof Error && err.name === "ZodError") {
      return NextResponse.json({ error: "Validation failed", details: JSON.parse(err.message) }, { status: 422 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await projectRepository.softDelete(id);
  return NextResponse.json({ success: true });
}
