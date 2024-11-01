export function declension(
    number: number,
    nominative: string,
    genitive: string,
    plural: string
  ) {
    if (number % 10 === 1 && number % 100 !== 11) {
      return nominative;
    } else if (
      number % 10 >= 2 &&
      number % 10 <= 4 &&
      (number % 100 < 10 || number % 100 >= 20)
    ) {
      return genitive;
    } else {
      return plural;
    }
  }