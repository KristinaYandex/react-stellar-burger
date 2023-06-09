const arrayMove = (arr, fromIndex, toIndex) => {
  const arrCopy = [...arr]
  const insertionPart = arrCopy.splice(fromIndex, 1)[0]

  arrCopy.splice(toIndex, 0, insertionPart)

  return arrCopy
}

export default arrayMove
