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
    author: z.string().optional(),
    liquids: z.array(LiquidSchema).nonempty(),
    yeastType: z.string().nonempty(),
    yeastAmount: z.number(),
    honeyTypes: z.array(HoneyTypeSchema).nonempty(),
    addons: z.array(AddonSchema),
    chemicals: z.array(ChemicalSchema),
    recipeSize: z.number(),
    recipeSizeUnit: z.string().nonempty()
});


export const EquipmentSchema = z.object({
    item: z.string().nonempty(),
    quantity: z.number().int().nonnegative(),
});
  
export const BatchSchema = z.object({
    author: z.string().nonempty(),
    recipeID: z.string().nonempty(),
    dateStarted: z.string().nonempty(),
    equipment: z.array(EquipmentSchema),
    inital_gravity: z.number().nonnegative(),
    water: z.string().nonempty(),
    stage: z.enum(["Not Started", "Primary Fermentation", "Secondary Fermentation", "Bottled", "Aging", "Completed"]),
});

export const BaseBatchUpdate = z.object({
    batchID: z.string().nonempty(),
    updateDate: z.string().nonempty(),
    updateType: z.enum(["text", "gravity", "stage"]),
});

export const TextBatchUpdate = BaseBatchUpdate.extend({
    updateType: z.enum(["text"]),
    updateText: z.string().nonempty(),
});

export const GravityBatchUpdate = BaseBatchUpdate.extend({
    updateType: z.enum(["gravity"]),
    updateGravity: z.number().nonnegative(),
});

export const StageBatchUpdate = BaseBatchUpdate.extend({
    updateType: z.enum(["stage"]),
    updateStage: z.enum(["Not Started", "Primary Fermentation", "Secondary Fermentation", "Bottled", "Aging", "Completed"]),
});


export type Recipe = z.infer<typeof RecipeSchema>
export type Batch = z.infer<typeof BatchSchema>
export type BaseBatchUpdate = z.infer<typeof BaseBatchUpdate>
export type TextBatchUpdate = z.infer<typeof TextBatchUpdate>
export type GravityBatchUpdate = z.infer<typeof GravityBatchUpdate>
export type StageBatchUpdate = z.infer<typeof StageBatchUpdate>

export interface DictionaryOfRecipes {
    [key: string] : Recipe
}


