-- CreateTable
CREATE TABLE "Account" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "walletAddress" TEXT NOT NULL,
    "nonce" TEXT,

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portal" (
    "id" SERIAL NOT NULL,
    "name" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "accountId" INTEGER NOT NULL,
    "connectButtonId" TEXT NOT NULL DEFAULT E'#finely-connect',

    CONSTRAINT "Portal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PortalRule" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "tokenIds" TEXT[],
    "contractAddress" TEXT NOT NULL,
    "minBalance" INTEGER NOT NULL DEFAULT 0,
    "maxBalance" INTEGER NOT NULL DEFAULT 0,
    "portalId" INTEGER NOT NULL,

    CONSTRAINT "PortalRule_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Account_walletAddress_key" ON "Account"("walletAddress");

-- CreateIndex
CREATE UNIQUE INDEX "Portal_accountId_key" ON "Portal"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "PortalRule_portalId_key" ON "PortalRule"("portalId");

-- AddForeignKey
ALTER TABLE "Portal" ADD CONSTRAINT "Portal_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PortalRule" ADD CONSTRAINT "PortalRule_portalId_fkey" FOREIGN KEY ("portalId") REFERENCES "Portal"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
