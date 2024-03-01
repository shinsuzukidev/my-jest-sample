# JEST 学び

## 参考サイト

### 公式サイト

- https://jestjs.io/ja/

## チュートリアルを試す

手順どおり進め、package.json にコマンドを作成。

実行時 "npm test" だと動かない、"npm run test" により動作を確認した。

```bash
$ npm run test

> test
> jest

 PASS  ./sum.test.js
  √ adds 1 + 2 to equal 3 (1 ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.25 s, estimated 1 s
Ran all test suites.
```

## カバレッジ

"jest --coverage" でカバレッジを実行する。  
また coverage フォルダが作成される
lcov-report の index.html により UI から詳細を確認可能。

```json
  "scripts": {
    "test": "jest",
    "coverage": "jest --coverage"
  }
```

```bash
$ npm run coverage

> coverage
> jest --coverage

 PASS  ./sum.test.js
  √ adds 1 + 2 to equal 3 (1 ms)
  √ two plus two is four
  √ object assignment (1 ms)
  √ null (1 ms)
  √ zero (3 ms)
  √ two to plus (1 ms)
  √ adding floating point numbers (1 ms)
  √ there is no I in team
  √ but there is a stop in christoph
  √ the shopping list has milk on it (1 ms)
  √ compiling android goes as expected (6 ms)

----------|---------|----------|---------|---------|-------------------
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s
----------|---------|----------|---------|---------|-------------------
All files |   66.66 |      100 |      50 |   66.66 |
 sum.js   |   66.66 |      100 |      50 |   66.66 | 6
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       11 passed, 11 total
Snapshots:   0 total
Time:        0.312 s, estimated 1 s
Ran all test suites.
```
