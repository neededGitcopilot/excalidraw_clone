So Schema Dosen't Add Shapes It just ADD Box
Element is for all shape and there is Type key that define what going into that box

model Element {
  id String @id @default(uuid())
  type Shapes
  x Int
  y Int
  width Int
  height Int
}

enum Shapes { 
  rectangle
  arrow
  text
}