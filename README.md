A fork from [Joshaven Potter's string_score](https://github.com/joshaven/string_score), with `commonjs` and `esm` exports.

### Motivations
- The original code doesn't handle accents
- The original code modify the `String.prototype` and don`t exports the scoring function.

### Installation
```bash
yarn add carlosqsilva/string_score
```

### Example
examples from the [original repo](https://github.com/joshaven/string_score)

```js
import { score } from "string_score"

score("hello world", "axl")         //=> 0
score("hello world", "ow")          //=> 0.35454545454545455

// Single letter match
score("hello world", "e")           //=>0.1090909090909091

// Single letter match plus bonuses for beginning of word and beginning of phrase
score("hello world", "h")           //=>0.5363636363636364

score("hello world", "he")          //=>0.5727272727272728
score("hello world", "hel")         //=>0.6090909090909091
score("hello world", "hell")        //=>0.6454545454545455
score("hello world", "hello")       //=>0.6818181818181818
/* ... */
score("hello world", "hello worl")  //=>0.8636363636363635
score("hello world", "hello world") //=> 1

// Using a "1" in place of an "l" is a mismatch unless the score is fuzzy
score("hello world", "hello wor1")  //=>0
score("hello world", "hello wor1", 0.5)  //=>0.6081818181818182 (fuzzy)

// Finding a match in a shorter string is more significant.
score('Hello', 'h') //=>0.52
score('He', 'h')    //=>0.6249999999999999

// Same case matches better than wrong case
score('Hello', 'h') //=>0.52
score('Hello', 'H') //=>0.5800000000000001

// Acronyms are given a little more weight
score("Hillsdale Michigan", "HiMi") > score("Hillsdale Michigan", "Hills")
score("Hillsdale Michigan", "HiMi") < score("Hillsdale Michigan", "Hillsd")
```
