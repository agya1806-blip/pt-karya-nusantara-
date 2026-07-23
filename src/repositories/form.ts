import { BaseRepository } from "./base";
import type { PaginatedResult } from "./base";

interface FormRecord {
  id: string;
  type: string;
  title: string;
  fields: Record<string, unknown>[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

interface FormSubmissionRecord {
  id: string;
  form_id: string;
  data: Record<string, unknown>;
  ip_address: string | null;
  user_agent: string | null;
  is_read: boolean;
  created_at: string;
}

export class FormRepository {
  private formRepo = new BaseRepository<FormRecord>("forms");
  private submissionRepo = new BaseRepository<FormSubmissionRecord>("form_submissions");

  async getFormByType(type: string) {
    const forms = await this.formRepo.findAll({ type, is_active: true });
    return forms[0] ?? null;
  }

  async getFormById(id: string) {
    return this.formRepo.findById(id);
  }

  async createForm(input: Record<string, unknown>) {
    return this.formRepo.create(input);
  }

  async updateForm(id: string, input: Record<string, unknown>) {
    return this.formRepo.update(id, input);
  }

  async submitForm(input: Record<string, unknown>) {
    return this.submissionRepo.create(input);
  }

  async getSubmissions(
    formId?: string,
    page = 1,
    limit = 20
  ): Promise<PaginatedResult<FormSubmissionRecord>> {
    const filters: Record<string, unknown> = {};
    if (formId) filters.form_id = formId;

    return this.submissionRepo.findPaginated(filters, page, limit, "created_at", false);
  }

  async getUnreadCount(): Promise<number> {
    return this.submissionRepo.count({ is_read: false });
  }

  async markAsRead(id: string) {
    return this.submissionRepo.update(id, { is_read: true } as any);
  }

  async deleteSubmission(id: string) {
    return this.submissionRepo.hardDelete(id);
  }
}

export const formRepository = new FormRepository();
