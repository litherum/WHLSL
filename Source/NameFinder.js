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

import { Visitor } from "./Visitor.js";

export default class NameFinder extends Visitor {
    constructor()
    {
        super();
        this._set = new Set();
        this._worklist = [];
    }

    get set() { return this._set; }
    get worklist() { return this._worklist; }

    add(name)
    {
        if (this._set.has(name))
            return;
        this._set.add(name);
        this._worklist.push(name);
    }

    visitTypeRef(node)
    {
        this.add(node.name);
        super.visitTypeRef(node);
    }

    visitVariableRef(node)
    {
        this.add(node.name);
        super.visitVariableRef(node);
    }

    _handlePropertyAccess(node)
    {
        this.add(node.getFuncName);
        this.add(node.setFuncName);
        this.add(node.andFuncName);
    }

    visitDotExpression(node)
    {
        this._handlePropertyAccess(node);
        super.visitDotExpression(node);
    }

    visitIndexExpression(node)
    {
        this._handlePropertyAccess(node);
        super.visitIndexExpression(node);
    }

    visitCallExpression(node)
    {
        this.add(node.name);
        super.visitCallExpression(node);
    }
}

export { NameFinder };
