const { test, expect} = require('@jest/globals');

const {normaliseURL} = require('./crawl.js');

console.log(normaliseURL('https://wagslane.dev/path/'));
test("normalises 'https://wagslane.dev/path/' to 'wagslane.dev/path'", () => {
    expect(normaliseURL('https://wagslane.dev/path/')).toBe('wagslane.dev/path');
})

test("normalises 'https://wagsLane.Dev/path' to 'wagslane.dev/path'", () => {
    expect(normaliseURL('https://wagsLane.Dev/path')).toBe('wagslane.dev/path');
})

test("normalises 'https://wagslane.dev/path' to 'wagslane.dev/path'", () => {
    expect(normaliseURL('https://wagslane.dev/path')).toBe('wagslane.dev/path');
})

test("normalises 'http://wagslane.dev/path' to 'wagslane.dev/path'", () => {
    expect(normaliseURL('http://wagslane.dev/path')).toBe('wagslane.dev/path');
})

test('relative url to absolute url conversion', () => {
    expect(relToAbsolute('https://github.com', 'darArif')).toBe('https://github.com/darArif');
})

test('Accurate number of <a> tags found', () => {
    expect(numbOfAnchorTags('')).toBe()
})


