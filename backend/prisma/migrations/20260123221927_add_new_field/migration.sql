-- AlterTable
ALTER TABLE "Contest" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "ContestParticipant" (
    "user_id" TEXT NOT NULL,
    "contest_id" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ContestParticipant_user_id_contest_id_key" ON "ContestParticipant"("user_id", "contest_id");

-- AddForeignKey
ALTER TABLE "ContestParticipant" ADD CONSTRAINT "ContestParticipant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ContestParticipant" ADD CONSTRAINT "ContestParticipant_contest_id_fkey" FOREIGN KEY ("contest_id") REFERENCES "Contest"("contest_id") ON DELETE RESTRICT ON UPDATE CASCADE;
