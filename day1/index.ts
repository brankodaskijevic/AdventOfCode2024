import type { BunFile } from 'bun'

const input = Bun.file('./input.txt')

const compareNumbers = (a: number, b: number) => a - b

async function readFile(file: BunFile) {
  const inputStrings = (await file.text()).split('\n')

  const leftStrings: Array<number> = []
  const rightStrings: Array<number> = []
  const differences: Array<number> = []

  for await (const line of inputStrings) {
    const splitLine = line.split('   ')

    leftStrings.push(Number(splitLine[0]))
    rightStrings.push(Number(splitLine[1]))
  }

  leftStrings.pop()
  rightStrings.pop()

  const leftStringsSorted = leftStrings.sort(compareNumbers)
  const rightStringsSorted = rightStrings.sort(compareNumbers)

  for (let i = 0; i < leftStringsSorted.length; i++) {
    if (leftStringsSorted[i] > rightStringsSorted[i]) {
      const diff = leftStringsSorted[i] - rightStringsSorted[i]
      differences.push(diff)
    } else if (leftStringsSorted[i] < rightStringsSorted[i]) {
      const diff = rightStringsSorted[i] - leftStringsSorted[i]
      differences.push(diff)
    } else {
      differences.push(0)
    }
  }

  const sumOfDifferences = differences.reduce((a, b) => a + b, 0)

  return sumOfDifferences
}

console.log(await readFile(input))
