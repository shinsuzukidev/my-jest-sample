// モジュール読込
const mymodule = require("./my-module.js")

// ワンタイムセットアップ(開始)
beforeAll(() => {
  //console.log("init once...")
})

// ワンタイムセットアップ(終了)
afterAll(() => {
  // console.log("clear once...")
})

// セットアップ(開始)
beforeEach(() => {
  // console.log("init...")
})

// セットアップ(終了)
afterEach(() => {
  // console.log("clear...")
})

// モジュールを一部ハック(sum2をハック)
jest.mock("./my-module.js", () => {
  return {
    ...jest.requireActual("./my-module.js"),
    sum2: jest.fn((a, b) => {
      return a + b + 100
    }),
  }
})

//________________ モジュール関数をテスト
// sumのテスト
test("adds 1 + 2 to equal 3", () => {
  expect(mymodule.sum(1, 2)).toBe(3)
})

// subのテスト
test("sub 3 - 2 to equal 1", () => {
  expect(mymodule.sub(3, 2)).toBe(1)
})

//________________ テストをグループ化
// multiのテスト
describe("test matome", () => {
  test("multi 1 x 1 to equal 2", () => {
    expect(mymodule.multi(1, 1)).toBe(1)
  })

  test("multi 2 x 3 to equal 6", () => {
    expect(mymodule.multi(2, 3)).toBe(6)
  })
})

//________________ matcher(toBe)
test("two plus two is four", () => {
  expect(2 + 2).toBe(4)
})

//________________ matcher(オブジェクト)
test("object assignment", () => {
  const data = { one: 1 }
  data["two"] = 2
  expect(data).toEqual({ one: 1, two: 2 })
})

//________________ matcher(真偽値)
test("null", () => {
  const n = null
  expect(n).toBeNull()
  expect(n).toBeDefined()
  expect(n).not.toBeUndefined()
  expect(n).not.toBeTruthy()
  expect(n).toBeFalsy()
})

//________________ matcher(0の判定)
test("zero", () => {
  const z = 0
  expect(z).not.toBeNull()
  expect(z).toBeDefined()
  expect(z).not.toBeUndefined()
  expect(z).not.toBeTruthy()
  expect(z).toBeFalsy()
})

//________________ matcher(数値)
test("two to plus", () => {
  const value = 2 + 2
  expect(value).toBeGreaterThan(3)
  expect(value).toBeGreaterThanOrEqual(3.5)
  expect(value).toBe(4)
  expect(value).toEqual(4)
})

//________________ matcher(丸め誤差)
test("adding floating point numbers", () => {
  const value = 0.1 + 0.2
  //expect(value).toBe(0.3);         このように書くと、丸め込み誤差が原因で期待通りに動作しない
  expect(value).toBeCloseTo(0.3) // これならば正しく動く
})

//________________ matcher(文字比較(not match))
test("there is no I in team", () => {
  expect("team").not.toMatch(/I/)
})

//________________ matcher(文字比較(match))
test("but there is a stop in christoph", () => {
  expect("christoph").toMatch(/stop/)
})

//________________ matcher(配列(含まれているか))
const shoppingList = ["diapers", "kleenex", "trash bags", "paper towels", "milk"]

test("the shopping list has milk on it", () => {
  expect(shoppingList).toContain("milk")
  expect(new Set(shoppingList)).toContain("milk")
})

//________________ matcher(例外)
function compileAndroidCode() {
  throw new Error("you are using the wrong JDK!")
}

test("compiling android goes as expected", () => {
  expect(() => compileAndroidCode()).toThrow()
  expect(() => compileAndroidCode()).toThrow(Error)

  // You can also use a string that must be contained in the error message or a regexp
  // expect(() => compileAndroidCode()).toThrow("you are using the wrong JDK")
  // expect(() => compileAndroidCode()).toThrow(/JDK/)

  // Or you can match an exact error message using a regexp like below
  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK$/) // Test fails
  // expect(() => compileAndroidCode()).toThrow(/^you are using the wrong JDK!$/) // Test pass
})

//________________ mock(呼び出し回数、引数、戻り値)
const mockCallback = jest.fn((x) => 42 + x)
test("foreach mock function", () => {
  mymodule.forEach([0, 1], mockCallback)
  expect(mockCallback.mock.calls).toHaveLength(2) // 呼び出し回数
  expect(mockCallback.mock.calls[0][0]).toBe(0) // 引数1番目
  expect(mockCallback.mock.calls[1][0]).toBe(1) // 引数2番目
  expect(mockCallback.mock.results[0].value).toBe(42) // 戻り値
})

//________________ mock(戻り値)
test("mock-return-1", () => {
  const myMock = jest.fn()
  //console.log(myMock()) // 未定義だとundefined
  // > undefined

  myMock.mockReturnValueOnce(10).mockReturnValueOnce("x").mockReturnValue(true)
  console.log(myMock(), myMock(), myMock(), myMock())
  // > 10, 'x', true, true
})

//________________ モック関数の戻り値を設定
test("module-hack-func", () => {
  const f1 = jest.fn().mockReturnValue(1)
  const f2 = jest.fn().mockImplementation(() => {
    return 2
  })

  expect(f1()).toBe(1)
  expect(f2()).toBe(2)
})

//________________ mock(戻り値の設定: 1回目、2回目、3回目以降を定義)
test("mock-return-2", () => {
  const filterTestFn = jest.fn()
  // 1回目、2回目、3回目以降を定義
  filterTestFn.mockReturnValueOnce(true).mockReturnValueOnce(false).mockReturnValue(true)

  const result = [11, 12, 13, 14].filter((num) => filterTestFn(num))
  console.log(result)
  // > [11,13,14]

  // console.log(filterTestFn.mock.calls[0][0]) // 11
  // console.log(filterTestFn.mock.calls[1][0]) // 12
})

//________________ モジュールを一部ハックを確認(sum2)
test("module-partial-hack", () => {
  expect(mymodule.sum2(1, 2)).toBe(103)
})

//________________ モジュールの関数をハック(sum3)
module.sum3 = jest.fn().mockImplementation((a, b) => {
  return a + b + 200
})

test("module-func-hack", () => {
  expect(module.sum3(1, 2)).toBe(203)
})
