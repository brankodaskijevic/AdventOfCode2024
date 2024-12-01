import type { BunFile } from 'bun'

const input = Bun.file('./input.txt')

const compareNumbers = (a: number, b: number) => a - b

async function readFile(file: BunFile) {
  const inputStrings = (await file.text()).split('\n')

  const leftStrings: Array<number> = []
  const rightStrings: Array<number> = []
  const duplicates: Array<number> = []
  const similarityScore: Array<number> = []

  for await (const line of inputStrings) {
    const splitLine = line.split('   ')

    leftStrings.push(Number(splitLine[0]))
    rightStrings.push(Number(splitLine[1]))
  }

  for (let i = 0; i < leftStrings.length; i++) {
    for (let j = 0; j < rightStrings.length; j++) {
      if (leftStrings[i] === rightStrings[j]) {
        duplicates.push(1)
      }
    }

    if (duplicates.length !== 0) {
      similarityScore.push(leftStrings[i] * duplicates.length)
    }

    duplicates.length = 0
  }

  // PART 1
  // leftStrings.pop()
  // rightStrings.pop()

  // const leftStringsSorted = leftStrings.sort(compareNumbers)
  // const rightStringsSorted = rightStrings.sort(compareNumbers)

  // for (let i = 0; i < leftStringsSorted.length; i++) {
  //   if (leftStringsSorted[i] > rightStringsSorted[i]) {
  //     const diff = leftStringsSorted[i] - rightStringsSorted[i]
  //     differences.push(diff)
  //   } else if (leftStringsSorted[i] < rightStringsSorted[i]) {
  //     const diff = rightStringsSorted[i] - leftStringsSorted[i]
  //     differences.push(diff)
  //   } else {
  //     differences.push(0)
  //   }
  // }

  return similarityScore.reduce((a, b) => a + b, 0)
}

console.log(await readFile(input))
