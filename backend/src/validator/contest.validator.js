import joi from "joi"

// req.body me object aata hai to joi jo hota hai vo rules of object hota hai 

const contestValidateSchema = joi.object({
  title: joi.string().trim().required(),
  start_time: joi.date(),
  end_time: joi.date()
});

export {contestValidateSchema}
// model Contest {
//   contest_id String @id @default(cuid())
//   title      String
//   start_time DateTime
//   end_time   DateTime

//   problems     Problem[]
//   submissions  Submission[]
//   leaderboards Leaderboard[]
//   result       Result?
// }