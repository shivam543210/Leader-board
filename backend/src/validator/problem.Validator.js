import jio from "joi"

const problemValidateSchema = jio.object({
    name : jio.string().optional(),
    Test : jio.string().optional(),
    contest_id : jio.string().required(),
    description : jio.string().required(),
    max_score : jio.number().required(),
    max_time : jio.number().required(),
})
const problemManyValidationSchema = jio.object({
    name : jio.string().required(),
    Test : jio.string().optional(),
    description : jio.string().required(),
    max_score : jio.number().required(),
    max_time : jio.number().required(),
})
const problemManyValidation = jio.object({
    contest_id : jio.string().required(),
    problems : jio.array().items(
        problemManyValidationSchema
    ).min(1).required()
})
export {problemValidateSchema,problemManyValidation}
// model Problem {
//   problem_id  String @id @default(cuid())
//   name String? 
//   Test String? 
//   contest_id String
//   description String
//   max_score   Int @default(0)
//   max_time    Int @default(0)
//   contest     Contest     @relation(fields: [contest_id], references: [contest_id])
//   submissions Submission[]
// }