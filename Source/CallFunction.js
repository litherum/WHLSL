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

import { Evaluator } from "./Evaluator.js";
import { StructLayoutBuilder } from "./StructLayoutBuilder.js";
import { TypedValue } from "./TypedValue.js";
import { WTypeError } from "./WTypeError.js";

// This allows you to pass structs and arrays in-place, but it's a more annoying API.
export function callFunction(program, name, argumentList)
{
    let argumentTypes = argumentList.map(argument => argument.type);
    let overload = program.globalNameContext.resolveFuncOverload(name, argumentTypes, null, true);
    if (!overload.func)
        throw new WTypeError("<callFunction>", "Cannot resolve function call " + name + "(" + argumentList + ")" + (overload.failures.length ? "; tried:\n" + overload.failures.join("\n") : ""));

    const func = overload.func;
    for (let i = 0; i < func.parameters.length; ++i) {
        let type = argumentTypes[i];
        type.visit(new StructLayoutBuilder());
        func.parameters[i].ePtr.copyFrom(argumentList[i].ePtr, type.size);
    }
    let result = new Evaluator(program).runFunc(func);
    return new TypedValue(func.returnType, result);
}

export { callFunction as default };
