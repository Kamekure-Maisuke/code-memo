const std = @import("std");

// 符号付き: i
// 符号なし: u
// 文字列: []const u8
// 文字列は符号付き8bitの配列。コンパイラが文字列の長さを自動で判定。文字列は特別な場所に反映。つまり定数配列へのポインタ(参照場所を表す)
const Person = struct { score: f32, name: []const u8 };

pub fn main() void {
    const person = Person{ .score = 2.8, .name = "あいうえお" };
    std.debug.print("名前(10進数) is {d}\n", .{person.name});
    std.debug.print("名前(文字列) {s}\n", .{person.name});
}
