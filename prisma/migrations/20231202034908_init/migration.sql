-- CreateTable
CREATE TABLE "User" (
    "user_id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" VARCHAR(16) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "Home" (
    "home_id" SERIAL NOT NULL,
    "endereco" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "cep" VARCHAR(9) NOT NULL,
    "tamanho" INTEGER NOT NULL,
    "quartos" INTEGER NOT NULL,
    "banheiros" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,

    CONSTRAINT "Home_pkey" PRIMARY KEY ("home_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_senha_key" ON "User"("senha");
