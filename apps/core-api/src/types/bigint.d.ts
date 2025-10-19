// Fix BigInt serialization for JSON
interface BigInt {
  toJSON(): number;
}
