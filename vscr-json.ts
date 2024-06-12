type params = {
  find?: string
  change?: any
}

export const stringify = (obj: any, params: params = {
  find: undefined,
  change: 'VSCR-UNDEFINED'
}) => JSON.stringify(obj, (_, value) => {
  if (!params.find)
    params.find = undefined

  if (!params.change)
    params.change = 'VSCR-UNDEFINED'

  if (value === params.find)
    return params.change

  if (value === params.change)
    return value + 'x'

  return value
})

export const parse = (obj: any, params: params = {
  find: undefined,
  change: 'VSCR-UNDEFINED'
}) => {
  if (!params.find)
    params.find = 'VSCR-UNDEFINED'

  if (!params.change)
    params.change = undefined

  const { find: targetValue, change } = params

  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      if (obj[i] === targetValue) {
        obj[i] = change;
      }
      if (obj[i] === targetValue + 'x') {
        obj[i] = targetValue;
      }
      else if (typeof obj[i] === 'object' && obj[i] !== null) {
        parse(obj[i], params);
      }
    }
  } else if (typeof obj === 'object' && obj !== null) {
    for (const key in obj) {
      if (obj[key] === targetValue) {
        obj[key] = change;
      }
      if (obj[key] === targetValue + 'x') {
        obj[key] = targetValue;
      }
      else if (typeof obj[key] === 'object') {
        parse(obj[key], params);
      }
    }
  }
  return obj;
}

// const object = {
//   str: 'str val',
//   arr: [
//     {
//       arrobj1: ['arrobj1arrStr', undefined, null]
//     },
//     null,
//     undefined,
//     0
//   ],
//   meta: undefined,
//   keyy: 'KEYYOKEYOOKEY'
// }

// const key = 'KEYYOKEYOOKEY'
// const stringified = stringify(object, key)
// const parsed = parse(JSON.parse(stringified), key)

// console.log(stringified)
// console.log(parsed)
// console.log(parsed.arr[0])