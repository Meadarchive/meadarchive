import { z } from "zod";

export const LiquidSchema = z.object({
    liquid: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
});
  
export const HoneyTypeSchema = z.object({
    honey: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
});

export const AddonSchema = z.object({
    addon: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
});

export const ChemicalSchema = z.object({
    chemical: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
});

export const RecipeSchema = z.object({
    recipeName: z.string().nonempty(),
    recipeDescription: z.string().nonempty(),
    liquids: z.array(LiquidSchema).nonempty(),
    yeastType: z.string().nonempty(),
    yeastAmount: z.number(),
    honeyTypes: z.array(HoneyTypeSchema).nonempty(),
    addons: z.array(AddonSchema),
    chemicals: z.array(ChemicalSchema),
    recipeSize: z.number(),
    recipeSizeUnit: z.string().nonempty()
});

export type Recipe = z.infer<typeof RecipeSchema>


