import joi from "joi"

const submitValidateSchema = joi.object({
    user_id: joi.string().required(),
    problem_id: joi.string().required(),
    contest_id: joi.string().required(),
    score: joi.number().required(),
    status: joi.string().required(),
    code: joi.string().required(),
    language: joi.string().required(),
})

export {submitValidateSchema}

//model Submission {
//   submission_id String @id @default(cuid())

//   user_id    String
//   problem_id String
//   contest_id String

//   score        Int
//   status       String
//   submitted_at DateTime @default(now())

//   user    User    @relation(fields: [user_id], references: [user_id])
//   contest Contest @relation(fields: [contest_id], references: [contest_id])
//   problem Problem @relation(fields: [problem_id], references: [problem_id])
// }