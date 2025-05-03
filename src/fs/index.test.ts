import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url';
import { createDirIfNotExist, deleteIfExist, getDirInfo, getIfExists, isSubDir } from "./index.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const testDir = path.join(__dirname, "./testDir");

beforeEach(async () => {
    await deleteIfExist(testDir);
});

afterAll(async () => {
    await deleteIfExist(testDir);
});

describe('isSubDir', () => {
    test('should return true for valid subdirectory', () => {
        const parent = '/home/user';
        const child = '/home/user/subdirectory';
        expect(isSubDir(parent, child)).toBeTruthy();
    });

    test('should return false for directory outside parent', () => {
        const parent = '/home/user';
        const outside = '/home/other';
        expect(isSubDir(parent, outside)).toBeFalsy();
    });
});

describe('getIfExists', () => {
    test('should return true for existing directory', async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        expect(await getIfExists(testDir)).toBeTruthy();
    });

    test('should return false for non-existing path', async () => {
        expect(await getIfExists(path.join(testDir, 'nonexistent'))).toBeFalsy();
    });
});

describe('createDirIfNotExist', () => {
    test('should create directory if not exists', async () => {
        await createDirIfNotExist(testDir);
        expect(await getIfExists(testDir)).toBeTruthy();
    });

    test('should not throw if directory already exists', async () => {
        await createDirIfNotExist(testDir);
        await expect(createDirIfNotExist(testDir)).resolves.not.toThrow();
    });
});

describe('deleteIfExist', () => {
    test('should delete existing directory', async () => {
        await fs.promises.mkdir(testDir, { recursive: true });
        const result = await deleteIfExist(testDir);
        expect(result).toBeTruthy();
        expect(await getIfExists(testDir)).toBeFalsy();
    });

    test('should return false for non-existing path', async () => {
        const result = await deleteIfExist(path.join(testDir, 'nonexistent'));
        expect(result).toBeFalsy();
    });
});

describe('getDirInfo', () => {
    test('should return correct directory info', async () => {
        await createDirIfNotExist(testDir);
        
        // Create test files with different timestamps
        await fs.promises.writeFile(path.join(testDir, "file1.txt"), "file1");
        await new Promise(resolve => setTimeout(resolve, 100));
        await fs.promises.writeFile(path.join(testDir, "file2.txt"), "file2");
        await fs.promises.writeFile(path.join(testDir, "file3.txt"), "file3");

        const { fileOld, size } = await getDirInfo(testDir);
        expect(fileOld).toBe("file1.txt");
        expect(size).toBe(15); // total size of all files (5 bytes each)
    });
});
