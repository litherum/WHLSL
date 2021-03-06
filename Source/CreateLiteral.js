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

import { Expression } from "./Expression.js";
import { TypeRef } from "./TypeRef.js";

export default function createLiteral(config)
{
    class GenericLiteral extends Expression {
        constructor(origin, value)
        {
            super(origin);
            this._value = value;
            this.type = config.createType.call(this, origin, value);
        }

        static withType(origin, value, type)
        {
            let result = new GenericLiteral(origin, value);
            result.type = TypeRef.wrap(type);
            return result;
        }

        get value() { return this._value; }

        // This is necessary because once we support int64, we'll need that to be represented as an object
        // rather than as a primitive. Then we'll need to convert.
        get valueForSelectedType()
        {
            let type = this.type.type.unifyNode;
            if (!type)
                throw new Error("Cannot get type for " + this);
            let func = type["formatValueFrom" + config.literalClassName];
            if (!func)
                throw new Error("Cannot get function to format type for " + config.literalClassName + " from " + type);
            return func.call(type, this.value);
        }

        get isConstexpr() { return true; }
        get isLiteral() { return true; }

        get negConstexpr()
        {
            if (!config.negConstexpr)
                return null;

            return () => config.negConstexpr.call(this);
        }

        unifyImpl(unificationContext, other)
        {
            if (!(other instanceof GenericLiteral))
                return false;
            return this.value == other.value;
        }

        toString()
        {
            return config.preferredTypeName + "Literal<" + this.value + ">";
        }
    }

    return GenericLiteral;
}

export { createLiteral };
