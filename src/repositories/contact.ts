import { BaseRepository } from "./base";

export class ContactRepository {
  private contactInfoRepo = new BaseRepository<any>("contact_info");
  private socialMediaRepo = new BaseRepository<any>("social_media");
  private businessHoursRepo = new BaseRepository<any>("business_hours");
  private companyMilestonesRepo = new BaseRepository<any>("company_milestones");

  async getContactInfo() {
    return this.contactInfoRepo.findAll(
      {},
      { order: { column: "sort_order", ascending: true } }
    );
  }

  async updateContactInfo(id: string, input: Record<string, unknown>) {
    return this.contactInfoRepo.update(id, input);
  }

  async createContactInfo(input: Record<string, unknown>) {
    return this.contactInfoRepo.create(input);
  }

  async deleteContactInfo(id: string) {
    return this.contactInfoRepo.hardDelete(id);
  }

  async getSocialMedia() {
    return this.socialMediaRepo.findAll(
      {},
      { order: { column: "sort_order", ascending: true } }
    );
  }

  async updateSocialMedia(id: string, input: Record<string, unknown>) {
    return this.socialMediaRepo.update(id, input);
  }

  async createSocialMedia(input: Record<string, unknown>) {
    return this.socialMediaRepo.create(input);
  }

  async deleteSocialMedia(id: string) {
    return this.socialMediaRepo.hardDelete(id);
  }

  async getBusinessHours() {
    return this.businessHoursRepo.findAll(
      {},
      { order: { column: "sort_order", ascending: true } }
    );
  }

  async updateBusinessHours(id: string, input: Record<string, unknown>) {
    return this.businessHoursRepo.update(id, input);
  }

  async createBusinessHours(input: Record<string, unknown>) {
    return this.businessHoursRepo.create(input);
  }

  async getMilestones() {
    return this.companyMilestonesRepo.findAll(
      {},
      { order: { column: "sort_order", ascending: true } }
    );
  }

  async createMilestone(input: Record<string, unknown>) {
    return this.companyMilestonesRepo.create(input);
  }

  async updateMilestone(id: string, input: Record<string, unknown>) {
    return this.companyMilestonesRepo.update(id, input);
  }

  async deleteMilestone(id: string) {
    return this.companyMilestonesRepo.softDelete(id);
  }
}

export const contactRepository = new ContactRepository();
