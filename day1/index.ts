import type { BunFile } from 'bun'

const input = Bun.file("./input.txt")

async function readFile(file: BunFile) {
  console.log(await file.text())
}

readFile(input)
