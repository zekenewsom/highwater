// In-memory DAL for portfolios
import { PrismaClient, Portfolio, Prisma } from '../generated/prisma';
const prisma = new PrismaClient();

export async function createPortfolio(data: Prisma.PortfolioCreateInput): Promise<Portfolio> {
  return prisma.portfolio.create({ data });
}

export async function getPortfolios(): Promise<Portfolio[]> {
  return prisma.portfolio.findMany();
}

export async function updatePortfolio(
  id: string,
  updates: Prisma.PortfolioUpdateInput,
): Promise<Portfolio | null> {
  return prisma.portfolio.update({ where: { id }, data: updates });
}

export async function deletePortfolio(id: string): Promise<Portfolio> {
  return prisma.portfolio.delete({ where: { id } });
}
