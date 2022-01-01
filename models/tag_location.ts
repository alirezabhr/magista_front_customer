class TagLocation {
  id: number
  x: number
  y: number

  constructor (id: number, x: number, y: number) {
    this.id = id
    this.x = x
    this.y = y
  }
  
  toJSON () {
    return { ...this }
  }
}

export default TagLocation
