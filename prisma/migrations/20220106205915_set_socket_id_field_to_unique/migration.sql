/*
  Warnings:

  - A unique constraint covering the columns `[socket_id]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "users_socket_id_key" ON "users"("socket_id");
