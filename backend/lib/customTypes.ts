import { z } from "zod";

const validStages = [
    "Not Started", 
    "Primary Fermentation", 
    "Secondary Fermentation", 
    "Bottled", 
    "Aging", 
    "Completed"
] as const

export const LiquidSchema = z.object({
    liquid: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
}).strict();
  
export const HoneyTypeSchema = z.object({
    honey: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
}).strict();

export const AddonSchema = z.object({
    addon: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
}).strict();

export const ChemicalSchema = z.object({
    chemical: z.string().nonempty(),
    amount: z.number(),
    unit: z.string().nonempty()
}).strict();

export const RecipeSchema = z.object({
    recipeName: z.string().nonempty(),
    recipeDescription: z.string().nonempty(),
    author: z.string().nonempty(),
    liquids: z.array(LiquidSchema).nonempty(),
    yeastType: z.string().nonempty(),
    yeastAmount: z.number(),
    honeyTypes: z.array(HoneyTypeSchema).nonempty(),
    addons: z.array(AddonSchema),
    chemicals: z.array(ChemicalSchema),
    recipeSize: z.number(),
    recipeSizeUnit: z.string().nonempty()
}).strict();


export const EquipmentSchema = z.object({
    item: z.string().nonempty(),
    quantity: z.number().int().nonnegative(),
}).strict();
  
export const BatchSchema = z.object({
    batchName: z.string().nonempty(),
    author: z.string().nonempty(),
    recipeID: z.string().nonempty(),
    dateStarted: z.string().nonempty(),
    equipment: z.array(EquipmentSchema),
    initialGravity: z.number().nonnegative(),
    water: z.string().nonempty(),
    stage: z.enum(validStages),
}).strict();

export const BaseBatchUpdateSchema = z.object({
    batchID: z.string().nonempty(),
    updateDate: z.string().nonempty(),
    updateType: z.enum(["text", "gravity", "stage"]),
}).strict();

export const TextBatchUpdateSchema = BaseBatchUpdateSchema.extend({
    updateType: z.enum(["text"]),
    text: z.string().nonempty(),
}).strict();

export const GravityBatchUpdateSchema = BaseBatchUpdateSchema.extend({
    updateType: z.enum(["gravity"]),
    newGravity: z.number().nonnegative(),
}).strict();

export const StageBatchUpdateSchema = BaseBatchUpdateSchema.extend({
    updateType: z.enum(["stage"]),
    newStage: z.enum(validStages),
}).strict();


export type Recipe = z.infer<typeof RecipeSchema>
export type Batch = z.infer<typeof BatchSchema>
export type BaseBatchUpdate = z.infer<typeof BaseBatchUpdateSchema>
export type TextBatchUpdate = z.infer<typeof TextBatchUpdateSchema>
export type GravityBatchUpdate = z.infer<typeof GravityBatchUpdateSchema>
export type StageBatchUpdate = z.infer<typeof StageBatchUpdateSchema>

export interface DictionaryOfRecipes {
    [key: string] : Recipe
}


