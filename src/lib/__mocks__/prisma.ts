/// <reference types="jest" />
import { mockDeep, mockReset } from 'jest-mock-extended';
import type { DeepMockProxy } from 'jest-mock-extended';

// 2. Import from your CUSTOM generated folder, NOT @prisma/client
// (Adjust the relative path if your __mocks__ folder is deeper)
import type { PrismaClient } from '../../../generated/prisma/client'; 

// 3. Import your actual singleton instance
import prisma from '../prisma'; 

jest.mock('../prisma', () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;

beforeEach(() => {
  mockReset(prismaMock);
});