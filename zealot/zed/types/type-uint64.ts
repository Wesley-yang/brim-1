import {Uint64} from "../values/uint64"
import {BasePrimitive} from "./base-primitive"

class TypeOfUint64 extends BasePrimitive<Uint64> {
  name = "uint64"

  create(value) {
    return new Uint64(value)
  }
}

export const TypeUint64 = new TypeOfUint64()
