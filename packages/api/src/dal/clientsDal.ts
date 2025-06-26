// In-memory DAL for clients
import { PrismaClient, Client, Prisma } from '../generated/prisma';
const prisma = new PrismaClient();

export async function createClient(data: Prisma.ClientCreateInput): Promise<Client> {
  return prisma.client.create({ data });
}

export async function getClients(): Promise<Client[]> {
  return prisma.client.findMany();
}

export async function updateClient(
  id: string,
  updates: Prisma.ClientUpdateInput,
): Promise<Client | null> {
  return prisma.client.update({ where: { id }, data: updates });
}

export async function deleteClient(id: string): Promise<Client> {
  return prisma.client.delete({ where: { id } });
}
