/*
 * Copyright (C) 2018 Apple Inc. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions
 * are met:
 * 1. Redistributions of source code must retain the above copyright
 *    notice, this list of conditions and the following disclaimer.
 * 2. Redistributions in binary form must reproduce the above copyright
 *    notice, this list of conditions and the following disclaimer in the
 *    documentation and/or other materials provided with the distribution.
 *
 * THIS SOFTWARE IS PROVIDED BY APPLE INC. ``AS IS'' AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED.  IN NO EVENT SHALL APPLE INC. OR
 * CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
 * PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 * PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY
 * OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE. 
 */
"use strict";

// NOTE: The next line is line 28, and we rely on this in Prepare.js.
let standardLibrary = `
// This is the WSL standard library. Implementations of all of these things are in
// Intrinsics.js.

// Need to bootstrap void first.
native typedef void;
native typedef bool;
native typedef uchar;
native typedef ushort;
native typedef uint;
native typedef char;
native typedef short;
native typedef int;
native typedef half;
native typedef float;
native typedef atomic_int;
native typedef atomic_uint;

native typedef vector<bool, 2>;
typedef bool2 = vector<bool, 2>;
native typedef vector<bool, 3>;
typedef bool3 = vector<bool, 3>;
native typedef vector<bool, 4>;
typedef bool4 = vector<bool, 4>;
native typedef vector<uchar, 2>;
typedef uchar2 = vector<uchar, 2>;
native typedef vector<uchar, 3>;
typedef uchar3 = vector<uchar, 3>;
native typedef vector<uchar, 4>;
typedef uchar4 = vector<uchar, 4>;
native typedef vector<ushort, 2>;
typedef ushort2 = vector<ushort, 2>;
native typedef vector<ushort, 3>;
typedef ushort3 = vector<ushort, 3>;
native typedef vector<ushort, 4>;
typedef ushort4 = vector<ushort, 4>;
native typedef vector<uint, 2>;
typedef uint2 = vector<uint, 2>;
native typedef vector<uint, 3>;
typedef uint3 = vector<uint, 3>;
native typedef vector<uint, 4>;
typedef uint4 = vector<uint, 4>;
native typedef vector<char, 2>;
typedef char2 = vector<char, 2>;
native typedef vector<char, 3>;
typedef char3 = vector<char, 3>;
native typedef vector<char, 4>;
typedef char4 = vector<char, 4>;
native typedef vector<short, 2>;
typedef short2 = vector<short, 2>;
native typedef vector<short, 3>;
typedef short3 = vector<short, 3>;
native typedef vector<short, 4>;
typedef short4 = vector<short, 4>;
native typedef vector<int, 2>;
typedef int2 = vector<int, 2>;
native typedef vector<int, 3>;
typedef int3 = vector<int, 3>;
native typedef vector<int, 4>;
typedef int4 = vector<int, 4>;
native typedef vector<half, 2>;
typedef half2 = vector<half, 2>;
native typedef vector<half, 3>;
typedef half3 = vector<half, 3>;
native typedef vector<half, 4>;
typedef half4 = vector<half, 4>;
native typedef vector<float, 2>;
typedef float2 = vector<float, 2>;
native typedef vector<float, 3>;
typedef float3 = vector<float, 3>;
native typedef vector<float, 4>;
typedef float4 = vector<float, 4>;

native operator int(uint);
native operator int(uchar);
native operator int(float);
native operator uint(int);
native operator uint(uchar);
native operator uint(float);
native operator uchar(int);
native operator uchar(uint);
native operator uchar(float);
native operator float(int);
native operator float(uint);
native operator float(uchar);

native int operator+(int, int);
native uint operator+(uint, uint);
uchar operator+(uchar a, uchar b) { return uchar(uint(a) + uint(b)); }
native float operator+(float, float);
int operator++(int value) { return value + 1; }
uint operator++(uint value) { return value + 1; }
uchar operator++(uchar value) { return value + 1; }
native int operator-(int, int);
native uint operator-(uint, uint);
uchar operator-(uchar a, uchar b) { return uchar(uint(a) - uint(b)); }
native float operator-(float, float);
int operator--(int value) { return value - 1; }
uint operator--(uint value) { return value - 1; }
uchar operator--(uchar value) { return value - 1; }
native int operator*(int, int);
native uint operator*(uint, uint);
uchar operator*(uchar a, uchar b) { return uchar(uint(a) * uint(b)); }
native float operator*(float, float);
native int operator/(int, int);
native uint operator/(uint, uint);
uchar operator/(uchar a, uchar b) { return uchar(uint(a) / uint(b)); }
native int operator&(int, int);
native int operator|(int, int);
native int operator^(int, int);
native int operator~(int);
native int operator<<(int, uint);
native int operator>>(int, uint);
native uint operator&(uint, uint);
native uint operator|(uint, uint);
native uint operator^(uint, uint);
native uint operator~(uint);
native uint operator<<(uint, uint);
native uint operator>>(uint, uint);
uchar operator&(uchar a, uchar b) { return uchar(uint(a) & uint(b)); }
uchar operator|(uchar a, uchar b) { return uchar(uint(a) | uint(b)); }
uchar operator^(uchar a, uchar b) { return uchar(uint(a) ^ uint(b)); }
uchar operator~(uchar value) { return uchar(~uint(value)); }
uchar operator<<(uchar a, uint b) { return uchar(uint(a) << (b & 7)); }
uchar operator>>(uchar a, uint b) { return uchar(uint(a) >> (b & 7)); }
native float operator/(float, float);
native bool operator==(int, int);
native bool operator==(uint, uint);
bool operator==(uchar a, uchar b) { return uint(a) == uint(b); }
native bool operator==(bool, bool);
native bool operator==(float, float);
native bool operator<(int, int);
native bool operator<(uint, uint);
bool operator<(uchar a, uchar b) { return uint(a) < uint(b); }
native bool operator<(float, float);
native bool operator<=(int, int);
native bool operator<=(uint, uint);
bool operator<=(uchar a, uchar b) { return uint(a) <= uint(b); }
native bool operator<=(float, float);
native bool operator>(int, int);
native bool operator>(uint, uint);
bool operator>(uchar a, uchar b) { return uint(a) > uint(b); }
native bool operator>(float, float);
native bool operator>=(int, int);
native bool operator>=(uint, uint);
bool operator>=(uchar a, uchar b) { return uint(a) >= uint(b); }
native bool operator>=(float, float);

bool operator&(bool a, bool b)
{
    if (a)
        return b;
    return false;
}

bool operator|(bool a, bool b)
{
    if (a)
        return true;
    if (b)
        return true;
    return false;
}

bool operator^(bool a, bool b)
{
    if (a)
        return !b;
    return b;
}

bool operator~(bool value)
{
    return !value;
}
`;

// FIXME: Once the standard library has been replaced with a new version, this comments should be removed.
// This list is used to restrict the availability of vector types available in the langauge.
// Permissible vector element types must appear in this list and in the standard library
const VectorElementTypes = [ "bool", "uchar", "char", "ushort", "short", "uint", "int", "half", "float" ];
const VectorElementSizes = [ 2, 3, 4 ];

function allVectorTypeNames()
{
    const names = [];
    for (let elementType of VectorElementTypes) {
        for (let size of VectorElementSizes)
            names.push(`${elementType}${size}`);
    }
    return names;
}

// Provides operator&[]
standardLibrary += OperatorAnderIndexer.functions().join(";\n") + ";\n";

// Native vector types are like structs in the langauge, but they do not have the ander field access.
// It is not possible to take the address of a vector field.
standardLibrary += BuiltinVectorGetter.functions().join(";\n") + ";\n";
standardLibrary += BuiltinVectorSetter.functions().join(";\n") + ";\n";
standardLibrary += BuiltinVectorIndexGetter.functions().join(";\n") + ";\n";
standardLibrary += BuiltinVectorIndexSetter.functions().join(";\n") + ";\n";

// FIXME: For native types these could be included as source in the standard library.
// https://bugs.webkit.org/show_bug.cgi?id=188685
standardLibrary += OperatorBool.functions().join(";\n") + ";\n";
standardLibrary += BuiltinVectorEqualityOperator.functions().join(";\n") + ";\n";

// FIXME: These need to be included as source in the standard library.
standardLibrary += SwizzleOp.functions().join(";\n") + ";\n";
standardLibrary += BuiltinVectorConstructors.functions().join(";\n") + ";\n";
