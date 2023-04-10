-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "hashedPassword" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "resetToken" TEXT,
    "profilePic" TEXT DEFAULT 'https://firebasestorage.googleapis.com/v0/b/new-facebook-ace12.appspot.com/o/images%2Fmark.jpeg?alt=media&token=7a8e11b8-3414-4b6e-8fc8-31e1767f159c',
    "resetTokenExpiresAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_User" ("createdAt", "email", "hashedPassword", "id", "name", "profilePic", "resetToken", "resetTokenExpiresAt", "salt") SELECT "createdAt", "email", "hashedPassword", "id", "name", "profilePic", "resetToken", "resetTokenExpiresAt", "salt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
