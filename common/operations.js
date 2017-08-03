export const insert = (characters) => ({
  type: "insert",
  characters
});

export const del = (characters) => ({
  type: "delete",
  characters
});

export const retain = (n) => ({
  type: "retain",
  n
});

export const generate = (before, after) => {
  const changes = [];
  if (before.length === after.length - 1 ||
    before.length - 1 === after.length) {
    let offset = 0;
    for (let i=0; i<before.length; i++) {
      if (before[i] !== after[i + offset]) {

        if (before[i+1] === after[i]) {
          offset = -1;
          changes.push(del(before[i]));
        } else if (before[i] === after[i+1]) {
          offset = + 1;
          changes.push(insert(after[i]));
          changes.push(retain(1));
        }
      } else {
        changes.push(retain(1));
      }
    }

    if (before.length === after.length - 1 && offset === 0) {
      changes.push(insert(after[after.length - 1]));
    }

    return simplify(changes);
  } else {
    throw new Error("not a one character change");
  }
}

export const simplify = (operations) => {
  const simplified = [];

  for (let operation of operations) {
    const {type} = operation;

    if (simplified.length && type === simplified[simplified.length-1].type) {
      switch (type) {
        case "retain":
          simplified[simplified.length - 1].n += operation.n;
          break;
        case "insert":
        case "delete":
          simplified[simplified.length - 1].characters += operation.characters;
          break;
      }
    } else {
      simplified.push(operation);
    }
  }
  return simplified;
}

function expand(operations) {
  const expanded = [];
  for (let operation of operations) {
    const {type} = operation;

    switch (type) {
      case "retain":
        for (let i=0; i<operation.n; i++) {
          expanded.push(retain(1));
        }
        break;
      case "insert":
        for (let ch of operation.characters) {
          expanded.push(insert(ch));
        }
        break;
      case "delete":
        for (let ch of operation.characters) {
          expanded.push(del(ch))
        }
        break;
    }
  }
  return expanded;
}

function visit(operation, handlers) {
  if (handlers[operation.type]) {
    return handlers[operation.type](operation);
  }
}

function lengthOf(operation) {
  return (operation && visit(operation, {
    retain: ({n}) => n,
    insert: ({characters}) => characters.length
  })) || 0;
}

function next(operations, start) {
  let index = 0
  for (let i=0; i<operations.length; i++) {
    let operation = operations[i];
    let nextOperation = operations[i+1];
    console.log(operation.type, index, start, lengthOf(nextOperation));
    if (operation.type !== "retain" &&
        index >= start &&
        (index + lengthOf(nextOperation) > start || !nextOperation)) {
      return operations[i];
    }

    index += lengthOf(operation);
  }
}

export const transform = (op1, op2) => {

  for (let i = 0; i < op1.length; i++) {
    console.log(next(op1, i));
  }

  return {
    left: op1,
    right: op2
  };
}
