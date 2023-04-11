// create type helper
type MyGenericType<Tdata> = {
    data: Tdata;
};

type Example1 = MyGenericType<{
    firstName: string;
}>;

type Example2 = MyGenericType<string>;

// define return type of function
const makeFetch = <TData>(url: string): Promise<TData> => {
    return fetch(url).then((response) => response.json());
};

makeFetch<{ id: number; title: string; completed: string }>(
    'https://jsonplaceholder.typicode.com/todos/1'
).then((data) => {
    const id = data.id;
    const title = data.title;
    const completed = data.completed;
    console.log(id, title, completed);
    // ^?
});

// typing set
const set = new Set<number>();

set.add(1);
set.add(2);
set.add('SD');

// inferring types passed to functions

const addItToObject = <T>(obj: T): T & { id: string } => {
    return {
        ...obj,
        id: '123',
    };
};

const result = addItToObject({ name: 'John' });

console.log(result);

type GetPromiseReturnType<T extends (...args: any) => any> = Awaited<ReturnType<T>>;

type Result1 = Awaited<Promise<string>>;

type Result = GetPromiseReturnType<() => Promise<{ firstName: string; lastName: string }>>;

const getKeyWithHighestValue = <TObj extends Record<string, number>>(
    obj: TObj
): {
    key: keyof TObj;
    value: number;
} => {
    const keys = Object.keys(obj) as Array<keyof TObj>;
    let highestKey: keyof TObj = keys[0];
    let highestValue = obj[highestKey];

    for (const key of keys) {
        if (obj[key] > highestValue) {
            highestKey = key;
            highestValue = obj[key];
        }
    }

    return {
        key: highestKey,
        value: highestValue,
    };
};

const result123 = getKeyWithHighestValue({
    a: 1,
    b: 2,
    c: 3,
});

const key = result123.key; // key is of type "a" | "b" | "c"
const value = result123.value; // value is of type number

/////

const getValue = <TObj, TKey extends keyof TObj>(obj: TObj, key: TKey) => {
    return obj[key];
};

const resultabc = getValue(
    {
        a: 1,
        b: 'SD',
        c: true,
    },
    'c'
);

// type resultabc =  number | string | boolean dependent on key input of function

export const createSet = <T = string>() => {
    return new Set<T>();
};

const numberSet = createSet<number>();
const stringSet = createSet<string>();

const otherStringSet = createSet(); // createSet has as string as a default type parameter

interface Person {
    name: string;
    age: number;
    address: string;
}

type PersonKeys = keyof Person;

type PersonProperties = {
    [key in PersonKeys]: Person[key];
};

let s: PersonProperties = {
    name: 'John',
    age: 30,
    address: '123 Main St',
};
console.log(s.name);
