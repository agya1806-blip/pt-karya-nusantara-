"use server";

import { blogRepository } from "@/repositories/blog";
import { blogPostSchema, blogPostUpdateSchema } from "@/schemas/blog";
import { auditRepository } from "@/repositories/audit";
import {
  ActionResult,
  success,
  failure,
  validationError,
  handleServerError,
  requireRole,
} from "./utils";

export async function getBlogPosts(options?: {
  categoryId?: string;
  authorId?: string;
  tag?: string;
  isFeatured?: boolean;
  limit?: number;
}) {
  try {
    const posts = await blogRepository.findPublished(options);
    return success(posts);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getBlogPostBySlug(slug: string) {
  try {
    const post = await blogRepository.findBySlug(slug);
    if (!post) return failure("Blog post not found");
    return success(post);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getBlogPostById(id: string) {
  try {
    const post = await blogRepository.findById(id);
    if (!post) return failure("Blog post not found");
    return success(post);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function createBlogPost(input: unknown): Promise<ActionResult> {
  try {
    await requireRole("author");

    const parsed = blogPostSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const post = await blogRepository.create(parsed.data as any);

    await auditRepository.log({
      action: "create",
      entityType: "blog_post",
      entityId: post.id,
    });

    return success(post);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function updateBlogPost(
  id: string,
  input: unknown
): Promise<ActionResult> {
  try {
    await requireRole("author");

    const parsed = blogPostUpdateSchema.safeParse(input);
    if (!parsed.success) {
      return validationError(parsed.error.flatten().fieldErrors);
    }

    const post = await blogRepository.update(id, parsed.data as any);

    await auditRepository.log({
      action: "update",
      entityType: "blog_post",
      entityId: id,
    });

    return success(post);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function deleteBlogPost(id: string): Promise<ActionResult> {
  try {
    await requireRole("admin");
    await blogRepository.softDelete(id);

    await auditRepository.log({
      action: "delete",
      entityType: "blog_post",
      entityId: id,
    });

    return success();
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getBlogCategories() {
  try {
    const categories = await blogRepository.getCategories();
    return success(categories);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getAuthors() {
  try {
    const authors = await blogRepository.getAuthors();
    return success(authors);
  } catch (error) {
    return handleServerError(error);
  }
}

export async function getRelatedPosts(slug: string, limit = 3) {
  try {
    const posts = await blogRepository.getRelatedPosts(slug, limit);
    return success(posts);
  } catch (error) {
    return handleServerError(error);
  }
}
