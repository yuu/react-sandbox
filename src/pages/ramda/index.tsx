import * as R from "ramda";

export const Ramda = () => {
    R.last([1, 2, 3]); //=> 3
    R.last([1]); //=> 1
    R.last([]); //=> undefined
    R.last("abc"); //=> 'c'
    R.last("a"); //=> 'a'
    R.last(""); //=> undefined

    return (
        <div>
            <h1>Ramda</h1>
            <div>
                <div>3 ==</div>
                {R.last([1, 2, 3])}

                <div>1 ==</div>
                {R.last([1])}

                <div>undefined ==</div>
                {R.last([])}

                <div>c ==</div>
                {R.last("abc")}

                <div>a ==</div>
                {R.last("a")}

                <div>undefined ==</div>
                {R.last("")}
            </div>
            <div></div>
        </div>
    );
};
