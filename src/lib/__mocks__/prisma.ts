import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from 'jest-mock-extended';
import prisma from '../prisma'; // Your actual prisma instance

// 1. Hijack the real Prisma instance
jest.mock('../prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

// 2. Cast it to a mocked proxy so TypeScript knows we can track its calls
export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

// 3. Reset the memory between every single test
beforeEach(() => {
  mockReset(prismaMock);
});