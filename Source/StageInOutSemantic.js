/*
 * Copyright 2018 Apple Inc.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *    1. Redistributions of source code must retain the above copyright notice,
 *       this list of conditions and the following disclaimer.
 *
 *    2. Redistributions in binary form must reproduce the above copyright notice,
 *       this list of conditions and the following disclaimer in the documentation
 *       and/or other materials provided with the distribution.
 *
 *    3. Neither the name of the copyright holder nor the names of its
 *       contributors may be used to endorse or promote products derived from this
 *       software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

import { ArrayType } from "./ArrayType.js";
import { EnumType } from "./EnumType.js";
import { MatrixType } from "./MatrixType.js";
import { Semantic } from "./Semantic.js";
import { VectorType } from "./VectorType.js";

export default class StageInOutSemantic extends Semantic {
    constructor(origin, index)
    {
         super(origin);
         this._index = index;
    }

    get index() { return this._index; }

    isAcceptableType(type, program)
    {
        return type instanceof EnumType || type instanceof ArrayType || type instanceof VectorType || type instanceof MatrixType || type.isNumber;
    }

    isAcceptableForShaderType(direction, shaderType)
    {
        switch (shaderType) {
        case "vertex":
            return true;
        case "fragment":
            return direction == "input";
        case "compute":
            return false;
        case "test":
            return true;
        default:
            throw new Error(`Unknown shader type: ${shaderType}`);
        }
    }

    equalToOtherSemantic(otherSemantic)
    {
        if (!(otherSemantic instanceof StageInOutSemantic))
            return false;
        return this.index == otherSemantic.index;
    }

    toString()
    {
        return `attribute(${this.index})`;
    }
}

export { StageInOutSemantic };
