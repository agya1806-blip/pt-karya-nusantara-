import { z } from "zod";

export const globalSettingSchema = z.object({
  key: z.string().min(1).max(100),
  value: z.unknown(),
});

export const globalSettingUpdateSchema = z.object({
  value: z.unknown(),
});

export type GlobalSettingInput = z.infer<typeof globalSettingSchema>;
export type GlobalSettingUpdateInput = z.infer<typeof globalSettingUpdateSchema>;
