import {
  insert,
  del,
  retain,
  generate,
  simplify,
  transform
} from "../operations";

describe("Operations", () => {
  describe("insert", () => {
    test("that it create a message", () => {
      expect(insert("test")).toMatchSnapshot();
    });
  });

  describe("del", () => {
    test("that it create a message", () => {
      expect(del("test")).toMatchSnapshot();
    });
  });

  describe("retain", () => {
    test("that it create a message", () => {
      expect(retain(2)).toMatchSnapshot();
    });
  });

  describe("generate", () => {
    test("that it throws if zero characters are changed", () => {
      expect(
        () => generate("123", "123")
      ).toThrowErrorMatchingSnapshot();
    });

    describe("delete", () => {
      test("first", () => {
        expect(generate("123", "23")).toMatchSnapshot();
      });

      test("inside", () => {
        expect(generate("123", "13")).toMatchSnapshot();
      });

      test("last", () => {
        expect(generate("123", "12")).toMatchSnapshot();
      });

      test("same character", () => {
        expect(generate("111", "11")).toMatchSnapshot();
      });
    });

    describe("add", () => {
      test("before", () => {
        expect(generate("23", "123")).toMatchSnapshot();
      });

      test("inside", () => {
        expect(generate("13", "123")).toMatchSnapshot();
      });

      test("after", () => {
        expect(generate("12", "123")).toMatchSnapshot();
      });

      test("same character", () => {
        expect(generate("11", "111")).toMatchSnapshot();
      });
    })
  });

  describe("simplify", () => {
    test("retain", () => {
      const actual = simplify([retain(1), retain(1)]);
      const expected = [retain(2)];

      expect(actual).toEqual(expected)
    });

    test("insert", () => {
      const actual = simplify([insert("a"), insert("b")]);
      const expected = [insert("ab")];

      expect(actual).toEqual(expected)
    });

    test("del", () => {
      const actual = simplify([del("a"), del("b")]);
      const expected = [del("ab")];

      expect(actual).toEqual(expected)
    });
  });

  describe.only("transform", () => {
    const server = [retain(2), insert("a")];
    const client = [retain(2), insert("b")];

    const { left, right } = transform(server, client);

    expect(left).toEqual([
      retain(2),
      insert("a"),
      retain(1)
    ]);
    expect(right).toEqual([
      retain(3),
      insert("b")
    ]);
  });
});
