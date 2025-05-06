describe('multiply Test', () => {
  test("2 * 4 = 8", () => {
     expect(sum(2, 4)).toBe(8)
  })
})


describe('division Test', () => {
  test("6 / 2 = 4", () => {
     expect(division(6, 2)).toBe(3)
  })
})
describe('division Test', () => {
  test("6 / 0 = error", () => {
     expect(() => division()).toThrow("0으로 나눌 수 없습니다.");
  })
})


// 성공 테스트코드
// 실패 테스트코드


// 성공
describe('strikeBall Test', () => {
  test("playerNum , gameNum", () => {
     expect(checkStrikeAndBall(123, 123)).toBe(123)
  })
})
// 실패
describe('strikeBall Test', () => {
  test("playerNum , gameNum", () => {
    expect(() => checkStrikeAndBall(123, 124)).toThrow("0으로 나눌 수 없습니다.");
    expect(checkStrikeAndBall(123, 123)).toBe(123)
  })
})

