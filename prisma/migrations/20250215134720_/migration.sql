/*
  Warnings:

  - You are about to drop the column `allows_write_to_pm` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `auth_date` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `first_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `is_premium` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `language_code` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `last_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `photo_url` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "allows_write_to_pm",
DROP COLUMN "auth_date",
DROP COLUMN "first_name",
DROP COLUMN "is_premium",
DROP COLUMN "language_code",
DROP COLUMN "last_name",
DROP COLUMN "photo_url",
DROP COLUMN "username";
