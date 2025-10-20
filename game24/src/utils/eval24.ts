// 安全表达式校验与求值（M3）
// 仅支持：数字(整数)、+ - * /、括号()、空格
// 流程：tokenize -> shunting-yard(中缀转后缀) -> RPN求值
// 提供：语法校验、数字使用校验（必须与题面四数多重集完全一致）、结果计算（含容差）

export type EvalResult = {
  ok: boolean                // 语法是否通过
  errors: string[]           // 错误信息
  value?: number             // 结果（语法通过且可算出时）
  usesAllNumbers: boolean    // 数字使用是否完全匹配
  numbersInExpr: number[]    // 表达式中识别到的数字（提示）
}

const OPS: Record<string, { p: number; assoc: 'L' | 'R' }> = {
  '+': { p: 1, assoc: 'L' },
  '-': { p: 1, assoc: 'L' },
  '*': { p: 2, assoc: 'L' },
  '/': { p: 2, assoc: 'L' },
}

const EPS = 1e-6

// 字符分类
function isDigit(ch: string) {
  return ch >= '0' && ch <= '9'
}

export function tokenize(input: string): (number | string)[] {
  const tokens: (number | string)[] = []
  let i = 0
  while (i < input.length) {
    const ch = input[i]
    if (ch === ' ' || ch === '\t' || ch === '\n') {
      i++
      continue
    }
    if (isDigit(ch)) {
      let j = i
      while (j < input.length && isDigit(input[j])) j++
      const numStr = input.slice(i, j)
      const num = Number(numStr)
      if (!Number.isFinite(num)) {
        throw new Error('数字解析失败')
      }
      tokens.push(num)
      i = j
      continue
    }
    if (ch === '+' || ch === '-' || ch === '*' || ch === '/' || ch === '(' || ch === ')') {
      tokens.push(ch)
      i++
      continue
    }
    throw new Error(`包含非法字符: ${ch}`)
  }
  return tokens
}

// 中缀 -> 后缀(RPN)
export function toRPN(tokens: (number | string)[]): (number | string)[] {
  const out: (number | string)[] = []
  const opstk: string[] = []
  for (const t of tokens) {
    if (typeof t === 'number') {
      out.push(t)
    } else if (t in OPS) {
      const o1 = t
      while (opstk.length) {
        const o2 = opstk[opstk.length - 1]
        if (!(o2 in OPS)) break
        const o1info = OPS[o1]
        const o2info = OPS[o2]
        const cond =
          (o1info.assoc === 'L' && o1info.p <= o2info.p) ||
          (o1info.assoc === 'R' && o1info.p < o2info.p)
        if (cond) {
          out.push(opstk.pop() as string)
        } else {
          break
        }
      }
      opstk.push(o1)
    } else if (t === '(') {
      opstk.push(t)
    } else if (t === ')') {
      let found = false
      while (opstk.length) {
        const top = opstk.pop() as string
        if (top === '(') {
          found = true
          break
        }
        out.push(top)
      }
      if (!found) {
        throw new Error('括号不匹配')
      }
    } else {
      throw new Error('未知的token')
    }
  }
  while (opstk.length) {
    const top = opstk.pop() as string
    if (top === '(' || top === ')') {
      throw new Error('括号不匹配')
    }
    out.push(top)
  }
  return out
}

// 计算RPN
export function evalRPN(rpn: (number | string)[]): number {
  const stk: number[] = []
  for (const t of rpn) {
    if (typeof t === 'number') {
      stk.push(t)
      continue
    }
    if (!(t in OPS)) {
      throw new Error('RPN包含未知操作符')
    }
    if (stk.length < 2) {
      throw new Error('操作数不足')
    }
    const b = stk.pop() as number
    const a = stk.pop() as number
    let v = 0
    if (t === '+') v = a + b
    else if (t === '-') v = a - b
    else if (t === '*') v = a * b
    else if (t === '/') {
      if (Math.abs(b) < EPS) {
        throw new Error('除以零')
      }
      v = a / b
    }
    stk.push(v)
  }
  if (stk.length !== 1) {
    throw new Error('表达式不规范')
  }
  return stk[0]
}

// 数字使用校验：表达式中出现的整数必须与题面四数的多重集完全一致
function multisetEqual(a: number[], b: number[]): boolean {
  const ca = new Map<number, number>()
  const cb = new Map<number, number>()
  for (const x of a) ca.set(x, (ca.get(x) || 0) + 1)
  for (const x of b) cb.set(x, (cb.get(x) || 0) + 1)
  if (ca.size !== cb.size) return false
  for (const [k, v] of ca) {
    if ((cb.get(k) || 0) !== v) return false
  }
  return true
}

// 从tokens提取数字（仅保留1..13范围，用于校验和提示）
function extractNumbers(tokens: (number | string)[]): number[] {
  const ns: number[] = []
  for (const t of tokens) {
    if (typeof t === 'number') {
      if (t >= 1 && t <= 13 && Number.isInteger(t)) ns.push(t)
    }
  }
  return ns
}

export function validateAndEvalExpression(numbers: number[], expr: string): EvalResult {
  const res: EvalResult = {
    ok: false,
    errors: [],
    value: undefined,
    usesAllNumbers: false,
    numbersInExpr: [],
  }
  if (!expr || expr.trim() === '') {
    res.errors.push('表达式为空')
    return res
  }
  try {
    const tokens = tokenize(expr)
    const used = extractNumbers(tokens)
    res.numbersInExpr = used.slice()
    // 数字使用需要与题面四数完全一致（多重集）
    res.usesAllNumbers = multisetEqual(
      [...numbers].sort((a, b) => a - b),
      [...used].sort((a, b) => a - b)
    )
    const rpn = toRPN(tokens)
    const value = evalRPN(rpn)
    res.value = value
    res.ok = true
    return res
  } catch (e) {
    res.errors.push(e instanceof Error ? e.message : '未知错误')
    return res
  }
}

// 是否等于24（带容差）
export function isTwentyFour(v: number | undefined): boolean {
  if (typeof v !== 'number' || !Number.isFinite(v)) return false
  return Math.abs(v - 24) < EPS
}