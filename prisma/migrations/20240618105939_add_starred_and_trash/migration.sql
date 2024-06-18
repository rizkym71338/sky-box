-- AlterTable
ALTER TABLE "File" ADD COLUMN     "inTrash" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "starreds" TEXT[];
