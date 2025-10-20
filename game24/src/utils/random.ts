// 随机与过滤工具：从1~13中抽取4个数字，排除不可能组合
// 说明：每个数字最多出现4次；一次仅抽4个，因此简单的等概率抽取足够满足规则

export type FourTuple = [number, number, number, number]

// 将四元组排序并序列化为key，便于与不可能组合集合比较
export function tupleKey(nums: FourTuple): string {
  const sorted = [...nums].sort((a, b) => a - b) as FourTuple
  return sorted.join(',')
}

// 从 public/impossible_24_combinations.json 加载不可能组合，返回 Set 形式
export async function loadImpossibleSet(): Promise<Set<string>> {
  const res = await fetch('/impossible_24_combinations.json')
  const data: number[][] = await res.json()
  const set = new Set<string>()
  for (const arr of data) {
    const sorted = [...arr].sort((a, b) => a - b)
    set.add(sorted.join(','))
  }
  return set
}

// 生成一个候选四元组
export function drawFour(): FourTuple {
  const pick = () => Math.floor(Math.random() * 13) + 1
  return [pick(), pick(), pick(), pick()]
}

// 在限制次数内生成不在不可能集合中的四元组
export function generateValidFour(impossible: Set<string>, maxTry = 1000): FourTuple {
  let last: FourTuple = [1, 1, 1, 1]
  for (let i = 0; i < maxTry; i++) {
    const nums = drawFour()
    last = nums
    const key = tupleKey(nums)
    if (!impossible.has(key)) {
      return nums
    }
  }
  // 如果达到上限仍未找到（极小概率），返回最后一次结果（实际使用中基本不会触发）
  return last
}