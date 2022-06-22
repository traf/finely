-- CreateEnum
CREATE TYPE "TokenType" AS ENUM ('ERC20', 'ERC721', 'ERC1155');

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletAddress" TEXT NOT NULL,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portal" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "fallbackPageUrl" TEXT NOT NULL,
    "protectedPageUrl" TEXT NOT NULL,
    "connectButtonClassName" TEXT NOT NULL,
    "walletAddressPlaceholderClassName" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,

    CONSTRAINT "Portal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalRule" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "contractAddress" TEXT NOT NULL,
    "tokenIds" TEXT[],
    "tokenType" "TokenType" NOT NULL,
    "minBalance" INTEGER DEFAULT 0,
    "maxBalance" INTEGER DEFAULT 0,
    "portalId" TEXT NOT NULL,

    CONSTRAINT "PortalRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_walletAddress_key" ON "Account"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Portal_id_accountId_key" ON "Portal"("id", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalRule_portalId_key" ON "PortalRule"("portalId");

-- AddForeignKey
ALTER TABLE "Portal" ADD CONSTRAINT "Portal_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalRule" ADD CONSTRAINT "PortalRule_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "Portal"("id") ON DELETE CASCADE ON UPDATE CASCADE;
